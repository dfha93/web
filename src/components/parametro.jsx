import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';



class Parametro extends React.Component{
    constructor(){
        super()
        this.state={name: 'Carlos'}
        
    }

   
    
    render(){
        return(
        <div>
        return <h1>{this.state.name}</h1>
        </div>
        )

    }
}


export default Parametro
// {this.state.par}