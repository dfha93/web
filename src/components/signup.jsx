import React, { Component } from "react";
import {HelpBlock, FormGroup,FormControl, ControlLabel, Checkbox} from "react-bootstrap";
import {Navbar, Nav,NavDropdown,MenuItem, NavItem} from 'react-bootstrap';
import LoaderButton from "./loaderbutton";
import "../css/_signup.css";
import {Correos,signUpX, logOut, saveUserInDb, UserPersonalInDb, confirmationMail} from "../API/api.jsx";
import { Thumbnail } from "react-bootstrap";
import { get } from "https";


class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.changeRender = this.changeRender.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDropDownChange = this.onDropDownChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.state = {
      estado:0,
      notificaciones:false,
      terminos:false,
      isLoading: false,
      apodo:"",
      nombre:"",
      apellidos:"",
      paisnacimiento:"",
      ciudadnacimiento:"",
      tipodocumento:"",
      fechanacimiento:"",
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      telefono:"",
      ciudadcolombia:"",
      direccioncolombia:"",
      estrato: "",
      fechacolombia:"",
      profesion:"",
      ocupacionactual:"",
      campoexp:"",
      exprecientes1:"",
      exprecientes1ocupacion:"",
      exprecientes1ciudad:"",
      exprecientes1pais:"",
      fechaexp1inicio:"",
      fechaexp1fin:"",
      exprecientes2:"",
      exprecientes2ocupacion:"",
      exprecientes2ciudad:"",
      exprecientes2pais:"",
      fechaexp2inicio:"",
      fechaexp2fin:"",
      statusmigratorios:"",
      numdoc:"",
      numhijos:"",
      afiliado:"Ninguna",
      afiliadoCheck:false,
      refper:"",
      telref:"",
      nacdoble:"Ninguna",
      nacdobleCheck:false,
      newUser: null,
      status: "active",
      type:"user",
      rol:"normal",
      tratdatos:false
    };
  }


  validateForm() {
    return (
      this.state.terminos === true &&
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword &&
      this.state.apodo.length > 0 &&
      this.state.nombre.length > 0 &&
      this.state.apellidos.length > 0 &&
      this.state.statusmigratorios.length > 0 &&
      this.state.numdoc.length > 0 &&
      this.state.paisnacimiento.length > 0 &&
      this.state.ciudadnacimiento.length > 0 &&
      this.state.fechanacimiento.length > 0 &&
      this.state.ciudadcolombia.length > 0 &&
      this.state.direccioncolombia.length > 0 &&
      this.state.estrato.length >0 &&
      this.state.fechacolombia.length > 0 &&
      this.state.profesion.length > 0 &&
      this.state.ocupacionactual.length > 0 &&
      this.state.numhijos.length > 0 &&
      this.state.nacdoble.length >0 &&
      this.state.afiliado.length >0
    );
  }

  handleClick(e, action){
    e.preventDefault();//Eso va siempre
    this.props.history.push(action);
}

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    this.setState({ newUser: "test" });

    this.setState({ isLoading: false });
  }

  onDropDownChange(e, TARGET){
    e.preventDefault();
    if (TARGET === "statusmigratorios") {
      this.setState({
        statusmigratorios:e.target.value
      })
    }
    if (TARGET === "paisnacimiento") {
      this.setState({
        paisnacimiento:e.target.value
      })
    }
    if (TARGET === "profesion") {
      this.setState({
        profesion:e.target.value
      })
    }
    
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();
    

    this.setState({ isLoading: true });

    const _user = {
      email:this.state.email,
      password:this.state.password,
      
    }

const _personal = {
      apodo:this.state.apodo,
      nombre:this.state.nombre,
      apellidos:this.state.apellidos,
      paisnacimiento:this.state.paisnacimiento,
      ciudadnacimiento:this.state.ciudadnacimiento,
      tipodocumento:this.state.tipodocumento,
      fechanacimiento:this.state.fechanacimiento,
      telefono:this.state.telefono,
      ciudadcolombia:this.state.ciudadcolombia,
      direccioncolombia:this.state.direccioncolombia,
      estrato:this.state.estrato,
      fechacolombia:this.state.fechacolombia,
      profesion:this.state.profesion,
      ocupacionactual:this.state.ocupacionactual,
      campoexp:this.state.campoexp,
      exprecientes1:this.state.exprecientes1,
      exprecientes1ocupacion:this.state.exprecientes1ocupacion,
      exprecientes1ciudad:this.state.exprecientes1ciudad,
      exprecientes1pais:this.state.exprecientes1pais,
      fechaexp1inicio:this.state.fechaexp1inicio,
      fechaexp1fin:this.state.fechaexp1fin,
      fechaexp2inicio:this.state.fechaexp2inicio,
      fechaexp2fin:this.state.fechaexp2fin,
      exprecientes2:this.state.exprecientes2,
      exprecientes2ocupacion:this.state.exprecientes2ocupacion,
      exprecientes2ciudad:this.state.exprecientes2ciudad,
      exprecientes2pais:this.state.exprecientes2pais,
      statusmigratorios:this.state.statusmigratorios,
      numdoc:this.state.numdoc,
      numhijos:this.state.numhijos,
      afiliado:this.state.afiliado,
      refper:this.state.refper,
      telref:this.state.telref,
      nacdoble:this.state.nacdoble

}

    console.log(_user);
    
    
      signUpX(_user).then(currentUser => {
        
      if (currentUser) {
        const userId = currentUser.user.uid;
       const  _savedUser = {
          id:userId,
          email: _user.email,
          type:this.state.type,
          status:this.state.status,
          rol:this.state.rol,
          apodo:this.state.apodo
          
          }
          if (this.state.notificaciones === true) {
            Correos(_user.email)
          }
        console.log(_savedUser)
        if (userId) {
          console.log(_user+' prueba')
          confirmationMail(userId)
          saveUserInDb(_savedUser,_personal)
          .then(UserPersonalInDb(_savedUser.id,_personal))
          .then(logOut)
          .then(window.alert("Se ha registrado exitosamente").then(()=>{window.location='/'}));
          
        }
      }
    }).catch(function(e){
      window.alert("Error: " + e.message)
    })
  }

  handleCheck(evt, index) {
    if(index === "0"){
      this.setState({ afiliadoCheck: evt.target.checked });
    }
    if(index === "1"){
      this.setState({ nacdobleCheck: evt.target.checked });
    }
    if(index === "2"){
      this.setState({ terminos: evt.target.checked });
    }
    if(index === "3"){
      this.setState({ notificaciones: evt.target.checked });
    }
  }

  changeRender(e, val){
    e.preventDefault();
    
    if(val=== "Next"){
      this.setState({
        estado:(parseInt(this.state.estado)+1)
      })
      window.scrollTo(0,0)
    }else{
      if (val === "Prev") {
        this.setState({
          estado:(parseInt(this.state.estado)-1)
        })
      }
    }
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
        //  isLoading={this.state.isLoading}
          text="Verify"
         // loadingText="Verifying…"
        />
      </form>
    );
  }

  
  
  renderForm1() {
    return (
      <form >  
        <FormGroup validationState="warning" controlId="apodo" bsSize="large">
          <ControlLabel  style={{ color: 'black' }}>Apodo</ControlLabel>
          <FormControl
          style={{ borderColor: 'black' }}
            autoFocus
            type="text"
            value={this.state.apodo}
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup validationState="warning" controlId="nombre" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Nombre</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
            autoFocus
            type="text"
            value={this.state.nombre}
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup validationState="warning" controlId="apellidos" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Apellidos</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
            autoFocus
            type="text"
            value={this.state.apellidos}
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup validationState="warning" controlId="email" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Email</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup validationState="warning" controlId="password" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Password</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
            placeholder="La contraseña debe por lo menos 6 caracteres."
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup validationState="warning" controlId="confirmPassword" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Confirm Password</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
          <FormControl.Feedback />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
         // onClick={this.register}
          //disabled={!this.validateForm()}
          type="submit"
         // isLoading={this.state.isLoading}
          text="Siguiente"
          href="#top"
          onClick={e => this.changeRender(e,"Next")}
         // loadingText="Signing up…"
        />
      </form>
    );
  }

  renderForm2() {
    return (
      <form>   
        <FormGroup validationState="warning" controlId="statusmigratorios" bsSize="large">
            <ControlLabel style={{ color: 'black' }}>Tipo de Documento</ControlLabel>
              <FormControl style={{ borderColor: 'black' }} componentClass="select" placeholder="select" onChange={e => this.onDropDownChange(e, "statusmigratorios")}>
                <option value="Seleccionar">Selecionar</option>
                <option value="Cedula">Cedula de Ciudadania</option>
                <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                <option value="Cedula Extranjera">Cedula Extranjera</option> 
                <option value="Pasaporte">Pasaporte</option>
                <option value="Permiso Especial De Permanencia">Permiso Especial De Permanencia</option>                
              </FormControl>
              <FormControl.Feedback />
          </FormGroup>
          
          <FormGroup validationState="warning" controlId="numdoc" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Numero de Documento</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
            autoFocus
            type="num"
            value={this.state.numdoc}
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup validationState="warning" controlId="paisnacimiento" bsSize="large">
            <ControlLabel style={{ color: 'black' }}>Pais de Nacimiento</ControlLabel>
              <FormControl style={{ borderColor: 'black' }} componentClass="select" placeholder="select" onChange={e => this.onDropDownChange(e, "paisnacimiento")}>
               <option value="">Seleccione</option>
                <option value="Colombia">Colombia</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Ecuador">Ecuador</option>               
              </FormControl>
              <FormControl.Feedback />
          </FormGroup>

        <FormGroup validationState="warning" controlId="ciudadnacimiento" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Ciudad de Nacimiento</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
            autoFocus
            type="text"
            value={this.state.ciudadnacimiento}
            onChange={this.handleChange}
          />
          
        </FormGroup>
        <FormGroup validationState="warning" controlId="fechanacimiento" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Fecha de Nacimiento</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
            autoFocus
            type="date"
            value={this.state.fechanacimiento}
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <div className="row">
          <div className="column1">
            <LoaderButton
              block
              bsSize="large"
              type="submit"
              text="Anterior"
              onClick={e => this.changeRender(e,"Prev")}
            />
            
          </div>
          <div className="column2-2">
            <LoaderButton
              block
              bsSize="large"
              type="submit"
              text="Siguiente"
              onClick={e => this.changeRender(e,"Next")}
            />
          </div>
        </div>
      </form>
    );
  }
  
  renderForm3() {
    return (
      <form >  
        
        <FormGroup controlId="telefono" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Telefono/Celular</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
            autoFocus
            type="num"
            min="10"
            max="10"
            step="10"
            value={this.state.telefono}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup validationState="warning" controlId="ciudadcolombia" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Ciudad de Residencia en Colombia</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
            autoFocus
            type="text"
            value={this.state.ciudadcolombia}
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup validationState="warning" controlId="direccioncolombia" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Direccion de Residencia en Colombia</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
            autoFocus
            type="text"
            value={this.state.direccioncolombia}
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup validationState="warning" controlId="estrato" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Estrato Economico</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
            autoFocus
            type="text"
            value={this.state.estrato}
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup validationState="warning" controlId="fechacolombia" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Fecha de llegada a Colombia</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
            autoFocus
            type="date"
            value={this.state.fechacolombia}
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup validationState="warning" controlId="profesion" bsSize="large">
            <ControlLabel style={{ color: 'black' }}>Profesion</ControlLabel>
              <FormControl style={{ borderColor: 'black' }} componentClass="select" placeholder="select" onChange={e => this.onDropDownChange(e, "profesion")}>
                <option value="">Seleccione</option>
                <option value="Ingeniero">Ingeniero</option>
                <option value="Otros">Otros</option>
              </FormControl>
              <FormControl.Feedback />
          </FormGroup>
        <FormGroup validationState="warning" controlId="ocupacionactual" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Ocupacion Actual</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
            autoFocus
            type="text"
            value={this.state.ocupacionactual}
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup  controlId="campoexp" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Descripcion de Experiencia</ControlLabel>
          <FormControl style={{ height: '150px' }} componentClass="textarea"
            autoFocus
            type="text"
            value={this.state.campoexp}
            onChange={this.handleChange}
          />
        </FormGroup>
        <div className="row">
          <div className="column1">
            <LoaderButton
              block
              bsSize="large"
              type="submit"
              text="Anterior"
              onClick={e => this.changeRender(e,"Prev")}
            />
            
          </div>
          <div className="column2-2">
            <LoaderButton
              block
              bsSize="large"
              type="submit"
              text="Siguiente"
              onClick={e => this.changeRender(e,"Next")}
            />
          </div>
        </div>
      </form>
    );
  }

  renderForm4() {
    return (
      <form>  
        <br></br><br></br>
        <FormGroup controlId="exprecientes1" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Nombre de la Empresa de la Experiencia mas Reciente 1 </ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.exprecientes1}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="exprecientes1ocupacion" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Ocupacion de la Experiencia mas Reciente 1</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.exprecientes1ocupacion}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="exprecientes1ciudad" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Ciudad de la Experiencia mas Reciente 1</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.exprecientes1ciudad}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="exprecientes1pais" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Pais de la Experiencia mas Reciente 1</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.exprecientes1pais}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="fechaexp1inicio" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Fecha de Inicio de la Experiencia mas Reciente 1</ControlLabel>
          <FormControl
            autoFocus
            type="date"
            value={this.state.fechaexp1inicio}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="fechaexp1fin" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Fecha Final de la Experiencia mas Reciente 1</ControlLabel>
          <FormControl
            autoFocus
            type="date"
            value={this.state.fechaexp1fin}
            onChange={this.handleChange}
          />
        </FormGroup>
        
        <div className="row">
          <div className="column1">
            <LoaderButton
              block
              bsSize="large"
              type="submit"
              text="Anterior"
              onClick={e => this.changeRender(e,"Prev")}
            />
            
          </div>
          <div className="column2-2">
            <LoaderButton
              block
              bsSize="large"
              type="submit"
              text="Siguiente"
              onClick={e => this.changeRender(e,"Next")}
            />
          </div>
        </div>
      </form>
    );
  }

  renderForm5() {
    return (
      <form>  
        <br></br><br></br>
        <FormGroup controlId="exprecientes2" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Nombre de la Empresa de la Experiencia mas Reciente 2 </ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.exprecientes2}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="exprecientes2ocupacion" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Ocupacion de la Experiencia mas Reciente 2</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.exprecientes2ocupacion}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="exprecientes2ciudad" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Ciudad de la Experiencia mas Reciente 2</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.exprecientes2ciudad}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="exprecientes2pais" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Pais de la Experiencia mas Reciente 2</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.exprecientes2pais}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="fechaexp2inicio" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Fecha de Inicio de la Experiencia mas Reciente 2</ControlLabel>
          <FormControl
            autoFocus
            type="date"
            value={this.state.fechaexp2inicio}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="fechaexp2fin" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Fecha Final de la Experiencia mas Reciente 2</ControlLabel>
          <FormControl
            autoFocus
            type="date"
            value={this.state.fechaexp2fin}
            onChange={this.handleChange}
          />
        </FormGroup>
        
        <div className="row">
          <div className="column1">
            <LoaderButton
              block
              bsSize="large"
              type="submit"
              text="Anterior"
              onClick={e => this.changeRender(e,"Prev")}
            />
            
          </div>
          <div className="column2-2">
            <LoaderButton
              block
              bsSize="large"
              type="submit"
              text="Siguiente"
              onClick={e => this.changeRender(e,"Next")}
            />
          </div>
        </div>
      </form>
    );
  }

  renderForm6() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>  
          <FormGroup validationState="warning" controlId="numhijos" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Numero de Hijos</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
            autoFocus
            type="num"
            min="1"
            max="2"
            value={this.state.numhijos}
            onChange={this.handleChange}
          />
          <FormControl.Feedback/>
        </FormGroup>
        <Checkbox checked={this.state.afiliadoCheck} onChange={e => this.handleCheck(e, "0")}>
          ¿Esta Afilidado a alguna entidad Medica?
        </Checkbox>
        <FormGroup validationState="warning" controlId="afiliado" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>¿Cual?</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
          disabled={!this.state.afiliadoCheck}
            autoFocus
            type="text"
            value={this.state.afiliado}
            onChange={this.handleChange}
          />
          <FormControl.Feedback/>
        </FormGroup>
        <FormGroup controlId="refper" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Persona de Referencia</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.refper}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="telref" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Telefono Referencia</ControlLabel>
          <FormControl
            autoFocus
            type="num"
            min="10"
            max="10"
            value={this.state.telref}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Checkbox checked={this.state.nacdobleCheck} onChange={e => this.handleCheck(e, "1")}>
          ¿Tiene usted Doble Nacionalidad?
        </Checkbox>
        <FormGroup validationState="warning" controlId="nacdoble" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>¿Cual?</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
            disabled={!this.state.nacdobleCheck}
            autoFocus
            type="text"
            value={this.state.nacdoble}
            onChange={this.handleChange}
          />
          <FormControl.Feedback/>
        </FormGroup>
        <Checkbox checked={this.state.notificaciones} onChange={e => this.handleCheck(e, "3")}>
          ¿Desea que la pagina le envia Noticias Y Informacion?
        </Checkbox>
        <Checkbox checked={this.state.terminos} onChange={e => this.handleCheck(e, "2")}>
          ¿Acepta nuestros Terminos y Condiciones?
        </Checkbox>
        <div className="row">
          <div className="column1">
            <LoaderButton
              block
              bsSize="large"
              type="submit"
              text="Anterior"
              onClick={e => this.changeRender(e,"Prev")}
            />
            
          </div>
          <div className="column2-2">
          <LoaderButton
          block
          bsSize="large"
         // onClick={this.register}
          disabled={!this.validateForm()}
          type="submit"
          //isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
          </div>
        </div>
      </form>
    );
  }

  render() {
    return (
    <div>
      
      <Navbar inverse collapseOnSelect className="color">
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#brand">VenezulaQuilla</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                
                </Nav>
                <Nav pullRight>
                  <NavDropdown eventKey={3} title="Ayudas" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1} onClick={(e)=> this.handleClick(e, '/AyudaServicios')}>Ayuda Sobre Servicios</MenuItem>
                    <MenuItem eventKey={3.2} onClick={(e)=> this.handleClick(e, '/AyudaCursos')}>Ayuda Sobre Cursos</MenuItem>
                    
                  </NavDropdown>
                  <NavDropdown eventKey={4} title="Informacion" id="basic-nav-dropdown">
                    <MenuItem eventKey={4.1} onClick={(e)=> this.handleClick(e, '/QuienesSomos')}>¿Quienes Somos?</MenuItem>
                    <MenuItem eventKey={4.2} onClick={(e)=> this.handleClick(e, '/Mision')}>Mision/Vision/Valores</MenuItem>
                    <MenuItem eventKey={4.3} onClick={(e)=> this.handleClick(e, '/Objetivos')}>Objetivos</MenuItem>
                    <MenuItem eventKey={4.4} onClick={(e)=> this.handleClick(e, '/Donaciones')}>Donaciones</MenuItem>
                  </NavDropdown>
                  <NavItem onClick={(e)=> this.handleClick(e, '/Login')}>
                    Iniciar Sesion
                  </NavItem>
                  <NavItem onClick={(e)=> this.handleClick(e, '/Signup')}>
                    Registrarse
                  </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
      <div className="Signup">
      <div className="linea"><h1>Registro</h1></div><br/>
      <h7><b>Los espacios con simbolo de advertencia son Obligatorios.<br></br> Incluso si no a hecho o no tiene lo que se pregunte,<br/> porfavor ponga Ninguno en esos casos.</b></h7>
      <br></br><br></br>
      {
        this.state.estado === 0?
        <div>
          {this.renderForm1()}
          </div>
          :
          <div>
            {
             this.state.estado===1?
             <div>
               {this.renderForm2()}
               </div>
               :
                <div>
                  {
                    this.state.estado===2?
                    <div >
                      {this.renderForm3()}
                      </div>
                      :
                      <div>
                        {
                          this.state.estado===3?
                          <div >
                            {this.renderForm4()}
                            </div>
                            :
                            <div>
                              {
                                this.state.estado===4?
                                <div >
                                  {this.renderForm5()}
                                  </div>
                                  :
                                  <div>
                                    {
                                      this.state.estado===5?
                                      <div>
                                        {this.renderForm6()}
                                        </div>
                                        :
                                        null
                                      }
                                    </div>
                                }
                            </div>
                          }
                        </div>
                  }
                </div>
            }
            </div>
      }


      </div>
      </div>
    );
  }
}

export default Signup