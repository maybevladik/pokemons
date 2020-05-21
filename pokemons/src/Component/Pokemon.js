import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import store from '../Redux/Store'
import { POKEMON_NAME, POKEMON_IMG_URL, POKEMON_HP, POKEMON_ATTACK, POKEMON_DEFENSE, POKEMON_SPEED,
    POKEMON_SPECIAL_ATTACK, POKEMON_SPECIAL_DEFENSE, POKEMON_DESCRIPTION, POKEMON_TYPES } from '../constants.js'

class Pokemon extends Component{

    async componentDidMount(){
        const { pokemonIndex } = this.props.match.params;
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
       /* axios.get(url).then((rest) => this.props.onGetPokemon( rest.data ))*/

        const specialUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`
        
        const rest = await axios.get(url);
        const special_rest = await axios.get(specialUrl);

        const name = rest.data.name;
        const imgUrl = rest.data.sprites.front_default;

       let {
            hp,
            attack,
            defense,
            speed,
            specialAttack,
            specialDefense,
            description
        } = '';

        rest.data.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp':
                    hp = stat.base_stat;
                    break;
                case 'attack':
                    attack = stat.base_stat;
                    break;
                case 'defense':
                    defense = stat.base_stat;
                    break;
                case 'speed':
                    speed = stat.base_stat;
                    break;
                case 'special-attack':
                    specialAttack = stat.base_stat;
                    break;
                case 'special-defense':
                    specialDefense = stat.base_stat;
                    break;
            }
        })

        special_rest.data.flavor_text_entries.map(flavor =>{
            if(flavor.language.name === 'en' ){
                description = flavor.flavor_text;
            }
        });

        const types = rest.data.types.map(type =>
            type.type.name
        );
      
        store.dispatch((dispatch) => {
            dispatch({
                type: POKEMON_NAME,
                payload: name
            });
            dispatch({
                type: POKEMON_IMG_URL,
                payload: imgUrl
            });
            dispatch({
                type: POKEMON_HP,
                payload: hp
            });
            dispatch({
                type: POKEMON_ATTACK,
                payload: attack
            });
            dispatch({
                type: POKEMON_DEFENSE,
                payload: defense
            });
            dispatch({
                type: POKEMON_SPEED,
                payload: speed
            });
            dispatch({
                type: POKEMON_SPECIAL_ATTACK,
                payload: specialAttack
            });
            dispatch({
                type: POKEMON_SPECIAL_DEFENSE,
                payload: specialDefense
            });
            dispatch({
                type: POKEMON_DESCRIPTION,
                payload: description
            });
            dispatch({
                type: POKEMON_TYPES,
                payload: types
            });
        });
    }
    
    render(){
        const { name, imgUrl, hp, attack, defense, speed, specialAttack, specialDefense, description,
            types } = this.props;
        
        return (
            <div className='wrapper' >
                <div className='card-pokemon' >
                    <div className='card-pokemon-header' >
                        <div className='card-pokemon-header-index' >
                              {this.props.match.params.pokemonIndex}
                        </div>
                        <div className='card-pokemon-header-types' >
                                {types.map(type =>
                                <div key={type} className='types-div' >
                                    {type.charAt(0).toUpperCase() + type.substr(1)}
                                </div>
                                )}
                        </div>
                        </div>
                    <div className='card-pokemon-body' > 
                        <div className='card-pokemon-name' >
                            {name.charAt(0).toUpperCase() + name.substr(1)}
                        </div>  
                        <div className='card-pokemon-name-progress-img' >
                            <div className='card-pokemon-img-charac' >
                                <img className='img' src={imgUrl} />
                            </div>
                            <div className='card-characristic-name' >
                                <p className='card-p' >HP</p>
                                <p className='card-p' >Attack</p>
                                <p className='card-p' >Defense</p>
                                <p className='card-p' >Speed</p> 
                                <p className='card-p' >Special Attack</p>
                                <p className='card-p' >Special Defense</p>
                            </div>
                            <div className='card-characristic-progress' > 
                                <progress  max='100' value={hp} >
                                </progress>
                                <progress  max='100' value={attack} >
                                </progress>
                                <progress  max='100' value={defense} >
                                </progress>
                                <progress  max='100' value={speed} >
                                </progress>
                                <progress  max='100' value={specialAttack} >
                                </progress>
                                <progress  max='100' value={specialDefense} >
                                </progress>
                            </div>
                        </div>
                    </div>
                    <div className='card-pokemon-footer' >
                        <p className='card-footer-text' >{description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        name: state.Pokemon.name,
        imgUrl: state.Pokemon.imgUrl,
        hp: state.Pokemon.hp,
        attack: state.Pokemon.attack,
        defense: state.Pokemon.attack,
        speed: state.Pokemon.attack,
        specialAttack: state.Pokemon.specialAttack,
        specialDefense: state.Pokemon.specialDefense,
        description: state.Pokemon.description,
        types: state.Pokemon.types
    };
}

export default connect (mapStateToProps)(Pokemon);
/*export default connect(
    state => ({
        pokemon_separate: state.Pokemon.pokemon
    }),
    dispatch =>({
        onGetPokemon: (data) =>{
            console.log('Pokemon is: ', data);
            dispatch({
                type: 'ADD_POKEMON_IND',
                payload: data
            })
        }
    })
)(Pokemon)*/