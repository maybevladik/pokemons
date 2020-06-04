import { POKEMON_NAME, POKEMON_IMG_URL, POKEMON_HP, POKEMON_ATTACK, POKEMON_DEFENSE, POKEMON_SPEED,
    POKEMON_SPECIAL_ATTACK, POKEMON_SPECIAL_DEFENSE, POKEMON_DESCRIPTION, POKEMON_TYPES } from '../../constants.js'

const initialState = {
    name: '',
    imgUrl: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    specialAttack: '',
    specialDefense: '',
    description: '',
    types: [ ]
}

export default (state = initialState, { type, payload } ) => {
    switch (type) {
            case POKEMON_NAME:
                return {
                    ...state,
                    name: payload
                }
        case POKEMON_IMG_URL :
            return {
                ...state,
                imgUrl: payload
            }
        case POKEMON_HP :
            return {
                ...state,
                hp: payload
            }
        case POKEMON_ATTACK :
            return {
                ...state,
                attack: payload
            }
        case POKEMON_DEFENSE :
            return {
                ...state,
                defense: payload
            }
        case POKEMON_SPEED :
            return {
                ...state,
                speed: payload
            }
        case POKEMON_SPECIAL_ATTACK :
            return {
                ...state,
                specialAttack: payload
            }
        case POKEMON_SPECIAL_DEFENSE:
            return {
                ...state,
                specialDefense: payload
            }
        case POKEMON_DESCRIPTION :
            return {
                ...state,
                description: payload
            }
        case POKEMON_TYPES :
            return {
                ...state,
                types: payload
            }
        default: 
            return state
    }
}