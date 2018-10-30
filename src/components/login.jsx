import React, { Component } from "react";
import {logIn, logOut, getUserById} from "../API/api.jsx";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {Navbar, Nav,NavDropdown,MenuItem, NavItem, Carousel, Table} from 'react-bootstrap';

import "../css/_login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    this.state = {
      email: "",
      password: ""
    };
  }
  

  handleClick(e, action){
    e.preventDefault();//Eso va siempre
    this.props.history.push(action);
}

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
      
    });
  }

  handleSubmit(e){
    e.preventDefault();        
    console.log('Entro')
    const credentials = {
        email: this.state.email,
        password: this.state.password
        
    };
    console.log(credentials);
    logIn(credentials)
    .then(result =>{
      console.log('result');
      console.log(result);
        getUserById(result.user.uid)
        .then(_user=>{

            if(_user.status === 'active'){

                this.props.history.push('/Sesion');
                this.props.handleSuccessfulLogin(_user);
            }
            else{
                //Desactivated can't login
                logOut()
                .then(result=>{
                    this.setState({
                        dialogOpen: true
                        
                    });    console.log('Salio')

                });
            }
        })
    })

    .catch(error =>{
        console.log(error);
    });
    
}


  
  

  render() {
    return (
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

      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Enviar
          </Button>
        </form>
        <a href="#" onClick={(e)=> this.handleClick(e, '/Signup')}>Registrarse</a> <br/>
        <a href="#" onClick={(e)=> this.handleClick(e, '/Forgot')}>¿Olvido su Contraseña?</a>
      </div>
    </div>
    );
  }
}

export default Login