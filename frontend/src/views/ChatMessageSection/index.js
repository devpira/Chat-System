import React, { useContext, useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';
import Topbar from './components/Topbar';
import BottomBar from './components/BottomBar';
import FromChatBubble from './components/FromChatBubble';
import ToChatBubble from './components/ToChatBubble';

import { SocketContext } from '../../shared/SocketIo';
import { ChatContext } from '../../providers/ChatProvider'
import { CurrentMemberContext } from '../../shared/CurrentMember'


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        //width: "65px",
        flex: 1,
        //borderRadius: "10px",
        padding: theme.spacing(5),
        display: "flex",
        flexDirection: "column",
    },
    body: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        overflowY: "auto",
        scrollbarColor: theme.palette.primary.main,
        scrollbarWidth: "1px",
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            outline: '1px solid slategrey'
        }
    }


}));

const ChatMessageSection = () => {
    const classes = useStyles();
    const messagesEndRef = useRef(null)

    const { currentChatRoom, chatRooms } = useContext(ChatContext);
    const { socket } = useContext(SocketContext);
    const { currentMember } = useContext(CurrentMemberContext);

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ block: 'end', })
    }, [currentChatRoom]);


    const onMessageSend = (message) => {
        if (message) {
            const builtMessage = { uid: currentMember.id, name: currentMember.preferredFirstName + " " + currentMember.lastName, message, roomId: currentChatRoom.roomId, time: "8:00 am" };
            socket.emit("CHAT_MESSAGE_SEND", builtMessage)
        }
    }
    console.log("currentChatRoom", currentChatRoom)
    console.log("chatRooms", chatRooms)
    console.log("currentMember", currentMember)
    return (
        <div className={classes.root}>
            {currentChatRoom && chatRooms.length > 0 ? <>
                <Topbar title={currentChatRoom.participants[0].name} />
                <Paper className={classes.body} square >
                    <div ref={messagesEndRef}>
                        {
                            currentChatRoom.chatMessages.map((item, index) => {
                                return item.uid === currentMember.id ? <ToChatBubble key={index} message={item} imageUrl={currentMember.profileImageUrl} displayName={currentMember.preferredFirstName + " " + currentMember.lastName} />
                                    : <FromChatBubble key={index} jid={item.name} message={item.message} />
                            })
                        }
                    </div>
                </Paper>
                <BottomBar onMessageSend={onMessageSend} />
            </> : <div ref={messagesEndRef}></div>}

        </div>

    );
}

export default ChatMessageSection;