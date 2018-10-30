import React from 'react';
import '../css/_sidebarmenu.css';
import {Nav, NavItem, Navbar, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';



class Sidebar extends React.Component{
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
        

    }

    handleClick(e, action){
        e.preventDefault();//Eso va siempre
        this.props.history.push(action);
    }

    render() {
        return(
            <div>
            <div className="cuadro"></div>
            <div  className="sideBarMenuContainer">
            <Navbar fluid className="sidebar" inverse >

                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/"></a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navbar.Collapse>
                    <Navbar.Text className="userMenu">
                        <Navbar.Link onClick={(e)=> this.handleClick(e, '/Sesion')} href="#" ><Glyphicon glyph="home"/></Navbar.Link>
                        <Navbar.Link href="#"><Glyphicon glyph="log-out"/></Navbar.Link>
                    </Navbar.Text>
                    <Nav>
                    <NavItem eventKey={1} onClick={(e)=> this.handleClick(e, '/PerfilPersonal')}>Informacion Personal</NavItem>
                        <NavDropdown id={0} eventKey={2} title="Cursos">
                            <MenuItem eventKey={2.1} onClick={(e)=> this.handleClick(e, '/Pcurso')} href="#">Agregar</MenuItem>
                            <MenuItem eventKey={2.2} onClick={(e)=> this.handleClick(e, '/Categorias2')} href="#">Buscar</MenuItem>
                        </NavDropdown>
                        <NavDropdown id={1} eventKey={3} title="Servicios">
                            <MenuItem eventKey={3.1} onClick={(e)=> this.handleClick(e, '/Pservicio')} href="#">Publicar Servivio</MenuItem>
                            <MenuItem eventKey={3.2} onClick={(e)=> this.handleClick(e, '/Categorias')} href="#">Buscar</MenuItem>
                        </NavDropdown>
                        <NavItem eventKey={4} onClick={(e)=> this.handleClick(e, '/Sugerencias')}>Sugerencias</NavItem>
                        <NavItem eventKey={5} onClick={(e)=> this.handleClick(e, '/Vusuarios')}>Buscar Otros Usuarios</NavItem>
                    </Nav>
                </Navbar.Collapse>
                <NavItem></NavItem>
            </Navbar>
        </div>
        </div>
        );
    }
}

export default Sidebar