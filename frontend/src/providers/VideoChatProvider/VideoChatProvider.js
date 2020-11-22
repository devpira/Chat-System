import React, { useEffect, useState, useContext, useRef } from 'react';
import { CurrentMemberContext } from '../../shared/CurrentMember'
import { SocketContext } from '../../shared/SocketIo'
import Peer from 'peerjs'



export const VideoChatContext = React.createContext();

export const VideoChatProvider = ({ children }) => {
    const { socket } = useContext(SocketContext);
    const { currentMember } = useContext(CurrentMemberContext);

    const [callingMember, setCallingMember] = useState(null);
    const callingMemberRef = useRef();
    callingMemberRef.current = callingMember;

    const [isCalling, setIsCalling] = useState(false);
    const isCallingRef = useRef();
    isCallingRef.current = isCalling;

    const [isCallIncoming, setIsCallIncoming] = useState(false);
    const isCallIncomingRef = useRef();
    isCallIncomingRef.current = isCallIncoming;

    const [onCall, setOnCall] = useState(false);
    const onCallRef = useRef();
    onCallRef.current = onCall;

    const [call, setCall] = useState(false);
    const callRef = useRef();
    callRef.current = call;

    const [peerConnection, setPeerConnection] = useState();
    const peerConnectionRef = useRef();
    peerConnectionRef.current = peerConnection;

    const [callingStreamerId, setCallingStreamerId] = useState();

    useEffect(() => {

        if (!socket.hasListeners("VIDEO_CALL_USER_ANSWER_REQUEST")) {
            socket.on("VIDEO_CALL_USER_ANSWER_REQUEST", (myInfo) => {

                if (onCallRef.current) {
                    socket.emit("VIDEO_CALL_USER_DECLINE", myInfo.id);
                    return;
                }

                setCallingMember(myInfo);
                setIsCallIncoming(true);
            })
        }

        if (!socket.hasListeners("VIDEO_CALL_USER_DECLINE_NOTIFY")) {
            socket.on("VIDEO_CALL_USER_DECLINE_NOTIFY", (myId) => {
                if (isCallingRef.current && callingMemberRef.current && callingMemberRef.current.id === myId) {
                    endCallingUser();
                }

            })
        }

        if (!socket.hasListeners("VIDEO_CALL_USER_ANSWER_NOTIFY")) {
            socket.on("VIDEO_CALL_USER_ANSWER_NOTIFY", (myId) => {
                startVideoCall(myId)
            })
        }


        if (!socket.hasListeners("VIDEO_CALL_START_STREAM_START")) {
            socket.on('VIDEO_CALL_START_STREAM_START', userId => {
                setCallingStreamerId(userId)
            })
        }

        if (!socket.hasListeners("VIDEO_CALL_END_STREAM")) {
            socket.on('VIDEO_CALL_END_STREAM', callerId => {
                if (callerId && callingMemberRef.current && callerId === callingMemberRef.current.id) {
                    endVideoCall(true);
                }
            })
        }

    }, [socket])

    const startCallingUser = (id, name, imageUrl) => {
        setCallingMember({
            id, name, imageUrl
        });
    }

    const endCallingUser = () => {
        setCallingMember(null);
        setIsCalling(false);
    }
    const callUser = (userId) => {
        const myInfo = {
            id: currentMember.id,
            name: currentMember.name,
            imageUrl: currentMember.largeImageUrl,
        }
        setIsCalling(true);
        socket.emit("VIDEO_CALL_USER_REQUEST", userId, myInfo);
    }

    const declineCall = () => {
        const myId = currentMember.id;
        setCallingMember(null);
        setIsCallIncoming(false)
        socket.emit("VIDEO_CALL_USER_DECLINE", callingMember.id, myId);
    }

    const answerCall = () => {
        const myId = currentMember.id;
        socket.emit("VIDEO_CALL_USER_ANSWER", callingMember.id, myId);
        setIsCallIncoming(false)
        startVideoCall(callingMember.id)
    }

    const startVideoCall = (userId) => {
        setOnCall(true);
        const connection = new Peer({ host: process.env.REACT_APP_PEER_HOST, port: process.env.REACT_APP_PEER_PORT, path: '/peerjs' })

        connection.on('open', id => {
            socket.emit("VIDEO_CALL_START_STREAM_REQUEST", userId, id);
        })
        setPeerConnection(connection);
    }

    const endVideoCall = (otherUserDiconnected) => {
        if (callRef.current) {
            callRef.current.close();
        }

        if (peerConnectionRef.current) {
            peerConnectionRef.current.disconnect();
        }

        if (peerConnectionRef.current) {
            //Just in case disconnect didn't kill the connection.
            peerConnectionRef.current.destroy();
        }

        setPeerConnection(null);
        setCallingStreamerId(null);
        setCallingMember(null);
        setOnCall(false);
        if (!otherUserDiconnected) {
            socket.emit("VIDEO_CALL_END_STREAM_REQUEST", callingMember.id, currentMember.id);
        }
    }

    return (
        <VideoChatContext.Provider
            value={
                {
                    startCallingUser,
                    endCallingUser,
                    callingMember,
                    callUser,
                    declineCall,
                    isCallIncoming,
                    answerCall,
                    onCall,
                    peerConnection,
                    socket,
                    callingStreamerId,
                    endVideoCall,
                    setCall
                }
            }
        >
            {children}
        </VideoChatContext.Provider>
    );
};
