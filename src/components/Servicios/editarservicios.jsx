

import React from "react";
import {getService, UpdateService, DeleteService} from "../../API/api";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../../css/_publicar.css";
import LoaderButton from "../loaderbutton";


class EditarServicio extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Borrar = this.Borrar.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onDropDownChange = this.onDropDownChange.bind(this);
        this.Upload = this.Upload.bind(this);
        this.state = {
            NServicio: "",
            Lugar: "",
            Descripcion: "",
            Categoria:"",
            Direccion:"",
            Telefono:"",
            comentarios: [],
            Email:this.props.loggedUser.email.email,
            userId:"",
            serviceId:"",
            File:null,
            urlId:null
          };
    }

    handleClick(e, action){
        e.preventDefault();//Eso va siempre
        this.props.history.push(action);
    }

    onDropDownChange(e){
      e.preventDefault();
      this.setState({
        Categoria:e.target.value,

      })
    }

    componentWillMount(){
        const pars={
            userId:this.props.match.params.userId,
            servicioId:this.props.match.params.serviceId
        };
        this.setState({
            userId:pars.userId,
            serviceId:pars.servicioId
        })
        getService(pars.userId, pars.servicioId)
        .then(val => {
            console.log(pars)
            this.setState({
            NServicio: val.NServicio,
            Lugar: val.Lugar,
            Descripcion: val.Descripcion,
            Categoria: val.Categoria,
            Direccion: val.Direccion,
            Telefono: val.Telefono,
            comentarios: val.Comentarios,
            Votos: val.NVoto,
            Calificacion: val.Calificacion,
            Sumatoria: val.Sumatoria,
            urlId: val.url[0].urlId
            })
        })
    }

    validateForm() {
      return (
        this.state.NServicio.length > 0 &&
        this.state.Lugar.length > 0 && 
        this.state.Telefono.length > 0 &&
        this.state.Direccion.length > 0 &&
        this.state.Descripcion.length >0
        );
    }
    
     // validateForm() {
     //   return this.state.email.length > 0 && this.state.password.length > 0;
     // }
    
      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value          
        });
      }

      Upload(e){
    
        const realFileBtn = document.getElementById("real-file")
        const customTxt = document.getElementById("custom.text")
        
            realFileBtn.click()
            this.setState({
                File: realFileBtn
            })
        console.log(realFileBtn.value)
      }
    
      handleSubmit(e){
        e.preventDefault();        
        console.log('Entro')
        const credentials = {
            NServicio: this.state.NServicio,
            Lugar: this.state.Lugar,
            Descripcion: this.state.Descripcion,
            Categoria: this.state.Categoria,
            Email: this.state.Email,
            Direccion: this.state.Direccion,
            Telefono: this.state.Telefono,
            Votos: this.state.Votos,
            Calificacion: this.state.Calificacion,
            Sumatoria: this.state.Sumatoria,
            comentarios: this.state.Comentatios

        };
        console.log(credentials);
        console.log(this.props.loggedUser);
        if(this.state.File !== undefined && this.state.File !== null){
          UpdateService(this.state.userId, this.state.serviceId, credentials, this.state.File.files[0], this.state.urlId)
        .then(
          this.props.history.push('/Sesion')
          )
        }else{
          UpdateService(this.state.userId, this.state.serviceId, credentials, undefined, undefined)
        .then(
          this.props.history.push('/Sesion')
          )
        }
        
    }

    Borrar(){
        DeleteService(this.state.userId, this.state.serviceId)
        .then(this.props.history.push('/Sesion'))
    }
    render(){
        return(
            <div>
              
                <div className="Login">
        <form onSubmit={this.handleSubmit} >
          <FormGroup controlId="NServicio" bsSize="large">
            <ControlLabel>Nombre Del Servicio</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.NServicio}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="Lugar" bsSize="large">
            <ControlLabel>Ciudad</ControlLabel>
            <FormControl
              value={this.state.Lugar}
              onChange={this.handleChange}
              type="text"
            />
          </FormGroup>
          <FormGroup controlId="Direccion" bsSize="large" >
            <ControlLabel>Direccion</ControlLabel>
            <FormControl
              value={this.state.Direccion}
              onChange={this.handleChange}
              type="text"
            />
          </FormGroup>
          <FormGroup controlId="Telefono" bsSize="large" >
            <ControlLabel>Telefono</ControlLabel>
            <FormControl
              value={this.state.Telefono}
              onChange={this.handleChange}
              type="number"
            />
          </FormGroup>
          <FormGroup controlId="Descripcion" bsSize="large">
            <ControlLabel>Descripción</ControlLabel>
            <FormControl
              autoFocus
              componentClass="textarea"
              value={this.state.Descripcion}
              onChange={this.handleChange}
              type="text"
              className="descripcion"
            />
          </FormGroup>
          <div className="row">
            <div className="column1">
              <LoaderButton  block bsSize="large"  text="Cargar Archivo" id="custom-button" onClick={e=>this.Upload(e)}/>
              <div hidden="hidden">
              <input type="file" id="real-file"/>
                  <span id="custom-text">No file chosen, yet.</span>
              </div>
            </div>
            <div className="column2">
              <Button style={{width: '152px'}}
              block
              bsSize="large"
              type="submit"
              disabled={!this.validateForm()}
            >
              Actualizar
            </Button>
            </div>
          </div>


        </form>
            
        <form onSubmit={this.Borrar}>
        <Button //style={{ width: '50%' }}
            block
            bsSize="large"
            type="submit"
          >
            Borrar
          </Button>
        </form>

        
      </div>
            </div>
        )
    }
}
export default EditarServicio