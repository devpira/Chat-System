import queryString from 'query-string';
import buildUrl from 'build-url';
import React, { useEffect, useState, createContext } from 'react';
import LoadingScreen from '../LoadingScreen'
import axios from 'axios';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [oAuthToken, setOAuthToken] = useState(null);
    const [error, setError] = useState();

    const getAccessToken = () => {
        const authParams = {
            response_type: 'code',
            client_id: process.env.REACT_APP_CLIENT_ID,
            scope: ['read'],
            state: Math.random(),
        }

        const loginUrl = buildUrl(process.env.REACT_APP_OVER_URL, {
            path: '/oauth/v2/openIDConnectClient/authorize',
            queryParams: authParams,
        });

        window.location.replace(loginUrl);

    }

    useEffect(() => {
        const token = localStorage.getItem('oAuthToken');
        if (token) {
            setOAuthToken(token);
            localStorage.removeItem('oAuthToken')
            return;
        }

        const {
            code
        } = queryString.parse(window.location.search);

        if (!code) {
            getAccessToken()
        }

        if (code) {
            const authParams = {
                grant_type: 'authorization_code',
                code: code,
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_SECRET,
            }

            axios.post(`${process.env.REACT_APP_OVER_URL}/oauth/v2/openIDConnectClient/token`, authParams, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                if (response.data && response.data.access_token) {
                    localStorage.setItem('oAuthToken', response.data.access_token)
                    window.location.replace('/');
                } else {
                    setError("Unexpected error occurred while trying to authenticate. Please reload the page and try again.")
                }
            }).catch(function (error) {
                setError("Unexpected error occurred while trying to authenticate. Please reload the page and try again.")
            });
            return
        }
    }, []);

    if (error) {
        return error;
    }

    if (!oAuthToken) {
        return <LoadingScreen />
    }

    return (
        <AuthContext.Provider
            value={{
                oAuthToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};