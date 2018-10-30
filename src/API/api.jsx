
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBU4zG9VvMnTvbvxPEW1sVfUxRS-J0f5FE",
    authDomain: "proyecto1-ab0f6.firebaseapp.com",
    databaseURL: "https://proyecto1-ab0f6.firebaseio.com",
    storageBucket: "proyecto1-ab0f6.appspot.com",
    messagingSenderId: "1087006095685",
    projectId: "proyecto1-ab0f6"

};

firebase.initializeApp(config);

export function loadData(){
  return firebase.database().ref('/messages/');
}
export function sendData(mensaje){
  return firebase.database().ref('/messages/').push(mensaje);
}
export function sendJob(job){
  return firebase.database().ref('/job/').push(job);
}
export function blockUser(user){
  firebase.database().ref().child('/users/'+user)
    .update({ stado: '0'});
}
export function sendOffers(Offers){
  return firebase.database().ref('/offers/').push(Offers);
}
export function deleteData(mensajeId){
  firebase.database().ref('/messages/').child(mensajeId).remove();
}
export function logOut(){
return firebase.auth().signOut()
}
export function logIn(user){
    return firebase.auth().signInWithEmailAndPassword(user.email,user.password)
}

export function uploadFile(file){
  return firebase.storage().ref('images/').child(file.name).put(file);
}

export function getUserById(userId){
  
  return firebase.database().ref("/users/"+userId).once('value')
  .then((snapshot) =>{
    //return firebase.auth().signOut()
    console.log(snapshot.val());
    const val = snapshot.val()
    console.log(userId)
    console.log(val);
    console.log('_user');
    const _user = {
      id: userId,
      email: val,
      status: val.status,
      type: val.type,
      rol: val.rol,
      apodo: val.apodo,
    }
    console.log(_user);
    return _user;
  })
}

export function saveUserInDb(user, personal){
return firebase.database().ref('/users/'+user.id).set({

  email: user.email,
  type: user.type,
  status: user.status,
  rol: user.rol,
  apodo: user.apodo

})
.then(temp => {
  var _url={url:"https://firebasestorage.googleapis.com/v0/b/proyecto1-ab0f6.appspot.com/o/default.png?alt=media&token=fef933ad-b1f9-4baa-9a6e-048c729e32c2"};
  return firebase.database().ref('/users/'+user.id+"/images/").push(_url)
})
}

export function UpdatePersonalInfomation(userId, personalId,actual){
  return firebase.database().ref('/users/'+userId+'/personal/'+personalId).update({
    telefono:actual.telefono,
    ciudadcolombia:actual.ciudadcolombia,
    direccioncolombia:actual.direccioncolombia,
    fechacolombia:actual.fechacolombia,
    profesion:actual.profesion,
    ocupacionactual:actual.ocupacionactual,
    campoexp:actual.campoexp,
    exprecientes1:actual.exprecientes1,
    exprecientes1ocupacion:actual.exprecientes1ocupacion,
    exprecientes1ciudad:actual.exprecientes1ciudad,
    exprecientes1pais:actual.exprecientes1pais,
    fechaexp1inicio:actual.fechaexp1inicio,
    fechaexp1fin:actual.fechaexp1fin,
    fechaexp2inicio:actual.fechaexp2inicio,
    fechaexp2fin:actual.fechaexp2fin,
    exprecientes2:actual.exprecientes2,
    exprecientes2ocupacion:actual.exprecientes2ocupacion,
    exprecientes2ciudad:actual.exprecientes2ciudad,
    exprecientes2pais:actual.exprecientes2pais,
    numhijos:actual.numhijos,
    afiliado:actual.afiliado,
    refper:actual.refper,
    telref:actual.telref,
    nacdoble:actual.nacdoble
  })
}

