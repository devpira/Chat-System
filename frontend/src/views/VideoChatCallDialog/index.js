import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        height: "400px",
        width: "450px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    avatar: {
        marginTop: theme.spacing(2),
        width: "160px",
        height: "160px",
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    name: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
    },
    buttonRow: {
        display: "flex",
    },
    callButton: {
        borderRadius: "200px",
        width: "170px",
        height: "45px",
        marginRight: theme.spacing(2),
    },
    closeButton: {
        borderRadius: "200px",
        width: "170px",
        height: "45px",
        marginLeft: theme.spacing(2),
        backgroundColor: "#c3c4c6",
    },
    endCallButton: {
        borderRadius: "200px",
        width: "170px",
        height: "45px",
        marginLeft: theme.spacing(2),
        backgroundColor: "#FF0000",
        '&:hover': {
            backgroundColor: "#591420",
            color: '#FFF'
        }
    },
    callStartingProgress: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
    },
}));

const VideoChatCallDialog = ({ open, endCallingUser, callingMember, callUser, isCallIncoming, declineCall, answerCall }) => {
    const classes = useStyles();
    const [startCall, setStartCall] = useState(false);

    const handleClose = () => {
        endCallingUser();
    };

    const onStartCall = () => {
        setStartCall(true);
        callUser(callingMember.id)
    }
    console.log("isCallIncoming", isCallIncoming)
    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open}>
            <div className={classes.root} >
                <Typography variant="h2" className={classes.title}>
                    {isCallIncoming ? "Incoming Video Call" : "Video Call"}
                </Typography>
                {(startCall || isCallIncoming) && <div className={classes.callStartingProgress}> <LinearProgress /> </div>}
                <Avatar src={callingMember.imageUrl} className={classes.avatar}>
                    <PersonIcon style={{ fontSize: 80 }} />
                </Avatar>
                <Typography variant="h4" className={classes.name}>
                    {callingMember.name}
                </Typography>
                {isCallIncoming ?
                    <div className={classes.buttonRow}>
                        <Button variant="contained" color="primary" disableElevation className={classes.callButton} onClick={answerCall}>
                            <strong>Answer</strong>
                        </Button>
                        <Button variant="contained" disableElevation className={classes.closeButton} onClick={declineCall}>
                            <strong>Decline</strong>
                        </Button>
                    </div>
                    :
                    <div className={classes.buttonRow}>
                        {startCall ?
                            <Button variant="contained" color="primary" disableElevation className={classes.endCallButton} onClick={() => { setStartCall(false); handleClose(); }}>
                                <strong>End Call</strong>
                            </Button>
                            :
                            <>
                                <Button variant="contained" color="primary" disableElevation className={classes.callButton} onClick={onStartCall}>
                                    <strong>Call</strong>
                                </Button>
                                <Button variant="contained" disableElevation className={classes.closeButton} onClick={handleClose}>
                                    <strong>Close</strong>
                                </Button>
                            </>
                        }
                    </div>
                }
            </div>
        </Dialog>
    );
}

export default VideoChatCallDialog;