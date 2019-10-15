import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";
import './App.css';
import closeIcon from './closeIcon.png'

class Autocomplete extends Component {
    constructor(props) {
    super(props);
    this.state = {
        filtered:[],
    };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          filtered: nextProps.items
        });
    }
        
    handleClickOutside = () => {
        var hideMe = document.getElementById('hideMe');
        if (hideMe){
            hideMe.style.display = 'none';
        }
    }
    
    handleChange(e) {
        let totalCountry = [];
        let searchCountry = [];
        console.log('items', this.props.items) 
        if (e.target.value !== "") {
            totalCountry = this.props.items;  
            searchCountry = totalCountry.filter(item => {
            const lc = item.toLowerCase();
            const filter = e.target.value.toLowerCase();
            return lc.startsWith(filter);
        })
        } else {
          searchCountry = [];
        }
        console.log('searchCountry', searchCountry)
        this.setState({
            filtered: searchCountry
        });
    }
    getValue(e){
        var dataId = e.currentTarget.dataset.id 
        var countryName = this.state.filtered[dataId]
        this.setState({filtered:[]});
        document.getElementById("search").value = countryName;
    }

    removeItem(item) {
        var filtered = this.state.filtered;
        console.log('filtered.length', filtered.length)
        if (filtered.length !== 0){
            filtered.some((el,i) => {
                if (el === item) {
                    filtered.splice(i,1);
                    return true
                }
            });
            this.setState({
                filtered
            });
        } 
    }
    
    render() {
        return (
            <div className="container" onClick={ () => this.handleClickOutside}>
                <input className='searchInput' placeholder="Search country..." id="search" type="search" onChange={(event) => this.handleChange(event)} /><br />
                {this.state.filtered.length !==0 && 
                    <div className="countrySearch" id='hideMe'>
                        <ul>
                            {this.state.filtered.map((item ,index) => (
                                <li key={item} > 
                                <div data-id={index} onClick={(e) => this.getValue(e)}>
                                    {item} 
                                </div>
                                <div onClick = {() => this.removeItem(item)}>
                                    <span > <img style={{width:'10px'}} src={closeIcon} /> </span>
                                </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                }   
            </div>
        )
    }
}
export default onClickOutside(Autocomplete);