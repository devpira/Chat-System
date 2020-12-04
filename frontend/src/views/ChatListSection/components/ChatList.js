import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

import { ChatContext } from '../../../providers/ChatProvider'

import { OnlineBadge, OfflineBadge } from '../../../shared/Components'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '110%',
        flex: 1,
        backgroundColor: theme.palette.background.paper,
        overflowY: "auto",
        padding: 0,
        marginLeft: theme.spacing(-2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(-2)
    },
    avatar: {
        width: theme.spacing(5.5),
        height: theme.spacing(5.5),
        marginLeft: theme.spacing(2.5),
    },
    text: {
        marginLeft: theme.spacing(2),
    }
}));

const ChatList = () => {
    const classes = useStyles();

    const { setCurrentChatRoom, chatRooms, currentMemberId, onlineUsers } = useContext(ChatContext);

    return (
        <List className={classes.root}>
            {chatRooms.map((item, index) => {
                if (item.type !== "chat") return null;
                return <ListItem button key={index} onClick={() => { setCurrentChatRoom(chatRooms[index]) }}>

                    {item.participants.map((participant, index) => {
                        if (participant.id !== currentMemberId) {
                            if (onlineUsers.includes(participant.id)) {
                                return <OnlineBadge
                                    overlap="circle"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    variant="dot"
                                >
                                    <Avatar key={index} src={participant.imageUrl} className={classes.avatar}>
                                        <PersonIcon />
                                    </Avatar>
                                </OnlineBadge>
                            } else {
                                return <OfflineBadge
                                    overlap="circle"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    variant="dot"
                                >
                                    <Avatar key={index} src={participant.imageUrl} className={classes.avatar}>
                                        <PersonIcon />
                                    </Avatar>
                                </OfflineBadge>
                            }

                        }
                    })}

                    {item.participants.map((participant, index) => {
                        if (participant.id !== currentMemberId) {
                            return <ListItemText className={classes.text} key={index} primary={<strong>{participant.name}</strong>} secondary={item.chatMessages.length > 0 ? item.chatMessages[item.chatMessages.length - 1].message : ""} />

                        }
                    })}
                </ListItem>
            })}

        </List>
    );
}

export default ChatList;