export function PservicesaveUserInDb(userId, credentials, Archivo){
  return firebase.database().ref('/users/'+userId+'/services/').push(credentials)
  .then(temp => {
    if(Archivo !== undefined && Archivo !==null){
      var filename = Archivo.name;
      var storageRef = firebase.storage().ref('/ImagesServices/'+userId+"/"+temp.key+"/"+filename);
      storageRef.put(Archivo)
      var uploadTask = storageRef.put(Archivo)
      console.log(uploadTask)
      uploadTask.on('state_changed', function(snapshot){

      }, function(error){

      }, function(){
        uploadTask.snapshot.ref.getDownloadURL()
        .then(function(downloadURL) {
          var _url={url:downloadURL};
          return firebase.database().ref('/users/'+userId+'/services/'+temp.key+"/images/").push(_url)
        })
      })
        }else{
          var _url={url:"https://firebasestorage.googleapis.com/v0/b/proyecto1-ab0f6.appspot.com/o/default.png?alt=media&token=fef933ad-b1f9-4baa-9a6e-048c729e32c2"}
          return firebase.database().ref('/users/'+userId+'/services/'+temp.key+"/images/").push(_url)
        }
    
  })
  }

  export function ImageService(Archivo, userId, serviceId){
    var filename = Archivo.name;
    var storageRef = firebase.storage().ref('/ImagesServices/'+userId+"/"+serviceId+"/"+filename);
    storageRef.put(Archivo)
    var uploadTask = storageRef.put(Archivo)
    console.log(uploadTask)
    uploadTask.on('state_changed', function(snapshot){
  
    }, function(error){
  
    }, function(){
      var postKey = firebase.database().ref('/users/'+userId+"/services/"+serviceId+"/").push().key;
      uploadTask.snapshot.ref.getDownloadURL()
      .then(function(downloadURL) {
        var updates = {};
      var postData = {
        url: downloadURL,
        //caption: ("#imageCaption").val(),
        //url: downloadURL
      };
      console.log(postData)
      //return firebase.database().ref('peticiones/').push(val)
      updates['/users/'+userId+"/services/"+serviceId+"/images/"+postKey] = postData;
      firebase.database().ref().update(updates)
      })
      
    })
  }

export function PcoursesaveUserInDb(userId, credentials, Archivo){
  console.log(Archivo)
  return firebase.database().ref('/users/'+userId+'/cursos/').push(credentials)
  .then(temp => {
    if(Archivo !== undefined && Archivo !==null){
      var filename = Archivo.name;
      var storageRef = firebase.storage().ref('/ImagesCursos/'+userId+"/"+temp.key+"/"+filename);
      storageRef.put(Archivo)
      var uploadTask = storageRef.put(Archivo)
      console.log(uploadTask)
      uploadTask.on('state_changed', function(snapshot){

      }, function(error){

      }, function(){
        uploadTask.snapshot.ref.getDownloadURL()
        .then(function(downloadURL) {
          var _url={url:downloadURL};
          return firebase.database().ref('/users/'+userId+'/cursos/'+temp.key+"/images/").push(_url)
        })
      })
        }else{
          var _url={url:"https://firebasestorage.googleapis.com/v0/b/proyecto1-ab0f6.appspot.com/o/default.png?alt=media&token=fef933ad-b1f9-4baa-9a6e-048c729e32c2"}
          return firebase.database().ref('/users/'+userId+'/cursos/'+temp.key+"/images/").push(_url)
        }
    
  })
  }

export function UserPersonalInDb(userId, personal){
  return firebase.database().ref('/users/'+userId+'/personal/').push(personal)
  }

export function EnviarComentario(userIdService, ServiceId, comentario){
  console.log(userIdService)
  console.log(ServiceId)
  console.log(comentario)
  return firebase.database().ref('/users/'+userIdService+'/services/'+ServiceId+'/comentarios/').push(comentario)
}

export function EnviarComentario2(userIdService, ServiceId, comentario){
  return firebase.database().ref('/users/'+userIdService+'/cursos/'+ServiceId+'/comentarios/').push(comentario)
}

export function EnviarSugerencia(sugerencia){
  return firebase.database().ref('/sugerencias/').push(sugerencia)
}

