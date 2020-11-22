import React, { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../SocketIo'
import { LOAD_CURRENT_MEMBER } from '../SocketIo/Events';

export const CurrentMemberContext = React.createContext();

export const CurrentMemberProvider = ({ children }) => {
    const { socket } = useContext(SocketContext);

    const [currentMember, setCurrentMember] = useState(null);

    useEffect(() => {
        if (!socket.hasListeners(LOAD_CURRENT_MEMBER)) {
            socket.on(LOAD_CURRENT_MEMBER, (loadedMember) => {
                setCurrentMember(loadedMember);
            })
        }
    }, [socket])


    return (
        <CurrentMemberContext.Provider
            value={
                {
                    currentMember,
                }
            }
        >
            {children}
        </CurrentMemberContext.Provider>
    );
};
