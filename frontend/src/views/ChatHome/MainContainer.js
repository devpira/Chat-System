import React from "react";
import { makeStyles } from '@material-ui/styles';
import { useNode } from "@craftjs/core";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: "100%",
        display: "flex",
        // paddingTop: theme.spacing(4),
        padding: theme.spacing(5),
        // boxShadow: "9px 0px 20px",
        backgroundColor: "#f4f7fa",
    },
}));

const MainContainer = ({ children }) => {
    const { connectors: { connect, drag } } = useNode();

    const classes = useStyles();
    return (
        <div ref={ref => connect(drag(ref))} className={classes.root}>
            {children}
        </div>
    )
}

MainContainer.craft = {
    displayName: 'MainContainer',
    rules: {
        canDrag: () => true,
    },
}

export default MainContainer;