import React, { Component } from 'react';
import {withStyles, Typography, Modal, Button, Grid, Table, TableHead, TableCell, TableRow} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {green} from "@material-ui/core/colors";
var dateFormat = require('dateformat');
var QRCode = require('qrcode.react');

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        marginTop: theme.spacing.unit * 8,
        padding: theme.spacing.unit ,
    },
    paper: {
        // height: 370,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 350,
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) !important`,
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[10],
        padding: theme.spacing.unit * 2,
        outline: 'none',
    },
    input: {
        maxWidth: "100%",
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        left: "50%",
        transform: 'translateX(-50%)'
    },
    buttonColor: {
        color: green[600],
        '&:hover' : {
            backgroundColor: green[100],
        }
    },
    font: {
        fontFamily: 'Raleway, sans-serif !important',
    },
    typography: {
        padding: theme.spacing.uint
    },
    table:{
        backgroundColor: theme.palette.background.paper,
        marginBottom: theme.spacing.unit * 4,
        marginTop:  theme.spacing.unit,
    }
})

class UserInfo extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.formatTime = this.formatTime.bind(this)

        this.state = {
            open: false,
            isLoaded: false,
            port: "8001",
            host: "67.230.40.196",
        }
    }

    componentDidMount = () => {
        
    }

    componentWillMount = ()=>{
        this._isMounted = true;
        this.setState({isLoaded: false})
    }

    handleCreateUser = event => {
    }

    handleOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };
    formatTime = unixtime => {
        var date = new Date(unixtime * 1000)
        var d = dateFormat(date, "mmm dd yy h:MM TT")
        return d
    }

    render() {
    const {classes, info} = this.props;

    return (
        <div >
            <Typography variant="subtitle1" classes={{subtitle1: classes.font}} className={classes.typography}>
                Account Information
            </Typography>
            <div>
                <Table className={classes.table} classes={{root: classes.font}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>{info.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>{info.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Created on</TableCell>
                            <TableCell>{this.formatTime(this.props.info.createdAt)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Phone number</TableCell>
                            <TableCell>{info.phone}</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </div>                 
            <Typography variant="subtitle1" classes={{subtitle1: classes.font}} className={classes.typography}>
                Connection Information
            </Typography>
            <Modal 
                open={this.state.open}
                // onClose={this.handleClose}
                >

                <div  className={classes.paper}>
                    <Grid container alignItems="center" justify="space-evenly" direction="column" spacing={16}>
                            <Grid container direction="row" justify="flex-end">
                                <Grid item className={classes.closeButtonContainer} >
                                    <IconButton className={classes.close} color="inherit" aria-label="Menu" onClick={this.handleClose}>
                                        <CloseIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid container direction="row" justify="center">
                                <Grid item className={classes.formControl} >
                                    <Typography color="inherit" classes={{subheading: classes.font}} variant="subheading">
                                    {info.bucket}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item >
                                <div className={classes.qr}>
                                    <QRCode   
                                        value={info.bucket}
                                        size={250}
                                        bgColor={"#ffffff"}
                                        fgColor={"#000000"}
                                        level={"L"}
                                        includeMargin={false}
                                        renderAs={"svg"}
                                        />
                                </div>
                            </Grid>
                            <Grid item>
                                <div>
                                    Port: {this.state.port}
                                    Host: {this.state.host}
                                </div>
                            </Grid>
                    </Grid>
                </div>
            </Modal>
            <Typography classes={{root: classes.font}}>
                {/* This key is used to connect the Farm Control System to the database and by extension the web interface. Never share this key and please keep it safe. */}
                This key is used to connect the Farm Control System to the database and by extension the web interface. Neither the key, host address nor port should not be shared with others.
            </Typography>
            
            <Button className={classes.button} classes={{root: classes.buttonColor}} onClick={this.handleOpen} size="large" color="primary" >
                Show
            </Button>  
        </div>
    );}
}

export default withStyles(styles) (UserInfo);
