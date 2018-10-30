import React from 'react';
import '../../css/_acursos.css'

class AServicios2 extends React.Component{

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
            <div className="parallax" style={{ height: '125vh' }}>
                

<div className="hiw">     
<div className="row">
  <div className="column1">
    <h3 className="linea">Informacion Sobre Servicios</h3>
    <p>Los Servicios son publicaciones hechas por los usuarios de los Negocioso ó actividades que estos ofrecen. Al contrario de los cursos, estos no tendran ningun tipo de suscripcion, y la pagina no se responsabiliza 
      de cualquier tipo de acuerdo que los usuarios hagan entre ellos.
    </p>
  </div>
  <div className="column2-2" >
  
    <img  className="imgService"/>
  </div>
</div>
<p className="ph">
<h3 className="linea">Publicar un Servicio</h3>
Para poder publicar un servicio, el usuarios debera ir a la barra de navegacion y buscar el simbolo de $ para poder seleccionar la opcion de publicar.
<br/>
Una vez hecho eso, se le redigirira a un pagina en la cual hay un formulario que debera llenar con la infomacion del servicio y una imagen que la represente si asi lo desea.
Una vez hecho esto y oprima el boton de publicar, se le redigirira a su pagina personal en la que podra ver todos los servicios que tiene, ademas de poder tener la opcion de poder editar la 
informacion de cualquiera de estos al oprimir la opcion de "[Editar]" que esta al lado del nombre del servicio.
<br/>
<h3 className="linea">Buscar un Servicio</h3>
Para poder buscar un Servicio, el usuario debera buscar nuevamente el simbolo de peso y elegir la opcion "Buscar" para que escoja la categoria del tipo de servicio que esta interesado en buscar.
Una vez se le a haya redigirido nuevamente, estara en una pagina en la que se mostraran todos los servicios de la categoria que haya escogido. Tambien pogra irse a la barra de busqueda que se encutra en la parte superior de arriba 
para poder acortar la lista en caso de que sepa que esta buscando. Tambien podra cambiar el filtro de busqueda si asi lo desea.
<br/>
<h3 className="linea">Comentar y Calificar</h3>
Estando ya en la pagina del servicio, el usuario podra ver la informacion del servicio y tener la opcion de comentar y calificar el servicio. Esperamos que los usuarios sean honestos al momento
 de calificar el servicio del usuario y que sea prudente a la hora de dejar un comentario, dado que todos aquellos que entren a ver el servicio podra ver lo que publique.
</p>
</div>

            </div>
            
        )
    }
}


export default AServicios2