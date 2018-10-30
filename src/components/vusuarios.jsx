import React from "react";
import {getAllUsers} from "../API/api";
import {Link} from 'react-router-dom';
import '../css/_vservices.css'
import {Panel, MenuItem, FormGroup,FormControl, InputGroup, DropdownButton} from 'react-bootstrap';


class Vusuarios extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            usuarios:[],
            Criteria: "Apodo",
            Busqueda: "",
          };
          this.componentWillMount = this.componentWillMount.bind(this);
          this.handleChange = this.handleChange.bind(this);
          this.handleCriteria = this.handleCriteria.bind(this);
    }

    componentWillMount(){
        getAllUsers(this.props.loggedUser.id)
        .then(lista=>{
            console.log(lista)
            this.setState({
                usuarios: lista
            });
            console.log(this.state.usuarios)
        })   
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

      handleCriteria= (eventKey, event) => {
        this.setState({
            Criteria: eventKey
        })
      console.log(eventKey)
  }

    render(){
        return(
            <div className="categoria">
                <form>
                <FormGroup controlId="Busqueda" className="searchbar">
                    <InputGroup>
                    <FormControl type="text" onChange={this.handleChange}/>
                    <DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon" title={this.state.Criteria}>
                        <MenuItem onSelect={(e) => this.handleCriteria("Email", e)} key="1">Email</MenuItem>
                        <MenuItem onSelect={(e) => this.handleCriteria("Apodo", e)}key="2">Apodo</MenuItem>
                    </DropdownButton>
                    </InputGroup>
                </FormGroup>
                          </form>
            {
                this.state.usuarios != null?
                <div>
                {
                    this.state.usuarios.map((objeto, index) =>{
                        if(this.state.Busqueda === ""){
                            return(
                                <div key={index} className="arreglo"> 
                                <Panel bsStyle="info">
                                    <Panel.Heading>
                                    <Panel.Title componentClass="h3"><Link  to={`/Unperfil/${this.state.usuarios[index].id}`}>{this.state.usuarios[index].apodo}</Link></Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>
                                    <p> Correo: {this.state.usuarios[index].email}</p>
                                    <p> Numero de Servicios del Usuario: {this.state.usuarios[index].NumeroServicio}</p>
                                    <p> Numero de Cursos del Usuario: {this.state.usuarios[index].NumeroCursos}</p>
                                    </Panel.Body>
                                </Panel>
                                </div>
                            )
                        }else
                        {
                            if(this.state.Criteria === "Email"){
                                if(this.state.usuarios[index].email.toLowerCase().indexOf(this.state.Busqueda.toLowerCase()) > -1){
                                    return(
                                        <div key={index} className="arreglo"> 
                                        <Panel bsStyle="info">
                                    <Panel.Heading>
                                    <Panel.Title componentClass="h3"><Link  to={`/Unperfil/${this.state.usuarios[index].id}`}>{this.state.usuarios[index].apodo}</Link></Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>
                                    <p> Correo: {this.state.usuarios[index].email}</p>
                                    <p> Numero de Servicios del Usuario: {this.state.usuarios[index].NumeroServicio}</p>
                                    <p> Numero de Cursos del Usuario: {this.state.usuarios[index].NumeroCursos}</p>
                                    </Panel.Body>
                                </Panel>
                                        </div>
                                    )
                                }
                            }else{
                                if(this.state.Criteria === "Apodo"){
                                    if(this.state.usuarios[index].apodo.toLowerCase().indexOf(this.state.Busqueda.toLowerCase()) > -1){
                                        return(
                                            <div key={index} className="arreglo"> 
                                            <Panel bsStyle="info">
                                    <Panel.Heading>
                                    <Panel.Title componentClass="h3"><Link  to={`/Unperfil/${this.state.usuarios[index].id}`}>{this.state.usuarios[index].apodo}</Link></Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>
                                    <p> Correo: {this.state.usuarios[index].email}</p>
                                    <p> Numero de Servicios del Usuario: {this.state.usuarios[index].NumeroServicio}</p>
                                    <p> Numero de Cursos del Usuario: {this.state.usuarios[index].NumeroCursos}</p>
                                    </Panel.Body>
                                </Panel>
                                            </div>
                                        )
                                    }
                                }
                            }
                        } 
                    })
                }
                </div>
                :
                <p>hola</p>
            }
            

            </div>
        )
    }
}


export default Vusuarios