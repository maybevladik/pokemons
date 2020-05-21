import React from 'react'
import Search from '../../src/Component/Search'

function Navbar(){
    return(
        <div className='wrapper-navbar' >
            <div>
                <p className='navbar-text' >Pokemons</p>
            </div>
                
                <Search />
                
        </div>
    )
}

export default Navbar;