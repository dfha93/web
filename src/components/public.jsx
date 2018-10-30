import React from 'react';
import Inicio from './inicio.jsx'
import ACursos from './acursos.jsx'
import AServicios from './aservicios.jsx'
import Login from './login.jsx'
import Signup from './signup.jsx'
import Forgot from './forgot.jsx'
import Parametro from './parametro'
import {Route} from 'react-router-dom';
import Donacion from './Informacion/donacion.jsx'
import Mision from './Informacion/mision.jsx'
import Objetivos from './Informacion/objetivos.jsx'
import Somos from './Informacion/somos.jsx'

class Public extends React.Component{

    constructor(){
        super();

    }

    render(){
        return(
            <div>
                <Route path='/AyudaCursos' component = {(props) => <ACursos {... props} titulo = 'AyudaCursos'/> }/>
                  <Route path='/AyudaServicios' component = {(props) => <AServicios {... props}/> }/> 
                  <Route path='/Login' component = {(props) => <Login {... props} type= 'basic' handleSuccessfulLogin={this.props.onLogin}/> }/>
                  <Route path='/Signup' component = {(props) => <Signup {... props}/> }/>
                  <Route path='/Forgot' component = {(props) => <Forgot {... props}/> }/>
                  <Route path='/QuienesSomos' component = {(props) => <Somos {... props}/> }/>
                  <Route path='/Donaciones' component = {(props) => <Donacion {... props}/> }/>
                  <Route path='/Objetivos' component = {(props) => <Objetivos {... props}/> }/>
                  <Route path='/Mision' component = {(props) => <Mision {... props}/> }/>
                  <Route path='/pag3/' component = {(props) => <Parametro {... props}/> }/> 
            </div>
            )
    }
}

    export default Public
