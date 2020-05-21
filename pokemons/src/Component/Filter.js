import React, { Component } from 'react'

class Filter extends Component{

    render(){
        return(
            <div> 
               {this.props.types ? (
                   <div className = 'filter-div' >
                       <ul>
                       {this.props.types.map(type =>{
                           return( 
                               <li key = { type }>
                               <label>
                                   <input 
                                        type='checkbox'
                                        onClick = {event => {
                                            this.props.filterTypes(event)
                                        }}
                                        value = { type }
                                   />
                                   { type.charAt(0).toUpperCase() + type.substr(1) }
                                   </label>
                                </li>                              
                           )
                       })}
                       </ul>
                       </div>
               ) : (
                   <h1></h1>
               )}
            </div>
        )
    }
}

export default Filter;