import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';

const ChatTopBarTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 0,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(1),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: theme.palette.primary.main,
            opacity: 1,
        },
        '&$selected': {
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: theme.palette.primary.main,
        },
    },
    selected: {},
}))((props) => <Tab {...props} />);

export default ChatTopBarTab;