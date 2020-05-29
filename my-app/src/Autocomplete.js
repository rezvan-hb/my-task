import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import CircularProgress  from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'space-around',
    },
    progress: {
        margin: '200px 500px',
    },
    list: {
        margin: '20px 50px',
    },
    text:{
        width: '250px',
    }
});

class Autocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredData: null,
            isLoading: false,
        };

        this.keywordRef = React.createRef(null);
        this.numberOfResultsRef = React.createRef(15);
    }

    static defaultNumber = 15;

    updateState = (params) => {
        const newState = Object.assign({}, this.state, params); 
        this.setState(newState);
    }

    cleanValue = (value) => {
        if (value && value.toString().trim()) {
          return value.toString().trim();
        }
        return null;
    };

    resetDefault = (value) => {
        if (this.cleanValue(value) != null) {
            return  value;
        } 
        return Autocomplete.defaultNumber;
    }

    handleClick = (keyword, numberOfResults) => () => {
        const { value } = keyword.current;
        const KEYWORD = this.cleanValue(value);

        const { value: v } =  numberOfResults.current;
        const RESULTSNUMBER = this.resetDefault(v);

        console.log(KEYWORD, RESULTSNUMBER)
        if (KEYWORD != null) {
            this.updateState({ isLoading: true });
            
            const url = "https://www.googleapis.com/books/v1/volumes?country=US&projection="+
            "lite&printType=books&key=AIzaSyD6SlU9JUr7Z-3SOOy0TfZTJtqv_EEqfZY&q=intitle:" + 
            `${KEYWORD}&startIndex=0&maxResults=${RESULTSNUMBER}`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => this.updateState({ filteredData:data, isLoading: false }))
        } else {
            this.updateState({ filteredData:null, isLoading: false });
        }
    }

    render() {
        const { classes } = this.props; 
        const { isLoading, filteredData} = this.state;

        return (
            <React.Fragment className={classes.root}>
                <div className = {classes.container} >
                    <TextField
                        className={classes.text} 
                        label="کلمه مورد نظر خود را جستجو کنید" 
                        variant="outlined"
                        inputRef={this.keywordRef} 
                    />
                    <TextField
                        className={classes.text} 
                        label="تعداد" 
                        variant="outlined"
                        defaultValue={Autocomplete.defaultNumber}
                        inputRef={this.numberOfResultsRef} 
                    />
                    <Button 
                        variant='contained' 
                        color='primary' 
                        size='medium'
                        onClick = {this.handleClick(this.keywordRef ,this.numberOfResultsRef)}
                    >
                        search...
                    </Button>
                </div>
                {isLoading && <CircularProgress className={classes.progress}/> }
                {!isLoading && filteredData && filteredData.items &&
                    <List component="nav" className={classes.list}>
                        { filteredData.items.map(item => (
                            <ListItem button>
                                <ListItemText 
                                    primary={item.volumeInfo.title} 
                                    secondary={item.volumeInfo.authors ? item.volumeInfo.authors : null}
                                />
                            </ListItem>
                        ))}
                    </List>
                }               
            </React.Fragment>
        )
    }
}

export default withStyles(styles, { name: 'Autocomplete' })(Autocomplete);