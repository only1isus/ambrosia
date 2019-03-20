import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 100,
  },
  select: {
    width: "80%"
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
  },
});


class FilterChart extends React.Component {

    render() {
        const {styles} = this.props
        return (
            <div className= {classes.root}>
                <Grid container spacing={24}>
                <Grid item md={2} xs={12}>    
                </Grid>
                <Grid item md={3} xs={6}>
                    <form className={"classes.root"} autoComplete="off">
                        <FormControl >
                        <InputLabel htmlFor="selectSensor">Sensor Type</InputLabel>
                        <Select
                            value={this.state.defaultSensor}
                            onChange={this.handleChange}
                            inputProps={{
                            name: 'defaultSensor',
                            id: 'selectSensor',
                            }}
                        >
                            <MenuItem value="">
                            <em></em>
                            </MenuItem>
                            <MenuItem value={"temperature"}>Temperature</MenuItem>
                            <MenuItem value={"humidity"}>Humidity</MenuItem>
                            <MenuItem value={"ph"}>pH</MenuItem>
                            <MenuItem value={"eC"}>EC</MenuItem>
                        </Select>
                        </FormControl>
                    </form>  
                </Grid>
                <Grid item md={3} xs={6}>
                    <form className={"classes.root"} autoComplete="off">
                    <FormControl >
                        <InputLabel htmlFor="selectSensorTime">Data timespan</InputLabel>
                        <Select
                        className={classes.select}
                        value={this.state.defaultSensorDataTime}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'defaultSensorDataTime',
                            id: 'selectSensorTime',
                        }}
                        >
                        <MenuItem value="">
                            <em></em>
                        </MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={18}>18</MenuItem>
                        <MenuItem value={24}>24</MenuItem>
                        <MenuItem value={36}>36</MenuItem>
                        <MenuItem value={48}>48</MenuItem>
                        </Select>
                    </FormControl>
                    </form>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Button onClick={this.handleChangeFilterParams} size="large" color="primary" className={"classes.margin"}>
                    Submit
                    </Button>  
                </Grid>
                </Grid>
            
            </div>
        )    
    }
}

export default withStyles(styles)(FilterChart);