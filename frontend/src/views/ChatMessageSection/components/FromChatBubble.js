import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import Moment from 'moment';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: "18px",
    },
    bubbleContainer: {
        marginBottom: "8px",
        display: "flex",
        fontSize: "14px",
        alignItems: "center",
    },

    bubble: {
        backgroundColor: "White",
        borderRadius: "8px",
        boxShadow: "0 0 6px #B2B2B2",
        display: "block",
        padding: "16px 16px",
        position: "relative",
        verticalAlign: "top",
        color: "white",
        wordWrap: "breakWord",
        marginLeft: "30px",
        marginRight: "18px",
        '&:before': {
            backgroundColor: "white",
            content: "'\\00a0'",
            display: "block",
            height: "16px",
            position: "absolute",
            top: "18px",
            transform: "rotate( 29deg ) skew( -35deg )",
            width: "20px",
            boxShadow: "-2px 2px 2px 0 rgba( 178, 178, 178, .4 )",
            left: "-9px",
        },
    },
    name: {
        marginLeft: "75px",
    },
    largeAvater: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    }

}));

const FromChatBubble = ({ message, imageUrl }) => {
    const classes = useStyles();

    return (
        <Grid container
            className={classes.root}
            direction="column"
            justify="center"
            alignItems="flex-start"
            spacing={3}>
            <Grid item xs={12}>
                <div className={classes.bubbleContainer} key={1}>
                    <Avatar alt="Remy Sharp" src={imageUrl} className={classes.largeAvater} >
                        <PersonIcon />
                    </Avatar>
                    <div className={classes.bubble}>
                        <Typography variant="h5" className={classes.text}>
                            {message}
                        </Typography>
                    </div>
                </div>
                <Typography variant="body2" className={classes.name}>
                    {Moment(message.time).format('h:mm a - MM/DD')}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default FromChatBubble;
