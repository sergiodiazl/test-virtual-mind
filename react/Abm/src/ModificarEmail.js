import React,{ Component} from 'react';
import axios from 'axios';
class ModificarEmail extends Component{  constructor(){
    super();
    this.state = {
    
      id:'',
      email:'',
      mensaje:'',
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
    let emailValidacion = this.state.email;
    var regex= /^[0-9\b]+$/;
    var soloNum =regex.test(value);
    if(soloNum){
      this.setState({idValido:true,mensaje:''});
      if( emailValidacion !== ''){
          this.setState({boton:true,mensaje:''});
      }else{
        mensajeValidacion = 'ingrese el email';
      this.setState({boton:false,mensaje:mensajeValidacion});
      }
      }
      else{ 
      mensajeValidacion = 'ingrese numeros solamente';
      this.setState({boton:false,mensaje:mensajeValidacion});
      } 
      break;
    case 'email':
    this.setState({email:value});

    let idV =this.state.idValido;
    if(idV && value != ''){
      this.setState({boton:true,mensaje:''});
    }else{
      this.setState({boton:false,mensaje:'ingrese el numero de id o email'});
    }
    default:
      break;
  }
  console.log(value);

}
    handleClick = () =>{
      console.log("onClick");
      var id= this.state.id;
      var nom= this.state.email;
      console.log(id);
      this.requestCambiar(id,nom);
    }
    requestCambiar(id,nom){
          const params = new URLSearchParams();
    params.append('funcion', 'cambiarEmail');
    params.append('id', id);
    params.append('email',nom);
    axios.post('https://serkono.000webhostapp.com/testvm/api.php',
      params)
    .then(res => {        
    console.log("respuesta de post crear");
    let m =res.data.mensaje;
    this.setState({     mensaje:m});
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
              <p><label className='label' htmlFor="email">Nuevo email</label><br/>
            <input  className='input' type="text" className="form-control"
              name="email" value={this.state.email}
              onChange={this.handleUserInput}  /></p>

        
        <button  className='boton' disabled={!this.state.boton} onClick={this.handleClick}>
              Cambiar email
            </button>
         <p> {this.state.mensaje}</p>
         </div>
         
       </div>
       )
    
    
  } 
  
  
}export default ModificarEmail