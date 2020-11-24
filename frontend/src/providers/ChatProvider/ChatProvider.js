import React, { useEffect, useState, useContext, useRef } from 'react';
import { SocketContext } from '../../shared/SocketIo'
import { CurrentMemberContext } from '../../shared/CurrentMember'
import { LOAD_CHAT_LIST, CHAT_MESSAGE_RECEIVED } from '../../shared/SocketIo/Events'
import LoadingScreen from '../../shared/LoadingScreen'

export const ChatContext = React.createContext();

export const ChatProvider = ({ children }) => {
    const { socket } = useContext(SocketContext);
    const { currentMember } = useContext(CurrentMemberContext);

    const [currentChatRoom, setCurrentChatRoom] = useState(null);
    const currentChatRoomRef = useRef();
    currentChatRoomRef.current = currentChatRoom;

    const [chatRooms, setChatRooms] = useState([]);
    const currentChatRooms = useRef();
    currentChatRooms.current = chatRooms;

    const [pending, setPending] = useState(true);


    useEffect(() => {

        if (!socket.hasListeners("LOAD_CHAT_LIST")) {

            socket.on("LOAD_CHAT_LIST", (chatList) => {

                console.log(LOAD_CHAT_LIST, chatList)
                setChatRooms(chatList);
                if (chatList.length > 0) {
                    setCurrentChatRoom(chatList[0])
                }
                setPending(false);
            })
        }


        if (!socket.hasListeners(CHAT_MESSAGE_RECEIVED)) {
            socket.on(CHAT_MESSAGE_RECEIVED, (receviedMessage) => {
                console.log("CHAT_MESSAGE_RECEIVED", receviedMessage);

                const roomId = receviedMessage.roomId;
                const chatRoom = currentChatRooms.current.filter((item) => item.roomId === roomId)
                const index = currentChatRooms.current.findIndex((item) => item.roomId === roomId)

                let newChatRooms = [...currentChatRooms.current];
                const newChatRoom = { ...chatRoom[0], chatMessages: [...chatRoom[0].chatMessages, receviedMessage] };
                newChatRooms[index] = newChatRoom;

                newChatRooms.forEach((item, index) => {
                    if (item.roomId === newChatRoom.roomId) {
                        newChatRooms.splice(index, 1);
                        newChatRooms.unshift(item);
                    }
                })
                setChatRooms(newChatRooms)

                console.log("LAAAAAAAAAA")
                if (currentChatRoomRef.current.roomId === newChatRoom.roomId) {
                    setCurrentChatRoom(newChatRoom)
                }
                console.log("BBAAAAAAAHHHHHH")
            })
        }

        if (!socket.hasListeners("ON_NEW_CHAT_ROOM_CREATED")) {
            socket.on("ON_NEW_CHAT_ROOM_CREATED", (createdChatRoom) => {
                console.log("ON_NEW_CHAT_ROOM_CREATED", createdChatRoom);
                setChatRooms([createdChatRoom, ...currentChatRooms.current])
                setCurrentChatRoom(createdChatRoom)
            })
        }

        if (!socket.hasListeners("ON_NEW_CHAT_ROOM_CREATED_FAILED")) {
            socket.on("ON_NEW_CHAT_ROOM_CREATED_FAILED", (errorMessage) => {
                console.log("ON_NEW_CHAT_ROOM_CREATED_FAILED", errorMessage);
                // TO-DO - show error to user!
            })
        }

        if (!socket.hasListeners("SEND_REQUEST_TO_JOIN_CHAT_ROOM")) {
            socket.on("SEND_REQUEST_TO_JOIN_CHAT_ROOM", (chatRoom) => {
                console.log("SEND_REQUEST_TO_JOIN_CHAT_ROOM", chatRoom);
                //first check if room already exists:
                const existChatRoom = currentChatRooms.current.filter((item) => item.roomId === chatRoom.roomId)
                if (existChatRoom.length > 0) {
                    console.log("SEND_REQUEST_TO_JOIN_CHAT_ROOM_1");
                    // TO-DO - This part of is similar to CHAT_MESSAGE_RECEIVED. Should create common function.
                    const index = currentChatRooms.current.findIndex((item) => item.roomId === chatRoom.roomId)
                    let newChatRooms = [...currentChatRooms.current];
                    const newChatRoom = { ...existChatRoom[0], chatMessages: [...existChatRoom[0].chatMessages, ...chatRoom.chatMessages]};
                    newChatRooms[index] = newChatRoom;

                    newChatRooms.forEach((item, index) => {
                        if (item.roomId === newChatRoom.roomId) {
                            newChatRooms.splice(index, 1);
                            newChatRooms.unshift(item);
                        }
                    })
                    setChatRooms(newChatRooms)
                    return;
                } else {
                    console.log("SEND_REQUEST_TO_JOIN_CHAT_ROOM_noooooooooo");
                    setChatRooms([chatRoom, ...currentChatRooms.current])
                }
        
                socket.emit("REQUEST_TO_JOIN_CHAT_ROOM", chatRoom.roomId);
            })
        }

        if (!socket.hasListeners("REQUEST_TO_JOIN_CHAT_ROOM_FAILED")) {
            socket.on("REQUEST_TO_JOIN_CHAT_ROOM_FAILED", (roomId, errorMessage) => {
                console.log("REQUEST_TO_JOIN_CHAT_ROOM_FAILED", errorMessage);
                // remove room Id we added, earlier just in case:
                setChatRooms(currentChatRooms.current.filter((room) => room.id !== roomId));
                // TO-DO - show error to user!
            })
        }

    }, [socket])

    const generateNewChatRoom = (chatToMember) => {
        return {
            //roomId: chatToMember.id + "-" + currentMember.id,
            isGroupChat: false,
            chatMessages: [],
            participants: [
                {
                    id: chatToMember.id,
                    name: chatToMember.fullName,
                    imageUrl: chatToMember.profileImageUrl
                },
                {
                    id: currentMember.id,
                    name: currentMember.fullName,
                    imageUrl: currentMember.profileImageUrl
                }
            ]
        }
    }

    const createPreChat = (member) => {
        console.log("CREATE CHAT", member)
        const memberId = member.id;

        // Check to see if chat room already exists:
        if (currentChatRooms.current.length > 0) {
            const existingChatRoom = currentChatRooms.current.filter((item) => {
                const participantIds = item.roomId.split("-")

                if (participantIds && participantIds.length === 2) {
                    return memberId == participantIds[0] || memberId == participantIds[1]
                }
                return false;
            });
            if (existingChatRoom.length === 1) {
                // Chatroom exists so set it to that
                // moveChatToFirst(existingChatRoom[0])
                setCurrentChatRoom(existingChatRoom[0])
                return;
            }
        }

        //create
        const newChat = generateNewChatRoom(member)
        // setChatRooms([newChat, ...currentChatRooms.current])
        setCurrentChatRoom(newChat)
    }

    const generateNewChatMessage = (message) => {
        return {
            uid:
                currentMember.id,
            name: currentMember.fullName,
            roomId: currentChatRoom.roomId,
            time: "8:00 am",
            message,
        }
    }

    const sendNewChatRoomRequest = (initalMessage) => {
        console.log("initalMessage0", initalMessage);
        const toUser = currentChatRoom.participants.filter((item) => item.id !== currentMember.id)[0];
        let roomId;
        if (toUser.id > currentMember.id) {
            roomId = toUser.id + "-" + currentMember.id;
        } else {
            roomId = currentMember.id + "-" + toUser.id;
        }
        const chatMessage = generateNewChatMessage(initalMessage);
        const chatRoom = { ...currentChatRoom, roomId, chatMessages: [chatMessage] }
        socket.emit("CREATE_NEW_CHAT_ROOM", toUser.id, roomId, chatRoom)
    }

    const sendChatMessage = (message) => {
        if (message) {
            if (currentChatRoom.roomId) {
                socket.emit("CHAT_MESSAGE_SEND", generateNewChatMessage(message));
            } else {
                sendNewChatRoomRequest(message);
            }
        }
    }

    if (pending) {
        return <LoadingScreen />
    }


    return (
        <ChatContext.Provider
            value={
                {
                    currentChatRoom,
                    setCurrentChatRoom,
                    chatRooms,
                    createPreChat,
                    sendChatMessage,
                    currentMemberId: currentMember.id
                }
            }
        >
            {children}
        </ChatContext.Provider>
    );
};
