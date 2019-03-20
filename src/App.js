import React, { Component } from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import User from './components/User';
import Shared from './components/Shared';
import Logs from './components/Logs';
import Login from './components/Login';
import { withStyles } from '@material-ui/core/styles';
import Register from './components/Register';
import auth from './components/partials/Authenticate';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // width: "100vw",
  },
});

const Protected = ({component: Component, loggedIn, ...rest}) => {
  return (
    <Switch>
      <Route
        // {...rest}
        render={(props) => loggedIn === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
        }
      />
    </Switch>
  )
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
      <Switch>
        <Protected exact path='/dashboard' loggedIn={auth.check()} component={Dashboard}/>
        <Protected exact path='/log' loggedIn={auth.check()} component={Logs}/>
        <Protected exact path='/user' loggedIn={auth.check()} component={User}/>
        <Protected exact path='/shared' loggedIn={auth.check()} component={Shared}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <Protected exact path='*' loggedIn={auth.check()} component={Dashboard}/>
      </Switch>

      </div>
    );
  }
}

export default withStyles(styles)( App);
