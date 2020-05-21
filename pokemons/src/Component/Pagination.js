import React, { useState } from 'react'
import { connect } from 'react-redux'

const Pagination = ( props ) => {

    const pageNumbers = [];
    const totalButton = Math.ceil(props.totalCountPokemon / props.pageSize);
    const countOfPortion = Math.ceil(totalButton / props.countOfPortion);
    const [ portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * countOfPortion + 1;
    const rightPortionPageNumber = portionNumber * countOfPortion;

    for( let i = 0; i <= totalButton; i++){
        pageNumbers.push(i);
    }

    return(
        <div className = 'pagination-div'>
            <span className = 'pagination-span-back'>
            { portionNumber > 1 && 
                <button onClick = { () => setPortionNumber(portionNumber - 1) } >Back</button> }
            </span>
            <span>
            {pageNumbers.filter(page => 
                page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map((p) => {
                    return <span className = 'pagination-span-button' key = { p }>
                        <button className = { props.currentPage === p && 'active' } key = { p } 
                        onClick = { () => props.nextPage(p) } > {p} </button>
                        </span>
            })}
            </span>
            <span className = 'pagination-span-next'>
            { countOfPortion > portionNumber && 
                <button onClick = { () => setPortionNumber(portionNumber + 1) } >Next</button> } 
                </span>
            </div>
    )
}

export default connect(
    state => ({
        totalCountPokemon: state.PokemonList.totalCountPokemon,
        currentPage: state.PokemonList.currentPage,
        pageSize: state.PokemonList.pageSize,
        countOfPortion: state.PokemonList.countOfPortion
    })
)(Pagination)