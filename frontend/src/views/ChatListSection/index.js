import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper, Typography } from '@material-ui/core'

import ContactSearchBar from './components/ContactSearchBar';
import ChatList from './components/ChatList';


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

}));

const ChatListSection = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} >
            <img src="https://www.achievers.com/wp-content/uploads/2020/10/Achievers_Logo_CMYK.png" className={classes.logo}></img>
            <ContactSearchBar />
            <ChatList />
        </Paper>
    );
}

export default ChatListSection;