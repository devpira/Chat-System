import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { TabPanel } from '../../../../shared/Components'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: "flex",
        flexDirection: "column",
        padding: 0,
        height: "100%",
    },
    body: {
        flex: 1,
        height: "100%",
        width: '100%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        overflowY: "auto",
        scrollbarColor: theme.palette.primary.main,
        scrollbarWidth: "1px",
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            outline: '1px solid slategrey'
        }
    }
}));

const MentorShip = ({ value, index, currentMember, otherParticipant }) => {
    const classes = useStyles();

    return (
        <TabPanel value={value} index={index} className={classes.root}>
            <div className={classes.body} elevation={2} >
                <Typography variant="h2" component="h2" className={classes.emptyText} >
                    It's a Surpise 😉 <br></br> Coming Next Hackathon!
                    </Typography>
            </div>
        </TabPanel>
    );
}

export default MentorShip;