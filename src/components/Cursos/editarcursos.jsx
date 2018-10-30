import React from "react";
import { DeleteCurso, UpdateCourse, getCurso} from "../../API/api";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../../css/_publicar.css";
import LoaderButton from "../loaderbutton";

class EditarCurso extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onDropDownChange = this.onDropDownChange.bind(this);
        this.Borrar = this.Borrar.bind(this);
        this.Upload = this.Upload.bind(this);
        this.state = {
            NCurso: "",
            Lugar: "",
            Hora: "",
            Descripcion: "",
            Cupos: "",
            Telefono:"",
            Direccion:"",
            userId:"",
            cursoId:"",
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
        this.state.Cupos.toString().length >0
      );
    }
    
    
      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
          
        });
      }
    
      componentWillMount(){
        const pars={
            userId:this.props.match.params.userId,
            cursoId:this.props.match.params.cursoId
        };
        this.setState({
            userId: pars.userId,
            cursoId: pars.cursoId
        })
        getCurso(pars.userId, pars.cursoId)
        .then(val => {
            console.log(val)
            this.setState({
            NCurso: val.NCurso,
            Lugar: val.Lugar,
            Hora: val.Hora,
            Descripcion: val.Descripcion,
            Cupos: val.Cupos,
            Direccion: val.Direccion,
            Telefono: val.Telefono,
            urlId: val.url[0].urlId
            })
        })
        
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
            NCurso: this.state.NCurso,
            Lugar: this.state.Lugar,
            Hora: this.state.Hora,
            Descripcion: this.state.Descripcion,
            Categoria: this.state.Categoria,
            Cupos:this.state.Cupos,
            Direccion:this.state.Direccion,
            Telefono:this.state.Telefono,
        };
        console.log(credentials);
        console.log(this.props.loggedUser);
        if(this.state.File !== undefined && this.state.File !== null){
          UpdateCourse(this.props.loggedUser.id, this.state.cursoId, credentials,this.state.File.files[0],this.state.urlId)
        .then(result=>{
            
            this.props.history.push('/Sesion');
    
        })
    
        .catch(error =>{
            console.log(error);
        });
        }else{
          UpdateCourse(this.props.loggedUser.id, this.state.cursoId, credentials,undefined,undefined)
        .then(result=>{
            
            this.props.history.push('/Sesion');
    
        })
    
        .catch(error =>{
            console.log(error);
        });
        }
        
    }

    Borrar(){
        DeleteCurso(this.state.userId, this.state.cursoId)
        .then(this.props.history.push('/Sesion'))
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
          <FormGroup controlId="Cupos" bsSize="large">
            <ControlLabel>Cupos</ControlLabel>
            <FormControl
              value={this.state.Cupos}
              onChange={this.handleChange}
              type="number"
            />
          </FormGroup>
          <div className="row">
              <div className="column1">
                    <Button
                  block
                  bsSize="large"
                  type="submit"
                  disabled={!this.validateForm()}
                >
                  Actualizar
                </Button>
              </div>
              <div className="column2-2">
                  <LoaderButton  block bsSize="large"  text="Cargar Archivo" id="custom-button" onClick={e=>this.Upload(e)}/>
                <div hidden="hidden">
                <input type="file" id="real-file"/>
                    <span id="custom-text">No file chosen, yet.</span>
                </div>
              </div>
          </div>
           

         

        </form>
        <form onSubmit={this.Borrar}>
        <Button
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
export default EditarCurso