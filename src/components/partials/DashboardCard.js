import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Card, CardContent, Typography, CardMedia, Tooltip} from '@material-ui/core';
import { Grid } from '@material-ui/core';
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
    },
    images: {
      height: 60,
      width: 60,
      [theme.breakpoints.down('sm')]: {
        height: 80,
        width:  80,
      },
      [theme.breakpoints.up('sm')]: {
        height: 50,
        width:  50,
      },
      [theme.breakpoints.up('md')]: {
        height: 60,
        width:  60,
      },
      margin: theme.spacing.unit
    },
    cardDetails: {
      height: "100%",
      width: "100%",
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit * 2,
      },
    },
    removePadding: {
      padding: 0,
    },
    paper: {
      margin: 20,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    tooltip: {

    }
  });


class DashboardCard extends React.Component {
    render() {
        const {classes} = this.props
        return(
            <Card elevation={0} classes={{root: classes.font}} className={classes.card} square={true}>
                <CardContent >
                <Tooltip enterTouchDelay={100} leaveTouchDelay={750} className={classes.tooltip} title={this.props.tooltipTitle}>
                  <Grid container alignItems="center" alignContent="center">
                      <Grid item xs={3} md={4}>
                        <Grid container direction="column" alignContent="flex-start" alignItems="flex-start" justify="center"   className={classes.cardDetails}>
                          <Grid item xs={12} >
                              <CardMedia
                              image={this.props.image}
                              className={classes.images}
                              />
                          </Grid>                                
                        </Grid>
                      </Grid>
                      <Grid item xs={9} md={8}>
                        <Grid container direction="column" alignContent="flex-end" alignItems="flex-end" justify="center"   >
                          <Grid item >
                              <Typography variant="h6" classes={{h6: classes.font }}>
                                {this.props.value}
                              </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                  </Grid>
                </Tooltip>
              </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles) (DashboardCard);