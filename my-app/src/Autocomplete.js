import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";
import './App.css';
import closeIcon from './closeIcon.png'

class Autocomplete extends Component {
    constructor(props) {
    super(props);
    this.state = {
        filtered:[],
        isOpen : false,
        list: this.props.items,
    };
    }

    // componentDidUpdate(nextstate){
    //     this.setState({
    //         filtered: nextstate.items
    //       },[]);
    // }

    toggle = () => this.setState(!this.state.isOpen);
    handleClickOutside = () => {
        // var hideMe = document.getElementById('hideMe');
        // if (hideMe){
        //     hideMe.style.display = 'none';
        // }
        this.setState({
            filtered:[],
            isOpen: false
        });
    }

    handleChange(e) {
        console.log('e.target.value:', e.target.value)
        let totalCountry = [];
        let searchCountry = [];
        console.log('items', this.state.list) 
        if (e.target.value !== "") {
            totalCountry = this.state.list;  
            searchCountry = totalCountry.filter(item => {
            const lc = item.toLowerCase();
            const filter = e.target.value.toLowerCase();
            return lc.startsWith(filter);
        })
        } else {
          searchCountry = this.state.list;
        }
        console.log('searchCountry', searchCountry)
        this.setState({
            filtered: searchCountry
        });
    }

    // add focus event
    handleFocus(e){
        this.handleChange(e)
    }
    
    getValue(e){
        var dataId = e.currentTarget.dataset.id 
        var itemName = this.state.filtered[dataId]
        this.setState({filtered:[]});
        document.getElementById("search").value = itemName;
        var item = {}
        item.district = 'tehran'
        item.religion = 'Islam'
        item.country = itemName
        this.props.onSelectItem(item);            
    }

    removeItem(item) {
        var newList = this.state.list;
        var newFilter = this.state.filtered;

        if (newList.length !== 0){
            newList.some((el,i) => {
                if (el === item) {
                    newList.splice(i,1);
                return true
                }
            });
            this.setState({list:newList})
        }

        if (newFilter.length !== 0){
            newFilter.some((el,i) => {
                if (el === item) {
                    newFilter.splice(i,1);
                return true
                }
            });
            this.setState({filtered:newFilter})
        }

    }
    
    render() {
        console.log('isOpen:::',this.state.isOpen)
        return (
            <div className="container" onClick= { () => this.handleClickOutside} >
                <input className='searchInput'
                    placeholder="Search country..." 
                    id="search" 
                    type="search" 
                    onChange={(event) => this.handleChange(event)} 
                    onFocus = {(e) => this.handleFocus(e)}
                    placeholder="Search..." 
                /><br />
                {this.state.filtered.length !==0 &&
                    <div className="countrySearch" >
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