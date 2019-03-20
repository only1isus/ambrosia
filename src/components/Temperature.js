import React, { Component } from 'react';
import {AreaChart, XAxis, Area, ReferenceLine , ResponsiveContainer, Tooltip, Legend} from 'recharts';
import {withStyles, Grid} from '@material-ui/core';

const styles = theme => ({
    chart: {
      height: 650,  
      width: "50%",
      [theme.breakpoints.down('sm')]: {
        height: 350,
        width: "100%",
      },
      [theme.breakpoints.up('md')]: {
        height: 450,
        width: "67vw",
      },
      [theme.breakpoints.up('lg')]: {
        width: "50vw",
      },
    },
    areaChart: {
        padding: 0,
        margin: 0,
    },
    chartContainer: {
        height: "100%"
    }
});

class Temperature extends Component {
    render() {
        const {classes} = this.props
        return (
        <Grid container className={classes.chart}>
            <ResponsiveContainer height="100%"  width="100%" >
                <AreaChart  className={classes.areaChart} data={this.props.data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="time" hide={true} />
                    {/* <YAxis /> */}
                    <Tooltip  />
                    <ReferenceLine y={30} label="" stroke="red"/>
                    <Legend   />
                    <Area type='monotone' name="Temperature" dataKey='value' color="#8aca8c" fill="#8aca8c" stroke='#8aca8c'  strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </Grid>
        
        );
    }
}

export default withStyles(styles) (Temperature);
