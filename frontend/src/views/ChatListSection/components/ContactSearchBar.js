import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

import useAutocomplete from '@material-ui/lab/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import styled from 'styled-components';
import { AuthContext } from '../../../shared/Authentication'
import { ChatContext } from '../../../providers/ChatProvider'
import axios from 'axios'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


const Listbox = styled('ul')`
  width: 340px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 500px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(1.5),
        borderRadius: "35px",
        backgroundColor: "#F3F6FB",
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        height: "40px",
        width: "310px",
        paddingLeft: theme.spacing(1),
    },
    iconButton: {
        padding: 10,
    },

}));

const ContactSearchBar = () => {
    const classes = useStyles();

    const { oAuthToken } = useContext(AuthContext);
    const { createPreChat, currentMemberId } = useContext(ChatContext);

    const [error, setError] = useState();
    const [memberList, setMemberlist] = useState([]);

    const {
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        getClearProps,
    } = useAutocomplete({
        id: 'searchContacts',
        defaultValue: [],
        multiple: true,
        options: memberList,
        getOptionLabel: (option) => option.fullName,
    });

    const { value: inputValue } = getInputProps()
    const { onClick: clearValue } = getClearProps()

    useEffect(() => {
        if (inputValue) {
            axios.get(`${process.env.REACT_APP_OVER_URL}/api/v5/search`,
                {
                    params: {
                        q: inputValue,
                        excludedUserIds: currentMemberId
                    },
                    headers: {
                        'Authorization': `Bearer ${oAuthToken}`,
                    }
                }).then(function (response) {
                    if (response.data && response.data.members) {
                        setMemberlist(response.data.members.filter((item) => (item.displayValues[3].value)))
                    } else {
                        setError("Unexpected error occurred while trying to load celebrations. Please reload the page and try again.")
                    }
                }).catch(function (error) {
                    setError("Unexpected error occurred while trying to load celebrations. Please reload the page and try again.")
                });
        }
    }, [inputValue])

    return (
        <Paper elevation={1} className={classes.root}>
            <NoSsr>
                <div>
                    <InputBase
                        {...getInputProps()}
                        className={classes.input}
                        placeholder="Type To Search for Contacts"
                        inputProps={{ 'aria-label': 'search contacts' }}
                        onMouseDown={() => { setMemberlist([]); clearValue(); }}
                    />

                    {groupedOptions.length > 0 ? (
                        <Listbox {...getListboxProps()}>
                            {groupedOptions.map((option, index) => (
                                <ListItem
                                    {...getOptionProps({ option, index })}
                                    onMouseDown={() => createPreChat(option)}
                                >
                                    <ListItemAvatar>
                                        <Avatar key={index} alt={option.fullName} src={option.profileImageUrl} className={classes.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={<strong>{option.fullName}</strong>} secondary={option.displayValues && option.displayValues.length > 3 ? option.displayValues[3].value : ""} />
                                </ListItem>
                            ))}
                        </Listbox>
                    ) : null}
                </div>
            </NoSsr>
        </Paper >
    );
}

export default ContactSearchBar;