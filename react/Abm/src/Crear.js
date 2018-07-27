import React,{ Component} from 'react';
import axios from 'axios';
class Crear extends Component{
	constructor(){
		super();
		this.state = {
		
			nombre:'',
			apellido:'',
			email:'',
			password:'',
			password2:'',
			emailValido:false,
			passwordValido:false,
			mensaje:'',
			boton:false,
		};
	}
	handleUserInput = (e) => {
 	 const name = e.target.name;
  	const value = e.target.value;
 	 this.setState({[name]: value}, 
                () => { this.validateField(name, value) });
	console.log(name,value);
	}
validateField(fieldName, value) {
  let mensajeValidacion = this.state.mensaje;
  let emailValido = this.state.emailValido;
  let passwordValido = this.state.passwordValido;
  let pass1 = this.state.password;
  let pass2 =this.state.password2;
  let nombre =this.state.nombre;
  let apellido =this.state.apellido
  switch(fieldName) {
    case 'email':
      var dirEmail = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      mensajeValidacion = dirEmail ? '' : 'email no es valido';
      if(dirEmail){
      	emailValido=true;
      }
      break;
    case 'password':
    var val =value.toString();
    console.log(val.length);
      if (pass1 === pass2){
      	mensajeValidacion = ' ';
      	passwordValido =true ;
      	if (val.length < 6){
         mensajeValidacion = ' la contraseña debe tener 6 caracteres o mas';
      	passwordValido= false;
      	}	
      }
      else{
      passwordValido= false;	
      mensajeValidacion ='Repita la contraseña correctamente';
      }   
      break;
	case 'password2':
    var val =value.toString();
    console.log(val.length);
      if (pass1 === pass2){
      	mensajeValidacion = ' ';
      	passwordValido =true ;
      	if (val.length < 6){
         mensajeValidacion = ' la contraseña debe tener 6 caracteres o mas';
      	passwordValido= false;
      	}	
      }
      else{
      passwordValido= false;	
      mensajeValidacion ='Repita la contraseña correctamente';
      }   
      break;
    default:
      break;
  }
  this.setState({mensaje: mensajeValidacion,
                  emailValido: emailValido,
                  passwordValido: passwordValido
                });
  console.log(emailValido,passwordValido,nombre,apellido);
  if(emailValido  && passwordValido && nombre !== ''){
  	this.setState({boton:true});
  }else{
  	this.setState({boton:false});
  }
}
    handleClick = () =>{
    	console.log("onClick");
    	var n= this.state.nombre;
    	var e=this.state.email;
    	var a =this.state.apellido;
    	var p =this.state.password
    	console.log(n,e,a,p);
    	this.requestCrear(n,e,a,p);
    }
    requestCrear(n,e,a,p){
    			const params = new URLSearchParams();
		params.append('funcion', 'registrarUsuario');
		params.append('nombre', n);
		params.append('email', e);
		params.append('apellido',a);
		params.append('password', p);
		axios.post('https://serkono.000webhostapp.com/testvm/api.php',
			params)
		.then(res => {        
		console.log("respuesta de post crear");
		let m =res.data.mensaje;
 		this.setState({ 		mensaje:m});
      	})
      	.catch(error => {
      		console.log("hubo error");
    	console.log(error.res)
		});

    }
	componentDidMount(){

	}
	render(){
		return (
				<div className="Formulario">

				<div className="contenido">

				<p><label className='label' htmlFor="email">Email </label><br/>
         		<input className='input' type="email" className="form-control"
           		name="email" value={this.state.email} 
           		onChange={this.handleUserInput} /></p>

           		<p><label className='label' htmlFor="nombre">Nombre</label><br/>
         		<input  className='input' type="text" className="form-control"
           		name="nombre" value={this.state.nombre}
           		onChange={this.handleUserInput}  /></p>

           		<p><label className='label' htmlFor="apellido">Apellido</label><br/>
         		<input   className='input' type="text" className="form-control"
           		name="apellido" value={this.state.apellido}
           		onChange={this.handleUserInput}  /></p>

           		<p><label className='label' htmlFor="password">Contraseña</label><br/>
         		<input  className='input' type="password" className="form-control"
           		name="password" value={this.state.password}
           		onChange={this.handleUserInput}  /></p>

           		<p><label className='label' htmlFor="password2">Repita contraseña</label><br/>
         		<input  className='input' type="password" className="form-control"
           		name="password2" value={this.state.password2}
           		onChange={this.handleUserInput}  /></p>

				
				
				  <button className='boton' disabled={!this.state.boton} onClick={this.handleClick}>
          		Crear usuario
       			</button>
				 <p> {this.state.mensaje}</p>
				 </div>
				 
			 </div>
			 )
		
		
	}	
	
}export default Crear