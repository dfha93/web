import React from 'react';
import {Navbar, Nav,NavDropdown,MenuItem, NavItem, Carousel, Table} from 'react-bootstrap';
import '../css/_inicio.css'

class Inicio extends React.Component{
    
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
          <div>
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

<Carousel className="slideSize">
  <Carousel.Item> 
    <img className="image1"/>
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img  alt="900x500" className="image2" />
    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img  alt="900x500" className="image3" />
    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>



</div>



        )
    }
}


export default Inicio