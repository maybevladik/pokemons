import { combineReducers } from 'redux'
import Pokemon from './Pokemon'
import PokemonList from './PokemonList'
import FindPokemon from './FindPokemon'

const rootReducer = combineReducers({
    Pokemon, PokemonList, FindPokemon
})

export default rootReducer;