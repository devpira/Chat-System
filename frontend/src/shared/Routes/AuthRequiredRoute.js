import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Authentication";
import { SocketProvider } from "../SocketIo";
import { CurrentMemberProvider } from '../CurrentMember';
import { AppBar } from '../AppBar'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    content: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: theme.spacing(7.5),
    }
}));

const AuthRequiredRoute = ({ layout: Layout, component: Component, ...rest }) => {
    const classes = useStyles();
    const { oAuthToken } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={
                routeProps =>
                    !!oAuthToken ? (
                        <SocketProvider>
                            <CurrentMemberProvider>
                                <div className={classes.root}>
                                    <AppBar />
                                    <div className={classes.content}>
                                        <Component {...routeProps} />
                                    </div>

                                </div>
                            </CurrentMemberProvider>
                        </SocketProvider>
                    ) :
                        (<Redirect to={"/"} />)
            }
        />
    );
};

export default AuthRequiredRoute;