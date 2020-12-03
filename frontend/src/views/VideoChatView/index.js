import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import CallEndIcon from '@material-ui/icons/CallEnd';
import Fab from '@material-ui/core/Fab';
import VideocamIcon from '@material-ui/icons/Videocam';
import MicIcon from '@material-ui/icons/Mic';
import { VideoChatContext } from '../../providers/VideoChatProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#000000"
    },
    appBar: {
        backgroundColor: "#000000"
    },
    videoContent: {
        paddingLeft: "25px",
        paddingRight: "25px",
        height: "60%",
        width: "100%",
    },
    videoItem: {
        padding: "20px",
    },
    videoOne: {
        width: "100%",
    },
    videoTwo: {
        width: "100%",
    },
    videoControls: {
        marginTop: "10%",
    },
    videoControlButton: {
        margin: "12px"
    },
    hangUpButton: {
        margin: "12px",
        backgroundColor: "#FF0000",
        '&:hover': {
            backgroundColor: "#591420",
            color: '#FFF'
        }
    }
}));

const VideoChatView = ({ open }) => {
    const videoConstraints = { audio: true, video: { width: 1000, height: 1080 } };

    const { callingMember, peerConnection, socket, callingStreamerId, endVideoCall, setCall } = useContext(VideoChatContext)

    const classes = useStyles();

    const [showVideo, setShowVideo] = useState(true);
    const [haveAudio, setHaveAudio] = useState(true);
    const [myStream, setMyStream] = useState()

    useEffect(() => {
        if (callingMember && peerConnection && socket) {

            navigator.mediaDevices
                .getUserMedia(videoConstraints)
                .then((mediaStream) => {
                    var video = document.getElementById("videoElement");
                    video.muted = true

                    video.srcObject = mediaStream;
                    video.onloadedmetadata = () => {
                        video.play();
                    };


                    peerConnection.on('call', call => {
                        call.answer(mediaStream)
                        const video2 = document.getElementById("videoElement2");
                        call.on('stream', userVideoStream => {
                            video2.srcObject = userVideoStream;
                            video2.onloadedmetadata = () => {
                                video2.play();
                            };
                        })
                    })

                    peerConnection.on('disconnected', call => {
                        endVideoCall(false)
                    })

                    setMyStream(mediaStream)
                })
                .catch((err) => {
                    console.log(err.name + ": " + err.message);
                });
        }
    }, [peerConnection, callingMember])

    useEffect(() => {
        if (myStream && callingStreamerId) {
            const call = peerConnection.call(callingStreamerId, myStream)
            const video2 = document.getElementById("videoElement2");
            video2.muted = true
            call.on('stream', userVideoStream => {
                video2.srcObject = userVideoStream;
                video2.onloadedmetadata = () => {
                    video2.play();
                };
            })
            call.on('close', () => {
                video2.remove()
            })
            setCall(call);
        }

    }, [callingStreamerId, myStream])

    return (
        <Dialog fullScreen onClose={endVideoCall} aria-labelledby="simple-dialog-title" open={open}>
            <div className={classes.root} >
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Button color="inherit">Achievers</Button>
                    </Toolbar>
                </AppBar>

                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="flex-start"
                    className={classes.videoContent}
                >
                    <Grid item xs={12} md={6} className={classes.videoItem}>
                        <video autoPlay={true} id="videoElement" className={classes.videoOne} ></video>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.videoItem}>
                        <video autoPlay={true} id="videoElement2" className={classes.videoTwo}></video>
                    </Grid>
                </Grid>
                <div className={classes.videoControls}>
                    <Fab color="primary" aria-label="video" className={classes.videoControlButton} onClick={() => setShowVideo(!showVideo)}>
                        <VideocamIcon />
                    </Fab>
                    <Fab color="primary" aria-label="audio" className={classes.videoControlButton} onClick={() => setHaveAudio(!haveAudio)}>
                        <MicIcon />
                    </Fab>
                    <Fab color="primary" aria-label="add" className={classes.hangUpButton} onClick={() => endVideoCall(false)}>
                        <CallEndIcon />
                    </Fab>
                </div>
            </div>
        </Dialog>
    );
}

export default VideoChatView;