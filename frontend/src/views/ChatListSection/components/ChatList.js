import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

import { ChatContext } from '../../../providers/ChatProvider'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '110%',
        flex: 1,
        backgroundColor: theme.palette.background.paper,
        // marginTop: theme.spacing(1),
        overflowY: "auto",
        padding: 0,
        marginLeft: theme.spacing(-2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(-2)
    },
    avatar: {
        width: theme.spacing(6.5),
        height: theme.spacing(6.5),
        marginRight: theme.spacing(2)
    }
}));

const ChatList = () => {
    const classes = useStyles();

    const { setCurrentChatRoom, chatRooms, currentMemberId } = useContext(ChatContext);

    return (
        <List className={classes.root}>
            {chatRooms.map((item, index) => {
                return <ListItem button key={index} onClick={() => { setCurrentChatRoom(chatRooms[index]) }}>

                    {item.participants.map((participant, index) => {
                        if (participant.id !== currentMemberId) {
                            return <Avatar key={index} src={participant.imageUrl} className={classes.avatar}>
                                <PersonIcon />
                            </Avatar>
                        }
                    })}

                    {item.participants.map((participant, index) => {
                        if (participant.id !== currentMemberId) {
                            return <ListItemText key={index} primary={<strong>{participant.name}</strong>} secondary={item.chatMessages.length > 0 ? item.chatMessages[item.chatMessages.length - 1].message : ""} />

                        }
                    })}
                </ListItem>
            })}
          
        </List>
    );
}

export default ChatList;