export function EnviarPeticion(userId, Peticion, Archivo){
  console.log(Peticion)
  return firebase.database().ref('/peticiones/').push(Peticion)
  .then(temp => {
    if(Archivo !== undefined && Archivo !==null){
      var filename = Archivo.name;
      var storageRef = firebase.storage().ref('/Peticiones/'+userId+"/"+filename);
      storageRef.put(Archivo)
      var uploadTask = storageRef.put(Archivo)
      console.log(uploadTask)
      uploadTask.on('state_changed', function(snapshot){

      }, function(error){

      }, function(){
        uploadTask.snapshot.ref.getDownloadURL()
        .then(function(downloadURL) {
          const url=downloadURL
          return firebase.database().ref('/peticiones/'+temp.key+"/").update({
            url: url
          
          })
        })
      })
    }
  })
}

export function signUpUser(email, password) {
  console.log(email, password)
  return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(user){
    console.log("creado");}); 
    
}

export function forgetP(emailAddress){
var auth = firebase.auth();
return auth.sendPasswordResetEmail(emailAddress).then(function() {
// Email sent.
}).catch(function(error) {
// An error happened.
});

}

export function confirmationMail(){
  var user= firebase.auth().currentUser
  user.sendEmailVerification().then(function() {
  
// Email sent.
}).catch(function(error) {
// An error happened.
});
}

export function signUpX(user){
    return firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
}

export let isAuthenticated = new Promise((resolve, reject) => {
  firebase.auth().onAuthStateChanged((user)=> {
    resolve(user)
    })
});

/*export function addUserToDB(user) {
return firebase.database().ref('/users/'+user.uid).set({
email: user.email,
uid: user.uid,
createdAt: user.metadata.creationTime,
signedAt: user.metadata.lastSignInTime
})
}*/




export function getUserAll(userId){
  return new Promise((resolve, reject) =>{
    //    firebase.database().ref('/users').on('value', snapshot => {

    firebase.database().ref('/users/'+userId).once('value', snapshot => {
      const usuario = snapshot.val();
      const services = usuario.services;
      const course = usuario.cursos
      const image = usuario.images
      let Todo=[];
      let servicios= [];
      let cursos=[];
      let Image=[];

      for(let img in image){
        Image.push({
          url:image[img].url
        })
      }

      for(let serv in services){
        const servImg = services[serv].images
        console.log(services[serv].images)
        for(let temp in servImg){
          servicios.push({
            id:serv,
            NServicio: services[serv].NServicio,
            Lugar: services[serv].Lugar,
            Descripcion: services[serv].Descripcion,
            Categoria: services[serv].Categoria,
            Direccion: services[serv].Direccion,
            Telefono: services[serv].Telefono,
            Calificacion: services[serv].Calificacion,
            url: servImg[temp].url
        });
        }
      }
      for(let curs in course){
        const cursImg = course[curs].images
        console.log(course[curs].images)
        for(let temp in cursImg){
          cursos.push({
            id:curs,
            Calificacion: course[curs].Calificacion,
            Categoria: course[curs].Categoria,
            Cupos: course[curs].Cupos,
            NCurso: course[curs].NCurso,
            Lugar: course[curs].Lugar,
            Hora: course[curs].Hora,
            Descripcion: course[curs].Descripcion,
            Direccion: course[curs].Direccion,
            Telefono: course[curs].Telefono,
            Calificacion: course[curs].Calificacion,
            dateInicio: course[curs].dateInicio,
            dateFin: course[curs].dateFin,
            url: cursImg[temp].url
            //Suscritos: course[curs].Suscritos.length
          });
        }
      }

    Todo.push({
      servicios:servicios,
      cursos:cursos,
      image:Image,
      id: userId,
      apodo: usuario.apodo,
    })
      
      console.log(Todo);
      resolve(Todo);
    });
  });
}



export function getCursosThatAUserSugedUp(userId){
  return new Promise((resolve, reject) =>{
    //    firebase.database().ref('/users').on('value', snapshot => {

    firebase.database().ref('/users/').once('value')
    .then(
      snapshot => {
      const usuarios = snapshot.val();
      let cursos;
      for(let usr in usuarios){
        const usuario = usuarios[usr].cursos
        for(let curso in usuario){
          let _array=[]
          const suscritos = usuario[curso].suscritos
          for( let sus in suscritos){
            if(suscritos[sus].id === userId){
              _array.push({
                id:curso,
                Calificacion: usuario[curso].Calificacion,
                Categoria: usuario[curso].Categoria,
                Cupos: usuario[curso].Cupos,
                NCurso: usuario[curso].NCurso,
                Lugar: usuario[curso].Lugar,
                Hora: usuario[curso].Hora,
                Descripcion: usuario[curso].Descripcion,
                dateInicio: usuario[curso].dateInicio,
                dateFin: usuario[curso].dateFin
              })
            }
          }
          cursos.push({
            curso:_array
          })
        }
      }
  
      resolve(cursos);
    });
  });
}

