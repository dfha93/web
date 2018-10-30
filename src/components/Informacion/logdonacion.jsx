import React from 'react';
import {Navbar, Nav,NavDropdown,MenuItem, NavItem, Carousel, Table} from 'react-bootstrap';
import '../../css/_acursos.css'

class Donacion extends React.Component{

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
<h3 className="linea">Como Donar</h3>
Bancolombia
<br/>
Cuenta de ahorros 
<br/>
248-924493-72
<br/>
codigo swift : COLOCOBM
</p>

</div>

            </div>
            
        )
    }
}


export default Donacion