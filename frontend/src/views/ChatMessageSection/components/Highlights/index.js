import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { TabPanel } from '../../../../shared/Components'
import { AuthContext } from '../../../../shared/Authentication'
import axios from 'axios'
import List from '@material-ui/core/List';
import RecoHighlight from './component/RecoHighlight'
import Moment from 'moment';

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

const Highlights = ({ value, index, currentMember, otherParticipant }) => {
    const classes = useStyles();
    const { oAuthToken } = useContext(AuthContext);

    const [highlightlist, setHighLightList] = useState([])
    const [error, setError] = useState();

    useEffect(() => {
        if (oAuthToken && otherParticipant.id) {
            axios.get(`${process.env.REACT_APP_OVER_URL}/api/v5/newsfeed-events`,
                {
                    params: {
                        userId: otherParticipant.id,
                        useUserIds: true,
                    },
                    headers: {
                        //'Content-Type': 'application/json',
                        'Authorization': `Bearer ${oAuthToken}`,
                    }
                }).then(function (response) {
                    if (response.data && response.data.items) {
                        console.log(response.data.items)
                        setHighLightList(response.data.items)
                    } else {
                        setError("Unexpected error occurred while trying to load recognitions. Please reload the page and try again.")
                    }
                }).catch(function (error) {
                    setError("Unexpected error occurred while trying to load recognitions. Please reload the page and try again.")
                });
        }
    }, [otherParticipant]);

    return (
        <TabPanel value={value} index={index} className={classes.root}>
            <div className={classes.body} elevation={2} >

                <List >
                    {highlightlist.map((item, index) => {
                        if (item.eventType === "recognition" && item.creator.id != otherParticipant.id) {
                            return <RecoHighlight key={index} reco={item} />
                    }
                })}
                </List>

            </div>
        </TabPanel>
    );
}

export default Highlights;