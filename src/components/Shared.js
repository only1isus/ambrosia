import React, { Fragment } from "react"
import { withStyles, Grid, List, ListItem, ListItemText} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import Appbar from "./partials/Appbar";
import auth from "./partials/Authenticate";
import PageHeader from './partials/PageHeader';
const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',  
    },
    main: {
        marginTop: theme.spacing.unit * 14,
    },
    font: {
        fontFamily: 'Raleway, sans-serif !important',
    },
    buttonColor: {
        '&:hover' : {
            backgroundColor: green[100],
        }
    },
})

class Shared extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            open: false,
        }
    }
    handleClick = name => event =>{
        if (name === "open") {
            this.setState({
                isOpen: true
            })
        }
    }
    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <Appbar loggedIn={auth.check()} />
                <PageHeader title="Shared data" onClick={this.handleClick("open")} />  
                <Grid container justify={"center"} className={classes.main}>
                    <Grid item md={6} xs={12}>
                        <List>
                            <Fragment>
                                <ListItem button classes={{button: classes.buttonColor}}>
                                    <ListItemText classes={{primary: classes.font, secondary: classes.font}} primary={"Romaine lettuce"} secondary={"Sat Dec 12, 2018"}/>
                                </ListItem>
                            </Fragment>
                        </List>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Shared)