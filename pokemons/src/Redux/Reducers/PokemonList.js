import { ADD_POKEMONS, TOTAL_COUNT_POKEMONS, PAGINATION, COUNT_OF_PORTION, CURRENT_PAGE } from '../../constants'

const initialState = {
    pokemon: null,
    pageSize: 15,
    totalCountPokemon: null,
    currentPage: 1,
    countOfPortion: 6
  }
  
export default (state = initialState, { type, payload } ) => {
    switch (type){
      case ADD_POKEMONS :
        return{
          ...state,
          pokemon: payload
        }
      case PAGINATION :
        return{
          ...state,
          pokemon: payload
        }
      case TOTAL_COUNT_POKEMONS :
        return{
          ...state,
          totalCountPokemon: payload
        }
      case COUNT_OF_PORTION :
        return{
          ...state,
          countOfPortion: payload
        }
      case CURRENT_PAGE :
        return {
          ...state,
          currentPage: payload
        }
      default: 
          return state
    }
  }