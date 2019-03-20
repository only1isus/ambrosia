import React from "react"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import {Menu, Receipt, Person, Share, BarChart} from '@material-ui/icons';
import {Toolbar, Button, withStyles} from '@material-ui/core';
import ListItemLink from './ListItemLink';
import auth from './Authenticate';
import Drawer from '@material-ui/core/Drawer';
import { green } from "@material-ui/core/colors";

var routes = [
    {id: 1, name: "Dashboard", route: "/dashboard", icon: <BarChart/>},
    {id: 2, name: "Logs", route: "/log", icon: <Receipt/>},
    {id: 3, name: "User Info", route: "/user", icon: <Person/>},
    {id: 4, name: "Shared data", route: "/shared", icon: <Share/>},
]

const styles = theme => ({
    root: {
        // position: "fixed",
    },
    appbar: {
        position: "fixed",
        width: 100,
    },
    changeSpaces: {
        padding: 0,
    },
    button: {
        right: theme.spacing.unit * 2,
        position: "absolute"
    },
    appbarchange: {
        marginBottom: theme.spacing.unit * 5,
        backgroundColor: green[600], 
        position: "fixed",
        minHeight: theme.spacing.unit * 12,
        zIndex: 100,
    }
})

class Appbar extends React.Component {
    constructor(props){
        super(props);
    
        this.toggleDrawer = this.toggleDrawer.bind(this)
        this.state = {
            left: false,
        }
    }
    
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };
    render(){
        const {classes, loggedIn } = this.props
        const sideList = (
            <div>
              <List component="nav">
                {routes.map((key) => (
                  <div key={key.id}>
                      <ListItem classes={{root: classes.changeSpaces}} button>
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        {/* <ListItemText href={key.route} primary={key.name} /> */}
                        <ListItemLink to={key.route} icon={key.icon}  primary={key.name}/>
                      </ListItem>
                    
                  </div>
                ))}
              </List>
            </div>
        );
        if (loggedIn) {
            return (
                <div className={classes.root}>
                    <AppBar classes={{root: classes.appbarchange}} position={"relative"} elevation={0}>
                        <Toolbar>
                            <IconButton  color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
                                <Menu/>
                            </IconButton>
                            < Button className={classes.button} color="inherit" onClick={auth.logout}>Logout</ Button>
                        </Toolbar>
                    </AppBar>
                    <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                        <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                        >
                        {sideList}
                        </div>
                    </Drawer>    
                </div>
            );
        } else {
            return (
                <div className={classes.root}>
                    {/* <AppBar classes={{root: classes.appbarchange}} position={"relative"} elevation={0}  className={classes.appbar}>
                        <Toolbar>
                            < Button color="inherit" className={classes.button} href={"./login"}>Login</ Button>
                        </Toolbar>
                    </AppBar> */}
                </div>
            );
        }
        
    }
}

export default withStyles(styles)(Appbar);