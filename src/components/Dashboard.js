import React, { Component } from 'react';
import './Dashboard.scss';
import Temperature from "./Temperature";
import {Grid, Button, FormControl, InputLabel, MenuItem, IconButton, Select} from '@material-ui/core';
import Calendar from 'react-calendar';
import CloseIcon from '@material-ui/icons/Close';
import Spinner from "./partials/Spinner"
import PageHeader from './partials/PageHeader';
import { withStyles, Modal} from '@material-ui/core';
import Appbar from './partials/Appbar';
import auth from "./partials/Authenticate";
import DashboardCard from './partials/DashboardCard';
import { red } from '@material-ui/core/colors';
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
  calendar: {
    border: "none !important",
    backgroundColor: red[400],
  },
  modalRoot: {
      // maxHeight: "100%",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%) !important`,
      position: 'absolute',
      boxShadow: theme.shadows[10],
      padding: theme.spacing.unit * 2,
      outline: 'none',
      [theme.breakpoints.down('sm')]: {
          fontSize: "1.5em",    
          width: "90%",
      },
    //   [theme.breakpoints.down('md')]: {
    //     fontSize: "1.5em",    
    //     width: "60%",
    // },
  },
  modalFooter: {
    padding: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 4,

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit * 2,
    },
  }
});

class Dashboard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.handleclick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeFilterParams = this.handleChangeFilterParams.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)

    this.state = {
      isOpen: false,
      isLoaded: false,
      chartData: [],
      defaultSensor: "Temperature",
      defaultSensorDataTime: 72,
      expanded: false,
      date: [new Date(), new Date()],
      maxDate: new Date(),
      startTimeEndTime: [],
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
    let startTime = dateFormat(this.state.date[0].getTime(), "mmm dd yy")
    let endTime = dateFormat(this.state.date[1].getTime(), "mmm dd yy")
    let st = this.state.date[0]
    if (endTime === startTime) {
      let past24hrs = new Date()
      past24hrs.setDate(past24hrs.getDate() - 1)
      st = past24hrs
    }
    instance.get(`api/sensor/?sensortype=${this.state.defaultSensor}&starttime=${Math.floor(st.getTime()/1000)}&endtime=${Math.floor(this.state.date[1].getTime()/1000)}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
        "Token": token
      }
    })
    .then((response) => {
      let formattedData = [];
      console.log(response.data.length)
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


  handleDateChange = value => {
    this.setState({
      date: value
    })
    console.log(value)
  }

  componentDidMount = () => {
    let past24hrs = new Date()
    past24hrs.setDate(past24hrs.getDate() - 1)
    console.log(past24hrs.getTime())
    let token = ls.getItem("token")
    let instance = auth.connection
    instance.get(`api/sensor/?sensortype=${this.state.defaultSensor}&starttime=${Math.floor(past24hrs.getTime()/1000)}&endtime=${Math.floor(this.state.date[1].getTime()/1000)}`, {
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
          let d = dateFormat(date, "mmm dd yy h:MM TT")
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
    this.setState({
      isLoaded: false,
    })
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
          <Modal
            open={this.state.isOpen}
          >
            <div className={classes.modalRoot}>
              <Grid container direction="row" justify="flex-end">
                <Grid item className={classes.closeButtonContainer} >
                  <IconButton className={classes.close} color="inherit" aria-label="Menu" onClick={this.handleClick("done")}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item md={12}>
                <Calendar
                  maxDate={this.state.maxDate}
                  calendarType="US"                    
                  className={["react-calender"]}
                  selectRange
                  onChange={this.handleDateChange}
                  value={this.state.date}
                />
              </Grid>
              <Grid container alignItems="center" justify="center">
                <Grid item md={12} xs={12} className={classes.modalFooter}>
                  <Grid container justify="center" >
                    <Grid item md={6} xs={6}>
                      <Grid container justify="flex-start">
                        {/* <form align='center' autoComplete="off"> */}
                          <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="selectSensor">Sensor Type</InputLabel>
                            <Select

                              className={classes.select}
                              value={this.state.defaultSensor}
                              onChange={this.handleChange}
                              // onChange={this.handleChangeFilterParams}
                              inputProps={{
                                name: 'defaultSensor',
                                id: 'selectSensor',
                              }}
                            >
                              <MenuItem value="">
                                <em></em>
                              </MenuItem>
                              <MenuItem value={"Temperature"}>Temperature</MenuItem>
                              <MenuItem value={"Humidity"}>Humidity</MenuItem>
                              <MenuItem value={"WaterLevel"}>Water Level</MenuItem>
                              <MenuItem value={"EC"}>EC</MenuItem>
                            </Select>
                          </FormControl>
                        {/* </form> */}
                      </Grid>
                    </Grid>
                    <Grid item md={6} xs={6}>
                      <Grid container justify="flex-end" >
                        <Grid >
                          <Button className={classes.button} classes={{root: classes.buttonColor}} onClick={this.handleChangeFilterParams} >Update</Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Modal>  
          <Grid item xs={12} >
            <Grid container justify="center" alignContent="center">
                <Temperature title={this.state.defaultSensor} data={this.state.chartData}/>
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
