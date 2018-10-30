
import React from "react"
import {Navbar, Nav,NavDropdown,MenuItem, NavItem, Carousel, Table} from 'react-bootstrap';


class Navbar extends React.Component{

    render(){
        return(

    <Navbar inverse collapseOnSelect >
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#brand">React-Bootstrap</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>

    <Nav pullRight id="0">
    <NavItem onClick={(e)=> this.handleClick(e, '/AyudaServicios')}>
        Ayuda Sobre Servicios
      </NavItem>
      <NavItem onClick={(e)=> this.handleClick(e, '/AyudaCursos')}>
        Ayuda Sobre Cursos
      </NavItem>
      <NavItem onClick={(e)=> this.handleClick(e, '/Login')}>
        Iniciar Sesion
      </NavItem>
      <NavItem onClick={(e)=> this.handleClick(e, '/Signup')}>
        Registrarse
      </NavItem>
    </Nav>

    <Nav pullRight id="1">
    <NavItem onClick={(e)=> this.handleClick(e, '/AyudaServicios')}>
        Prueba1
      </NavItem>
      <NavItem onClick={(e)=> this.handleClick(e, '/AyudaCursos')}>
        Ayuda Sobre Cursos
      </NavItem>
      <NavItem onClick={(e)=> this.handleClick(e, '/Login')}>
        Iniciar Sesion
      </NavItem>
      <NavItem onClick={(e)=> this.handleClick(e, '/Signup')}>
        Registrarse
      </NavItem>
    </Nav>

  </Navbar.Collapse>
</Navbar>


        )
    }
}
export default Navbar