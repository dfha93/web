import React from "react";
import {Link,Route} from 'react-router-dom';
import '../../css/_categorias.css'
import {getAllCoursesByCategory} from "../../API/api";
import Vcursos from "./vcursos"
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class Categorias2 extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onDropDownChange = this.onDropDownChange.bind(this);
        this.state = {
            Categoria:"seleccionar",
            curso:[]
          };
    }

    onDropDownChange(e){
        e.preventDefault();
        this.setState({
          Categoria:e.target.value
        })
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
            Categoria: this.state.Categoria
            
        };
        console.log(credentials);
        getAllCoursesByCategory(credentials.Categoria)
        .then(result =>{
            console.log(result)
            this.setState({
                curso: result
            });
            console.log(this.state.curso)
            this.props.history.push("/Vcursos/"+this.state.Categoria);

        })
        
        
    }

    render(){
        return(
            <div className="categoria">
                <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="Categoria" bsSize="large" className="comment">
                    <ControlLabel>Seleccione Una Categoria</ControlLabel>
                    <FormControl componentClass="select" placeholder="select" onChange={this.onDropDownChange}>
                        <option value="seleccionar">Selecionar</option>
                        <option value="cocina">Cocina</option>
                        <option value="limpieza">Limpieza</option>
                        <option value="otros">Otros</option>
                    </FormControl>
                </FormGroup>
                <Button
                    block
                    bsSize="large"
                    type="submit">
                    Buscar
                </Button>
                </form>
                <div>
                </div>
            </div>
        )
    }
}

export default Categorias2
