import React from 'react';
import {getUserPersonal,UpdateUserImage} from "../API/api";
import {Table,Image} from 'react-bootstrap';
import "../css/_perfilpersonal.css"
import LoaderButton from "./loaderbutton";

class PerfilPersonal extends React.Component{
    constructor(props){
        super(props)
        this.componentWillMount = this.componentWillMount.bind(this);
        this.Upload = this.Upload.bind(this);
        this.Upload2 = this.Upload2.bind(this);
        this.state = {
            personal:"",
            url:null,
            urlId:null,
            File:null,
        }
    }

    Upload(e){
        const realFileBtn = document.getElementById("real-file")
        const customTxt = document.getElementById("custom.text")
            realFileBtn.click()
            this.setState({
                File: realFileBtn
            })
            
      }

      Upload2(e){
        if(this.state.File.files[0] !== undefined){
            UpdateUserImage(this.props.loggedUser.id, this.state.File.files[0], this.state.urlId)
            this.props.history.push("/PerfilPersonal")
        }
        
      }

    componentWillMount(){
        getUserPersonal(this.props.loggedUser.id)
        .then(val => {
            console.log(val)
            this.setState({
                personal:val[0].person[0].all,
                url:val[0].url[0].all.url,
                urlId:val[0].url[0].urlId
            });
            console.log(this.props.loggedUser)
        })
    }

    render(){
        return(
            <div className="ajuste">
                
                <div className="centrarImagen">
                    <Image src={this.state.url} className="image"   rounded/>
                </div>
                <br/>
                <div>
            <Table>
                <thead>
                    <tr>
                        <th>Campos</th>
                        <th>Infomacion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Apodo
                            <br></br>
                            Nombre
                            <br></br>
                            Apellidos
                        </td>
                        <td>
                            {this.state.personal.apodo}
                            <br></br>
                            {this.state.personal.nombre}
                            <br></br>
                            {this.state.personal.apellidos}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Tipo de Documento
                            <br></br>
                            Numero de Documento
                            <br></br>
                            Lugar de Nacimiento
                            <br></br>
                            Fecha de Nacimiento
                        </td>
                        <td>
                            {this.state.personal.statusmigratorios}
                            <br></br>
                            {this.state.personal.numdoc}
                            <br></br>
                            {this.state.personal.paisnacimiento}
                            <br></br>
                            {this.state.personal.fechanacimiento}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            E-Mail
                            <br></br>
                            Telefono de Contacto
                            <br></br>
                            Ciudad de Residencia en Colombia
                            <br></br>
                            Direccion de Residencia en Colombia
                            <br></br>
                            Estrato Socio Economico
                            <br></br>
                            Fecha de llegada a Colombia
                        </td>
                        <td>
                            {this.props.loggedUser.email.email} 
                            <br></br>
                            {this.state.personal.telefono}
                            <br></br>
                            {this.state.personal.ciudadcolombia}
                            <br></br>
                            {this.state.personal.direccioncolombia}
                            <br></br>
                            {this.state.personal.estrato}
                            <br></br>
                            {this.state.personal.fechacolombia}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Profesion
                            <br></br>
                            Ocupacion Actual
                            <br></br>
                            Descripcion de Experiencia
                        </td>
                        <td>
                            {this.state.personal.profesion}
                            <br></br>
                            {this.state.personal.ocupacionactual}
                            <br></br>
                            {this.state.personal.campoexp}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Nombre de la Empresa de la Experiencia Previa Mas Recientes 1
                            <br></br>
                            Fecha de Inicio y Fin
                            <br></br>
                            Ocupacion en la empresa
                            <br></br>
                            Ciudad y Pais
                        </td>
                        <td>
                            {this.state.personal.exprecientes1}
                            <br></br>
                            {this.state.personal.fechaexp1inicio+"/"+this.state.personal.fechaexp1fin}
                            <br></br>
                            {this.state.personal.exprecientes1ocupacion}
                            <br></br>
                            {this.state.personal.exprecientes1ciudad+"-"+this.state.personal.exprecientes1pais}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Nombre de la Empresa de la Experiencia Previa Mas Recientes 2
                            <br></br>
                            Fecha de Inicio y Fin
                            <br></br>
                            Ocupacion en la empresa
                            <br></br>
                            Ciudad y Pais
                        </td>
                        <td>
                            {this.state.personal.exprecientes2}
                            <br></br>
                            {this.state.personal.fechaexp2inicio+"/"+this.state.personal.fechaexp2fin}
                            <br></br>
                            {this.state.personal.exprecientes2ocupacion}
                            <br></br>
                            {this.state.personal.exprecientes2ciudad+"-"+this.state.personal.exprecientes2pais}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            
                            Numero de Hijos
                            <br></br>
                            Sistema de Salud Afiliado
                            <br></br>
                            Referencia Personal
                            <br></br>
                            Telefono de Referencia
                            <br></br>
                            Doble Nacionalidad                            
                        </td>
                        <td>
                            
                            {this.state.personal.numhijos}
                            <br></br>
                            {this.state.personal.afiliado}
                            <br></br>
                            {this.state.personal.refper}
                            <br></br>
                            {this.state.personal.telref}
                            <br></br>
                            {this.state.personal.nacdoble}                          
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
        <LoaderButton block bsSize="large"  text="Cargar Imagen" id="custom-button" onClick={e=>this.Upload(e)}/>
            <div hidden="hidden">
            <input type="file" id="real-file"/>
                <span id="custom-text">No file chosen, yet.</span>
            </div>
        <LoaderButton
            block
            bsSize="large"
            text="Enviar"
            disabled={this.state.File===null?true:false}
            onClick={e=>this.Upload2(e)}
            />
            </div>
        )
    }
}
export default PerfilPersonal