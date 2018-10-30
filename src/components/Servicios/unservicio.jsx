import React from 'react';
import {getService, EnviarComentario, getUserById,
    VotarServicioUsuarios,ComprobarVotantesServicio,ActualizarNVotosServicio
    ,ActualizarCalificacionServicio} from "../../API/api";
import LoaderButton from "../loaderbutton";
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {Route} from 'react-router-dom';
import {Panel, FormGroup,FormControl, ControlLabel, MenuItem, DropdownButton, Button, Image} from "react-bootstrap";
import '../../css/_unservicio.css'


class Unservicio extends React.Component{
    constructor(){
        super()
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit3 = this.handleSubmit3.bind(this);
        this.onDropDownChange = this.onDropDownChange.bind(this);
        this.state = {
            userId:null,
            serviceId:null,
            service:null,
            Descripcion:"",
            Lugar:"",
            NServicio:"",
            Comentario:"",
            apodo:"",
            email:"",
            blockCalificacion:true,
            block:false,
            calificacion:"0",
            calificacionTotal:"",
            Visitante:null,
            NVotos:"",
            Sumatoria:"",
            url:null,
            urlId:null
        }
        
    }

    onDropDownChange=(val, e)=>{
        if(val !== "0"){
        this.setState({
            calificacion:val,
            blockCalificacion:false
            })
        }else{
            this.setState({
                calificacion:val,
                blockCalificacion:true
            })
        }
        
      }

    handleSubmit = async event => {
        event.preventDefault();
        var currentdate = new Date(); 
        var datetime = "Publicado en: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " a las "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();
        this.setState({ isLoading: true });
        
    const _comment = {
      commenterId:this.props.loggedUser.id,
      Comentario:this.state.Comentario,
      commenterMail:this.props.loggedUser.email.email,
      date:datetime,
      apodo:this.props.loggedUser.apodo
    }
    console.log(_comment);
    EnviarComentario(this.state.userId,this.state.service.id, _comment).then(window.location.reload(true));

      }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

      handleSubmit3 = async event => {
        event.preventDefault();
        VotarServicioUsuarios(this.state.userId, this.state.serviceId, this.state.Visitante)
        .then(ActualizarNVotosServicio(this.state.userId, this.state.serviceId, this.state.NVotos)
        .then(ActualizarCalificacionServicio(this.state.userId, this.state.serviceId, 
            this.state.Sumatoria, this.state.calificacion)
            .then(()=>{window.location='/Unservicio/'+this.state.userId+"/"+this.state.serviceId})))
        
      }

   componentWillMount(){
    console.log(this.props.loggedUser.email.email)   
    const pars={
           userId:this.props.match.params.userId,
           servicioId:this.props.match.params.serviceId
       };
       console.log(pars)

       getService(pars.userId, pars.servicioId)
       .then(servicio=>{
        //console.log(servicio.url[0].url)

       this.setState({
           
           userId: pars.userId,
           serviceId: pars.servicioId,
           service: servicio,
           NVotos: servicio.NVoto,
           calificacionTotal: servicio.Calificacion,
           Sumatoria: servicio.Sumatoria,
           url: servicio.url[0].url,
           urlId: servicio.url[0].urlId
       })
    })

    getUserById(pars.userId)
    .then(user => {
        console.log(user)
        this.setState({
            apodo:user.apodo,
            email:user.email.email
        })
    })

    const temp={
        id:this.props.loggedUser.id,
        apodo:this.props.loggedUser.apodo,
        email:this.props.loggedUser.email.email,
        califico:true
    }
    console.log(this.props.loggedUser)
    this.setState({
        Visitante:temp
    })

    ComprobarVotantesServicio(pars.userId, pars.servicioId, temp.id)
    .then(val => {
        console.log(val)
        this.setState({
            block:val
        })
    })
   }

   validateForm() {
    return (
      this.state.Comentario.length > 0
    );
  }
    
    render(){
        return(
        <div>
            {
                this.state.service != null?
                <div className="arreglo">

                <Panel bsStyle="success">
                    <Panel.Heading>
                    <Panel.Title componentClass="h3"><p><b>{"Nombre del Servicio: "+this.state.service.NServicio}</b></p></Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <div className="centrarImagen">
                            <Image src={this.state.url} className="image"   rounded/>
                        </div>
                        <br/>
                    <p>{"Publicado por:  "+this.state.apodo} &nbsp;&nbsp;&nbsp;&nbsp; {"Correo: "+this.state.email}</p>
                    <p>{"Ciudad: "+this.state.service.Lugar}</p>
                    <p>{"Direccion: "+this.state.service.Direccion} &nbsp;&nbsp;&nbsp;&nbsp; {"Telefono: "+this.state.service.Telefono}</p>
                    <p>{"Descripcion: "+this.state.service.Descripcion}</p>
                    </Panel.Body>
                </Panel>
                    
                </div>
                :
                null
            }

            <form onSubmit={this.handleSubmit3} className="arreglo">
            <FormGroup controlId="Categoria" bsSize="large">
            <ControlLabel>{"Califique: "}</ControlLabel>
            <DropdownButton disabled={this.state.block} title={this.state.calificacion} id="0">
                <MenuItem onSelect={(e) => this.onDropDownChange("0", e)} key="0">0</MenuItem>
                <MenuItem onSelect={(e) => this.onDropDownChange("1", e)} key="1">1</MenuItem>
                <MenuItem onSelect={(e) => this.onDropDownChange("2", e)}key="2">2</MenuItem>
                <MenuItem onSelect={(e) => this.onDropDownChange("3", e)}key="3">3</MenuItem>
                <MenuItem onSelect={(e) => this.onDropDownChange("4", e)}key="4">4</MenuItem>
                <MenuItem onSelect={(e) => this.onDropDownChange("5", e)}key="5">5</MenuItem>
            </DropdownButton>
            <Button onClick={this.handleSubmit3} disabled={this.state.blockCalificacion}>Votar</Button>
            </FormGroup>
            </form>

            <form onSubmit={this.handleSubmit} className="comentario">
            <FormGroup controlId="Comentario" bsSize="large">
            <ControlLabel>Comentarios</ControlLabel>
            <FormControl componentClass="textarea"
                autoFocus
                type="text"
                value={this.state.Comentario}
                onChange={this.handleChange}
                className="prueba"
            />
            </FormGroup>
            <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Comentar"
            loadingText="Enviando..."
            />
            </form>

            <div>
                {   
                    this.state.service != null?
                    <div>
                    {
                        this.state.service.Comentarios.length > 0?
                        <div>
                        {
                            this.state.service.Comentarios.map((objeto, index) => {
                                if (this.state.userId === this.state.service.Comentarios[index].commenterId) {
                                    return(           
                                        <p className="comentariosOwner" key={index}> <b>{this.state.service.Comentarios[index].commenterMail}</b> dice: <br></br> {this.state.service.Comentarios[index].Comentario} <br></br> <br></br> 
                                        <small>{this.state.service.Comentarios[index].date}</small> </p>               
                                    );
                                }else{
                                    return(           
                                        <p className="comentarios" key={index}> <b>{this.state.service.Comentarios[index].commenterMail}</b> dice: <br></br> {this.state.service.Comentarios[index].Comentario} <br></br> <br></br> 
                                        <small>{this.state.service.Comentarios[index].date}</small> </p>               
                                    );
                                }
                                
                            })
                        }
                        </div>    
                        :
                        //<p>{this.state.service.Comentarios.legth}</p>
                        null
                        
                        
                    }
                    </div>
                    :
                    null
                }
            </div>

        </div>
        )

    }
}


export default Unservicio
// {this.state.par}