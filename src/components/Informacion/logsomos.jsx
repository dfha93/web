import React from 'react';
import {Navbar, Nav,NavDropdown,MenuItem, NavItem} from 'react-bootstrap';
import '../../css/_acursos.css'

class Somos extends React.Component{

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
<h3 className="linea">¿Quienes Somos?</h3>
Es una entidad sin ánimos de lucro que busca desarrollar actividades filantrópicas, sociales, recreativas, culturales, deportivas y académicas, con el fin de fomentar la integración mediante la creación 
de redes de apoyo entre los venezolanos residentes en la región Caribe colombiana. 
</p>

</div>

            </div>
            
        )
    }
}


export default Somos