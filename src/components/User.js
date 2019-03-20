import React, { Component } from 'react';
import {withStyles, Grid, Button, Typography, Modal} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Appbar from "./partials/Appbar";
import auth from "./partials/Authenticate";
import {green} from "@material-ui/core/colors";
import Spinner from "./partials/Spinner"
import CropInfo from './partials/CropInfo';
import UserInfo from './partials/UserInfo';
import PageHeader from './partials/PageHeader';

var dateFormat = require('dateformat');
var ls = require('localStorage')

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        marginTop: theme.spacing.unit * 12,
        padding: theme.spacing.unit ,
        borderRadius: `15px 15px 0px 0px`, 
        border: `solid transparent`,
        backgroundColor: `#ffffff`
    },
    paper: {
        width: 700,
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) !important`,
        position: 'absolute',
        alignContent: "center",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[10],
        // padding: theme.spacing.unit * 4,
        outline: 'none',
        [theme.breakpoints.down('sm')]: {
            width: "90%",
            padding: theme.spacing.unit * 2,
        },
    },
    close: {
        position: "absolute",
        right: theme.spacing.unit * 2,
    },
    formControl:{
        padding: theme.spacing.unit,
    },
    input: {
        position: "fixed",
        left: "50%",
        top: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * [2],
        transform: `translate(-50%, -50%) !important`,
    },
    qr:{
        position: "absolute",
        left: "50%",
        transform: `translateX(-50%) !important`,        
    },
    button: {
        left: "50%",
        transform: 'translateX(-50%)'
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
    },
    buttonColor: {
        color: green[600],
        '&:hover' : {
            backgroundColor: green[100],
        }
    },
})

class User extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.formatTime = this.formatTime.bind(this)
        this.addinformation = this.addinformation.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.state = {
            userInfo: {
                email: "", 
                name: "",
                bucket: "",
                phone: "",
                createdAt: "",
            },
            isConfigured: true,
            farmDetails: {
                cropType: undefined, 
                maturityTime: undefined,
            },
            open: false,
            isLoaded: true,
            vegetable: "",
            timeToMature: "",
        }
    }

    componentDidMount = () => {
        let token = ls.getItem("token")
        let instance = auth.connection
        instance.get('userinfo', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                "Token": token
            }
        })
        .then(userresp => {
            if (this._isMounted === true) {
                this.setState({
                    userInfo: {
                        email: userresp.data.email,
                        name: userresp.data.name,
                        bucket: userresp.data.key,
                        createdAt: userresp.data.createdAt,
                        phone: userresp.data.phone,
                    },
                    isLoaded: true,
                });
            }
        })
        .catch((usererror) => {
          console.log(usererror);
        });
    }

    componentWillMount = ()=>{
        this._isMounted = true;
        this.setState({isLoaded: false})
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

    addinformation = ()=> {
        var data = {
          cropType: this.state.vegetable,
          maturity: this.state.timeToMature,
        }
    
        let token = ls.getItem("token")
        let instance = auth.connection
        
        instance.post("createBucket", data, {
          headers: {      
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
            "Token": token
          }
        })
        .then((response)=>{
          if (response.status === 200){
            this.setState({
                isConfigured: true
            })
          }
        }) 
        .catch((error)=>{
          console.log(error)
        })  
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    render() {
    const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Appbar loggedIn={auth.check()} />
                <Grid container justify={"center"} className={classes.main}>
                    <Spinner isLoaded={this.state.isLoaded } />
                    <PageHeader hideFilter={true} title="System information" />
                    <Grid item xs={12} md={6} >
                        <UserInfo info={this.state.userInfo} />

                        <Typography variant="subtitle1" classes={{subtitle1: classes.font}} className={classes.typography}>
                            Configure farm
                        </Typography>  
                        <Typography classes={{root: classes.font}}>
                            Please provide some basic information about the type of crop you will be planting. This information will be displayed on the dashboard
                            as well as any report generated. Note that the farm data should be updated every crop cycle if the information changes.
                        </Typography>
                        <Button className={classes.button} classes={{root: classes.buttonColor}} onClick={this.handleOpen} size="large">
                            Configure farm
                        </Button>
                        <Modal 
                            open={this.state.open}
                            >
                            <div className={classes.paper}>
                                <IconButton className={classes.close} color="inherit" aria-label="Menu" onClick={this.handleClose}>
                                    <CloseIcon />
                                </IconButton>
                                <CropInfo handleChange={this.handleChange}  />
                            </div>
                        </Modal>  
                    </Grid>
                </Grid> 
            </div>
        )}
}

export default withStyles(styles) (User);
