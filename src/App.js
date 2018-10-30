import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Inicio from './components/inicio.jsx'
import Sesion from './components/sesion.jsx'
import {isAuthenticated, getUserById} from './API/api.jsx'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Private from './components/private.jsx'
import Public from './components/public.jsx'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost,faHome, faBookOpen, faIdCard, faChalkboardTeacher, faDollarSign, faEdit, faUsers, faUserSecret} from '@fortawesome/free-solid-svg-icons'
import "./css/_parallax.css"
import FooterPagePro from './components/extras/footer.jsx'

library.add(faGhost,faHome,faBookOpen, faIdCard, faChalkboardTeacher, faDollarSign, faEdit, faUsers,faUserSecret)

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      isAuth: false,
      loggedUser: null
    }
    this.onLogout = this.onLogout.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }


  onLogout(){
    window.location = '/';
    this.setState({
      isAuth: false,
      loggedUser: null
    });
  }

  onLogin(_user){
    console.log('logged in');
    this.setState({
      isAuth: true,
      loggedUser: _user
    });
  }

  componentWillMount(){
    isAuthenticated
    .then((user)=>{
      if(user != null){

        getUserById(user.uid)
        .then(_user=>{

          this.onLogin(_user);
        });
      }
    })
  }
  
  render(){

      return(
        
          <div className="App">
          <div className="parallax">
            <Router>
            <main>
                  
                <Route exact path ='/' component= {(props) => <Inicio {...props} title='CMS' isAuth ={this.state.isAuth} onLogout={this.onLogout} /> } />
                {
                  this.state.isAuth?
                  <Private loggedUser={this.state.loggedUser} />
                  :
                  <div>
                  {/*<Route exact path='/' component = {(props) => <Inicio {... props} titulo = '1234'/> }/> {/*path es para que sea global*/}
                  <Public onLogin={this.onLogin} onLogout={this.onLogout} />
                  </div>
                  
                }
                <Route component={(props) => <FooterPagePro {...props}{...this.props}/>}/>
             </main>
            </Router>
            </div>
          </div>
          
      )
  }
}

export default App;
//oute path='/pag3/:par' component = {(props) => <Parametro {... props}/> }/> 
