import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Paper, IconButton } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import VideocamIcon from '@material-ui/icons/Videocam';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx'
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

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
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    icon: {
        fontSize: "28px"
    }
}));

const Topbar = ({ className, participant }) => {

    const classes = useStyles();

    return (
        <Paper
            elevation={1}
            square={true}
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
                <IconButton aria-label="livechat" color="primary">
                    <VideocamIcon className={classes.icon} />
                </IconButton>
                <IconButton aria-label="livechat" color="primary">
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