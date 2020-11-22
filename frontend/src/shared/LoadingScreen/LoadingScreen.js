import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid } from '@material-ui/core';

const useStyles = makeStyles((_) => ({
    root: {
        height: "75vh",
    },
}));

export default () => {
    const classes = useStyles();

    return (
        <Grid className={classes.root} container justify="center"
            alignItems="center">
            <CircularProgress />
        </Grid>
    );
}