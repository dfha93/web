import React from 'react';
import '../../css/_acursos.css'

class ACursos2 extends React.Component{

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
<div className="row">
  <div className="column1">
    <h3 className="linea">Informacion Sobre Cursos</h3>
    <p>Los Cursos son clases brindadas por usuarios que tienen certificacion como Profesores para poder dictar clases. Al contrario de los Servicios, estos tienen un sistema suscripcion el cual servira para verificar el numero de personas que quieren tomar el curso.</p>
  </div>
  <div className="column2-2" >
  
    <img  className="imgCurso"/>
  </div>
</div>
<p className="ph">
<h3 className="linea">Publicar un Curso</h3>
Para poder publicar un Curso, el usuarios debera ir a la barra de navegacion y buscar el simbolo de con la letra C. Alli tentra la opcion de Buscar o Publicar un Curso.
Antes de que el usuario pueda publicar su curso, este debera ser certificado como Profesor, para esto la pagina lo redigirira a una pantalla en la que se le pedira que ingrese su experiencia en el area en la cual quiere enseñar y adjuntar en un archivo comprimido los diplomas y o certificados correspondientes.
Una vez hecho eso, el usuario debera a que las personas de la asociacion verifique la informacion dada para poder habilitarlo como un usuario Profesor. Cuando todo se haya confirmadado, debera ir de nuevo a la barra lateral para buscar el simbolo C para seleccionar la opcion de publicar, 
despues se le redigirira a un pagina en la cual hay un formulario que debera llenar con la infomacion del Curso y una imagen que la represente si asi lo desea.
Una vez hecho esto y oprima el boton de publicar, se le redigirira a su pagina personal en la que podra ver todos los Cursos que usted dicta o a dictado, ademas de poder tener la opcion de poder editar la 
informacion de cualquiera de estos al oprimir la opcion de "[Editar]" que esta al lado del nombre del Curso.
<br/>
<h3 className="linea">Buscar un Curso</h3>
Para poder buscar un Curso, el usuario debera buscar nuevamente el simbolo C y elegir la opcion "Buscar" para que escoja la categoria del tipo de Curso que esta interesado en buscar.
Una vez se le a haya redigirido nuevamente, estara en una pagina en la que se mostraran todos los Cursos de la categoria que haya escogido. Tambien pogra irse a la barra de busqueda que se encutra en la parte superior de arriba 
para poder acortar la lista en caso de que sepa que esta buscando. Tambien podra cambiar el filtro de busqueda si asi lo desea.
<br/>
<h3 className="linea">Comentar, Calificar Y Suscribirse</h3>
Estando ya en la pagina del Curso, el usuario podra ver la informacion del Curso y tener la opcion de comentar y calificar el Curso, pero esta ultima solo sera posible una vez que se inscriba y finalize el Curso. Esperamos que los usuarios sean honestos al momento
 de calificar el Curso del usuario y que sea prudente a la hora de dejar un comentario, dado que todos aquellos que entren a ver el servicio podra ver lo que publique.
</p>

</div>

            </div>
            
        )
    }
}


export default ACursos2