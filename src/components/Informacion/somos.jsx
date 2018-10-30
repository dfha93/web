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
                <Navbar inverse collapseOnSelect className="color">
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#brand">VenezulaQuilla</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                
                </Nav>
                <Nav pullRight>
                  <NavDropdown eventKey={3} title="Ayudas" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1} onClick={(e)=> this.handleClick(e, '/AyudaServicios')}>Ayuda Sobre Servicios</MenuItem>
                    <MenuItem eventKey={3.2} onClick={(e)=> this.handleClick(e, '/AyudaCursos')}>Ayuda Sobre Cursos</MenuItem>
                    
                  </NavDropdown>
                  <NavDropdown eventKey={4} title="Informacion" id="basic-nav-dropdown">
                    <MenuItem eventKey={4.1} onClick={(e)=> this.handleClick(e, '/QuienesSomos')}>¿Quienes Somos?</MenuItem>
                    <MenuItem eventKey={4.2} onClick={(e)=> this.handleClick(e, '/Mision')}>Mision/Vision/Valores</MenuItem>
                    <MenuItem eventKey={4.3} onClick={(e)=> this.handleClick(e, '/Objetivos')}>Objetivos</MenuItem>
                    <MenuItem eventKey={4.4} onClick={(e)=> this.handleClick(e, '/Donaciones')}>Donaciones</MenuItem>
                  </NavDropdown>
                  <NavItem onClick={(e)=> this.handleClick(e, '/Login')}>
                    Iniciar Sesion
                  </NavItem>
                  <NavItem onClick={(e)=> this.handleClick(e, '/Signup')}>
                    Registrarse
                  </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>

<div className="hiw">     

<p className="ph">
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