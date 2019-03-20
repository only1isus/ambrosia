import React, { Component, Fragment } from 'react';
import {Grid, ListItemText,withStyles, ListItem, List, Modal, FormControl, 
    FormGroup, FormControlLabel, Checkbox, Button} from '@material-ui/core';
import Appbar from "./partials/Appbar";
import auth from "./partials/Authenticate";
import { green} from "@material-ui/core/colors";
import Spinner from "./partials/Spinner"
import PageHeader from './partials/PageHeader';
var ls = require('localStorage')
var dateFormat = require('dateformat');
let token = ls.getItem("token")

const styles = theme => ({
    root: {
        postion: "relative",
        display: 'flex',
        flexDirection: 'column',
        
    },
    main: {
        backgroundColor: "#ffffff",
        padding: theme.spacing.unit,
    },
    modalRoot: {
        maxHeight: "100%",
        width: 300,
        backgroundColor: theme.palette.background.paper,
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) !important`,
        position: 'absolute',
        boxShadow: theme.shadows[10],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        [theme.breakpoints.down('sm')]: {
            fontSize: "1.5em",    
            width: "60%",
        },
    },
    button: {
        left: "50%",
        transform: 'translateX(-50%)'
    },
    listPadding: {
        paddingTop: theme.spacing.unit * 14
    },
    font: {
        fontFamily: 'Raleway, sans-serif !important',
    },
    buttonColor: {
        '&:hover' : {
            backgroundColor: green[100],
        }
    },
    selectColor: {
        color: green[600],
    },
})

class Logs extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.handleclick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.updateState = this.updateState.bind(this)
        this.formatTime = this.formatTime.bind(this)
        this.filterLogs = this.filterLogs.bind(this)

        this.state = {
            options: [
                {id: '1', name: "termination", value: false},
                {id: '2', name: "control", value: true},
                {id: '3', name: "all", value: false},
            ], 
            filterParam: "",
            isOpen: false,
            logs: [],
            filteredLogs: []
        }
    }

    handleClick = name => event =>{
        if (name === "done"){
            this.setState({
                isOpen: false,
            })
        }
        if (name === "open") {
            this.setState({
                isOpen: true
            })
        }
    }

    handleChange = name => event => {
        this.updateState(name, event.target.value)
        this.filterLogs(name)
    }
    
    updateState= (name, val) => {
        for (let i = 0; i < this.state.options.length; i++) {
            const option = this.state.options[i];
            option.value = false
            if (option.name === name) {
                this.state.options[i].value = !this.state.options[i].value
            }
        }
    }

    formatTime = unixtime => {
        var date = new Date(unixtime * 1000)
        var d = dateFormat(date, "mmm dd yy h:MM TT")
        return d
    }

    filterLogs = (option) => {
        const data = this.state.logs
        var d = []
        if (option === "all") {
            this.setState({
                filteredLogs: this.state.logs
            })  
        } else {
            for (let i = 0; i < data.length; i++) {
                const log = data[i];
                if (log.type === option) {
                    d.push(log)
                }
            }
            this.setState({
                filteredLogs: d
            })
        }
    }

    componentWillMount = ()=>{
        this._isMounted = true;
        this.setState({isLoaded: false})
    }
    
    componentDidMount = () => {
        this._isMounted = true; 
        let instance = auth.connection
        instance.get('api/logs/?timespan=0', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Token': token
            }
        })
        .then((response) => {
            if (this._isMounted === true) {
                this.setState({ logs: response.data });
                this.filterLogs("control")
                this.setState({isLoaded: true})
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }


    render() {
    let {filteredLogs, options} = this.state
    const {classes} = this.props
    return (
        <div className={classes.root}>                
            <Appbar name={"Log"} loggedIn={auth.check()} />
            
            <Grid container justify="center" className={classes.main}>
                <Spinner isLoaded={this.state.isLoaded } />
                <PageHeader title="Logs" onClick={this.handleClick("open")} />    
                <Grid item md={6} xs={12}>
                    <Modal 
                        open={this.state.isOpen}
                        // onClose={this.handleclick("close")}
                        >
                        <div className={classes.modalRoot}>
                            <div>
                                <FormControl>
                                    <Fragment>
                                        {options.map(({id, name, value}) => (
                                            <FormGroup key={id}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox className={classes.selectColor} color={"default"} checked={(value) ? true : false} onChange={this.handleChange(name)} />
                                                    }
                                                    label={name.charAt(0).toUpperCase() + name.substr(1)}
                                                />
                                            </FormGroup>
                                        ))}
                                        </Fragment>
                                </FormControl>
                            </div>
                            <Button className={classes.button} classes={{root: classes.buttonColor}} onClick={this.handleClick("done")} >Done</Button>
                        </div>
                    </Modal>
                    <List classes={{padding: classes.listPadding}} >
                        {/* <ListItem className={classes.filter}>
                            <IconButton onClick={this.handleclick("open")}>
                                <FilterList />
                            </IconButton>
                        </ListItem> */}
                        {filteredLogs.map(({type, time, message }) => (
                            <Fragment key={time}>
                                <ListItem button classes={{button: classes.buttonColor}}>
                                    <ListItemText classes={{primary: classes.font, secondary: classes.font}} primary={message} secondary={`${type} - ${this.formatTime(time)}`} />
                                </ListItem>
                            </Fragment>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </div>
        );
    }
}
export default withStyles(styles)(Logs);
