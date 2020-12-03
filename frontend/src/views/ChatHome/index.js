import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import SidePanel from '../SidePanel';
import ChatListSection from '../ChatListSection';
import ChatMessageSection from '../ChatMessageSection';
import ChatRecoSection from '../ChatAccessorySection';
import { VideoChatContext } from '../../providers/VideoChatProvider';

import VideoChatCallDialog from '../VideoChatCallDialog'
import VideoChatView from '../VideoChatView'
import { Editor, Frame, Element } from "@craftjs/core";

import MainContainer from './MainContainer'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: "100%",
        display: "flex",
        // paddingTop: theme.spacing(4),
        padding: theme.spacing(5),
        // boxShadow: "9px 0px 20px",
        backgroundColor: "#f4f7fa",
    },
    content: {
        height: '100%',
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    shiftContent: {
        paddingLeft: "65px"
    },
    body: {
        display: "flex",
        flex: 1,
        padding: theme.spacing(2)
    }
}));

const MainChat = () => {
    const classes = useStyles();

    const { callingMember, endCallingUser, callUser, isCallIncoming, declineCall, onCall, answerCall } = useContext(VideoChatContext);

    return (
        <>
            <Editor
                resolver={{ MainContainer, ChatListSection, ChatMessageSection, ChatRecoSection }}
            >
                <Frame className={classes.root}>
                    <Element id="MainContainer" is={MainContainer} canvas>
                        {/* <Element id="ChatListSection" is={ChatListSection} />
                        <Element id="ChatMessageSection" is={ChatMessageSection} />
                        <Element id="ChatRecoSection" is={ChatRecoSection} /> */}
                        <ChatListSection />
                        <ChatMessageSection />
                        <ChatRecoSection />
                    </Element>
                </Frame>
            </Editor>


            {
                callingMember && callingMember.id && !onCall &&
                <VideoChatCallDialog
                    open={true}
                    endCallingUser={endCallingUser}
                    callingMember={callingMember}
                    callUser={callUser}
                    isCallIncoming={isCallIncoming}
                    declineCall={declineCall}
                    answerCall={answerCall}
                />
            }
            {
                callingMember && callingMember.id && onCall &&
                <VideoChatView open={true} />
            }
        </>
    );
}

export default MainChat;