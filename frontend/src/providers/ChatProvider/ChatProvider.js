import React, { useEffect, useState, useContext, useRef } from 'react';
import { SocketContext } from '../../shared/SocketIo'
import { LOAD_CHAT_LIST, CHAT_MESSAGE_RECEIVED } from '../../shared/SocketIo/Events'
import LoadingScreen from '../../shared/LoadingScreen'

export const ChatContext = React.createContext();

export const ChatProvider = ({ children }) => {
    const { socket } = useContext(SocketContext);

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

                setChatRooms(newChatRooms);

                if (currentChatRoomRef.current.roomId === newChatRoom.roomId) {
                    setCurrentChatRoom(newChatRoom)
                }

            })
        }
    }, [socket])

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
                }
            }
        >
            {children}
        </ChatContext.Provider>
    );
};
