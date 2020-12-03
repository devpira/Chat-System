import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, IconButton, InputBase } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Popover from '@material-ui/core/Popover';

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
    emojiPopover: {
        // marginLeft: theme.spacing(40),
        marginRight: theme.spacing(40),

    }
}));
const emojiList = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐",
    "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐",
    "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾",
    "👋", "🤚", "🖐", "✋", "🖖", "👌", "🤞", "🤟", "🤘", "🤙", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲 ", "🤝", "🙏", "🍦", "🥧", "🧁", "🍫"];

const BottomBar = ({ className, onMessageSend }) => {

    const classes = useStyles();
    const [message, setMessage] = useState("");
    const messageRef = useRef();
    messageRef.current = message;

    const [anchorEl, setAnchorEl] = useState(null);

    const onChange = (e) => {
        setMessage(e.target.value)
    }

    const onKeyDown = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault();
            setMessage(""); onMessageSend(message);
        }
    }

    const handleEmojiButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseEmojis = () => {
        setAnchorEl(null);
    };

    const onEmjoiSelected = (emoji) => {
        setMessage(messageRef.current + emoji)
        handleCloseEmojis();
    }

    const open = Boolean(anchorEl);

    return (
        <Paper
            className={clsx(classes.root, className)}
        >
            <Paper component="form" elevation={1} className={classes.textInput}>
                <IconButton className={classes.iconButton} aria-label="search" onClick={handleEmojiButtonClick}>
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
            <Popover
                open={open}
                className={classes.emojiPopover}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                onClose={handleCloseEmojis}
            >
                {emojiList.map((item, index) => {
                    return <IconButton key={index} className={classes.iconButton} onClick={() => onEmjoiSelected(item)} >
                        {item}
                    </IconButton>
                })}
            </Popover>
        </Paper>
    );
};

export default BottomBar;