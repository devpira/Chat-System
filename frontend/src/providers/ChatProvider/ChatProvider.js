import React, { useEffect, useState, useContext, useRef } from 'react';
import { SocketContext } from '../../shared/SocketIo'
import { CurrentMemberContext } from '../../shared/CurrentMember'
import { LOAD_CHAT_LIST, CHAT_MESSAGE_RECEIVED } from '../../shared/SocketIo/Events'
import LoadingScreen from '../../shared/LoadingScreen'
import Moment from 'moment';

import { notification } from 'antd';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

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

    const openNotification = (name, imageUrl, message) => {
        notification.open({
            message: <div style={{ display: "flex", marginRight: "10px" }}>
                <Avatar style={{ width: "30px", height: "30px", marginRight: "10px" }} src={imageUrl} >
                    <PersonIcon />
                </Avatar>
                <strong><p style={{ fontSize: "13px", textAlign: "center" }}>{name}</p></strong>
            </div>,
            description:
                <div style={{ marginLeft: "10px", marginRight: "10px" }}>{message}</div>,

            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

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

                if (newChatRoom.type !== "team-chat") {
                    newChatRooms.forEach((item, index) => {
                        if (item.roomId === newChatRoom.roomId) {
                            newChatRooms.splice(index, 1);
                            newChatRooms.unshift(item);
                        }
                    })
                }

                setChatRooms(newChatRooms)


                if (currentChatRoomRef.current.roomId === newChatRoom.roomId) {
                    setCurrentChatRoom(newChatRoom)
                } else {
                    if (newChatRoom.type === "chat")
                        openNotification(receviedMessage.name, receviedMessage.imageUrl, receviedMessage.message);
                }

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
                    const newChatRoom = { ...existChatRoom[0], chatMessages: [...existChatRoom[0].chatMessages, ...chatRoom.chatMessages] };
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
                    openNotification(chatRoom.chatMessages[0].name, chatRoom.chatMessages[0].imageUrl, chatRoom.chatMessages[0].message);
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
            type: "chat",
            chatMessages: [],
            participants: [
                {
                    id: chatToMember.id,
                    name: chatToMember.fullName,
                    imageUrl: chatToMember.largeImageUrl
                },
                {
                    id: currentMember.id,
                    name: currentMember.fullName,
                    imageUrl: currentMember.largeImageUrl
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

    const generateNewChatMessage = (message, type) => {
        return {
            uid:
                currentMember.id,
            name: currentMember.fullName,
            roomId: currentChatRoom.roomId,
            imageUrl: currentMember.largeImageUrl,
            type,
            time: Moment().format(),
            message,
        }
    }

    const sendNewChatRoomRequest = (initalMessage, type) => {
        console.log("initalMessage0", initalMessage);
        const toUser = currentChatRoom.participants.filter((item) => item.id !== currentMember.id)[0];
        let roomId;
        if (toUser.id > currentMember.id) {
            roomId = toUser.id + "-" + currentMember.id;
        } else {
            roomId = currentMember.id + "-" + toUser.id;
        }
        const chatMessage = generateNewChatMessage(initalMessage, type);
        const chatRoom = { ...currentChatRoom, roomId, chatMessages: [chatMessage] }
        socket.emit("CREATE_NEW_CHAT_ROOM", toUser.id, roomId, chatRoom)
    }

    const sendChatMessage = (message) => {
        if (message) {
            if (currentChatRoom.roomId) {
                socket.emit("CHAT_MESSAGE_SEND", generateNewChatMessage(message, "message"));
            } else {
                sendNewChatRoomRequest(message, "message");
            }
        }
    }

    const sendCoffeeChatMessage = () => {
        /// THIS WHOLE FUNCTION IS HACK COFFEE CHAT SENDING, SHOULD BE DELETED.
        const toUser = {id: 12429996, fullName: "P̶J̶ ira ♕ Suriyakumaran", largeImageUrl: "https://over.localhost.achievers.com/platform_content/shard_1/ilr/public/user/12429996/KC4jUk85M05TLjYk/icon_med.jpg?1550353617"}
        if (toUser.id === currentMember.id) {
            return
        }
        const newRoom = generateNewChatRoom(toUser)
        let roomId;
        if (toUser.id > currentMember.id) {
            roomId = toUser.id + "-" + currentMember.id;
        } else {
            roomId = currentMember.id + "-" + toUser.id;
        }

        const chatMessage = generateNewChatMessage("NEW COFFEE CHAT HAS ARRIVED!", "coffee-chat");
        const chatRoom = { ...newRoom, roomId, chatMessages: [chatMessage] }
        socket.emit("CREATE_NEW_CHAT_ROOM", toUser.id, roomId, chatRoom)
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
                    currentMemberId: currentMember.id,
                    sendCoffeeChatMessage
                }
            }
        >
            {children}
        </ChatContext.Provider>
    );
};