export function getUserPersonal(userId){
  
  return firebase.database().ref("/users/"+userId).once('value')
  .then((snapshot) =>{
    
    console.log(snapshot.val());
    const val = snapshot.val().personal;
    const val2 = snapshot.val().images;
    let person = [];
    let url = [];
    let Todo=[];
    for(let i in val){
      person.push({
        id:i,
        all: val[i]
      })
    }
    for(let j in val2){
      url.push({
        all: val2[j],
        urlId: j
      })
    }
    Todo.push({
      person:person,
      url:url
    })
    console.log(Todo)
    return Todo;
  })
}

export function getMails(){
  return firebase.database().ref("/correos/").once('value')
  .then(snapshot => {
    const val = snapshot.val()
    let _url = [];
    for(let i in val){
      _url.push({
        mail: val[i]
      })
    }
    return(_url)
  })
}

export function getUserImage(userId){
  return firebase.database().ref("/users/"+userId+"/image/").once('value')
  .then(snapshot => {
    const val = snapshot.val()
    let _url = [];
    for(let i in val){
      _url.push({
        all: val[i]
      })
    }
    return _url;
  })
}

export function getAllServicesByCategory(category){
  return new Promise((resolve, reject) =>{
    firebase.database().ref('/users').on('value', snapshot => {
      const users = snapshot.val();
      console.log('users')
      console.log(users)
      let usuarios= [];
      
      for(let user in users){
        //if(user !== currentUserId){
          const service = users[user].services
          console.log(service)
          let _array=[]
          if(service != undefined){
            for(let serv in service){
              if(service[serv].Categoria === category){
                const servImg = service[serv].images
                for(let temp in servImg){
                  _array.push({
                    id:serv,
                    Lugar: service[serv].Lugar,
                    Descripcion: service[serv].Descripcion,
                    NServicio: service[serv].NServicio,
                    Direccion: service[serv].Direccion,
                    Telefono: service[serv].Telefono,
                    url: servImg[temp].url
                  })
                }
                
              }
            }
              
            //console.log(_array)
          }
          //console.log(service)
          
          usuarios.push({
            id: user,
            email: users[user].email,
            apodo: users[user].apodo,
            services: _array
          });
        //}
      }
      resolve(usuarios);
    });
  });
  }

  export function getAllCoursesByCategory(category){
    return new Promise((resolve, reject) =>{
      firebase.database().ref('/users').on('value', snapshot => {
        const users = snapshot.val();
        console.log('users')
        console.log(users)
        let usuarios= [];
        
        for(let user in users){
          //if(user !== currentUserId){
            const cursos = users[user].cursos
            console.log(cursos)
            let _array=[]
            if(cursos != undefined){
              for(let curs in cursos){
                if(cursos[curs].Categoria === category){
                  const cursImg = cursos[curs].images
                  for(let temp in cursImg){
                    _array.push({
                      id:curs,
                      Hora: cursos[curs].Hora,
                      Lugar: cursos[curs].Lugar,
                      Descripcion: cursos[curs].Descripcion,
                      NCurso: cursos[curs].NCurso,
                      Cupos: cursos[curs].Cupos,
                      Direccion: cursos[curs].Direccion,
                      Telefono: cursos[curs].Telefono,
                      Calificacion: cursos[curs].Calificacion,
                      dateInicio: cursos[curs].dateInicio,
                      dateFin: cursos[curs].dateFin,
                      url: cursImg[temp].url
                    })
                  } 
                }
              }
                
              //console.log(_array)
            }
            //console.log(service)
            
            usuarios.push({
              id: user,
              email: users[user].email,
              apodo: users[user].apodo,
              cursos: _array
            });
          //}
        }
        console.log(usuarios)
        resolve(usuarios);
      });
    });
    }


  export function getAllUsers(currentUserId){
return new Promise((resolve, reject) =>{
  firebase.database().ref('/users').on('value', snapshot => {
    const users = snapshot.val();
    console.log('users')
    let usuarios= [];
    console.log(users)    
    for(let user in users){
      if(user !== currentUserId){
        const service = users[user].services
        const curso = users[user].cursos
        var i=0;
        var j=0;
        let _array=[]
        if(service != undefined){
          for(let serv in service){
            i=i+1;
          }
          //console.log(_array)
        }
        if(curso != undefined){
          for(let curs in curso){
            j=j+1;
          }
          //console.log(_array)
        }
        console.log(users[user])
        
        usuarios.push({
          id: user,
          apodo: users[user].apodo,
          email: users[user].email,
          NumeroServicio:i,
          NumeroCursos:j
        });
      }
    }
    console.log(usuarios)
    resolve(usuarios);
  });
});
}

