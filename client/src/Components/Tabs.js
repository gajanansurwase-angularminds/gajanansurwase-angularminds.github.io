import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link,Router } from 'react-router-dom'

const useStyles = makeStyles({
    roots: {
        flexGrow: 1,

    },
    tab: {
        fontSize: 12,
        color: "#5f6368",
        textTransform: "capitalize",
        height: 10,
        fontWeight: "600",
        fontFamily: 'Googls Sans,Roboto,Arial,sans-serif'
    },
    tabs: {
        height: 10
    }
})

function Centertabs() {

    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Tabs
                className={classes.tabs}
                textColor="primary"
                indicatorColor="primary"
                centered
            >
                <a href="/GoogleFrom"><Tab className={classes.tab} label="Questions"></Tab></a>

                <a href="/GoogleQues"><Tab className={classes.tab} label="Responses"> </Tab></a>
            </Tabs>
        </Paper>
    );

}

export default Centertabs;