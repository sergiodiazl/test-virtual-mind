import React, { Component } from 'react';

import Crear from './Crear';
import Borrar from './Borrar';
import ModificarNombre from './ModificarNombre';
import ModificarApellido from './ModificarApellido';
import ModificarEmail from './ModificarEmail';
import ModificarPassword from './ModificarPassword'
import logo from './logo.svg';
import './css/style.css';
import './App.css';



class App extends Component {

  render() {

    return (

      <div className="App">

        <header className="App-header">

          <img src={logo} className="App-logo" alt="logo" />

          <h1 className="App-title">Welcome to React</h1>

        </header>
        <div className='contenedor'>
       <Crear/>
       <Borrar />
       <ModificarNombre />
       <ModificarApellido/>
       <ModificarEmail />
      <ModificarPassword/>
      </div>
    </div>
    

    );

  }

}



export default App;