export function getAllServicesOfAUser(userId){
    return new Promise((resolve, reject) =>{
      firebase.database().ref('/users').on('value', snapshot => {
        const users = snapshot.val();
        console.log('users')
        console.log(users)
        let usuarios= [];
        
        for(let user in users){
          if(user === userId){
            const service = users[user].services
            let _array=[]
            if(service != undefined){
              for(let serv in service){
                _array.push({
                  id:serv,
                  Lugar: service[serv].Lugar,
                  Descripcion: service[serv].Descripcion,
                  NServicio: service[serv].NServicio
                })
              }
              //console.log(_array)
            }
            //console.log(service)
            
            usuarios.push({
              id: user,
              apodo: users[user].apodo,
              services: _array
            });
          }
          //if(user !== currentUserId){
            
          //}
        }
    
        resolve(usuarios);
      });
    });
    }
  

export function getAllServices(){
return new Promise((resolve, reject) =>{
  firebase.database().ref('/users').on('value', snapshot => {
    const users = snapshot.val();
    console.log('users')
    console.log(users)
    let usuarios= [];
    
    for(let user in users){
      //if(user !== currentUserId){
        const service = users[user].services
        let _array=[]
        if(service != undefined){
          for(let serv in service){
            _array.push({
              id:serv,
              Lugar: service[serv].Lugar,
              Descripcion: service[serv].Descripcion,
              NServicio: service[serv].NServicio
            })
          }
          //console.log(_array)
        }
        //console.log(service)
        
        usuarios.push({
          id: user,
          services: _array
        });
      //}
    }

    resolve(usuarios);
  });
});
}

export function getUsers(){
  return new Promise((resolve, reject) =>{
    firebase.database().ref('/users').on('value', snapshot => {
      const users = snapshot.val();
      console.log('users')
    console.log(users)
      let usuarios= [];
      const currentUserId = firebase.auth().currentUser.uid;
      for(let user in users){
        if(user !== currentUserId){
          usuarios.push({
            id: user,
            email: users[user].email,
            type: users[user].type,
            status: users[user].status,
            rol: users[user].rol,
            apodo:users[user].apodo
          });
        }
      }

      resolve(usuarios);
      console.log(usuarios);
    });
  });
}

export function getSugerencias(){
  return firebase.database().ref("/").once('value')
  .then(snapshot =>{
    const val = snapshot.val().sugerencias;
    const val2 = snapshot.val().peticiones;
    console.log(val2)
    let _sugerencias = []
    let _peticiones = []
    let Todo = []
    for(let pet in val2){
      _peticiones.push({
        id: val2,
        Peticion: val2[pet].Contenido,
        userId: val2[pet].commenterId,
        userMail: val2[pet].commenterMail,
        date: val2[pet].date,
        apodo: val2[pet].apodo,
        url: val2[pet].url
      })
    }
    for( let sug in val){
      _sugerencias.push({
        id: sug,
        Sugerencia: val[sug].Sugerencia,
        commenterId: val[sug].commenterId,
        commenterMail: val[sug].commenterMail,
        date: val[sug].date,
        apodo: val[sug].apodo
      })
    }
    Todo.push({
      _sugerencias:_sugerencias,
      _peticiones:_peticiones
    })
    return Todo

  })
}


