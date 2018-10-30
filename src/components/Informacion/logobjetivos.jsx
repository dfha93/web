import React from 'react';
import {Navbar, Nav,NavDropdown,MenuItem, NavItem, Carousel, Table} from 'react-bootstrap';
import '../../css/_acursos.css'

class Objetivos extends React.Component{

    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this);
    }
    
        handleClick(e, action){
            e.preventDefault();//Eso va siempre
            this.props.history.push(action);
        }
       

    render(){
        return(
            <div style={{ height: '127vh' }}>
                

<div className="hiw">     

<p className="ph2">
<h3 className="linea">Objetivos Generales</h3>
El objetivo de La Asociación es liderar actividades filantrópicas, sociales, recreativas,
culturales, deportivas y académicas, con el fin de fomentar la integración mediante la creación
de redes de apoyo entre los venezolanos residentes en la región Caribe colombiana.
<br/>
<h3 className="linea">Objetivos Especificos</h3>
-) Promover integración entre los venezolanos residentes en la región Caribe colombiana con fines filantrópicos mediante la creación de redes de ayuda.
<br/>
-) Fomentar los lazos de amistad entre venezolanos y colombianos a través de actividades sociales, recreativas, deportivas y culturales con fines humanitarios.
<br/>
-) Organizar actividades de tipo informativas para la permanencia de venezolanos en Colombia.
<br/>
-) Crear redes de apoyo Nacionales e Internacionales entre Organizaciones que trabajen en armonía con nuestro objeto social.
<br/>
-) Recaudar fondos para financiar actividades propias de nuestro objeto social.
<br/>
-) Brindar ayudas a venezolanos residentes en la región Caribe colombiana  a través de lassiguientes actividades:<br/>
<br/>
<div className="sub">
-) Asesorías.
<br/>
-) Ayuda Humanitaria en la región Caribe colombiana y envíos hacia Venezuela.
<br/>
-) Intermediación laboral, comercial, educativa y en salud.
</div>

</p>

</div>

            </div>
            
        )
    }
}


export default Objetivos