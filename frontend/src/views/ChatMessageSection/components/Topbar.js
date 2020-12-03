import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Paper, IconButton } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import VideocamIcon from '@material-ui/icons/Videocam';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx'
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

import ChatTopBarTabs from './ChatTopBarTabs';
import ChatTopBarTab from './ChatTopBarTab';

import { VideoChatContext } from '../../../providers/VideoChatProvider';
import { ChatContext } from '../../../providers/ChatProvider';

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

const Topbar = ({ className, sendCoffeeChatMessage, participant, tabIndex, handleTabIndexChange }) => {
    const classes = useStyles();
    const { startCallingUser } = useContext(VideoChatContext)

    const videoCallUser = () => {
        startCallingUser(participant.id, participant.name, participant.imageUrl)
    }

    const openUserProfile = (id) => {
        if (id) {
            window.open(process.env.REACT_APP_OVER_URL + "/profile/" + id)
        }
    }
    return (
        <Paper
            className={clsx(classes.root, className)}
        >
            <div className={classes.topAlignSection}>
                <Avatar onClick={() => openUserProfile(participant.id)} src={participant.imageUrl} className={classes.avatar}>
                    <ImageIcon />
                </Avatar>
                <Typography onClick={() => openUserProfile(participant.id)} variant="h5" className={classes.title}>
                    <strong>{participant.name}</strong>
                </Typography>
                {/* {participant.id && <Button disableElevation color="primary" className={classes.recoButton}>Chat</Button>}
                {participant.id && <Button disableElevation color="primary" onClick={() => window.open(process.env.REACT_APP_OVER_URL + "/recognize/entry/cta/user/" + participant.id)} className={classes.highlightsButton}>Recognize</Button>}
                {participant.id && <Button disableElevation color="primary" className={classes.highlightsButton}>Highlights</Button>}
                {participant.id && <Button disableElevation color="primary" className={classes.highlightsButton}>1 ON 1</Button>}
                {participant.id && <Button disableElevation color="primary" className={classes.highlightsButton}>Mentorship</Button>} */}
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