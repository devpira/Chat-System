import React, { useContext, useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';
import Topbar from './components/Topbar';
import BottomBar from './components/BottomBar';
import FromChatBubble from './components/FromChatBubble';
import ToChatBubble from './components/ToChatBubble';

import { ChatContext } from '../../providers/ChatProvider'
import { CurrentMemberContext } from '../../shared/CurrentMember'


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        //width: "65px",
        backgroundColor: "#f3f6fb",
        flex: 1,
        //borderRadius: "10px",
        padding: theme.spacing(4),
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

    const { currentChatRoom, chatRooms, sendChatMessage } = useContext(ChatContext);
    const { currentMember } = useContext(CurrentMemberContext);
    const [otherParticipant, setOtherParticipant] = useState();

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ block: 'end', })
    }, [currentChatRoom]);

    useEffect(() => {
        const result = currentChatRoom.participants.filter((item) => item.id !== currentMember.id);
        if (result.length === 1) {
            setOtherParticipant(result[0])
        }
    }, [currentChatRoom])


    console.log("currentChatRoom", currentChatRoom)
    console.log("chatRooms", chatRooms)
    console.log("currentMember", currentMember)


    return (
        <div className={classes.root}>
            {currentChatRoom && chatRooms.length > 0 && otherParticipant ? <>
                <Topbar participant={otherParticipant} />
                <Paper className={classes.body} square >
                    <div ref={messagesEndRef}>
                        {
                            currentChatRoom.chatMessages.map((item, index) => {
                                return item.uid === currentMember.id ? <ToChatBubble key={index} message={item} imageUrl={currentMember.profileImageUrl} displayName={currentMember.preferredFirstName + " " + currentMember.lastName} />
                                    : <FromChatBubble key={index} message={item.message} imageUrl={otherParticipant.imageUrl} />
                            })
                        }
                    </div>
                </Paper>
                <BottomBar onMessageSend={sendChatMessage} />
            </> : <div ref={messagesEndRef}></div>}

        </div>

    );
}

export default ChatMessageSection;