import React, { Component } from "react";
import {HelpBlock, FormGroup,FormControl, ControlLabel, Checkbox} from "react-bootstrap";
import LoaderButton from "./loaderbutton";
import "../css/_signup.css";
import {getUserPersonal,UpdatePersonalInfomation} from "../API/api.jsx";


class EditarPersonal extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.changeRender = this.changeRender.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDropDownChange = this.onDropDownChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.state = {
      personalId:"",
      estado:0,
      isLoading: false,
      apodo:"",
      telefono:"",
      ciudadcolombia:"",
      direccioncolombia:"",
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
      numhijos:"",
      afiliado:"Ninguna",
      afiliadoCheck:false,
      refper:"",
      telref:"",
      nacdoble:"Ninguna",
      nacdobleCheck:false,
    };
  }


  validateForm() {
    return (
      this.state.apodo.length > 0 &&
      this.state.statusmigratorios.length > 0 &&
      this.state.numdoc.length > 0 &&
      this.state.ciudadcolombia.length > 0 &&
      this.state.direccioncolombia.length > 0 &&
      this.state.fechacolombia.length > 0 &&
      this.state.profesion.length > 0 &&
      this.state.ocupacionactual.length > 0 &&
      this.state.numhijos.length > 0 &&
      this.state.nacdoble.length >0 &&
      this.state.afiliado.length >0
    );
  }

  componentWillMount(){
      const pars={
          userId: this.props.loggedUser.id
      }
      getUserPersonal(pars.userId)
      .then(val=>{
        console.log(val)
          this.setState({
              apodo:val[0].person[0].all.apodo,
              telefono:val[0].person[0].all.telefono,
              ciudadcolombia:val[0].person[0].all.ciudadcolombia,
              direccioncolombia:val[0].person[0].all.direccioncolombia,
              fechacolombia:val[0].person[0].all.fechacolombia,
              ocupacionactual:val[0].person[0].all.ocupacionactual,
              campoexp:val[0].person[0].all.campoexp,
              exprecientes1:val[0].person[0].all.exprecientes1,
              exprecientes1ocupacion:val[0].person[0].all.exprecientes1ocupacion,
              exprecientes1ciudad:val[0].person[0].all.exprecientes1ciudad,
              exprecientes1pais:val[0].person[0].all.exprecientes1pais,
              fechaexp1inicio:val[0].person[0].all.fechaexp1inicio,
              fechaexp1fin:val[0].person[0].all.fechaexp1fin,
              exprecientes2:val[0].person[0].all.exprecientes2,
              exprecientes2ocupacion:val[0].person[0].all.exprecientes2ocupacion,
              exprecientes2ciudad:val[0].person[0].all.exprecientes2ciudad,
              exprecientes2pais:val[0].person[0].all.exprecientes2pais,
              fechaexp2inicio:val[0].person[0].all.fechaexp2inicio,
              fechaexp2fin:val[0].person[0].all.fechaexp2fin,
              numhijos:val[0].person[0].all.numhijos,
              afiliado:val[0].person[0].all.afiliado,
              refper:val[0].person[0].all.refper,
              telref:val[0].person[0].all.telref,
              nacdoble:val[0].person[0].all.nacdoble,
              profesion:val[0].person[0].all.profesion,
              personalId:val[0].person[0].id
          })
      })

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

  onDropDownChange(e){
    e.preventDefault();
    this.setState({
      statusmigratorios:e.target.value
    })
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
      telefono:this.state.telefono,
      ciudadcolombia:this.state.ciudadcolombia,
      direccioncolombia:this.state.direccioncolombia,
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
      numhijos:this.state.numhijos,
      afiliado:this.state.afiliado,
      refper:this.state.refper,
      telref:this.state.telref,
      nacdoble:this.state.nacdoble
}

  UpdatePersonalInfomation(this.props.loggedUser.id,this.state.personalId,_personal)
  .then(this.props.history.push('/Sesion'))
    console.log(_user);
    
    //.then(()=>{window.location='/PerfilPersonal'})
     
  }

  handleCheck(evt, index) {
    if(index === "0"){
      this.setState({ afiliadoCheck: evt.target.checked });
      
    }
    if(index === "1"){
      this.setState({ nacdobleCheck: evt.target.checked });
    }
  }

  changeRender(e, val){
    e.preventDefault();
    if(val=== "Next"){
      this.setState({
        estado:(parseInt(this.state.estado)+1)
      })
      window.scrollTo(0, 0)
    }else{
      if (val === "Prev") {
        this.setState({
          estado:(parseInt(this.state.estado)-1)
        })
        window.scrollTo(0, 0)
      }
    }
    
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
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
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    );
  }
  
  renderForm1() {
    return (
      <form >  
        
        <FormGroup controlId="telefono" bsSize="large">
          <ControlLabel>Telefono/Celular</ControlLabel>
          <FormControl
            autoFocus
            type="num"
            min="10"
            max="10"
            step="10"
            value={this.state.telefono}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup style={{ color: 'black' }} validationState="warning" controlId="ciudadcolombia" bsSize="large">
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
        
        <FormGroup validationState="warning" controlId="profesion" bsSize="large">
          <ControlLabel style={{ color: 'black' }}>Profesion</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
            autoFocus
            type="text"
            value={this.state.profesion}
            onChange={this.handleChange}
          />
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
          <ControlLabel>Descripcion de Experiencia</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.campoexp}
            onChange={this.handleChange}
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
         // onClick={this.register}
          //disabled={!this.validateForm()}
          type="submit"
         // isLoading={this.state.isLoading}
          text="Siguiente"
          onClick={e => this.changeRender(e,"Next")}
         // loadingText="Signing up…"
        />
        <LoaderButton
          block
          bsSize="large"
          type="submit"
          text="Anterior"
          onClick={e => this.changeRender(e,"Prev")}
        />
      </form>
    );
  }

  renderForm2() {
    return (
      <form>
        <FormGroup controlId="exprecientes1" bsSize="large">
          <ControlLabel>Nombre de la Empresa de la Experiencia mas Reciente 1 </ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.exprecientes1}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="exprecientes1ocupacion" bsSize="large">
          <ControlLabel>Ocupacion de la Experiencia mas Reciente 1</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.exprecientes1ocupacion}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="exprecientes1ciudad" bsSize="large">
          <ControlLabel>Ciudad de la Experiencia mas Reciente 1</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.exprecientes1ciudad}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="exprecientes1pais" bsSize="large">
          <ControlLabel>Pais de la Experiencia mas Reciente 1</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.exprecientes1pais}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="fechaexp1inicio" bsSize="large">
          <ControlLabel>Fecha de Inicio de la Experiencia mas Reciente 1</ControlLabel>
          <FormControl
            autoFocus
            type="date"
            value={this.state.fechaexp1inicio}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="fechaexp1fin" bsSize="large">
          <ControlLabel>Fecha Final de la Experiencia mas Reciente 1</ControlLabel>
          <FormControl
            autoFocus
            type="date"
            value={this.state.fechaexp1fin}
            onChange={this.handleChange}
          />
        </FormGroup>
        
        <LoaderButton
          block
          bsSize="large"
         // onClick={this.register}
          //disabled={!this.validateForm()}
          type="submit"
         // isLoading={this.state.isLoading}
          text="Siguiente"
          onClick={e => this.changeRender(e,"Next")}
         // loadingText="Signing up…"
        />
        <LoaderButton
          block
          bsSize="large"
          type="submit"
          text="Anterior"
          onClick={e => this.changeRender(e,"Prev")}
        />
      </form>
    );
  }

  renderForm3() {
    return (
      <form>  
        
        <FormGroup controlId="exprecientes2" bsSize="large">
          <ControlLabel>Nombre de la Empresa de la Experiencia mas Reciente 2 </ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.exprecientes2}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="exprecientes2ocupacion" bsSize="large">
          <ControlLabel>Ocupacion de la Experiencia mas Reciente 2</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.exprecientes2ocupacion}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="exprecientes2ciudad" bsSize="large">
          <ControlLabel>Ciudad de la Experiencia mas Reciente 2</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.exprecientes2ciudad}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="exprecientes2pais" bsSize="large">
          <ControlLabel>Pais de la Experiencia mas Reciente 2</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.exprecientes2pais}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="fechaexp2inicio" bsSize="large">
          <ControlLabel>Fecha de Inicio de la Experiencia mas Reciente 2</ControlLabel>
          <FormControl
            autoFocus
            type="date"
            value={this.state.fechaexp2inicio}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="fechaexp2fin" bsSize="large">
          <ControlLabel>Fecha Final de la Experiencia mas Reciente 2</ControlLabel>
          <FormControl
            autoFocus
            type="date"
            value={this.state.fechaexp2fin}
            onChange={this.handleChange}
          />
        </FormGroup>
        
        <LoaderButton
          block
          bsSize="large"
         // onClick={this.register}
          //disabled={!this.validateForm()}
          type="submit"
         // isLoading={this.state.isLoading}
          text="Siguiente"
          onClick={e => this.changeRender(e,"Next")}
         // loadingText="Signing up…"
        />
        <LoaderButton
          block
          bsSize="large"
          type="submit"
          text="Anterior"
          onClick={e => this.changeRender(e,"Prev")}
        />
      </form>
    );
  }

  renderForm4() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>  
          <FormGroup style={{ color: 'black' }} validationState="warning" controlId="numhijos" bsSize="large">
          <ControlLabel>Numero de Hijos</ControlLabel>
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
        <FormGroup style={{ color: 'black' }} validationState="warning" controlId="afiliado" bsSize="large">
          <ControlLabel>¿Cual?</ControlLabel>
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
          <ControlLabel>Persona de Referencia</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={this.state.refper}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="telref" bsSize="large">
          <ControlLabel>Telefono Referencia</ControlLabel>
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
        <FormGroup style={{ color: 'black' }} validationState="warning" controlId="nacdoble" bsSize="large">
          <ControlLabel>¿Cual?</ControlLabel>
          <FormControl style={{ borderColor: 'black' }}
            disabled={!this.state.nacdobleCheck}
            autoFocus
            type="text"
            value={this.state.nacdoble}
            onChange={this.handleChange}
          />
          <FormControl.Feedback/>
        </FormGroup>
        
        <LoaderButton
          block
          bsSize="large"
          text="Anterior"
          onClick={e => this.changeRender(e,"Prev")}
        />
        
        <LoaderButton
          block
          bsSize="large"
         // onClick={this.register}
       //   disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Actualizar"
          loadingText="Signing up…"
        />
      </form>
    );
  }

  render() {
    return (
    <div>
      <div className="Signup" id="top">
      <h1 className="linea">Editar Perfil</h1> <br/>
      <h7><b>Los espacion con simbolo de advertencia son Obligatorios.<br></br> Incluso si no a hecho o no tiene lo que se pregunte, porfavor especifique</b></h7>
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
             <div >
               {console.log(this.state)}
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
                            null
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

export default EditarPersonal