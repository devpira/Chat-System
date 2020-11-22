import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divder from '@material-ui/core/Divider'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import GroupIcon from '@material-ui/icons/Group';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';

import { CurrentMemberContext } from '../../shared/CurrentMember';

const useStyles = makeStyles(theme => ({

    divider: {
        backgroundColor: "#4E008E",
        width: "100%",
        height: "3px"
    },
    appBar: {
        zIndex: 0,
        backgroundColor: "#fff",
    },
    spoacer: {
        width: "14%",
    },
    content: {
        flexGrow: 1,
    },
    logo: {
        height: "30px",

    },
    buttonLeft: {
        marginRight: theme.spacing(3),
    },
    buttonRight: {
        marginRight: theme.spacing(1),
    }
}));

const AppBar = () => {
    const classes = useStyles();

    const { currentMember } = useContext(CurrentMemberContext);


    return (
        <MaterialAppBar elevation={0} className={classes.appBar} >

            <Toolbar  >
                <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <img src="https://www.achievers.com/wp-content/uploads/2020/10/Achievers_Logo_CMYK.png" className={classes.logo}></img>


                <div className={classes.spoacer}></div>
                <Button
                    color="primary"
                    size="large"
                    className={classes.buttonLeft}
                    startIcon={<GroupIcon />}
                    onClick={() => window.open(process.env.REACT_APP_OVER_URL + "/beta/", "_self")}
                >
                    <strong>Community</strong>
                </Button>
                <Button
                    color="primary"
                    size="large"
                    className={classes.buttonLeft}
                    startIcon={<PersonIcon />}
                    onClick={() => window.open(process.env.REACT_APP_OVER_URL + "/beta/me", "_self")}
                >
                    <strong>ME</strong>
                </Button>
                <Button
                    color="primary"
                    size="large"
                    className={classes.buttonLeft}
                    startIcon={<QuestionAnswerIcon />}
                >
                    <strong>CHAT</strong>
                </Button>
                <div className={classes.content}></div>
                <IconButton className={classes.menuButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
                {/* <Button
                    // color="primary"
                    size="large"
                    className={classes.buttonRight}
                    onClick={() => window.open(process.env.REACT_APP_OVER_URL + "/beta/me", "_self")}
                >
                    Admin
                </Button> */}
                <Button
                    // color="primary"
                    size="large"
                    className={classes.buttonRight}
                    onClick={() => window.open(process.env.REACT_APP_OVER_URL + "/beta/help", "_self")}
                >
                    Help
                </Button>
                <Button
                    //color="primary"
                    size="large"
                    className={classes.buttonRight}
                    onClick={() => window.open(process.env.REACT_APP_OVER_URL + "/beta/account_settings", "_self")}
                >
                    Account
                </Button>
                <Avatar src={currentMember ? currentMember.profileImageUrl : ""} className={classes.avatar}>
                    <PersonIcon />
                </Avatar>
            </Toolbar>
            <Divder className={classes.divider}></Divder>
        </MaterialAppBar>
    );
}

export default AppBar;