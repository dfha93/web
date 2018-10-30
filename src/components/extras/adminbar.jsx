import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import React from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../../css/_newbar.css"
class Adminbar extends React.Component{

    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.state={
            expand:true
        }
    }

    handleClick(e, action){
        e.preventDefault();//Eso va siempre
        this.props.history.push(action);
    }

render(){
    return(

<SideNav
    onSelect={(selected) => {
        // Add your code here
    }}
    onToggle={(selected) =>{
        if (this.state.expand === true) {
            this.setState({
                expand:false

            })
        }else{
            if (this.state.expand === false) {
                this.setState({
                    expand:true
                })
            }
        }
    }}
    className="new"
    expanded={this.state.expand}
>
    <SideNav.Toggle  />
    <SideNav.Nav >
    <NavItem eventKey="admin" onClick={(e)=> this.handleClick(e, '/Admin')}>
            <NavIcon style={{ color: 'white' }} className="icons">
            <FontAwesomeIcon icon="user-secret" />
            </NavIcon>
            <NavText style={{ color: 'white' }} >
                Admin
            </NavText>
        </NavItem>
        <NavItem eventKey="home" onClick={(e)=> this.handleClick(e, '/Sesion')}>
            <NavIcon style={{ color: 'white' }} className="icons">
            <FontAwesomeIcon icon="home" />
            </NavIcon>
            <NavText style={{ color: 'white' }} >
                Home
            </NavText>
        </NavItem>
        <NavItem eventKey="charts3">
            <NavIcon>
            <FontAwesomeIcon icon="id-card" />
            </NavIcon>
            <NavText style={{ color: 'white' }}>
                Informacion Personal
            </NavText>
            <NavItem onClick={(e)=> this.handleClick(e, '/PerfilPersonal')} eventKey="charts/linechart">
                <NavText >
                    Ver Perfil
                </NavText>
            </NavItem>
            <NavItem onClick={(e)=> this.handleClick(e, '/EditarPersonal')} eventKey="charts/barchart">
                <NavText >
                    Editar Perfil
                </NavText>
            </NavItem>
        </NavItem>
        <NavItem eventKey="charts1">
            <NavIcon>
            <FontAwesomeIcon icon="chalkboard-teacher" />
            </NavIcon>
            <NavText style={{ color: 'white' }}>
                Cursos
            </NavText>
            <NavItem onClick={(e)=> this.handleClick(e, '/Pcurso')} eventKey="charts/linechart">
                <NavText >
                    Publicar
                </NavText>
            </NavItem>
            <NavItem onClick={(e)=> this.handleClick(e, '/Categorias2')} eventKey="charts/barchart">
                <NavText >
                    Buscar
                </NavText>
            </NavItem>
        </NavItem>
        <NavItem eventKey="charts">
            <NavIcon>
            <FontAwesomeIcon icon="dollar-sign" />
            </NavIcon>
            <NavText style={{ color: 'white' }}>
                Services
            </NavText>
            <NavItem onClick={(e)=> this.handleClick(e, '/Pservicio')} eventKey="charts/linechart">
                <NavText >
                    Publicar
                </NavText>
            </NavItem>
            <NavItem onClick={(e)=> this.handleClick(e, '/Categorias')} eventKey="charts/barchart">
                <NavText >
                    Buscar
                </NavText>
            </NavItem>
        </NavItem>
        <NavItem onClick={(e)=> this.handleClick(e, '/Sugerencias')}>
            <NavIcon>
            <FontAwesomeIcon icon="edit" />
            </NavIcon>
            <NavText style={{ color: 'white' }}>
                Sugerencias
            </NavText>
        </NavItem>
        <NavItem onClick={(e)=> this.handleClick(e, '/Vusuarios')}>
            <NavIcon>
            <FontAwesomeIcon icon="users" />
            </NavIcon>
            <NavText style={{ color: 'white' }}>
                Buscar Otros Usuarios
            </NavText>
        </NavItem>
    </SideNav.Nav>
</SideNav>
    )
}

}

export default Adminbar