import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../Redux/Store'
import { FIND_POKEMONS} from '../constants'

class Search extends Component{

    constructor(props){
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState(({
            value: event.target.value
        }));

        const filtered = this.props.pokemons.filter(pokm =>{
            return pokm.name.indexOf(event.target.value.toLowerCase()) !== -1;
        });

        let isInput = false;
        
        if(event.target.value !== ''){
            isInput = true;
        }
            else{
                isInput = false;
            }
       
        store.dispatch((dispatch) => {
            dispatch({
                type: FIND_POKEMONS,
                payload: filtered,
                isInput: isInput
            })
        })
    }

    render(){
        return( 
            <div className = ' search-div '>
                <div>
            <input
            className = 'search-input'
            type = 'text'
            placeholder = 'Enter name of pokemon...'
            value = { this.state.value }
            onChange = { this.handleChange }
            />
            </div>
            <div className = ' search-div-icon '>
            <img src='search.png' height='18px' />
            </div>
            </div>
        )
    }
}

export default connect(
    state=>({
        pokemons: state.PokemonList.pokemon
    })
)(Search)