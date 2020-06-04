import React, { Component } from 'react'
import PokemonCard from './PokemonCard'
import axios from 'axios'
import { connect } from 'react-redux'
import { ADD_POKEMONS, PAGINATION, TOTAL_COUNT_POKEMONS, CURRENT_PAGE, FILTER_POKEMONS } from '../constants'
import Filter from './Filter'
import Pagination from './Pagination'
import store from '../Redux/Store'

class PokemonList extends Component {

    constructor(props){
        super(props);
        this.filterTypes = this.filterTypes.bind(this);
        this.state = {
        find_pokemon_types: null,
        isFilter: true,
        count: null,
        types: [
            'fire','water','ice','dragon','fighting',
            'flying','grass','rock','ground','fairy',
            'poison','dark','ghost','electric',
            'steel','bug','normal','psychic'
        ]
    }
}

    filterTypes (event) {
        const pokemon_types = event.target;
        const { value } = pokemon_types; 
        let url = `https://pokeapi.co/api/v2/type/${value}/`;

        axios.get(url).then((resp) => {
            this.setState({
                find_pokemon_types: resp.data.pokemon,
                isFilter: false
            })
            /*store.dispatch((dispatch) => {
                console.log('NY VOT: ', resp.data.pokemon);
                dispatch({
                    type: FILTER_POKEMONS,
                    payload: resp.data.pokemon
                });
            })*/
        })
    }

    nextPage = (event) => {
        let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=15`;
        url = url.replace(/offset=\d+/, `offset=${(event * 15) - 15}`);

        store.dispatch((dispatch) => {
            axios.get(url)
            .then((res) => {
                dispatch({
                    type: PAGINATION,
                    payload: res.data['results']
                });
                dispatch({
                    type: CURRENT_PAGE,
                    payload: event
                })
            })
        })
    }
    
    async componentDidMount(){
        let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=15`;
        url = url.replace(/offset=\d+/, `offset=${(this.props.currentPage * 15) - 15}`);
        await axios.get(url)
        .then((res) => {
            store.dispatch((dispatch) => {
                dispatch({
                    type: ADD_POKEMONS,
                    payload: res.data['results']
                });
                dispatch({
                    type: TOTAL_COUNT_POKEMONS,
                    payload: res.data.count
                })
            })
        })
    }

    render(){        

        const { pokemons, filtered } = this.props;

        return(            
            <div className = 'wrapper'>  
                <Filter filterTypes = { this.filterTypes } types = { this.state.types } />
                <div>
                {this.state.isFilter ? (
                    <div>
                        {filtered.isInput ? (
                    <div>
                        {filtered.payload ? (
                            <div className='card' >
                                {filtered.payload.map(pokm => {
                                    return  <PokemonCard pokmname={pokm.name} url={ pokm.url } key={pokm.name} />
                                    
                                })}
                            
                            </div>
                            ) : (
                                <h1>Sorry, there is no such pokemon</h1>
                        )}
                            </div>
                    ) : (
                        <div>
                            {pokemons ? (
                                <div className='card' >
                                    {pokemons.map(pokm => {
                                       return  <PokemonCard pokmname={pokm.name} url={ pokm.url } key={pokm.name} />
                                    })}
                                </div>
                            ) : (
                                <h1>Loading pokemons...</h1>
                        )}
                    </div>
                )}
                    </div>
                ) : (
                    <div>
                       {this.state.find_pokemon_types ? (
                          <div className='card' >
                          {this.state.find_pokemon_types.map(pokm => {
                             return  <PokemonCard pokmname={pokm.pokemon.name} url={ pokm.pokemon.url } 
                                        key={pokm.pokemon.name} />
                          })}
                      </div>
                       ) : (
                            <div>
                                {filtered.isInput ? (
                            <div>
                                {filtered.payload ? (
                                <div className='card' >
                                    {filtered.payload.map(pokm => {
                                        return  <PokemonCard pokmname={pokm.name} url={ pokm.url } key={pokm.name} />
                                    })}
                                </div>
                                ) : (
                                    <h1>Sorry, there is no such pokemon</h1>
                            )}
                            </div>
                         ) : (
                        <div>
                            {pokemons ? (
                                <div className='card' >
                                    {pokemons.map(pokm => {
                                       return  <PokemonCard pokmname={pokm.name} url={ pokm.url } key={pokm.name} />
                                    })}
                                </div>
                            ) : (
                                <h1>Loading pokemons...</h1>
                        )}
                    </div>
                )}
                    </div>
                       )}
                    </div>
                )}
                </div>
                <Pagination currentPage = { this.props.currentPage } nextPage={ this.nextPage } />
            </div>
        )
    }
}

export default connect(
    state =>({
      pokemons: state.PokemonList.pokemon,
      filtered: state.FindPokemon,
      currentPage: state.PokemonList.currentPage
    })
  )(PokemonList)