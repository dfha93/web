import React from 'react';
import LoaderButton from "./loaderbutton";
import {HelpBlock, FormGroup,FormControl, ControlLabel} from "react-bootstrap";
import '../css/_sugerencia.css'
import {EnviarSugerencia} from "../API/api";



class Sugerencias extends React.Component{


    constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        userId:null,
        Hora:"",
        Sugerencia:"",
    }

}

handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
      console.log("prueba");
    event.preventDefault();
    var currentdate = new Date(); 
    var datetime = "Publicado en: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " a las "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();
    const _Sugerencia = {
        commenterId:this.props.loggedUser.id,
        commenterMail:this.props.loggedUser.email.email,
        Sugerencia:this.state.Sugerencia,
        date:datetime,
        apodo: this.props.loggedUser.apodo
        }
    EnviarSugerencia(_Sugerencia)
    .then(()=>{window.location='/Sesion'});
  }

render(){
    return(
        <div className="sugerencia">
        <h1>Sugerencias</h1>
        <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="Sugerencia" bsSize="large">
            <FormControl componentClass="textarea"
                autoFocus
                type="text"
                value={this.state.Sugerencia}
                onChange={this.handleChange}
                className="prueba"
            />
            </FormGroup>
            <LoaderButton
            block
            bsSize="large"
            text="Enviar"
            type="submit"
            //loadingText="Enviando..."
            />
            </form>
       </div>
    )
}

}

export default Sugerencias