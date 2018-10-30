import React from 'react';
import {getUsers, changeRol, changeType, changeStatus, getSugerencias,getUserPersonal, getMails} from "../API/api.jsx";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import "../css/_usermanagmente.css";
import LoaderButton from "./loaderbutton";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import Barra from './extras/navbar.jsx'
import {Table, Tab, Tabs} from 'react-bootstrap';



class UserManagment extends React.Component{

    constructor(props){
        super(props)
        
        this.state = {
            usuarios:[],
            selectedUser:null,
            sugerencias:[],
            peticiones:[],
            personal:"",
            tempMail:"",
            mail:[]
        }

        this.onSelect=this.onSelect.bind(this)
        this.getInfo=this.getInfo.bind(this)
        this.changeUserProperty=this.changeUserProperty.bind(this)
    }



    onSelect(row, isSelected, e){
        console.log(row)
        this.setState({
            selectedUser:row,
            tempMail:row.email
        })
    }
    

    getInfo(e){
        e.preventDefault();
        
        if(this.state.selectedUser != null){
            getUserPersonal(this.state.selectedUser.id)
            .then(val => {
                console.log(val)
                this.setState({
                    personal:val[0].person[0].all
                })
            })
        }
    }

    changeUserProperty(e, field){
        e.preventDefault();

        if(this.state.selectedUser != null){

            if(field === "tipo"){
                changeType(this.state.selectedUser.id, this.state.selectedUser.type)
                .then(value =>{
                    window.location.reload(true)
                })
            }
            else
                if(field === "status"){
                    changeStatus(this.state.selectedUser.id, this.state.selectedUser.status)
                    .then(value =>{
                        window.location.reload(true)
                    })
                }
                else
                    if(field === "rol"){
                        changeRol(this.state.selectedUser.id, this.state.selectedUser.rol)
                        .then(value =>{
                            window.location.reload(true)
                        })
                    }
        }
    }

    componentWillMount(){
        console.log(this.props.loggedUser)
        getUsers()
        .then(_users =>{
            this.setState({
                usuarios:_users
            })
        }) 
        getSugerencias()
        .then(value => {
            console.log(value)
            this.setState({
                sugerencias:value[0]._sugerencias,
                peticiones:value[0]._peticiones
            })
        })
        getMails()
        .then(e =>{
            console.log(e)
            this.setState({
                mail:e
            })
        })
    }

    render(){
        const selectRowProp = {
            mode: 'radio',
            bgColor:'green',
            clickToSelect: true,
            onSelect: this.onSelect
          };
    
    return(
        
        <div className="tabla">
        <link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table.min.css"></link>
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Usuarios">
            <h1 className="linea">
            Lista de Usuarios
        </h1>
        <br/>
        <BootstrapTable data={ this.state.usuarios }  selectRow={ selectRowProp } >
            <TableHeaderColumn dataField='apodo' isKey>Apodo</TableHeaderColumn>
            <TableHeaderColumn dataField='email'>E-Mail</TableHeaderColumn>
            <TableHeaderColumn dataField='type'>Tipo de Usuario</TableHeaderColumn>
            <TableHeaderColumn dataField='status'>Estatus</TableHeaderColumn>
            <TableHeaderColumn dataField='rol'>Rol</TableHeaderColumn>
            
        </BootstrapTable>
        <br></br>

        
        <div className="row">

        <div className="column1">
            <LoaderButton
            block
            bsSize="small"
            // onClick={this.register}
            type="submit"
            text="Informacion del Usuario"
            onClick= {(e)=> this.getInfo(e)}
        />
            </div>
            <div className="column2">
            <LoaderButton
            block
            bsSize="small"
            // onClick={this.register}
            type="submit"
            text="Hacer/Deshacer Admin"
            onClick= {(e)=> this.changeUserProperty(e, "tipo")}
        />
            </div>
            <div className="column3">
            <LoaderButton
            block
            bsSize="small"
            // onClick={this.register}
            type="submit"
            text="Activar/Desactivar Usuario"
            onClick= {(e)=> this.changeUserProperty(e, "status")}
        />
            </div>
            <div className="column4">
            <LoaderButton
            block
            bsSize="small"
            // onClick={this.register}
            type="submit"
            text="Asignar como Profesores"
            onClick= {(e)=> this.changeUserProperty(e, "rol")}
        />
            </div>
            
            <br></br>
        </div>                            
        <br></br>
        <br></br>
        <br></br>

    
        <div>
        <h1 className="linea">
            Informacion de Especifica de un Usuario
        </h1>  
        <br/>  
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
                            {this.state.personal.tipodocumento}
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
                            {this.state.tempMail} 
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
                            Estatus Migratoria
                            <br></br>
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
                            {this.state.personal.statusmigratorios}
                            <br></br>
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
            </Tab>
            <Tab eventKey={2} title="Sugerencias">
            <div>
                <h1 className="linea">Sugerencias de otros Usuarios</h1>
                <br/>
                {
                    this.state.sugerencias != null?
                    <div>
                        {
                            this.state.sugerencias.map((objeto, index) => {
                                return(
                                    <p className="comentarios" key={index}><b>{this.state.sugerencias[index].apodo}</b> dice: <br></br> {this.state.sugerencias[index].Sugerencia} <br></br>
                                    <small>{this.state.sugerencias[index].date}</small></p>
                                )
                            })
                        }
                    </div>
                    :
                    null
                }
            </div>
            </Tab>
            <Tab eventKey={3} title="Peticiones">
            <div>
                <h1 className="linea">Peticiones para dictar Cursos</h1>
                <br/>
                {
                    this.state.peticiones != null?
                    <div>
                        {
                            this.state.peticiones.map((objeto, index) => {
                                return(
                                    <p className="comentarios" key={index}><b>{this.state.peticiones[index].apodo}</b>
                                     dice: 
                                    <br></br> {this.state.peticiones[index].Peticion} <br></br>
                                    <small>{this.state.peticiones[index].date}</small>{" "}<a href={this.state.peticiones[index].url}><small>{"Descargar"}</small></a> </p>
                                )
                            })
                        }
                    </div>
                    :
                    null
                }
            </div>
            </Tab>
            <Tab eventKey={4} title="Correos de Notificaciones">
                <div className="tabla2">
                <BootstrapTable  data={ this.state.mail }>
                    
                    <TableHeaderColumn dataField='mail' isKey>mail</TableHeaderColumn>
                </BootstrapTable>
                </div>
            </Tab>
            <Tab eventKey={5} title="Noticias">
                
            </Tab>
        </Tabs>
            
            
        
            

        </div>
        
        
    )
}
}

export default UserManagment