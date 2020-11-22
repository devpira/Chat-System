import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, IconButton, InputBase } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

const useStyles = makeStyles(theme => ({
    root: {
        //backgroundColor: theme.palette.sidePanel,
        // borderColor: theme.palette.sidePanel,
        height: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //borderBottom: "1px solid grey"
    },


    icon: {
        fontSize: "28px"
    },
    textInput: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "85%",
        backgroundColor: "#F3F6FB",
        // marginLeft: theme.spacing(2),
        // marginRight: theme.spacing(2),
        borderRadius: "35px",
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
        color: theme.palette.primary.main
    },
}));

const BottomBar = ({ className, onMessageSend }) => {

    const classes = useStyles();
    const [message, setMessage] = useState("");

    const onChange = (e) => {
        setMessage(e.target.value)
    }

    const onKeyDown = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault();
            setMessage(""); onMessageSend(message);
        }

    }

    return (
        <Paper
            elevation={1}
            square={true}
            className={clsx(classes.root, className)}
        >
            <Paper component="form" elevation={1} className={classes.textInput}>
                <IconButton className={classes.iconButton} aria-label="search">
                    <EmojiEmotionsIcon />
                </IconButton>
                <InputBase
                    className={classes.input}
                    placeholder="Type your message to send"
                    value={message}
                    onKeyDown={onKeyDown}
                    onChange={onChange}
                    inputProps={{ 'aria-label': 'Type a message' }}
                />
                <IconButton className={classes.iconButton} aria-label="search" onClick={() => { setMessage(""); onMessageSend(message); }}>
                    <SendIcon />
                </IconButton>
            </Paper>


        </Paper>
    );
};

export default BottomBar;