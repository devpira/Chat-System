import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Paper, IconButton } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import VideocamIcon from '@material-ui/icons/Videocam';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx'
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

import ChatTopBarTabs from './ChatTopBarTabs';
import ChatTopBarTab from './ChatTopBarTab';

import { OnlineBadge, OfflineBadge } from '../../../shared/Components'

import { VideoChatContext } from '../../../providers/VideoChatProvider';

const useStyles = makeStyles(theme => ({
    root: {
        //backgroundColor: theme.palette.sidePanel,
        // borderColor: theme.palette.sidePanel,
        height: "75px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        //borderBottom: "1px solid grey"
    },
    topAlignSection: {
        marginLeft: theme.spacing(2),
        display: "flex",
        alignItems: "center"
    },
    title: {
        marginLeft: theme.spacing(2),
        // color: theme.palette.primary.main
    },
    avatar: {
        marginLeft: theme.spacing(1),
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    icon: {
        fontSize: "28px",
        marginRight: theme.spacing(1),
    },
    recoButton: {
        fontSize: "14px",
        marginLeft: theme.spacing(8),
        borderRadius: 20,
    },
    highlightsButton: {
        fontSize: "14px",
        marginLeft: theme.spacing(2),
        borderRadius: 20,
    },
    tabs: {
        marginLeft: theme.spacing(4),
    }
}));

const Topbar = ({ className, onlineUsers, sendCoffeeChatMessage, participant, tabIndex, handleTabIndexChange }) => {
    const classes = useStyles();
    const { startCallingUser } = useContext(VideoChatContext)

    const [showOnline, setShowOnline] = useState(false);

    const videoCallUser = () => {
        startCallingUser(participant.id, participant.name, participant.imageUrl)
    }

    const openUserProfile = (id) => {
        if (id) {
            window.open(process.env.REACT_APP_OVER_URL + "/profile/" + id)
        }
    }

    useEffect(() => {
        console.log("PARREN: ", participant.id)
        if (onlineUsers && onlineUsers.length > 1 && participant.id) {
            setShowOnline(onlineUsers.includes(participant.id))
        } else {
            setShowOnline(false);
        }
    }, [onlineUsers, participant])
    console.log("onlineUsers", onlineUsers)
    return (
        <Paper
            className={clsx(classes.root, className)}
        >
            <div className={classes.topAlignSection}>
                {participant.id ? <> {showOnline ? <OnlineBadge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot"
                >
                    <Avatar onClick={() => openUserProfile(participant.id)} src={participant.imageUrl} className={classes.avatar}>
                        <ImageIcon />
                    </Avatar>
                </OnlineBadge>
                    :
                    <OfflineBadge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        variant="dot"
                    >
                        <Avatar onClick={() => openUserProfile(participant.id)} src={participant.imageUrl} className={classes.avatar}>
                            <ImageIcon />
                        </Avatar>
                    </OfflineBadge>
                }</> :

                    <Avatar onClick={() => openUserProfile(participant.id)} src={participant.imageUrl} className={classes.avatar}>
                        <ImageIcon />
                    </Avatar>
                }
                <Typography onClick={() => openUserProfile(participant.id)} variant="h5" className={classes.title}>
                    <strong>{participant.name}</strong>
                </Typography>
                {participant.id && <ChatTopBarTabs className={classes.tabs} value={tabIndex} onChange={handleTabIndexChange} aria-label="chat accessory tabs">
                    <ChatTopBarTab label="Chat" />
                    <ChatTopBarTab label="Highlights" />
                    <ChatTopBarTab label="1 ON 1" />
                    <ChatTopBarTab label="Mentorship" />
                </ChatTopBarTabs>}
            </div>
            <div>
                {participant.id && <IconButton aria-label="livechat" color="primary" onClick={videoCallUser}>
                    <VideocamIcon className={classes.icon} />
                </IconButton>
                }
                {/* {This part is to hack coffee chat sending. Should be deleted in future:} */}
                {/* <IconButton aria-label="options" color="primary" onClick={sendCoffeeChatMessage}>
                    <MoreVertIcon className={classes.icon} />
                </IconButton> */}

            </div>

        </Paper>
    );
};

Topbar.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func
};

export default Topbar;