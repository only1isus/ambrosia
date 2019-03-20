import React from "react";
import {withStyles, Typography, Grid, Input, Button,} from "@material-ui/core";
import Link from '@material-ui/core/Link';
import { green } from "@material-ui/core/colors";
// import MaskedInput from 'react-text-mask';
import Verify from "./partials/Verify";
import Auth from "./partials/Authenticate";
const shortid = require('shortid');

const styles = theme => ({
    root: {
        top: "50%",
        position: "absolute", 
        transform: `translateY(-50%)`,
    },
    registerRoot: {
        marginTop: theme.spacing.unit * 0,
        margin: theme.spacing.unit * 4,
    },
    registerBackDrop: {
        width: "100vw",
        height: "100vh",
        backgroundColor: green[500],
    },
    imageBackDrop: {
        height: "100vh",
        width: "100%",
        maskRepeat: "no-repeat",
        maskPosition: "center", 
        backgroundSize: "contain, cover",
        maskImage: "url(/assets/images/sprout.svg)",
        backgroundColor: green[600],
        maskSize: "55%",
    },
    typography: {
        paddingLeft: theme.spacing.unit,
        marginTop: "-25px",
    },
    input: {
        height: theme.spacing.unit* 6,
        opacity: 0.7,
        fontSize: "1em",
        fontWeight: 400,
        color: green[900],
        resize: "none",
        border: "solid 1px transparent",
        borderRadius: "50px 50px 50px 50px",
        backgroundColor: green[200],
    },
    inputPadding: {
        paddingLeft: theme.spacing.unit * 3
    },
    button: {
        height: theme.spacing.unit* 6,
        border: "solid 1px transparent",
        borderRadius: "50px 50px 50px 50px",
        color: green[200],
    },
    link: {
        color: green[200],
    },
    positionCkeck: {
        zIndex: 10,
        position: "relative",
        minHeight: "10px",
        top: "-38px",
        left: "88%",
    }
})


class Register extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.Verify = this.Verify.bind(this)
        this.state = {
            verified: true,
            phoneNumber: "",
            username: "",
            password1: "",
            password2: "",
            email: "",
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        }, ()=> {
            this.Verify()
        })
    }

    handleSubmit = () =>{
        let registerInfo = {
            "email": this.state.email,
            "password": this.state.password1,
            "name": this.state.username,
            "phone": this.state.phoneNumber,
            "key": shortid.generate()
        }
        Auth.register(registerInfo)     
    }

    Verify() {
        if (this.state.password2 === this.state.password1) {
            this.setState({
                verified: true
            })
        } else {
            this.setState({
                verified: false
            })
        }
    }

    render(){
        const { classes } = this.props;
        return ( 
            <div >
                <div className={classes.registerBackDrop}>
                    <Grid container justify="center">
                        <Grid item md={7} xs={12} className={classes.imageBackDrop} >
                            {/* <img className={classes.imageBackdrop} src="/assets/images/leaves.svg" /> */}
                        </Grid>
                    </Grid>
                </div>
                <Grid container  justify={"center"}>
                    <Grid item md={3} xs={12} className={classes.root}>
                        <div  >
                        {/* <Typography className={classes.header} align="center" variant={"h6"}>
                            Create an account
                        </Typography> */}
                            <div className={classes.registerRoot}>
                                <Grid container spacing={8}>
                                    <Grid item md={12} xs={12}>
                                        <Input 
                                            fullWidth
                                            classes={{input: classes.inputPadding}}
                                            disableUnderline
                                            className={classes.input}  
                                            value={this.state.username} 
                                            onChange={this.handleChange('username')}
                                            placeholder={"Name"} 
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <Input 
                                            fullWidth
                                            classes={{input: classes.inputPadding}}
                                            disableUnderline
                                            className={classes.input} 
                                            value={this.state.email} 
                                            placeholder={"Email"} 
                                            onChange={this.handleChange('email')}                                             
                                        />
                                    </Grid>
                                    {/* <Grid item md={12} xs={12}>
                                        <Input
                                            className={classes.input}
                                            value={this.state.phoneNumber}
                                            onChange={this.handleChange('phoneNumber')}
                                            // inputComponent={TextMaskCustom}
                                        />
                                    </Grid> */}
                                    <Grid item md={12} xs={12}>
                                        <Input 
                                            fullWidth
                                            classes={{input: classes.inputPadding}}
                                            disableUnderline
                                            className={classes.input} 
                                            value={this.state.password1}
                                            type="password" 
                                            placeholder={"Password"} 
                                            onChange={this.handleChange('password1')}                                             
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <Input 
                                            fullWidth
                                            classes={{input: classes.inputPadding}}
                                            disableUnderline
                                            className={classes.input} 
                                            value={this.state.password2} 
                                            type="password"
                                            placeholder={"Verify password"} 
                                            onChange={this.handleChange('password2')}
                                        />
                                        <Verify classes={{icon: classes.positionCkeck}} same={this.state.verified} />
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <Link className={classes.link}  href={"./login"} >
                                            <Typography className={classes.typography} color="inherit">
                                                Already have an account?
                                            </Typography>
                                        </Link>
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <Button fullWidth className={classes.button} onClick={this.handleSubmit} size="large"  >
                                            Register
                                        </Button>  
                                    </Grid>
                                </Grid>
                            </div>
                        </div>                        
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Register);