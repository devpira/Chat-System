import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import SidePanel from '../SidePanel'
import ChatListSection from '../ChatListSection'
import ChatMessageSection from '../ChatMessageSection'
import { ChatProvider } from '../../providers/ChatProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        display: "flex",
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

    return (
        <ChatProvider>
            <div className={classes.root}>
                <SidePanel />
                <ChatListSection />
                <ChatMessageSection />
            </div>
        </ChatProvider>
    );
}

export default MainChat;