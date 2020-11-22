import React, { useState, useRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import { TabPanel } from '../../../../shared/Components'
import { Tree } from 'antd';
import Typography from '@material-ui/core/Typography'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});



const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: "flex",
        flexDirection: "column",
        padding: 0,
        height: "100%",
    },
    body: {
        flex: 1,
        height: "100%",
        width: '100%',
        display: "flex",
        flexDirection: "column",
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
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
        paddingTop: theme.spacing(5),
    },
    checklist: {
        // marginLeft: theme.spacing(3),
        // marginRight: theme.spacing(3),
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingBottom: theme.spacing(3)
    },
    createTopicButton: {
        marginBottom: theme.spacing(4),
        borderRadius: "20px"
    },
    tree: {

    },
    listItem: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    icon: {
        marginRight: theme.spacing(1),
    },
    dialog: {
        
    },
    dialogTitle: {
        margin: theme.spacing(2),
    }
}));

const OneOnOneView = ({ value, index, currentMember, otherParticipant }) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [topics, setTopics] = useState([])
    const [topic, setTopic] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const treeData = [
        {
            title: <Typography variant="h4" component="h2" className={classes.emptyText} >
                <strong>Discuss:</strong>
            </Typography>,
            key: '0-0',
            // icon: <SmileOutlined />,
            children: [
                {
                    title: <div className={classes.listItem}>
                        <CheckCircleOutlineIcon className={classes.icon} />
                        <Typography variant="h5" component="h2" className={classes.emptyText} >
                            Vacation Request
                    </Typography></div>,
                    key: '0-0-0',
                    //  icon: <MehOutlined />,
                },
                {
                    title: <div className={classes.listItem}>
                        <CheckCircleOutlineIcon className={classes.icon} />
                        <Typography variant="h5" component="h2" className={classes.emptyText} >
                            Current progress on goals
                  </Typography></div>,
                    key: '0-0-1',
                    // icon: ({ selected }) => (selected ? <FrownFilled /> : <FrownOutlined />),
                },
            ],
        },
        {
            title:
                <Typography variant="h4" component="h2" className={classes.emptyText} >
                    <strong>Wins:</strong>
                </Typography>,
            key: '0-1',
            // icon: <SmileOutlined />,
            children: [
                {
                    title:
                        <div className={classes.listItem}>
                            <CheckCircleOutlineIcon className={classes.icon} />
                            <Typography variant="h5" component="h2" className={classes.emptyText} >
                                Client approval process
              </Typography></div>,

                    key: '0-1-1',
                    //icon: <MehOutlined />,
                },
                // {
                //     title: 'Current progress on goals',
                //     key: '0-0-1',
                //     // icon: ({ selected }) => (selected ? <FrownFilled /> : <FrownOutlined />),
                // },
            ],
        },
        {
            title: <Typography variant="h4" component="h2" className={classes.emptyText} >
                <strong>Blockers:</strong>
            </Typography>,
            key: '0-2',
            // icon: <SmileOutlined />,
            children: [
                {
                    title: <div className={classes.listItem}>
                        <CheckCircleOutlineIcon className={classes.icon} /><Typography variant="h5" component="h2" className={classes.emptyText} >
                            Design team offsite feedback
              </Typography></div>,

                    key: '0-2-1',
                    //icon: <MehOutlined />,
                },
                // {
                //     title: 'Current progress on goals',
                //     key: '0-0-1',
                //     // icon: ({ selected }) => (selected ? <FrownFilled /> : <FrownOutlined />),
                // },
            ],
        },
        {
            title: <Typography variant="h4" component="h2" className={classes.emptyText} >
                <strong>Follow-up:</strong>
            </Typography>,
            key: '0-3',
            // icon: <SmileOutlined />,
            children: [
                {
                    title: <div className={classes.listItem}>
                        <CheckCircleOutlineIcon className={classes.icon} /> <Typography variant="h5" component="h2" className={classes.emptyText} >
                            Sign up for mentorship program
              </Typography></div>,

                    key: '0-3-1',
                    //icon: <MehOutlined />,
                },
                // {
                //     title: 'Current progress on goals',
                //     key: '0-0-1',
                //     // icon: ({ selected }) => (selected ? <FrownFilled /> : <FrownOutlined />),
                // },
            ],
        },
    ];

    return (
        <TabPanel value={value} index={index} className={classes.root}>
            <div className={classes.body} elevation={2} >
                <Paper className={classes.checklist} elevation={2} >
                    <Button
                        disableElevation
                        color="primary"
                        variant="contained"
                        onClick={handleClickOpen}
                        className={classes.createTopicButton}
                        startIcon={<AddIcon />}
                    >Create Topic</Button>
                    <Tree
                        showIcon
                        className={classes.tree}
                        defaultExpandAll
                        //defaultSelectedKeys={['0-0-0']}
                        // switcherIcon={<DownOutlined />}
                        treeData={treeData}
                    />
                </Paper>
            </div>
            <Dialog onClose={handleClose} className={classes.dialog}  aria-labelledby="customized-dialog-title" open={open}>
                {/* <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <strong>Create Topic</strong>
                </DialogTitle> */}
                <Typography variant="h3" component="h2" className={classes.dialogTitle} >
                    <strong>Create Topic</strong>
                </Typography>
                <DialogContent dividers>
                    <TextField id="outlined-basic" label="Topic" variant="outlined" />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Save changes
          </Button>
                </DialogActions>
            </Dialog>
        </TabPanel>
    );
}

export default OneOnOneView;