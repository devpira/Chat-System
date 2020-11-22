import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

import { ChatContext } from '../../../providers/ChatProvider'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flex: 1,
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(1),
        overflowY: "auto",
    },
    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        marginRight: theme.spacing(2)
    }
}));

const ChatList = () => {
    const classes = useStyles();

    const { setCurrentChatRoom, chatRooms } = useContext(ChatContext);

    return (
        <List className={classes.root}>
            {chatRooms.map((item, index) => {
                return <ListItem button key={index} onClick={() => { setCurrentChatRoom(chatRooms[index]) }}>
                    <ListItemAvatar>
                        <Avatar src={item.participants[0].imageUrl} className={classes.avatar}>
                            <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.participants[0].name} secondary={item.chatMessages.length > 0 ? item.chatMessages[item.chatMessages.length - 1].message : ""} />
                </ListItem>
            })}
        </List>
    );
}

export default ChatList;