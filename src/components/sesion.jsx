import React from "react";
import {logOut, getUserAll} from "../API/api.jsx";
import {Link} from 'react-router-dom';
import {Panel, Image} from 'react-bootstrap'

import "../css/_login.css";

class Sesion extends React.Component {
  constructor(props) {
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      email: "",
      password: "",
      services:[],
      cursos:[],
      cursosSuscritos:[],
      url:""
    };
  }
  

  handleClick(e, action){
    e.preventDefault();//Eso va siempre
    this.props.history.push(action);
}

componentWillMount(){
  getUserAll(this.props.loggedUser.id)  
  .then(Todo => {
    console.log(Todo)
    this.setState({
      services:Todo[0].servicios,
      cursos:Todo[0].cursos,
      url:Todo[0].image[0].url
    })
    })

 
}

handleClickOff(e, action){
  e.preventDefault();//Eso va siempre
  this.props.history.push(action);
  logOut();
}

  render() {
    return (
    <div className="espacioCentro">
    <div className="centrarImagen">
        <Image src={this.state.url} className="image"   rounded/>
    </div>
    <br/>
    <div className="linea"/>
      {console.log(this.state.services.length)}        
      { 
        this.state.services =! null?
        <div>
          <div className="linea">
            <h1>Mis Servicios</h1>
          </div>
          
          {
            this.state.services.map((objeto, index) => {
              if(this.state.services.length > 0){
                return(
                  <div key={index} className="POCISION"> 
                  <Panel bsStyle="success">
                    <Panel.Heading>
                      <Panel.Title componentClass="h3"><Link  to={`/Unservicio/${this.props.loggedUser.id}/${this.state.services[index].id}`}>{this.state.services[index].NServicio}</Link> 
                      <Link to={`/EditarServicio/${this.props.loggedUser.id}/${this.state.services[index].id}`}><small>{"["+"Editar"+"]"}</small></Link>
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                      <div className="row">
                        <div className="column1">
                          <p> Categoria: {this.state.services[index].Categoria}</p> 
                          <p> Ciudad: {this.state.services[index].Lugar} </p>
                          <p> Direccion: {this.state.services[index].Direccion} </p>
                          
                         
                        </div>
                        <div className="column2-2" >
                          <Image src={this.state.services[index].url} className="image"   rounded/>
                        </div>
                      </div>
                      <br/>
                      <p> Descripcion: {this.state.services[index].Descripcion} </p>
                      <p> Calificacion: {this.state.services[index].Calificacion}</p>
                    </Panel.Body>
                  </Panel>                      
                      </div>
                )
              }
            })
          }
        </div>
        :
        null
      }
      
      {
        this.state.cursos =! null?
        <div>
          
          <div className="linea">
            <h1>Mis Cursos</h1>
          </div>
          {
            this.state.cursos.map((objeto, index) =>{
              if(this.state.cursos.length > 0){
              
              return(
                <div key={index} className="POCISION"> 

                <Panel bsStyle="warning">
                  <Panel.Heading>
                    <Panel.Title componentClass="h3"><Link  to={`/Uncurso/${this.props.loggedUser.id}/${this.state.cursos[index].id}`}>{this.state.cursos[index].NCurso}</Link> 
                    <Link to={`/EditarCurso/${this.props.loggedUser.id}/${this.state.cursos[index].id}`}><small>{"["+"Editar"+"]"}</small></Link>
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                      <div className="row">
                        <div className="column1">
                          <p> Categoria: {this.state.cursos[index].Categoria}</p>         
                          <p> Ciudad: {this.state.cursos[index].Lugar}</p>
                          <p> Fecha de Inicio: {this.state.cursos[index].dateInicio}</p>
                          <p> Fecha de Fin: {this.state.cursos[index].dateFin}</p>
                          <p> Hora: {this.state.cursos[index].Hora}</p>
                          <p> Direccion: {this.state.cursos[index].Direccion}</p>
                          <p> Telefono: {this.state.cursos[index].Telefono}</p>
                        </div>
                        <div className="column2-2">
                         <Image src={this.state.cursos[index].url} className="image"   rounded/>
                        </div>
                      </div>
                      
                      <p> Descripcion: {this.state.cursos[index].Descripcion} </p>
                      <p> Cupos: {this.state.cursos[index].Cupos}</p>
                      <p>Calificacion: {Number(Math.round(parseFloat(this.state.cursos[index].Calificacion)+'e2')+'e-2')} </p>
                  </Panel.Body>
                </Panel>           
                      </div>
                )
              }
            })
          }
        </div>
        :
        null
      }
    </div>
    );
  }
}

export default Sesion