import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core'

import ContactSearchBar from './components/ContactSearchBar';
import ChatList from './components/ChatList';
import TeamChatList from './components/TeamChatList';

import { Collapse } from 'antd';
const { Panel } = Collapse;

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: "380px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "-5px 0px 12px",
        zIndex: 1,
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.primary.main
    },
    logo: {
        height: "50px",
        width: "200px",
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    collapse: {
        overflowY: "auto",
        height: '100%',
        display: "flex",
        flexDirection: "column",
        padding: 0
    },
    panel: {
        padding: 0
    },
    // container: {
    //     flex: 1,
    //    // height: '20%',
    //     overflowY: "auto"
    // }
}));

const ChatListSection = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} >
            <img src="https://www.achievers.com/wp-content/uploads/2020/10/Achievers_Logo_CMYK.png" className={classes.logo}></img>
            <ContactSearchBar />

            <Collapse defaultActiveKey={['1', '2']} ghost className={classes.collapse}>
                <Panel header="Team Chat Rooms" key="1" className={classes.panel}>
                        <TeamChatList />
                </Panel>
                <Panel header="Personal Chats" key="2">
                        <ChatList />
                </Panel>
            </Collapse>

        </Paper>
    );
}

export default ChatListSection;