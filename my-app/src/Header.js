import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

import blue from '@material-ui/core/colors/blue';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    backgroundColor: blue[600],
    height: '60px',
  },
  item: {
    textAlign: 'center',
    margin: '12px',
    color: '#FFFFFF',
    fontWeight: 'bold',
    lineHeight: '2rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      marginRight: '4px',
      marginLeft: '4px',
    },
  },
  title: {
    fontSize: '1.4rem',
  },
  text: {
    fontSize: '0.95rem',
  },
});

function Header(props) {
  const { classes } = props;

  const titleClassName = classNames(classes.item, classes.title);
  const textClassName = classNames(classes.item, classes.text);

  return (
    <AppBar color="default" position="relative" classes={{ root: classes.root }}>
      <Grid id="header" item xs={12} container direction='row-reverse' spacing={0}>
        <Grid item xs={6} sm={5} md={5}>
          <Typography variant="h2" className={titleClassName}>
            محراب گشت
          </Typography>
        </Grid>

        <Grid item md={1}>
          <Typography variant="h6" className={textClassName}>
            متن نمونه
          </Typography>
        </Grid>

        <Grid item md={1}>
          <Typography variant="h6" className={textClassName}>
            متن نمونه
          </Typography>
        </Grid>

        <Grid item md={1}>
          <Typography variant="h6" className={textClassName}>
            متن نمونه
          </Typography>
        </Grid>

        <Grid item md={1}>
          <Typography variant="h6" className={textClassName}>
            متن نمونه
          </Typography>
        </Grid>

        <Grid item md={1}>
          <Typography variant="h6" className={textClassName}>
            متن نمونه
          </Typography>
        </Grid>

      </Grid>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};


export default withStyles(styles, { name: 'Header' })(Header);