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