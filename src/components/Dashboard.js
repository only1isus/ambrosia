import React, { Component } from 'react';
import './Dashboard.scss';
import Temperature from "./Temperature";
import Grid from '@material-ui/core/Grid';
import Spinner from "./partials/Spinner"
import PageHeader from './partials/PageHeader';
import { withStyles} from '@material-ui/core';
import Appbar from './partials/Appbar';
import auth from "./partials/Authenticate";
import DashboardCard from './partials/DashboardCard';
var ls = require('localStorage')
var dateFormat = require('dateformat');

const styles = theme => ({
  root: {
    fontFamily: 'Raleway, sans-serif',
    display: 'flex',
    flexDirection: 'column',  
  },
  card: {
    maxWidth: "100%",
  },
  font: {
    fontFamily: 'Raleway, sans-serif !important',
  },
  main: {
    marginTop: theme.spacing.unit * 10,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit * 12
    },
    // [theme.breakpoints.between('lg', 'xl')]: {
    //   // marginTop: theme.spacing.unit * 12,
    //   width: "67vw"
    // },
  },
  actions: {
    display: 'flex',
  },
});

class Dashboard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.handleclick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeFilterParams = this.handleChangeFilterParams.bind(this)

    this.state = {
      isOpen: false,
      isLoaded: false,
      chartData: [],
      defaultSensor: "Temperature",
      defaultSensorDataTime: 72,
      expanded: false
    };
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleChangeFilterParams = () => {
    this.setState({isLoaded: false})
    let token = ls.getItem("token")
    let instance = auth.connection
    instance.get(`api/sensor/?sensortype=${this.state.defaultSensor}&timespan=${this.state.defaultSensorDataTime}`,{
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
        "Token": token
      }
    })
    .then((response) => {
      let formattedData = [];
      for (let i = 0; i < response.data.length; i++) {
        const element = response.data[i];
        var date = new Date(element.time * 1000)
        var d = dateFormat(date, "mmm dd yy h:MM TT")
        formattedData.push({"time": d, "value": element.value})
      }
      this.setState({ chartData: formattedData, isLoaded: true});
    })
    .catch((error) => {
      document.location.href='/login'
      console.log(error);
    });
  }

  componentDidMount = () => {
    let token = ls.getItem("token")
    let instance = auth.connection
    instance.get(`api/sensor/?sensortype=${this.state.defaultSensor}&timespan=${this.state.defaultSensorDataTime}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
        "Token": token
      }
    })
    .then((response) => {
      if (this._isMounted === true){
        let formattedData = [];
        for (let i = 0; i < response.data.length; i++) {
          const element = response.data[i];
          var date = new Date(element.time * 1000)
          var d = dateFormat(date, "mmm dd yy h:MM TT")
          formattedData.push({"time": d, "value": element.value})
        }
        this.setState({ chartData: formattedData, isLoaded: true});
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentWillMount = ()=>{
    this._isMounted = true;
    this.setState({isLoaded: false})
  }
  render() {
    // find a way to use "useMediaQuery" to correct layout at 1920px
    const { classes } = this.props;
    return (
      <div  className={classes.root}>
        <Appbar loggedIn={auth.check()} />
        <Grid container className={classes.main} >
          <Spinner isLoaded={this.state.isLoaded } />
          <PageHeader title="Dashboard" onClick={this.handleClick("open")} />    
          <Grid item xs={12} >
            <Grid container justify="center" alignContent="center">
                <Temperature data={this.state.chartData}/>
            </Grid>
          </Grid>
          <Grid item md={12} xs={12}>
            <Grid container justify="center" alignContent="center">
              <Grid item md={8} lg={6} xs={12}>
                <Grid container direction="row" >
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={3} >
                    <DashboardCard image="/assets/images/drop.svg" value="80%" tooltipTitle="water level" />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={3} >
                    <DashboardCard image="/assets/images/ph.svg" value="7.3" tooltipTitle="pH level"/>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={3} >
                    <DashboardCard image="/assets/images/vegetables.svg" value="Lettuce" tooltipTitle="crop type" />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={3} >
                    <DashboardCard image="/assets/images/seeding.svg" value="Jan 1, 19" tooltipTitle="planted date" />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={3} >
                    <DashboardCard image="/assets/images/harvest.svg" value="Feb 4, 19" tooltipTitle="harvest date" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles) (Dashboard);
