import React from "react";
import {withStyles, Typography, Grid, Input, Button,} from "@material-ui/core";
import Link from '@material-ui/core/Link';
import auth from "./partials/Authenticate";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { green } from "@material-ui/core/colors";

const styles = theme => ({
    root: {
        top: "50%",
        position: "absolute",
        transform: `translateY(-50%)`,
    },
    loginRoot: {
        margin: theme.spacing.unit * 4,
    },
    loginBackDrop: {
        width: "100vw",
        height: "100vh",
        backgroundColor: green[500],
    },
    imageBackdrop: {
        height: "100vh",
        width: "100%",
        maskRepeat: "no-repeat",
        maskPosition: "center", 
        backgroundSize: "contain, cover",
        maskImage: "url(/assets/images/sprout.svg)",
        backgroundColor: green[600],
        maskSize: "55%",
    },
    header: {
        padding: theme.spacing.unit * 4,
    },
    typography: {
        paddingLeft: theme.spacing.unit,
    },
    font: {
        fontFamily: 'Raleway, sans-serif !important',
    },
    input: {
        fontFamily: 'Raleway, sans-serif !important',
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
        fontFamily: 'Raleway, sans-serif !important',
        height: theme.spacing.unit* 6,
        border: "solid 1px transparent",
        borderRadius: "50px 50px 50px 50px",
        color: green[200],
    },
    link: {
        fontFamily: 'Raleway, sans-serif !important',
        color: green[200],
    }
})


class Login extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            password: "",
            email: "",
            loggedIn: false,
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleSubmit = () =>{
        this.setState({
            loggedIn: false
        })
        auth.authenticate({email: this.state.email, password: this.state.password})
    }

    render(){
        const { classes } = this.props;
        return (
            <div >
                <div className={classes.loginBackDrop}>
                    <Grid container justify="center">
                        <Grid item md={7} xs={12} className={classes.imageBackdrop} >
                            {/* <img className={classes.imageBackdrop} src="/assets/images/leaves.svg" /> */}
                        </Grid>
                    </Grid>
                </div>
                <Grid container  justify={"center"}>
                    <ToastContainer  clas/>
                    <Grid item md={3} sm={6} xs={12} className={classes.root}>
                        <div>
                        {/* <Typography className={classes.header} align="center" variant={"h6"}>
                            Login to account
                        </Typography> */}
                            <div className={classes.loginRoot}>
                                <Grid container spacing={8}  >
                                    <Grid item md={12} xs={12}>
                                        <Input
                                            fullWidth
                                            classes={{input: classes.inputPadding}}
                                            className={classes.input}
                                            value={this.state.email}
                                            placeholder={"Email"}
                                            disableUnderline
                                            onChange={this.handleChange('email')}
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <Input
                                            fullWidth
                                            classes={{input: classes.inputPadding}}
                                            className={classes.input}
                                            value={this.state.password}
                                            placeholder={"Password"}
                                            disableUnderline
                                            type="password"
                                            onChange={this.handleChange('password')}
                                        />
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <Link color="inherit" className={classes.link} href={"./register"} >
                                            <Typography classes={{root: classes.font}} className={classes.typography} color="inherit" >
                                                Don't have an account?
                                            </Typography>
                                        </Link>
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <Button fullWidth disabled={this.state.loggedIn} className={classes.button} onClick={this.handleSubmit} size="large" >
                                                login
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

export default withStyles(styles)(Login);
