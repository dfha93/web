import React from "react";
import {getAllServices, getAllServicesByCategory} from "../../API/api";
import {MenuItem, FormGroup,FormControl, InputGroup, DropdownButton, Panel, Image, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../../css/_vservices.css'


class Vservicios extends React.Component{
    constructor(props){
        super(props);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCriteria = this.handleCriteria.bind(this);
        this.regresar = this.regresar.bind(this);
        this.state = {
            services:[],
            Busqueda: "",
            Criteria: "Servicio"
          };
    }

    componentWillMount(){
        getAllServicesByCategory(this.props.match.params.categoria)
        .then(usuarios=>{
            console.log(usuarios)
            this.setState({
                services: usuarios
            });
            console.log(this.state.services)
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

      regresar(e){
        this.props.history.push("/Categorias")
      }

    render(){
        return(
            <div>
                <Button bsStyle="link" onClick={this.regresar}>Regresar</Button>
                  <FormGroup controlId="Busqueda" className="searchbar">
                    <InputGroup>
                    <FormControl type="text" onChange={this.handleChange}/>
                    
                    <DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon" title={this.state.Criteria}>
                        <MenuItem onSelect={(e) => this.handleCriteria("Servicio", e)} key="1">Servicio</MenuItem>
                        <MenuItem onSelect={(e) => this.handleCriteria("Email", e)} key="2">Email</MenuItem>
                        <MenuItem onSelect={(e) => this.handleCriteria("Apodo", e)}key="3">Apodo</MenuItem>
                    </DropdownButton>
                    </InputGroup>
                </FormGroup>
                
            {
                this.state.services != null?
                <div>
                {
                    
                    this.state.services.map((objeto, index) =>{
                        if(this.state.services[index].services.length > 0){
                            return(
                                this.state.services[index].services.map((objeto, idx)=>{
                                    console.log("hola")
                                    //console.log(this.state.services[index].services[idx])
                                    if(this.state.Busqueda === ""){
                                        return(
                                            <div key={idx} className="arreglo"> 
                                            <Panel bsStyle="success">
                                            <Panel.Heading>
                                            <Panel.Title componentClass="h3"><Link  to={`/Unservicio/${this.state.services[index].id}/${this.state.services[index].services[idx].id}`}>{this.state.services[index].services[idx].NServicio}</Link></Panel.Title>
                                            </Panel.Heading>
                                            <Panel.Body>
                                                <div className="row">
                                                    <div className="column1">
                                                        <p>Publicado por: <b>{this.state.services[index].apodo}</b> Mail: <b>{this.state.services[index].email}</b></p>
                                                        <p>Ciudad: {this.state.services[index].services[idx].Lugar} &nbsp;&nbsp;&nbsp;&nbsp; </p>
                                                        <p>Direccion: {this.state.services[index].services[idx].Direccion}</p>
                                                        <p>Telefono: {this.state.services[index].services[idx].Telefono}</p>
                                                    </div>
                                                    <div className="column2-2">
                                                        <Image src={this.state.services[index].services[idx].url} className="image"   rounded/>
                                                    </div>
                                                </div>
                                                <br/>
                                                <p> Descripcion: {this.state.services[index].services[idx].Descripcion} </p>
                                            </Panel.Body>
                                        </Panel>
                                            {console.log(index)}
                                            
                                            </div>
                                        )
                                    }
                                    else
                                    {
                                        if(this.state.Criteria === "Servicio"){
                                            if(this.state.services[index].services[idx].NServicio.toLowerCase().indexOf(this.state.Busqueda.toLowerCase()) > -1){
                                                return(
                                                    <div key={idx} className="arreglo"> 
                                                        <Panel bsStyle="success">
                                                            <Panel.Heading>
                                                            <Panel.Title componentClass="h3"><Link  to={`/Unservicio/${this.state.services[index].id}/${this.state.services[index].services[idx].id}`}>{this.state.services[index].services[idx].NServicio}</Link></Panel.Title>
                                                            </Panel.Heading>
                                                            <Panel.Body>
                                                            <div className="row">
                                                    <div className="column1">
                                                        <p>Publicado por: <b>{this.state.services[index].apodo}</b> Mail: <b>{this.state.services[index].email}</b></p>
                                                        <p>Ciudad: {this.state.services[index].services[idx].Lugar} &nbsp;&nbsp;&nbsp;&nbsp; </p>
                                                        <p>Direccion: {this.state.services[index].services[idx].Direccion}</p>
                                                        <p>Telefono: {this.state.services[index].services[idx].Telefono}</p>
                                                    </div>
                                                    <div className="column2-2">
                                                        <Image src={this.state.services[index].services[idx].url} className="image"   rounded/>
                                                    </div>
                                                </div>
                                                <br/>
                                                <p> Descripcion: {this.state.services[index].services[idx].Descripcion} </p>
                                                            </Panel.Body>
                                                        </Panel>
                                                    </div>
                                                )
                                            }
                                        }else
                                        {
                                            if(this.state.Criteria === "Email"){
                                                if(this.state.services[index].email.toLowerCase().indexOf(this.state.Busqueda.toLowerCase()) > -1){
                                                    return(
                                                        <div key={idx} className="arreglo"> 
                                                            <Link  to={`/Unservicio/${this.state.services[index].id}/${this.state.services[index].services[idx].id}`}>{this.state.services[index].services[idx].NServicio}</Link> 
                                                            <Panel bsStyle="success">
                                                                <Panel.Heading>
                                                                <Panel.Title componentClass="h3"><Link  to={`/Unservicio/${this.state.services[index].id}/${this.state.services[index].services[idx].id}`}>{this.state.services[index].services[idx].NServicio}</Link></Panel.Title>
                                                                </Panel.Heading>
                                                                <Panel.Body>
                                                                <div className="row">
                                                                    <div className="column1">
                                                                        <p>Publicado por: <b>{this.state.services[index].apodo}</b> Mail: <b>{this.state.services[index].email}</b></p>
                                                                        <p>Ciudad: {this.state.services[index].services[idx].Lugar} &nbsp;&nbsp;&nbsp;&nbsp; </p>
                                                                        <p>Direccion: {this.state.services[index].services[idx].Direccion}</p>
                                                                        <p>Telefono: {this.state.services[index].services[idx].Telefono}</p>
                                                                    </div>
                                                                    <div className="column2-2">
                                                                        <Image src={this.state.services[index].services[idx].url} className="image"   rounded/>
                                                                    </div>
                                                                </div>
                                                                <br/>
                                                                <p> Descripcion: {this.state.services[index].services[idx].Descripcion} </p>
                                                                </Panel.Body>
                                                            </Panel>
                                                        </div>
                                                    )
                                                }
                                            }else{
                                                if(this.state.Criteria === "Apodo"){
                                                    if(this.state.services[index].apodo.toLowerCase().indexOf(this.state.Busqueda.toLowerCase()) > -1){
                                                        return(
                                                            <div key={idx} className="arreglo"> 
                                                                <Panel bsStyle="success">
                                                                    <Panel.Heading>
                                                                    <Panel.Title componentClass="h3"><Link  to={`/Unservicio/${this.state.services[index].id}/${this.state.services[index].services[idx].id}`}>{this.state.services[index].services[idx].NServicio}</Link></Panel.Title>
                                                                    </Panel.Heading>
                                                                    <Panel.Body>
                                                                    <div className="row">
                                                                        <div className="column1">
                                                                            <p>Publicado por: <b>{this.state.services[index].apodo}</b> Mail: <b>{this.state.services[index].email}</b></p>
                                                                            <p>Ciudad: {this.state.services[index].services[idx].Lugar} &nbsp;&nbsp;&nbsp;&nbsp; </p>
                                                                            <p>Direccion: {this.state.services[index].services[idx].Direccion}</p>
                                                                            <p>Telefono: {this.state.services[index].services[idx].Telefono}</p>
                                                                        </div>
                                                                        <div className="column2-2">
                                                                            <Image src={this.state.services[index].services[idx].url} className="image"   rounded/>
                                                                        </div>
                                                                    </div>
                                                                    <br/>
                                                                    <p> Descripcion: {this.state.services[index].services[idx].Descripcion} </p>
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

export default Vservicios