import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client'
import { CONNECT, DISCONNECTED, CONNECT_ERROR, ERROR, AUTH_FAIL } from './Events'
import { AuthContext } from "../Authentication";
import LoadingScreen from '../LoadingScreen'

const socketUrl = process.env.REACT_APP_SOCKETIO_HOST + ":" + process.env.REACT_APP_SOCKETIO_PORT;
//const socketUrl = "http://192.168.0.18:5000/"

export const SocketContext = React.createContext();

export const SocketProvider = ({ children }) => {
    const { oAuthToken } = useContext(AuthContext);

    const [socket, setSocket] = useState(null);
    //const [authError, setAuthError] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const socket = io(socketUrl, { query: { token: oAuthToken } });
        socket.on(CONNECT_ERROR, (error) => {
            console.log("Failed to connect")
            console.log(error)
        });

        socket.on(ERROR, (error) => {
            console.log("connection failed....")
            console.log(error)
        });

        socket.on(CONNECT, () => {
            console.log("Successfully connected to socket.io server!")

            socket.on(AUTH_FAIL, () => {
                console.log("Auth failed....")
                setSocket(null)
                setPending(true)
            });

            socket.on(DISCONNECTED, () => {
                console.log("Discconnected")
            });
            setSocket(socket)
            setPending(false)
        })
    }, []);

    if (pending) {
        return <LoadingScreen />
    }

    return (
        <SocketContext.Provider
            value={
                {
                    socket,
                }
            }
        >
            {children}
        </SocketContext.Provider>
    );
};