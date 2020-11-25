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
        width: theme.spacing(5.5),
        height: theme.spacing(5.5),
        marginLeft: theme.spacing(2.5),
        marginRight: theme.spacing(2)
    }
}));

const TeamChatList = () => {
    const classes = useStyles();

    const { setCurrentChatRoom, chatRooms } = useContext(ChatContext);

    return (
        <List className={classes.root}>
            {chatRooms.map((item, index) => {
                if (item.type !== "team-chat") return null;
                return <ListItem button key={index} onClick={() => { setCurrentChatRoom(chatRooms[index]) }}>
                    <Avatar src={item.imageUrl} className={classes.avatar}>
                        <PersonIcon />
                    </Avatar>
                    <ListItemText primary={<strong>{item.name}</strong>}  />
                </ListItem>
            })}

        </List>
    );
}

export default TeamChatList;