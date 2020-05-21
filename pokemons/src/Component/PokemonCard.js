import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PokemonCard extends Component {

    state ={
        pokemonIndex: '',
        pokemonImage: ''
    }

    componentDidMount(){
       const { url } =  this.props;
       const pokemonIndex = url.split('/')[url.split('/').length-2];
       const pokemonImage = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
       this.setState({
           pokemonIndex,
           pokemonImage
       });
    }

    render (){
        return(
            <div className='pokemon-card' >
                <div className='card-id' >
                <p>{this.state.pokemonIndex}</p>
                    </div>
                     <Link to = {`pokemon/${this.state.pokemonIndex}`}>
                     <div className='card-image' >
                    <img src={this.state.pokemonImage} />
                    </div>
                    </Link>
                    <div className='card-name' >
                <h3>{this.props.pokmname.charAt(0).toUpperCase() + this.props.pokmname.substr(1)}</h3>
                </div>
        </div>
        )
    }
}

export default PokemonCard;