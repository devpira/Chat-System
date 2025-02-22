import React, { useContext, useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';
import Topbar from './components/Topbar';
import BottomBar from './components/ChatMessageView/BottomBar';
import FromChatBubble from './components/ChatMessageView/FromChatBubble';
import ToChatBubble from './components/ChatMessageView/ToChatBubble';

import { ChatContext } from '../../providers/ChatProvider';
import { CurrentMemberContext } from '../../shared/CurrentMember';
import CoffeeChatMessage from './components/ChatMessageView/CoffeeChatMessage';

import { useNode } from "@craftjs/core";

import ChatMessageView from './components/ChatMessageView/ChatMessageView'
import Highlights from './components/Highlights'
import OneOnOneView from './components/OneOnOneView'
import Mentorship from './components/Mentorship'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',

        //width: "65px",
        //backgroundColor: "#f3f6fb",
        backgroundColor: "#f4f7fa",
        flex: 1,
        //borderRadius: "10px",
        // padding: theme.spacing(4),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
    },
    content: {
        height: '100%',
        width: "100",
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

    const { currentChatRoom, chatRooms, sendChatMessage, sendCoffeeChatMessage, onlineUsers } = useContext(ChatContext);
    const { currentMember } = useContext(CurrentMemberContext);
    const [otherParticipant, setOtherParticipant] = useState();

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabIndexChange = (_, newValue) => {
        setTabIndex(newValue);
    };

    const { connectors: { connect, drag } } = useNode();

    useEffect(() => {
        if (messagesEndRef && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ block: 'end', })
        }

    }, [currentChatRoom]);

    useEffect(() => {
        if (!currentChatRoom) {
            return;
        }

        if (currentChatRoom.type === "team-chat") {
            setOtherParticipant({ imageUrl: currentChatRoom.imageUrl, name: currentChatRoom.name });
        } else {
            const result = currentChatRoom.participants.filter((item) => item.id !== currentMember.id);
            if (result.length === 1) {
                setOtherParticipant(result[0])
            }
        }

    }, [currentChatRoom])

    return (
        <div ref={ref => connect(drag(ref))} className={classes.root} >
            {currentChatRoom && chatRooms.length > 0 && otherParticipant ?
                <Paper className={classes.content} elevation={2} >
                    <Topbar
                        participant={otherParticipant}
                        tabIndex={tabIndex}
                        sendCoffeeChatMessage={sendCoffeeChatMessage}
                        handleTabIndexChange={handleTabIndexChange}
                        onlineUsers={onlineUsers}
                    />
                    {!otherParticipant.id ? <>
                        <div className={classes.body} elevation={2} >
                            <div ref={messagesEndRef}>
                                {
                                    currentChatRoom.chatMessages.map((item, index) => {
                                        if (item.type === "message") {
                                            return item.uid === currentMember.id ? <ToChatBubble key={index} message={item} imageUrl={currentMember.profileImageUrl} displayName={currentMember.preferredFirstName + " " + currentMember.lastName} />
                                                : <FromChatBubble key={index} message={item.message} imageUrl={item.imageUrl} />
                                        } else if (item.type === "coffee-chat") {
                                            return <CoffeeChatMessage otherParticipant={otherParticipant} />
                                        }
                                    })
                                }
                            </div>

                        </div>
                        <BottomBar onMessageSend={sendChatMessage} />
                    </> :
                        <>
                            <ChatMessageView
                                index={0}
                                value={tabIndex}
                                messagesEndRef={messagesEndRef}
                                currentChatRoom={currentChatRoom}
                                currentMember={currentMember}
                                otherParticipant={otherParticipant}
                                sendChatMessage={sendChatMessage}
                            />
                            <Highlights
                                index={1}
                                value={tabIndex}
                                currentMember={currentMember}
                                otherParticipant={otherParticipant}
                            />
                            <OneOnOneView
                                index={2}
                                value={tabIndex}
                                currentMember={currentMember}
                                otherParticipant={otherParticipant}
                            />
                            <Mentorship
                                index={3}
                                value={tabIndex}
                                currentMember={currentMember}
                                otherParticipant={otherParticipant}
                            />
                        </>
                    }
                </Paper>
                : <div ref={messagesEndRef}></div>}

        </div>

    );
}

ChatMessageSection.craft = {
    displayName: 'ChatMessageSection',
    rules: {
        canDrag: () => true,
    },
}

export default ChatMessageSection;