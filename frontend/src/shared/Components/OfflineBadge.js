import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

export const OfflineBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#95a4a7',
        color: '#95a4a7',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },


}))(Badge);