export function VotarServicioUsuarios(userId, serviceId,suscripcion){
  console.log(suscripcion)
  return firebase.database().ref('/users/'+userId+'/services/'+serviceId+'/calificacion/').push(suscripcion)
}


export function ComprobarVotantesServicio(userId, serviceId, loggedId){
  return firebase.database().ref("/users/"+userId+"/services/"+serviceId+"/calificacion/").once('value')
  .then(snapshot => {
    let val= snapshot.val()
    console.log(val)
    for(let user in val){
      console.log(loggedId)
      if(val[user].id === loggedId){
        return true
      }
    }
    return false
  })
}


export function ActualizarCalificacionServicio(userId, serviceId, actual, nueva){
  return firebase.database().ref("/users/"+userId+"/services/"+serviceId).once('value')
  .then(snapshot => {
    let val= snapshot.val()
    return firebase.database().ref('/users/'+userId+'/services/'+serviceId+'/').update({
      Calificacion: ((parseFloat(actual)+parseFloat(nueva))/parseFloat(val.Votos)),
      Sumatoria:((parseFloat(actual))+parseFloat(nueva))
    })
  }) 
}

export function ActualizarNVotosServicio(userId, serviceId, actual){
  console.log(actual)
  return firebase.database().ref('/users/'+userId+'/services/'+serviceId+'/').update({
    Votos: (parseInt(actual)+1)
  
  })
}



export function ComprobarVotantes(userId, cursoId, loggedId){
  return firebase.database().ref("/users/"+userId+"/cursos/"+cursoId+'/suscritos/').once('value')
  .then(snapshot => {
    let val= snapshot.val()
    for(let user in val){
      if(val[user].id === loggedId){
        return val[user].califico
      }
    }
    return false
  })
}

export function ActualizarCalificacion(userId, cursoId, actual, nueva){
  return firebase.database().ref("/users/"+userId+"/cursos/"+cursoId).once('value')
  .then(snapshot => {
    let val= snapshot.val()
    console.log(actual)
    return firebase.database().ref('/users/'+userId+'/cursos/'+cursoId+'/').update({
      Calificacion: ((parseFloat(actual)+parseFloat(nueva))/parseFloat(val.Votos)),
      Sumatoria:((parseFloat(actual))+parseFloat(nueva))
    })
  }) 
}

export function ActualizarNVotos(userId, cursoId, actual){
  console.log(actual)
  return firebase.database().ref('/users/'+userId+'/cursos/'+cursoId+'/').update({
    Votos: (parseInt(actual)+1)
  
  })
}

export function ActualizarUsuarioVotar(userId, cursoId, voto){
  return firebase.database().ref("/users/"+userId+"/cursos/"+cursoId+'/suscritos/').once('value')
  .then(snapshot => {
    let val = snapshot.val()
    for(let user in val){
      if(val[user].id === voto){
        console.log("salio")
        return firebase.database().ref("/users/"+userId+"/cursos/"+cursoId+'/suscritos/'+user).update({
          califico: true
        })
      }
    }
  })
}

export function getCurso(userId, cursoId){
  return firebase.database().ref("/users/"+userId+"/cursos/"+cursoId).once('value')
  .then((snapshot) =>{
    console.log(cursoId);
    let _url= [];
    const val = snapshot.val()
    console.log(val.comentarios);
    let _comments = [];
    if(val.comentarios != null){
      const comentarios = val.comentarios;
      for(let com in comentarios){
        _comments.push({
          id: com,
          Comentario: comentarios[com].Comentario,
          commenterId: comentarios[com].commenterId,
          commenterMail: comentarios[com].commenterMail,
          date: comentarios[com].date
        });
      }
    }

    if(val.images !== null){
      const images= val.images;
      for(let img in images){
        _url.push({
          urlId:img,
          url:images[img].url
        })
      }     

    }
    

    const _curso = {
      id:cursoId,
      url:_url,
      NCurso: val.NCurso,
      Lugar: val.Lugar,
      Hora: val.Hora,
      Descripcion: val.Descripcion,
      Comentarios: _comments,
      Cupos: val.Cupos,
      Votos: val.Votos,
      Calificacion: val.Calificacion,
      Sumatoria: val.Sumatoria,
      Direccion: val.Direccion,
      Telefono: val.Telefono,
      dateInicio: val.dateInicio,
      dateFin: val.dateFin
    }
    
    return _curso;
  })
}

