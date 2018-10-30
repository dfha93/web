import React from "react";
import {PservicesaveUserInDb, ImageService} from "../../API/api";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../../css/_publicar.css";
import LoaderButton from "../loaderbutton";


class Pservicio extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Upload = this.Upload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onDropDownChange = this.onDropDownChange.bind(this);
        this.state = {
            NServicio: "",
            Lugar: "",
            Descripcion: "",
            Categoria:"seleccionar",
            Direccion:"",
            Telefono:"",
            Email:this.props.loggedUser.email.email,
            File:null,
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
        this.state.NServicio.length > 0 &&
        this.state.Lugar.length > 0 && 
        this.state.Telefono.length > 0 &&
        this.state.Direccion.length > 0 &&
        this.state.Descripcion.length >0 &&
        this.state.Categoria != "seleccionar"
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
            Votos:0,
            Calificacion:0,
            Sumatoria:0

        };
        console.log(credentials);
        console.log(this.props.loggedUser);
        if (this.state.File !== null && this.state.File !== undefined) {
          PservicesaveUserInDb(this.props.loggedUser.id, credentials,this.state.File.files[0])
        .then(result=>{            
              this.props.history.push('/Sesion')
          })
    
        .catch(error =>{
            console.log(error);
        });
        }else{
          PservicesaveUserInDb(this.props.loggedUser.id, credentials,undefined)
        .then(result=>{            
              this.props.history.push('/Sesion')
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
          <FormGroup controlId="Categoria" bsSize="large" >
            <ControlLabel>Tipo de Servicio</ControlLabel>
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
export default Pservicio