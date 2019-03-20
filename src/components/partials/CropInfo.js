import React from 'react';
import {withStyles, Typography, Grid, Button, Input} from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  input: {
    width: "50%",
    maxHeight: "3em",
    fontSize: 16,
  },
  typography: {
    paddingBottom: theme.spacing.unit * 2
  }
});

function getSteps() {
  return ['Crop type', 'Maturity time', 'confirm'];
}

class CropInfo extends React.Component {
  state = {
    activeStep: 0,
    vegetable: undefined,
    timeToMature: undefined,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className={this.props.classes.stepperArea}>
              <div>
                <Typography className={this.props.classes.typography}> What vegetable are you growing this crop cycle?</Typography>
                <Input className={this.props.classes.input} placeholder={"Vagetable"} onChange={this.props.handleChange("vegetable")} value={this.state.vegetable} />
              </div>         
          </div>
        );
      case 1:
        return (
          <div className={this.props.classes.stepperArea}>
              <div>
                <Typography>What's its maturity time (number of days)?{this.state.vegetable}</Typography>
                <Input className={this.props.classes.input} placeholder={"Amount of days"} onChange={this.props.handleChange("timeToMature")} value={this.state.timeToMature} />
              </div>
          </div>
        );
      case 2:
        return `Please make sure the information entered is correct. This information will be displayed on the dashboard after the system is fully configured `;
      default:
        return 'Unknown step';
    }
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    return(
      <div>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Grid container justify={"center"}>
                  <Grid item md={12}>
                    {this.getStepContent(index)}
                    <Grid container justify="center" className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                          >
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography variant="h6">Almost done!</Typography>
            <Typography>If you're sure the infoirmation entered is correct click the Generate Key button otherwise click Reset .</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              reset
            </Button>
            <Button 
              variant="contained"
              color="primary" 
              onClick={this.props.update} 
              className={classes.button}>
              Add Information
            </Button>
          </Paper>
        )}
      </div>
    )} 
}

export default withStyles(styles)(CropInfo);
