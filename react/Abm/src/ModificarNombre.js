import React,{ Component} from 'react';
import axios from 'axios';
class ModificarNombre extends Component{	constructor(){
		super();
		this.state = {
		
			id:'',
			nombre:'',
			mensaje:'',
			formularioValido:false,
			idValido:false,
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

  switch(fieldName) {
    case 'id':
    let mensajeValidacion = this.state.mensaje;
    let nombreValidacion = this.state.nombre;
    var regex= /^[0-9\b]+$/;
    var soloNum =regex.test(value);
    if(soloNum){
      this.setState({idValido:true,mensaje:''});
    	if( nombreValidacion !== ''){
      		this.setState({boton:true,mensaje:''});
    	}else{
    		mensajeValidacion = 'ingrese el nombre';
      this.setState({boton:false,mensaje:mensajeValidacion});
    	}
      }
      else{	
      mensajeValidacion = 'ingrese numeros solamente';
      this.setState({boton:false,mensaje:mensajeValidacion});
      } 
      break;
    case 'nombre':
    this.setState({nombre:value});
    let idV =this.state.idValido;
    if(idV){
    	this.setState({boton:true,mensaje:''});
    }else{
    	this.setState({boton:false,mensaje:'ingrese el numero de id'});
    }
     break;
    default:
      break;
  }
  console.log(value);

}
    handleClick = () =>{
    	console.log("onClick");
    	var id= this.state.id;
      var nom= this.state.nombre;
    	console.log(id);
    	this.requestCambiar(id,nom);
    }
    requestCambiar(id,nom){
    			const params = new URLSearchParams();
		params.append('funcion', 'cambiarNombre');
		params.append('id', id);
    params.append('nombre',nom);
		axios.post('https://serkono.000webhostapp.com/testvm/api.php',
			params)
		.then(res => {        
		console.log("respuesta de post crear");
		let m =res.data.mensaje;
		
        console.log(res.data.dolar);
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


           		<p><label className='label' htmlFor="id">Id del usuario</label><br/>
         		<input className='input' type="text" className="form-control"
           		name="id" value={this.state.id}
           		onChange={this.handleUserInput}  /></p>
           		<p><label className='label' htmlFor="nombre">Nuevo nombre</label><br/>
         		<input className='input' type="text" className="form-control"
           		name="nombre" value={this.state.nombre}
           		onChange={this.handleUserInput}  /></p>

				
				<button className='boton' disabled={!this.state.boton} onClick={this.handleClick}>
          		Borrar usuario
       			</button>
				 <p> {this.state.mensaje}</p>
				 </div>
				 
			 </div>
			 )
		
		
	}	
	
	
}export default ModificarNombre