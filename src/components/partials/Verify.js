import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Done, Error} from "@material-ui/icons"; 

const styles = theme =>({
    icon: {
        position: "absolute",
        zIndex: 1,
    }
})


class Verify extends React.Component {
    render() {
        const {same, classes} = this.props
        if (same === false){
            return(
                <Error className={classes.icon} />
            );
        } else { 
            return(
                <Done className={classes.icon} />
            );
        }
    }
}

export default withStyles(styles) (Verify);