import { FIND_POKEMONS } from '../../constants'

const initialState = { };

export default (state = initialState, { type, payload, isInput } ) => {
    switch (type){
        case FIND_POKEMONS :
          return{
            ...state,
            payload, 
            isInput
          }
        default: 
            return state
      }
}