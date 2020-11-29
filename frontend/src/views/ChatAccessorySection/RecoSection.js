import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios'
import { AuthContext } from '../../shared/Authentication'
import List from '@material-ui/core/List';
import RecoCard from './components/RecoCard'
import { TabPanel } from '../../shared/Components'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flex: 1,
        backgroundColor: theme.palette.background.paper,
        overflowY: "auto",
        scrollbarColor: theme.palette.primary.main,
        scrollbarWidth: "1px",
        '&::-webkit-scrollbar': {
            width: '0.8em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            outline: '1px solid slategrey'
        },
        padding: 0
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.primary.main
    },
    logo: {
        height: "50px",
        width: "200px",
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },

}));

const RecoSection = ({ value, index }) => {
    const classes = useStyles();
    const { oAuthToken } = useContext(AuthContext);

    const [recoList, setRecoList] = useState([])
    const [error, setError] = useState();

    useEffect(() => {
        if (oAuthToken) {
            console.log(oAuthToken)
            axios.get(`${process.env.REACT_APP_OVER_URL}/api/v5/newsfeed-events`,
                {
                    headers: {
                        //'Content-Type': 'application/json',
                        'Authorization': `Bearer ${oAuthToken}`,
                    }
                }).then(function (response) {
                    if (response.data && response.data.items) {
                        console.log(response.data)
                        setRecoList(response.data.items)
                    } else {
                        setError("Unexpected error occurred while trying to load recognitions. Please reload the page and try again.")
                    }
                }).catch(function (error) {
                    setError("Unexpected error occurred while trying to load recognitions. Please reload the page and try again.")
                });
        }
    }, []);

    return (
        <TabPanel value={value} index={index} className={classes.root}>
            <List >
                {recoList.map((item, index) => {
                    return <RecoCard key={index} reco={item} />
                })}
            </List>
        </TabPanel>
    );
}

export default RecoSection