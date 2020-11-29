import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import SidePanel from '../SidePanel';
import ChatListSection from '../ChatListSection';
import ChatMessageSection from '../ChatMessageSection';
import ChatRecoSection from '../ChatAccessorySection';
import { VideoChatContext } from '../../providers/VideoChatProvider';

import VideoChatCallDialog from '../VideoChatCallDialog'
import VideoChatView from '../VideoChatView'
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
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

    const { callingMember, endCallingUser, callUser, isCallIncoming, declineCall, onCall, answerCall } = useContext(VideoChatContext)

    console.log("process.env.REACT_APP_STAND_ALONE", process.env.REACT_APP_STAND_ALONE)
    return (
        <>
            <div className={classes.root} square>
                {process.env.REACT_APP_STAND_ALONE === 'true' && <SidePanel />}
                <ChatListSection />
                <ChatMessageSection />
                <ChatRecoSection />
            </div>

            {callingMember && callingMember.id && !onCall &&
                <VideoChatCallDialog
                    open={true}
                    endCallingUser={endCallingUser}
                    callingMember={callingMember}
                    callUser={callUser}
                    isCallIncoming={isCallIncoming}
                    declineCall={declineCall}
                    answerCall={answerCall}
                />}
            {callingMember && callingMember.id && onCall &&
                <VideoChatView open={true} />}
        </>
    );
}

export default MainChat;