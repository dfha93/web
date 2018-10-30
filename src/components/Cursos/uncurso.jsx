import React from 'react';
import {getCurso, EnviarComentario2, getUserById, RestarCupos,Suscribirse,ComprobarSuscripcion
    ,ComprobarVotantes,ActualizarUsuarioVotar,ActualizarNVotos,ActualizarCalificacion} from "../../API/api";
import LoaderButton from "../loaderbutton";
import {FormGroup,FormControl, ControlLabel, Button, DropdownButton,MenuItem,
Panel, Image} from "react-bootstrap";
import '../../css/_unservicio.css'


class Uncurso extends React.Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
        this.handleSubmit3 = this.handleSubmit3.bind(this);
        this.onDropDownChange = this.onDropDownChange.bind(this);

        this.state = {
            userId:null,
            cursoId:null,
            curso:null,
            visitante:null,
            Descripcion:"",
            Hora:"",
            Lugar:"",
            NCurso:"",
            Comentario:"",
            apodo:"",
            email:"",
            califico:false,
            block:false,
            calificacion:"",
            calificacionTotal:"",
            NVotos:"",
            blockCalificacion:true,
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
      apodo:this.state.apodo
    }
    console.log(_comment);
    EnviarComentario2(this.state.userId,this.state.curso.id, _comment).then(window.location.reload(true));

      }

      handleSubmit2 = async event => {
        event.preventDefault();
        RestarCupos(this.state.userId,this.state.cursoId,this.state.curso.Cupos)
        .then(Suscribirse(this.state.userId,this.state.cursoId,this.state.visitante).then(window.location='/Uncurso/'+this.state.userId+"/"+this.state.cursoId));
      }

      handleSubmit3 = async event => {
        event.preventDefault();
        
        ActualizarNVotos(this.state.userId, this.state.cursoId, this.state.NVotos)
        .then(ActualizarCalificacion(this.state.userId, this.state.cursoId, 
            this.state.Sumatoria, this.state.calificacion)
        .then(ActualizarUsuarioVotar(this.state.userId, this.state.cursoId, this.props.loggedUser.id)
        .then(window.location='/Uncurso/'+this.state.userId+"/"+this.state.cursoId)))
      }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

   componentWillMount(){
    console.log(this.props.loggedUser.email.email)   
    const pars={
           userId:this.props.match.params.userId,
           cursoId:this.props.match.params.cursoId
       };
       console.log(pars)

       getCurso(pars.userId, pars.cursoId)
       .then(curso=>{
        console.log(curso)

       this.setState({
           
           userId: pars.userId,
           curso: curso,
           cursoId: pars.cursoId,
           NVotos: curso.Votos,
           calificacionTotal:curso.Calificacion,
           Sumatoria: curso.Sumatoria,
           url: curso.url[0].url,
           urlId: curso.url[0].urlId
       })
       console.log(this.state.curso)
    })

    getUserById(pars.userId)
    .then(user => {
        console.log(user)
        this.setState({
            apodo:user.apodo,
            email:user.email.email,
        })
    })

    const temp ={
        apodo:this.props.loggedUser.apodo,
        email:this.props.loggedUser.email.email,
        id: this.props.loggedUser.id,
        califico: this.state.califico
    }
    this.state.visitante=temp


    ComprobarSuscripcion(pars.userId, pars.cursoId, this.props.loggedUser.id)
    .then(val =>{
        if (val !== undefined) {
            this.setState({
                block:val
            })
        }else{
            this.setState({
                block:false
            })
        }
        
    })

    ComprobarVotantes(pars.userId,pars.cursoId,this.props.loggedUser.id)
    .then(val2 => {
        console.log(val2)
        this.setState({
            califico:val2
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
            {console.log(this.state.block)}
            {
                this.state.curso != null?
                <div className="arreglo">
                <Panel bsStyle="warning">
                <Panel.Heading>
                <Panel.Title componentClass="h3"><p><b>{"Nombre del Curso: "+this.state.curso.NCurso}</b></p></Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                <div className="centrarImagen">
                    <Image src={this.state.url} className="image"   rounded/>
                </div>
                <br/>
                <p>{"Publicado por: "+this.state.apodo}</p>
                    <p>{"Correo: "+this.state.email}</p>
                    <p>{"Fecha de Inicio: "+this.state.curso.dateInicio}</p>
                    <p>{"Fecha de Finalizacion: "+this.state.curso.dateFin}</p>
                    <p>{"Descripcion: "+this.state.curso.Descripcion}</p>
                    <p>{"Ciudad: "+this.state.curso.Lugar+", Lugar: "+this.state.curso.Direccion+", Hora: "+this.state.curso.Hora}</p>
                    <p>{"Cupos Disponibles: "+ (parseInt(this.state.curso.Cupos,10))}</p>
                    <p>{"Telefono: "+this.state.curso.Telefono}</p>
                    <p>{"Rating Actual: " + this.state.calificacionTotal} </p>
                </Panel.Body>
            </Panel>
                    <form onSubmit={this.handleSubmit3} className="espacio" disabled={!this.state.block}>
                    <FormGroup    controlId="Categoria" bsSize="large" className="comment">
                    <ControlLabel>Vote: </ControlLabel>
                    <DropdownButton disabled={this.state.califico || !this.state.block} title={this.state.calificacion} id="0">
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
                </div>
                :
                null
            }
            <form onSubmit={this.handleSubmit2} className="inscribirse">
                        <LoaderButton
                        block
                        bsSize="large"
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Inscribirse"
                        loadingText="Enviando..."
                        className="color"
                        disabled={this.state.block}
                        />
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
                    this.state.curso != null?
                    <div>
                    {
                        this.state.curso.Comentarios.length > 0?
                        <div>
                        {
                            this.state.curso.Comentarios.map((objeto, index) => {
                                console.log(this.state.cursoId)
                                console.log(this.state.curso.Comentarios[index].commenterId)
                                if (this.state.userId === this.state.curso.Comentarios[index].commenterId) {
                                    return(               
                                        <p className="comentariosOwner" key={index}> <b>{this.state.curso.Comentarios[index].commenterMail}</b> dice: <br></br> {this.state.curso.Comentarios[index].Comentario} <br></br> <br></br> 
                                        <small>{this.state.curso.Comentarios[index].date}</small> </p>               
                                    );
                                }else{
                                    
                                    return(            
                                        <p className="comentarios" key={index}> <b>{this.state.curso.Comentarios[index].commenterMail}</b> dice: <br></br> {this.state.curso.Comentarios[index].Comentario} <br></br> <br></br> 
                                        <small>{this.state.curso.Comentarios[index].date}</small> </p>               
                                    );
                                } 
                            })
                        }
                        </div>    
                        :
                        //<p>{this.state.curso.Comentarios.legth}</p>
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


export default Uncurso
// {this.state.par}