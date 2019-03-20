import React from 'react';
import PropTypes from 'prop-types';
import {Grid, IconButton, withStyles,Typography, Tooltip} from '@material-ui/core';
import FilterList from "@material-ui/icons/FilterList"
import { green } from '@material-ui/core/colors';

const styles = theme =>({
    header: {
        width: "100%",
        margin: 0,
        padding: 0,
        position: "fixed",
        top: theme.spacing.unit * 8,
        left: 0,
        zIndex: 100,
        backgroundColor: "#ffffff",
        borderRadius: `20px 20px 0px 0px`, 
        border: `1px solid transparent`,  
    },
    font: {
        fontFamily: 'Raleway, sans-serif !important',
    },
    filter: {
        color: green[600],
    },
    typography: {
        padding: theme.spacing.unit,
    }    
})


class PageHeader extends React.Component {
    render() {
        const {classes, hideFilter, title} = this.props
        if (hideFilter === false) {
        return (
            <div className={classes.header} >
                <Grid container justify="center">
                    <Grid item md={8} lg={6} xs={12}>
                        <Grid container direction="row">
                            <Grid item md={6} xs={6}>
                                <Typography variant="subheading" classes={{subheading: classes.font}} className={classes.typography}>
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid item md={6} xs={6}>
                                <Grid container justify="flex-end">
                                    {/* <Grid item> */}
                                        <IconButton color={"inherit"} classes={{root: classes.filter}} onClick={this.props.onClick} >
                                            <Tooltip title="Filter">
                                                <FilterList />
                                            </Tooltip>
                                        </IconButton>
                                    {/* </Grid> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )} else {
            return (
                <div className={classes.header} >
                    <Grid container justify="center">
                        <Grid item md={6} xs={12}>
                            <Grid container direction="row">
                                <Grid item md={6} xs={6}>
                                    <Typography variant="subheading" classes={{subheading: classes.font}} className={classes.typography}>
                                        {title}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            )
        }
    }
}


PageHeader.PropTypes = {
    title: PropTypes.string,
    hideFilter: PropTypes.bool,
    onClick: PropTypes.func,
}

PageHeader.defaultProps = {
    hideFilter: false

}

export default withStyles(styles) (PageHeader);
