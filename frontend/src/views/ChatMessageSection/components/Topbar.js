import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Paper, IconButton } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import VideocamIcon from '@material-ui/icons/Videocam';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx'
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

import { VideoChatContext } from '../../../providers/VideoChatProvider';
import { ChatContext } from '../../../providers/ChatProvider';

const useStyles = makeStyles(theme => ({
    root: {
        //backgroundColor: theme.palette.sidePanel,
        // borderColor: theme.palette.sidePanel,
        height: "65px",
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
        fontSize: "28px"
    }
}));

const Topbar = ({ className, participant }) => {
    const classes = useStyles();
    const { startCallingUser } = useContext(VideoChatContext)
    const { sendCoffeeChatMessage } = useContext(ChatContext)

    const videoCallUser = () => {
        console.log("CALL")
        startCallingUser(participant.id, participant.name, participant.imageUrl)
    }

    return (
        <Paper
            className={clsx(classes.root, className)}
        >
            <div className={classes.topAlignSection}>
                <Avatar src={participant.imageUrl} className={classes.avatar}>
                    <ImageIcon />
                </Avatar>
                <Typography variant="h5" className={classes.title}>
                    <strong>{participant.name}</strong>
                </Typography>
            </div>
            <div>
                {participant.id && <IconButton aria-label="livechat" color="primary" onClick={videoCallUser}>
                    <VideocamIcon className={classes.icon} />
                </IconButton>
                }
                {/* {This part is to hack coffee chat sending. Should be deleted in future:} */}
                <IconButton aria-label="options" color="primary" onClick={sendCoffeeChatMessage}>
                    <MoreVertIcon className={classes.icon} />
                </IconButton>

            </div>

        </Paper>
    );
};

Topbar.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func
};

export default Topbar;