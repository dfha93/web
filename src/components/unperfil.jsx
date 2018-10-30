import React from "react";
import {getUserAll} from "../API/api";
import {Link} from 'react-router-dom';
import '../css/_login.css'
import {Panel, Image} from 'react-bootstrap'


class Unperfil extends React.Component{
    constructor(props){
        super(props);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.state = {
            services:[],
            cursos:[],
            apodo:"",
            userId:"", 
            url:null
          };
    }

    componentWillMount(){
        getUserAll(this.props.match.params.userId)
        .then(Todo=>{
            console.log(Todo)
            this.setState({
                services: Todo[0].servicios,
                cursos: Todo[0].cursos,
                apodo: Todo[0].apodo,
                userId: Todo[0].id,
                url:Todo[0].image[0].url
            });
        })
    }

    render(){
        return(
            <div className="espacioCentro">
            <div className="centrarImagen">
                <Image src={this.state.url} className="image"   rounded/>
            </div>
            <br/>
            <div className="linea"/>
            {
                this.state.services != null?
                <div>
                <div className="linea"><h1>Lista de Servicios de: {this.state.apodo}</h1></div><br/>
                {
                    this.state.services.map((objeto, index) => {
                        if(this.state.services.length > 0){
                          return(
                            <div key={index} className="POCISION">
                                <Panel bsStyle="success">
                                    <Panel.Heading>
                                    <Panel.Title componentClass="h3"><Link to={`/Unservicio/${this.state.userId}/${this.state.services[index].id}`}>{this.state.services[index].NServicio}</Link></Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>
                                        <p>Categoria: {this.state.services[index].Categoria}</p>
                                        <p>Ciudad: {this.state.services[index].Lugar} &nbsp;&nbsp;&nbsp;&nbsp; Direccion: {this.state.services[index].Direccion}</p>
                                        <p>Telefono: {this.state.services[index].Telefono} </p>
                                        <p> Descripcion: {this.state.services[index].Descripcion} </p>
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
            <br/><br/>
            {
        this.state.cursos =! null?
        <div >
          <h1 className="linea">Lista de Cursos de: {this.state.apodo}</h1>
          {
            this.state.cursos.map((objeto, index) =>{
              if(this.state.cursos.length > 0){

              return(
                <div key={index} className="POCISION"> 
                <Panel bsStyle="warning">
                    <Panel.Heading>
                    <Panel.Title componentClass="h3"><Link  to={`/Uncurso/${this.state.userId}/${this.state.cursos[index].id}`}>{this.state.cursos[index].NCurso}</Link> </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                      <p> Categoria: {this.state.cursos[index].Categoria}</p>         
                      <p> Ciudad: {this.state.cursos[index].Lugar}</p>
                      <p> Fecha de Inicio: {this.state.cursos[index].dateInicio}</p>
                      <p> Fecha de Finalizacion: {this.state.cursos[index].dateFin}</p>
                      <p> Hora: {this.state.cursos[index].Hora}</p>
                      <p> Telefono: {this.state.cursos[index].Telefono}</p> 
                      <p>Direccion: {this.state.cursos[index].Direccion}</p>                      
                      <p> Descripcion: {this.state.cursos[index].Descripcion} </p>
                      <p> Cupos: {this.state.cursos[index].Cupos} &nbsp;&nbsp;&nbsp;&nbsp; Calificacion: {Number(Math.round(parseFloat(this.state.cursos[index].Calificacion)+'e2')+'e-2')} </p>
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
        )
    }
}

export default Unperfil