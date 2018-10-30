import React from 'react';
import LoaderButton from "./loaderbutton";
import {HelpBlock, FormGroup,FormControl, Modal,Button} from "react-bootstrap";
import '../css/_sugerencia.css'
import {EnviarPeticion} from "../API/api";



class Peticion extends React.Component{


    constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Upload = this.Upload.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.state = {
        userId:null,
        Hora:"",
        Sugerencia:"",
        File:null,
        show:false,
        url:""
    }

}

handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    console.log(this.state.File.value);
    event.preventDefault();
    var currentdate = new Date(); 
    var datetime = "Publicado en: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " a las "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();
    const _Contenido = {
        userId:this.props.loggedUser.id,
        userMail:this.props.loggedUser.email.email,
        Contenido:this.state.Sugerencia,
        date:datetime,
        url:this.state.url,
        apodo: this.props.loggedUser.apodo
        }
        if (this.state.File.files[0] !== undefined){
            EnviarPeticion(this.props.loggedUser.id,_Contenido,this.state.File.files[0])
            this.props.history.push("/Sesion")
        }else{
            console.log("Deberia entrar")
            this.setState({
                show:true
            })
        }
    
   // .then(()=>{window.location='/Sesion'});
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

  fileSelected = e =>{
      console.log(e.target.files[0])
  }

  handleHide() {
    this.setState({ show: false });
  }

  

render(){
    return(
        <div className="sugerencia">
        <h1>Especifique sus Titulos y Experiencias</h1>
       
        <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="Sugerencia" bsSize="large">
            <FormControl componentClass="textarea"
                autoFocus
                type="text"
                value={this.state.Sugerencia}
                onChange={this.handleChange}
                className="prueba"
            />
            <h7>Montar un comprimido que contenga sus diplomas y/o certificados.</h7>
            </FormGroup>

            <br></br>
            <LoaderButton block bsSize="large"  text="Cargar Archivo" id="custom-button" onClick={e=>this.Upload(e)}/>
            <div hidden="hidden">
            <input type="file" id="real-file"/>
                <span id="custom-text">No file chosen, yet.</span>
            </div>
            
            <br></br>
            <LoaderButton
            block
            bsSize="large"
            text="Enviar"
            type="submit"
            disabled={this.state.File===null?true:false}
            //loadingText="Enviando..."
            />
            <div className="modal-container" style={{ height: 200 }}>
                <Modal
                show={this.state.show}
                onHide={this.handleHide}
                container={this}
                aria-labelledby="contained-modal-title"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                    Contained Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                No ha cargado ningun Archivo
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleHide}>Close</Button>
                </Modal.Footer>
                </Modal>
            </div>          
            </form>
            
       </div>
    )
}

}

export default Peticion