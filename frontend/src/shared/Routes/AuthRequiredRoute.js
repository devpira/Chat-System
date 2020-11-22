import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Authentication";
import { SocketProvider } from "../SocketIo";
import { CurrentMemberProvider } from '../CurrentMember';

const AuthRequiredRoute = ({ layout: Layout, component: Component, ...rest }) => {
    const { oAuthToken } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={
                routeProps =>
                    !!oAuthToken ? (
                        <SocketProvider>
                            <CurrentMemberProvider>
                                <Component {...routeProps} />
                            </CurrentMemberProvider>
                        </SocketProvider>
                    ) :
                        (<Redirect to={"/"} />)
            }
        />
    );
};

export default AuthRequiredRoute;