export function getService(userId, serviceId){
  return firebase.database().ref("/users/"+userId+"/services/"+serviceId).once('value')
  .then((snapshot) =>{
    let _url= [];
    const val = snapshot.val()
    let _comments = [];
    if(val.comentarios != null){
      const comentarios = val.comentarios;
      for(let com in comentarios){
        _comments.push({
          id: com,
          Comentario: comentarios[com].Comentario,
          commenterId: comentarios[com].commenterId,
          commenterMail: comentarios[com].commenterMail,
          date: comentarios[com].date
        }); 
      }
    }
    if(val.images !== null){
      const images= val.images;
      for(let img in images){
        _url.push({
          urlId:img,
          url:images[img].url
        })
      }
    }
    

    const _service = {
      id:serviceId,
      url:_url,
      Categoria: val.Categoria,
      NServicio: val.NServicio,
      Lugar: val.Lugar,
      Descripcion: val.Descripcion,
      Comentarios: _comments,
      NVoto: val.Votos,
      Calificacion:val.Calificacion,
      Sumatoria: val.Sumatoria,
      Direccion: val.Direccion,
      Telefono: val.Telefono
    }
    
    return _service;
  })
}

export function Suscribirse(userId, cursoId,suscripcion){
  return firebase.database().ref('/users/'+userId+'/cursos/'+cursoId+'/suscritos/').push(suscripcion)
}

export function Correos(mail){
  return firebase.database().ref('/correos/').push(mail)
}

export function Suscribirse2(userId, cursoId,suscripcion){
  return firebase.database().ref('/users/'+userId+'/suscrito/').push(suscripcion)
}

export function ComprobarSuscripcion(userId, cursoId, suscritoId){
  return firebase.database().ref('/users/'+userId+'/cursos/'+cursoId+'/suscritos/').once('value')
  .then(snapshot => {
    let val= snapshot.val()
    for(let user in val){
      if(suscritoId ===val[user].id){
        return true
      }
    }
  })
}

export function UpdateUserImage(userId, Archivo, urlId){
  console.log(urlId)
  var filename = Archivo.name;
  var storageRef = firebase.storage().ref('/users/'+userId+"/"+filename);
  storageRef.put(Archivo)
  var uploadTask = storageRef.put(Archivo)
  console.log(uploadTask)
  uploadTask.on('state_changed', function(snapshot){

  }, function(error){

  }, function(){
    uploadTask.snapshot.ref.getDownloadURL()
    .then(function(downloadURL) {
      return firebase.database().ref('/users/'+userId+'/images/'+urlId).update({
        url:downloadURL
      })
    //return firebase.database().ref('peticiones/').push(val)
    })
    
  })
  
}

export function UpdateService(userId, serviceId, actual,Archivo,urlId){
  console.log(urlId)
  return firebase.database().ref('/users/'+userId+'/services/'+serviceId+'/').update({
    NServicio: actual.NServicio,
    Lugar: actual.Lugar,
    Descripcion: actual.Descripcion,
    Direccion: actual.Direccion,
    Telefono: actual.Telefono,  
  })
  
    .then(temp2 =>{
      if(Archivo !== undefined && Archivo !==null){
        var filename = Archivo.name;
    var storageRef = firebase.storage().ref('/ImagesServices/'+userId+"/"+serviceId+"/"+filename);
    storageRef.put(Archivo)
    var uploadTask = storageRef.put(Archivo)
    console.log(uploadTask)
    uploadTask.on('state_changed', function(snapshot){
  
    }, function(error){
  
    }, function(){
      uploadTask.snapshot.ref.getDownloadURL()
      .then(function(downloadURL) {
        return firebase.database().ref('/users/'+userId+'/services/'+serviceId+'/images/'+urlId).update({
          url:downloadURL
        })
      //return firebase.database().ref('peticiones/').push(val)
      })
      
    })
      }
    
    })
  
}

