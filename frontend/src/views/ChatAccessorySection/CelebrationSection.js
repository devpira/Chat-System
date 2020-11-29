import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios'
import { AuthContext } from '../../shared/Authentication'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Buttom from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { TabPanel } from '../../shared/Components'
import Moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flex: 1,
        backgroundColor: theme.palette.background.paper,
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
    avatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },

}));

const CelebrationSection = ({ value, index }) => {
    const classes = useStyles();
    const { oAuthToken } = useContext(AuthContext);

    const [celebrationList, setCelebrationList] = useState([])
    const [error, setError] = useState();

    useEffect(() => {
        if (oAuthToken) {
            axios.get(`${process.env.REACT_APP_OVER_URL}/api/v5/upcoming-celebrations`,
                {
                    params: {
                        startDate: Moment().format(),
                        endDate: Moment().add(3, 'months').format(),
                        //celebrationType:  "Birthday"
                        celebrationsWidget: true
                    },
                    headers: {
                        //'Content-Type': 'application/json',
                        'Authorization': `Bearer ${oAuthToken}`,
                    }
                }).then(function (response) {
                    if (response.data && response.data.items) {
                        console.log("celebrations: ", response.data)
                        setCelebrationList(response.data.items)
                    } else {
                        setError("Unexpected error occurred while trying to load celebrations. Please reload the page and try again.")
                    }
                }).catch(function (error) {
                    setError("Unexpected error occurred while trying to load celebrations. Please reload the page and try again.")
                });
        }
    }, []);

    return (
        <TabPanel value={value} index={index} className={classes.root}>
            <List >
                {celebrationList.map((item, index) => {
                    return <div key={index}>
                        <ListItem >
                            <ListItemAvatar>
                                <Avatar key={index} alt={item.user.name} src={item.user.profileImageUrl} className={classes.avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={<strong>{item.user.name}</strong>} secondary={`Celebrating ${item.numberOfYears} years on ${Moment(item.celebrationDate, "YYYY-MM-DD").format('LL')}!`} />
                            <ListItemSecondaryAction>
                                <Buttom
                                    size="small"
                                    onClick={() => window.open(item.cardLandingPageURL)}
                                >
                                    {item.isSignedByCurrentUser ? "View" : "Sign"}
                                </Buttom>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider /></div>
                })}
            </List>
        </TabPanel>
    );
}

export default CelebrationSection
