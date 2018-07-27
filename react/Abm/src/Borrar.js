import React,{ Component} from 'react';
import axios from 'axios';
class Borrar extends Component{
	constructor(){
		super();
		this.state = {
		
			id:'',
			mensaje:'',
			formularioValido:false,
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
    var regex= /^[0-9\b]+$/;
    var soloNum =regex.test(value);
    if(soloNum){
      this.setState({boton:true,id:value});
      }
      else{
     	
      mensajeValidacion = 'ingrese numeros solamente';
       this.setState({boton:false,mensaje:mensajeValidacion});
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

    	console.log(id);
    	this.requestBorrar(id);
    }
    requestBorrar(id){
    			const params = new URLSearchParams();
		params.append('funcion', 'borrarUsuario');
		params.append('id', id);
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


           		<p><label className='label' htmlFor="id">Id del usuario</label><br/>
         		<input  className='input' type="text" className="form-control"
           		name="id" value={this.state.id}
           		onChange={this.handleUserInput}  /></p>

				
				<button  className='boton' disabled={!this.state.boton} onClick={this.handleClick}>
          		Borrar usuario
       			</button>
				 <p> {this.state.mensaje}</p>
				 </div>
				 
			 </div>
			 )
		
		
	}	
	
}export default Borrar