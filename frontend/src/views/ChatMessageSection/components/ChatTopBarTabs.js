import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';

const ChatTopBarTabs = withStyles((theme) => ({
    root: {
        //borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: theme.palette.primary.main,
    },
}))(Tabs); 

export default ChatTopBarTabs;