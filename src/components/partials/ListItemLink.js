import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 200,
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
  },
  changeSpace: {
    paddingLeft: 0
  }
});

class ListItemLink extends React.Component {
    renderLink = itemProps => <Link to={this.props.to} {...itemProps} />;
    render() {

      const { icon, primary, secondary, classes} = this.props;
      return (
        <li className={classes.root}>
          <ListItem  button component={this.renderLink}>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText classes={{inset: classes.changeSpace}} inset primary={primary} secondary={secondary} />
          </ListItem>
        </li>
      );
    }
}

export default withStyles(styles) (ListItemLink);