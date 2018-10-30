import React from "react";
import {getAllCoursesByCategory} from "../../API/api";
import {MenuItem, FormGroup,FormControl, InputGroup, DropdownButton, Panel, Image, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../../css/_vservices.css'


class Vcursos extends React.Component{
    constructor(props){
        super(props);
        this.handleCriteria = this.handleCriteria.bind(this);        
        this.handleChange = this.handleChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.regresar = this.regresar.bind(this);
        this.state = {
            cursos:[],
            Busqueda: "",
            Criteria: "Curso"
          };
    }

    componentWillMount(){
     getAllCoursesByCategory(this.props.match.params.categoria)
        .then(usuarios=>{
            console.log(usuarios)
            this.setState({
                cursos: usuarios
            });
            console.log(this.state.cursos)
        })
        
        
    }

    handleCriteria= (eventKey, event) => {
        this.setState({
            Criteria: eventKey
        })
      console.log(eventKey)
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  regresar(e){
    this.props.history.push("/Categorias2")
  }

    render(){
        return(
            <div>
                <Button bsStyle="link" onClick={this.regresar}>Regresar</Button>
                  <FormGroup controlId="Busqueda" className="searchbar">
                    <InputGroup>
                    <FormControl type="text" onChange={this.handleChange}/>
                    <DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon" title={this.state.Criteria}>
                        <MenuItem onSelect={(e) => this.handleCriteria("Curso", e)} key="1">Curso</MenuItem>
                        <MenuItem onSelect={(e) => this.handleCriteria("Email", e)} key="2">Email</MenuItem>
                        <MenuItem onSelect={(e) => this.handleCriteria("Apodo", e)}key="3">Apodo</MenuItem>
                    </DropdownButton>
                    </InputGroup>
                </FormGroup>
            {
                this.state.cursos != null?
                <div>
                {
                    this.state.cursos.map((objeto, index) =>{
                        if(this.state.cursos[index].cursos.length > 0){
                            return(
                            this.state.cursos[index].cursos.map((objeto, idx)=>{
                                //console.log(this.state.cursos[index].cursos[idx])
                                if(this.state.Busqueda === ""){
                                    return(
                                        <div key={idx} className="arreglo"> 
                                        <Panel bsStyle="warning">
                                        <Panel.Heading>
                                        <Panel.Title componentClass="h3"><Link  to={`/Uncurso/${this.state.cursos[index].id}/${this.state.cursos[index].cursos[idx].id}`}>{this.state.cursos[index].cursos[idx].NCurso}</Link> </Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body>
                                            <div className="row">
                                                <div className="column1">
                                                    <p> Publicado por: <b>{this.state.cursos[index].apodo}</b> Mail: <b>{this.state.cursos[index].email}</b></p>
                                                    <p> Ciudad: {this.state.cursos[index].cursos[idx].Lugar} </p>
                                                    <p> Feche de Inicio: {this.state.cursos[index].cursos[idx].dateInicio}</p>
                                                    <p> Feche de Finalizacion: {this.state.cursos[index].cursos[idx].dateFin}</p>
                                                    <p> Hora: {this.state.cursos[index].cursos[idx].Hora}</p>
                                                    <p> Direccion: {this.state.cursos[index].cursos[idx].Direccion} </p> 
                                                    <p> Telefono: {this.state.cursos[index].cursos[idx].Telefono}</p>
                                                </div>
                                                <div className="column2-2">
                                                    <Image src={this.state.cursos[index].cursos[idx].url} className="image"   rounded/> 
                                                </div>
                                            </div>
                                        
                                        <p> Descripcion: {this.state.cursos[index].cursos[idx].Descripcion} </p>
                                        <p> Cupos Disponibles: {this.state.cursos[index].cursos[idx].Cupos}</p>
                                        <p> Calificacion:{this.state.cursos[index].cursos[idx].Calificacion} </p>
                                        </Panel.Body>
                                    </Panel>
                                        
                                        </div>
                                    )
                                }else
                                {
                                    if(this.state.Criteria === "Curso"){
                                        if(this.state.cursos[index].cursos[idx].NCurso.toLowerCase().indexOf(this.state.Busqueda.toLowerCase()) > -1){
                                            return(
                                                <div key={idx} className="arreglo"> 
                                                    <Panel bsStyle="warning">
                                                        <Panel.Heading>
                                                        <Panel.Title componentClass="h3"><Link  to={`/Uncurso/${this.state.cursos[index].id}/${this.state.cursos[index].cursos[idx].id}`}>{this.state.cursos[index].cursos[idx].NCurso}</Link> </Panel.Title>
                                                        </Panel.Heading>
                                                        <Panel.Body>
                                                        <div className="row">
                                                            <div className="column1">
                                                                <p> Publicado por: <b>{this.state.cursos[index].apodo}</b> Mail: <b>{this.state.cursos[index].email}</b></p>
                                                                <p> Ciudad: {this.state.cursos[index].cursos[idx].Lugar} </p>
                                                                <p> Feche de Inicio: {this.state.cursos[index].cursos[idx].dateInicio}</p>
                                                                <p> Feche de Finalizacion: {this.state.cursos[index].cursos[idx].dateFin}</p>
                                                                <p> Hora: {this.state.cursos[index].cursos[idx].Hora}</p>
                                                                <p> Direccion: {this.state.cursos[index].cursos[idx].Direccion} </p> 
                                                                <p> Telefono: {this.state.cursos[index].cursos[idx].Telefono}</p>
                                                            </div>
                                                            <div className="column2-2">
                                                                <Image src={this.state.cursos[index].cursos[index].url} className="image"   rounded/> 
                                                            </div>
                                                        </div>
                                                    
                                                        <p> Descripcion: {this.state.cursos[index].cursos[idx].Descripcion} </p>
                                                        <p> Cupos Disponibles: {this.state.cursos[index].cursos[idx].Cupos}</p>
                                                        <p> Calificacion:{this.state.cursos[index].cursos[idx].Calificacion} </p>
                                                        </Panel.Body>
                                                    </Panel>
                                                </div>
                                            )
                                        }
                                    }else
                                    {
                                        if(this.state.Criteria === "Email"){
                                            if(this.state.cursos[index].email.toLowerCase().indexOf(this.state.Busqueda.toLowerCase()) > -1){
                                                return(
                                                    <div key={idx} className="arreglo"> 
                                                        <Panel bsStyle="warning">
                                                            <Panel.Heading>
                                                            <Panel.Title componentClass="h3"><Link  to={`/Uncurso/${this.state.cursos[index].id}/${this.state.cursos[index].cursos[idx].id}`}>{this.state.cursos[index].cursos[idx].NCurso}</Link> </Panel.Title>
                                                            </Panel.Heading>
                                                            <Panel.Body>
                                                            <div className="row">
                                                                <div className="column1">
                                                                    <p> Publicado por: <b>{this.state.cursos[index].apodo}</b> Mail: <b>{this.state.cursos[index].email}</b></p>
                                                                    <p> Ciudad: {this.state.cursos[index].cursos[idx].Lugar} </p>
                                                                    <p> Feche de Inicio: {this.state.cursos[index].cursos[idx].dateInicio}</p>
                                                                    <p> Feche de Finalizacion: {this.state.cursos[index].cursos[idx].dateFin}</p>
                                                                    <p> Hora: {this.state.cursos[index].cursos[idx].Hora}</p>
                                                                    <p> Direccion: {this.state.cursos[index].cursos[idx].Direccion} </p> 
                                                                    <p> Telefono: {this.state.cursos[index].cursos[idx].Telefono}</p>
                                                                </div>
                                                                <div className="column2-2">
                                                                    <Image src={this.state.cursos[index].cursos[index].url} className="image"   rounded/> 
                                                                </div>
                                                            </div>
                                                        
                                                            <p> Descripcion: {this.state.cursos[index].cursos[idx].Descripcion} </p>
                                                            <p> Cupos Disponibles: {this.state.cursos[index].cursos[idx].Cupos}</p>
                                                            <p> Calificacion:{this.state.cursos[index].cursos[idx].Calificacion} </p>
                                                            </Panel.Body>
                                                        </Panel>
                                                    </div>
                                                )
                                            }
                                        }else{
                                            if(this.state.Criteria === "Apodo"){
                                                if(this.state.cursos[index].apodo.toLowerCase().indexOf(this.state.Busqueda.toLowerCase()) > -1){
                                                    return(
                                                        <div key={idx} className="arreglo"> 
                                                            <Panel bsStyle="warning">
                                                                <Panel.Heading>
                                                                <Panel.Title componentClass="h3"><Link  to={`/Uncurso/${this.state.cursos[index].id}/${this.state.cursos[index].cursos[idx].id}`}>{this.state.cursos[index].cursos[idx].NCurso}</Link> </Panel.Title>
                                                                </Panel.Heading>
                                                                <Panel.Body>
                                                                <div className="row">
                                                                <div className="column1">
                                                                    <p> Publicado por: <b>{this.state.cursos[index].apodo}</b> Mail: <b>{this.state.cursos[index].email}</b></p>
                                                                    <p> Ciudad: {this.state.cursos[index].cursos[idx].Lugar} </p>
                                                                    <p> Feche de Inicio: {this.state.cursos[index].cursos[idx].dateInicio}</p>
                                                                    <p> Feche de Finalizacion: {this.state.cursos[index].cursos[idx].dateFin}</p>
                                                                    <p> Hora: {this.state.cursos[index].cursos[idx].Hora}</p>
                                                                    <p> Direccion: {this.state.cursos[index].cursos[idx].Direccion} </p> 
                                                                    <p> Telefono: {this.state.cursos[index].cursos[idx].Telefono}</p>
                                                                </div>
                                                                <div className="column2-2">
                                                                    <Image src={this.state.cursos[index].cursos[index].url} className="image"   rounded/> 
                                                                </div>
                                                            </div>
                                                        
                                                            <p> Descripcion: {this.state.cursos[index].cursos[idx].Descripcion} </p>
                                                            <p> Cupos Disponibles: {this.state.cursos[index].cursos[idx].Cupos}</p>
                                                            <p> Calificacion:{this.state.cursos[index].cursos[idx].Calificacion} </p>
                                                                </Panel.Body>
                                                            </Panel>
                                                        </div>
                                                    )
                                                }
                                            }
                                        }
                                    }
                                }
                                
                            })
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

export default Vcursos