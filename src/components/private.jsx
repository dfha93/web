import React from 'react';
import { Route , withRouter} from 'react-router-dom';
import Sesion from './sesion.jsx';
import Pcurso from './Cursos/pcursos.jsx'
import Uncurso from './Cursos/uncurso.jsx'
import Vcursos from './Cursos/vcursos.jsx';
import ACursos2 from './Cursos/ayudacursos.jsx'
import Pservicio from './Servicios/pservicio.jsx';
import Vservicios from './Servicios/vservicios.jsx';
import Unservicio from "./Servicios/unservicio.jsx";
import EditarServicio from "./Servicios/editarservicios.jsx";
import AServicios2 from './Servicios/ayudaservicios.jsx'
import UserManagment from './usermanagment.jsx'
import Sugerencias from './sugerencias.jsx'
import PerfilPersonal from "./perfilpersonal";
import Categorias from './Servicios/categorias.jsx';
import Categorias2 from './Cursos/categorias2.jsx';
import EditarCurso from './Cursos/editarcursos.jsx';
import {logOut} from "../API/api.jsx"
import Vusuarios from "./vusuarios.jsx"
import Unperfil from "./unperfil.jsx"
import Peticion from "./peticion.jsx"
import EditarPersonal from "./editarpersonal"
import Newbar from "./extras/newbar.jsx"
import Adminbar from "./extras/adminbar.jsx"
import Donacion from './Informacion/logdonacion.jsx'
import Mision from './Informacion/logmision.jsx'
import Objetivos from './Informacion/logobjetivos.jsx'
import Somos from './Informacion/logsomos.jsx'
import {Navbar, Nav,NavDropdown,MenuItem, NavItem} from 'react-bootstrap';


class Private extends React.Component{

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(e, action){
        e.preventDefault();//Eso va siempre
        console.log(action)
        this.props.history.push(action)
    }

    LOGOUT(){
        logOut()
        .then(window.location='/Login/')
    }

    render(){
        return(
            <div >

            <Navbar inverse collapseOnSelect className="color">
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#brand">React-Bootstrap</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>

    <Nav pullRight>
      <NavDropdown eventKey={3} title="Ayudas" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1} onClick={(e)=> this.handleClick(e, '/AyudaServiciosLogged')}>Ayuda Sobre Servicios</MenuItem>
        <MenuItem eventKey={3.2} onClick={(e)=> this.handleClick(e, '/AyudaCursosLogged')}>Ayuda Sobre Cursos</MenuItem>
        
        </NavDropdown>
        <NavDropdown eventKey={4} title="Informacion" id="basic-nav-dropdown">
        <MenuItem eventKey={4.1} onClick={(e)=> this.handleClick(e, '/QuienesSomos')}>¿Quienes Somos?</MenuItem>
        <MenuItem eventKey={4.2} onClick={(e)=> this.handleClick(e, '/Mision')}>Mision/Vision/Valores</MenuItem>
        <MenuItem eventKey={4.3} onClick={(e)=> this.handleClick(e, '/Objetivos')}>Objetivos</MenuItem>
        <MenuItem eventKey={4.4} onClick={(e)=> this.handleClick(e, '/Donaciones')}>Donaciones</MenuItem>
        </NavDropdown>
      <NavDropdown id="nav-dropdown" title={this.props.loggedUser.email.email}>
      <MenuItem>Perfil</MenuItem>
      <MenuItem onClick={this.LOGOUT}>Log-Out</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
<div>
            
            <div className="categoria">
            {
                
                this.props.loggedUser.type==="admin"?
                <div>
                    <Route component={(props) => <Adminbar {...props}{...this.props}/>}/>
                    <Route exact path='/Admin' component={(props) => <UserManagment {...props} {...this.props} />} />
                </div>
                :
                <Route component={(props) => <Newbar {...props}{...this.props}/>}/>

                
            }

                {
                    this.props.loggedUser.rol==="profesor"?
                    <div>
                        <Route exact path='/Pcurso' component={(props) => <Pcurso {...props} {...this.props} />} />
                        
                     </div>
                    :
                    <div>
                        <Route exact path='/Pcurso' component={(props) => <Peticion {...props} {...this.props} /> }/>
                    </div>
                }

                <Route exact path='/Sesion' component={(props) => <Sesion {...props} {...this.props} /> }/>
                <Route exact path='/Pservicio' component={(props) => <Pservicio {...props} {...this.props} /> }/>
                <Route exact path='/Categorias' component={(props) => <Categorias {...props} {...this.props} /> }/>
                <Route exact path='/Vservicios/:categoria' component={(props) => <Vservicios {...props} {...this.props} /> }/>
                <Route exact path='/Unservicio/:userId/:serviceId' component={(props) => <Unservicio {...props} {...this.props} /> }/>
                <Route exact path='/EditarServicio/:userId/:serviceId' component={(props) => <EditarServicio {...props} {...this.props} /> }/>
                <Route exact path='/Sugerencias' component={(props) => <Sugerencias {...props} {...this.props} /> }/>
                <Route exact path='/PerfilPersonal' component={(props) => <PerfilPersonal {...props} {...this.props} /> }/>
                <Route exact path='/Vusuarios' component={(props) => <Vusuarios {...props} {...this.props} /> }/>
                <Route exact path='/Unperfil/:userId' component={(props) => <Unperfil {...props} {...this.props} /> }/>
                <Route exact path='/Categorias2' component={(props) => <Categorias2 {...props} {...this.props} /> }/>
                <Route exact path='/Uncurso/:userId/:cursoId' component={(props) => <Uncurso {...props} {...this.props} />} />
                <Route exact path='/Vcursos/:categoria' component={(props) => <Vcursos {...props} {...this.props} />} />
                <Route exact path='/EditarCurso/:userId/:cursoId' component={(props) => <EditarCurso {...props} {...this.props} />} />
                <Route exact path='/Peticion' component={(props) => <Peticion {...props} {...this.props} /> }/>
                <Route exact path='/AyudaCursosLogged' component={(props) => <ACursos2 {...props} {...this.props} /> }/>
                <Route exact path='/AyudaServiciosLogged' component={(props) => <AServicios2 {...props} {...this.props} /> }/>
                <Route exact path='/EditarPersonal' component={(props) => <EditarPersonal {...props} {...this.props} /> }/>
                <Route exact path='/QuienesSomos' component = {(props) => <Somos {... props}/> }/>
                <Route exact path='/Donaciones' component = {(props) => <Donacion {... props}/> }/>
                <Route exact path='/Objetivos' component = {(props) => <Objetivos {... props}/> }/>
                <Route exact path='/Mision' component = {(props) => <Mision {... props}/> }/>
            </div>
            </div>
            </div>
        )
    }

}

export default withRouter(Private)