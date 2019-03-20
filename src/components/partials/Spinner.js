import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const styles = theme =>({
    root: {
        height: "100vh",
        width: "100%",
        zIndex: 1,
        backgroundColor: "#ffffff", 
        position: "fixed",
        top: 0,
        left: 0,
    }, 
    progress: {
    },
    spinner: {
        alignContent: "center",
        color: green[800],
        left: "50vw",
        top: "50vh",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        marginTop: -12,
        marginLeft: -12,
    }
})


class Spinner extends React.Component {
    render() {
        const {isLoaded, classes} = this.props
        if (isLoaded !== true){
            return(
                <Grid container alignContent={"center"} spacing={0}>
                    <Grid item md={12} xs={12} className={classes.root}>
                        <div className={classes.spinner} >
                            <CircularProgress color="inherit" size={24} className={classes.progress} />
                        </div>
                    </Grid> 
                </Grid>
            );
        } else { 
            return(
                <div>

                </div>
            );
        }
    }
}

export default withStyles(styles) (Spinner);