export function UpdateCourse(userId, cursoId, actual,Archivo,urlId){
  return firebase.database().ref('/users/'+userId+'/cursos/'+cursoId+'/').update({
    NCurso: actual.NCurso,
    Lugar: actual.Lugar,
    Descripcion: actual.Descripcion,
    Direccion: actual.Direccion,
    Telefono: actual.Telefono,
    Cupos: actual.Cupos,
    Hora: actual.Hora 
  })
  .then(temp =>{
    if(Archivo !== undefined && Archivo !==null){
      var filename = Archivo.name;
    var storageRef = firebase.storage().ref('/ImagesCourses/'+userId+"/"+cursoId+"/"+filename);
    storageRef.put(Archivo)
    var uploadTask = storageRef.put(Archivo)
    console.log(uploadTask)
    uploadTask.on('state_changed', function(snapshot){
  
    }, function(error){
  
    }, function(){
      uploadTask.snapshot.ref.getDownloadURL()
      .then(function(downloadURL) {
        return firebase.database().ref('/users/'+userId+'/cursos/'+cursoId+'/images/'+urlId).update({
          url:downloadURL
        })
      //return firebase.database().ref('peticiones/').push(val)
      })
      
    })
    }
  })
}

export function DeleteService(userId, serviceId){
  return firebase.database().ref('/users/'+userId+'/services/'+serviceId+'/').remove()
}

export function DeleteCurso(userId, cursoId){
  return firebase.database().ref('/users/'+userId+'/cursos/'+cursoId+'/').remove()
}

export function RestarCupos(userId, cursoId,actual){
  console.log(cursoId)
  return firebase.database().ref('/users/'+userId+'/cursos/'+cursoId+'/').update({
    Cupos: (parseInt(actual)-1)
  
  })
}

export function changeRol(userId, actual){
  return firebase.database().ref('/users/'+userId).update({
    rol: actual === "normal" ? "profesor" : "normal"
  
  })
}

export function changeType(userId, actual){
  return firebase.database().ref('/users/'+userId).update({

    type: actual === "admin" ? "user" : "admin"
  
  })
}

export function changeStatus(userId, actual){
  return firebase.database().ref('/users/'+userId).update({

    status: actual === "active" ? "inactive" : "active"
  
  })
}

export function Petition(Archivo, Contenido){
  var filename = Archivo.name;
  var storageRef = firebase.storage().ref('/Peticiones/'+Contenido.userId+"/"+filename);
  storageRef.put(Archivo)
  var uploadTask = storageRef.put(Archivo)
  console.log(uploadTask)
  uploadTask.on('state_changed', function(snapshot){

  }, function(error){

  }, function(){
    var postKey = firebase.database().ref('peticiones/'+Contenido.userId).push().key;
    uploadTask.snapshot.ref.getDownloadURL()
    .then(function(downloadURL) {
      var updates = {};
    var postData = {
      url: downloadURL,
      Contenido
      //caption: ("#imageCaption").val(),
      //url: downloadURL
    };
    console.log(postData)
    //return firebase.database().ref('peticiones/').push(val)
    updates['/peticiones/'+postKey] = postData;
    firebase.database().ref().update(updates)
    })
    
  })
}



export function ImageCourse(Archivo, userId, cursoId){
  var filename = Archivo.name;
  var storageRef = firebase.storage().ref('/ImagesServices/'+userId+"/"+cursoId+"/"+filename);
  storageRef.put(Archivo)
  var uploadTask = storageRef.put(Archivo)
  console.log(uploadTask)
  uploadTask.on('state_changed', function(snapshot){

  }, function(error){

  }, function(){
    var postKey = firebase.database().ref('/users/'+userId+"/"+cursoId+"/").push().key;
    uploadTask.snapshot.ref.getDownloadURL()
    .then(function(downloadURL) {
      var updates = {};
    var postData = {
      url: downloadURL,
      //caption: ("#imageCaption").val(),
      //url: downloadURL
    };
    console.log(postData)
    //return firebase.database().ref('peticiones/').push(val)
    updates['/users/'+userId+"/"+cursoId+"/images/"+postKey] = postData;
    firebase.database().ref().update(updates)
    })
    
  })
}

