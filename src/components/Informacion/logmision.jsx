import React from 'react';
import {Navbar, Nav,NavDropdown,MenuItem, NavItem, Carousel, Table} from 'react-bootstrap';
import '../../css/_acursos.css'

class Mision extends React.Component{

    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this);
    }
    
        handleClick(e, action){
            e.preventDefault();//Eso va siempre
            this.props.history.push(action);
        }
       

    render(){
        return(
            <div style={{ height: '127vh' }}>
               

<div className="hiw">     

<p className="ph2">
<h3 className="linea">Mision</h3>
Realizar actividades filantrópicas, sociales, recreativas, culturales, deportivas y académicas,en beneficio de los venezolanos residentes en la región Caribe colombiana y fortalecer lazosde hermandad con Colombia.
<br/>
<h3 className="linea">Vision</h3>
Ser reconocida a nivel nacional e internacional como la asociación de venezolanos quepropende por el bienestar de sus connacionales residentes en la región Caribe colombiana,consolidando cada día más los vínculos entre la comunidad colombo venezolana.
<br/>
<h3 className="linea">Valores</h3>
Los siguientes serán los valores por los que se regirá La Asociación: Compromiso,
Responsabilidad, Solidaridad, Calidad, Tolerancia, Ética, Lealtad.
</p>

</div>

            </div>
            
        )
    }
}


export default Mision