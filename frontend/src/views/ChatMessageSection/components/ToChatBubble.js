import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: "18px",
    },
    bubbleContainer: {
        //marginTop: "18px",
        marginBottom: "8px",
        display: "flex",

        fontSize: "14px",
        alignItems: "center",
        flexDirection: "rowReverse",
    },

    bubble: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "8px",
        boxShadow: "0 0 6px #B2B2B2",
        display: "block",
        padding: "16px 16px",
        position: "relative",
        verticalAlign: "top",
        color: "white",
        wordWrap: "breakWord",
        // 

        marginLeft: "18px",
        marginRight: "30px",
        '&:before': {
            backgroundColor: theme.palette.primary.main,
            content: "'\\00a0'",

            display: "block",
            height: "16px",
            position: "absolute",
            top: "18px",
            transform: "rotate( 29deg ) skew( -35deg )",
            // -moz-transform:    rotate( 29deg ) skew( -35deg );
            // -ms-transform:     rotate( 29deg ) skew( -35deg );
            // -o-transform:      rotate( 29deg ) skew( -35deg );
            // -webkit-transform: rotate( 29deg ) skew( -35deg );
            width: "20px",

            boxShadow: "2px -2px 2px 0 rgba( 178, 178, 178, .4 )",
            right: "-9px",
        },
    },
    text: {
        color: "white",

    },
    name: {

        textAlign: "right",
        marginRight: "75px",
    },
    largeAvater: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    }

}));

const ToChatBubble = ({ displayName, imageUrl,  message }) => {
    const classes = useStyles();

    return (
        <Grid container
            className={classes.root}
            direction="column"
            justify="center"
            alignItems="flex-end"
            spacing={3}>
            <Grid item xs={12}>
                <div className={classes.bubbleContainer} key={1}>
                    <div className={classes.bubble}>
                        <Typography variant="h5" className={classes.text}>
                            {message.message}
                        </Typography>
                    </div>
                    <Avatar alt="Remy Sharp" src={imageUrl} className={classes.largeAvater} >   {message.name.charAt(0).toUpperCase()}</Avatar>
                </div>
                <Typography variant="body1" className={classes.name}>
                    {message.time}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default ToChatBubble;
