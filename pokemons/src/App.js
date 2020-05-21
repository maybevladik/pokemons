import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import PokemonList from './Component/PokemonList'
import NavBar from './Layout/NavBar'
import Pokemon from './Component/Pokemon'
import Filter from './Component/Filter'

class App extends Component {

  render (){
    return (
      <Router>
      <div>
      <NavBar />
      <Filter />
      <Switch> 
      <Route exact path = "/" component = {PokemonList} />
      <Route path = "/pokemon/:pokemonIndex" component={Pokemon} />
      </Switch> 
       </div>
       </Router>
    )
  }
}

export default App;
