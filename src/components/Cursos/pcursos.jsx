import React, { Component } from "react";
import {PcoursesaveUserInDb, ImageCourse} from "../../API/api";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../../css/_publicar.css";
import LoaderButton from "../loaderbutton";


class Pcurso extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.Upload = this.Upload.bind(this);
        this.onDropDownChange = this.onDropDownChange.bind(this);
        this.state = {
            NCurso: "",
            Lugar: "",
            Hora: "",
            Descripcion: "",
            Categoria:"seleccionar",
            Cupos: "",
            Telefono:"",
            Direccion:"",
            File:null,
            dateInicio:"",
            dateFin:""
          };
    }

    handleClick(e, action){
        e.preventDefault();//Eso va siempre
        this.props.history.push(action);
    }

    onDropDownChange(e){
      e.preventDefault();
      this.setState({
        Categoria:e.target.value
      })
    }

    validateForm() {
      return (
        this.state.NCurso.length > 0 &&
        this.state.Lugar.length > 0 &&
        this.state.Telefono.length > 0 &&
        this.state.Direccion.length > 0 &&
        this.state.Hora.length >0 &&
        this.state.Descripcion.length >0 &&
        this.state.Cupos.length > 0 &&
        this.state.Categoria != "seleccionar" &&
        this.state.dateInicio <= this.state.dateFin &&
        this.state.dateInicio.length > 0 &&
        this.state.dateFin.length > 0
      );
    }
    
     // validateForm() {
     //   return this.state.email.length > 0 && this.state.password.length > 0;
     // }
    
      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
        if (this.state.dateInicio <= this.state.dateFin) {
          console.log("Todo bien")
        }else{
          console.log("nada")
        }
      }
    
      handleSubmit(e){
        e.preventDefault();        
        console.log('Entro')
        const credentials = {
            NCurso: this.state.NCurso,
            Lugar: this.state.Lugar,
            Hora: this.state.Hora,
            Descripcion: this.state.Descripcion,
            Categoria: this.state.Categoria,
            Cupos:this.state.Cupos,
            Direccion:this.state.Direccion,
            Telefono:this.state.Telefono,
            dateInicio:this.state.dateInicio,
            dateFin:this.state.dateFin,
            Votos:"0",
            Calificacion:"0",
            Sumatoria:"0"
        };
        console.log(credentials);
        console.log(this.props.loggedUser);
        if (this.state.File !== null && this.state.File !== undefined){
          PcoursesaveUserInDb(this.props.loggedUser.id, credentials, this.state.File.files[0])
        .then(result=>{
            
            this.props.history.push('/Sesion');
    
        })
    
        .catch(error =>{
            console.log(error);
        });
        }else{
          PcoursesaveUserInDb(this.props.loggedUser.id, credentials, undefined)
        .then(result=>{
            
            this.props.history.push('/Sesion');
    
        })
    
        .catch(error =>{
            console.log(error);
        });
        }
        
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

    render(){
        return(
  <div>            
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="NCurso" bsSize="large">
            <ControlLabel>Nombre Del Curso</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.NCurso}
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
          <FormGroup controlId="Hora" bsSize="large">
            <ControlLabel>Hora</ControlLabel>
            <FormControl
              value={this.state.Hora}
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
          <FormGroup controlId="Cupos" bsSize="large" className="comment">
            <ControlLabel>Cupos</ControlLabel>
            <FormControl
              value={this.state.Cupos}
              onChange={this.handleChange}
              type="number"
            />
          </FormGroup>
          <FormGroup controlId="dateInicio" bsSize="large" className="comment">
            <ControlLabel>Fecha de Inicio</ControlLabel>
            <FormControl
              value={this.state.dateInicio}
              onChange={this.handleChange}
              type="date"
            />
          </FormGroup>
          <FormGroup controlId="dateFin" bsSize="large" className="comment">
            <ControlLabel>Fecha de Finalizacion</ControlLabel>
            <FormControl
              value={this.state.dateFin}
              onChange={this.handleChange}
              type="date"
            />
          </FormGroup>
          <FormGroup controlId="Categoria" bsSize="large" className="comment">
            <ControlLabel>Tipo de Curso</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={this.onDropDownChange}>
                <option value="seleccionar">Selecionar</option>
                <option value="cocina">Cocina</option>
                <option value="limpieza">Limpieza</option>
                <option value="otros">Otros</option>
              </FormControl>
          </FormGroup>  
          <div className="row">
            <div className="column1">
              <LoaderButton block bsSize="large"  text="Cargar Archivo" id="custom-button" onClick={e=>this.Upload(e)}/>
              <div hidden="hidden">
              <input type="file" id="real-file"/>
                  <span id="custom-text">No file chosen, yet.</span>
              </div>
            </div>
            <div className="column2-2">
            <Button
              block
              bsSize="large"
              type="submit"
              disabled={!this.validateForm()}
            >
              Publicar
          </Button>
            </div>
          </div>
        </form>
    </div>
  </div>
        )
    }
}
export default Pcurso