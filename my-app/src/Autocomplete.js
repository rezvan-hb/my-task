import React, { useEffect }  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { getFetch } from './actions';

import { 
    getOriginalDataOfUsers as getUsers,
    getOriginalDataOfPhotos as getPhotosUrl
} from './selectors';

import Header from './Header';

import CircularProgress  from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
  root: {
    margin: '20px',
  },
  container:{
    margin: '20px',
  },
  progress: {
    margin: '20% 50%',
  },
  item: {
    width: '20%',
    height: '10%',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  paper: {
    display: 'flex',
    padding: '20px',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: '0.85rem',
    [theme.breakpoints.down('xs')]: {
        fontSize: '1rem',
      },
  },
});

function Autocomplete(props) {
    const { classes, setData, isLoading, users, photosUrl } = props;

    useEffect(() => {
        setData()
    },[0]);

  return (
    <div className={classes.root}>
        <Header />
            {isLoading && <CircularProgress className={classes.progress} />}
            {!isLoading && users && photosUrl &&
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    xs={12}
                    spacing={5}
                    className={classes.container}
                >
                    {users.map((user, index) => (
                        <Grid item className={classes.item} xs={12} sm={6} md={4} key={1}>
                            <Paper className={classes.paper}>
                                <Avatar className={classes.avatar} src={photosUrl[index]}/>
                            
                                <Typography className={classes.text}>
                                    {user.username}<br />{user.email}<br />{user.address.city}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            }
    </div>
  );
}

Autocomplete.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    isLoadong: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        address: PropTypes.object.isRequired,
    })),
    photosUrl: PropTypes.arrayOf(PropTypes.string)
};

Autocomplete.defaultProps = {
    users: null,
    photosUrl: null
};

const mapStateToProps = (state) => ({
    isLoading: state.isLoading,
    users: getUsers(state),
    photosUrl: getPhotosUrl(state)
})

const mapDispatchToProps = (dispatch) => ({
    setData: () => dispatch(getFetch())
})

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles, { name: 'Autocomplete' })(Autocomplete)
);