
import React, { Component } from 'react';
import './App.css';
import Parent from './parent' 

class App extends Component {

  handleItem = (itemValue) => {
    this.setState({item: itemValue});
    console.log('item ::::', itemValue)
  }

  render() {
    
    return (
      <div className="App">
        <Parent handleItem={this.handleItem}/>
      </div>
    );
  }
}

export default App;