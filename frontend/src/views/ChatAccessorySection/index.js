import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper, Typography } from '@material-ui/core'
import { AntTabs, AntTab } from '../../shared/Components'
import RecoSection from './RecoSection'
import AnnoucementSection from './AnnoucementSection'
import CelebrationSection from './CelebrationSection'

import { useNode } from "@craftjs/core";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: "420px",
        display: "flex",
        flexDirection: "column",
      //  boxShadow: "9px 0px 20px",
        zIndex: 1,
        overflowY: "auto",
    },
    tabHolder: {
        backgroundColor: theme.palette.background.paper,
        width: "100%"
    },
    content: {
        height: '100%',
        width: "100%",
        display: "flex",
        flexDirection: "column",
    }

}));

const ChatRecoSection = () => {
    const classes = useStyles();

    const [value, setValue] = useState(0);
    const { connectors: { connect, drag } } = useNode();
    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper ref={ref => connect(drag(ref))} className={classes.root} elevation={2}>
            <div className={classes.tabHolder}>
                <AntTabs value={value} onChange={handleChange} aria-label="chat accessory tabs">
                    <AntTab label="Recognitions" />
                    <AntTab label="Announcement" />
                    <AntTab label="Celebration" />
                </AntTabs>
            </div>
            <div className={classes.content}>
                <RecoSection value={value} index={0} />
                <AnnoucementSection value={value} index={1} />
                <CelebrationSection value={value} index={2} />
            </div>
        </Paper>
    );
}

ChatRecoSection.craft = {
    displayName: 'ChatRecoSection',
    rules: {
        canDrag: () => true,
    },
}

export default ChatRecoSection
