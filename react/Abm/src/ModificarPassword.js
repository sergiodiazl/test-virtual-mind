import React,{ Component} from 'react';
import axios from 'axios';
class ModificarPassword extends Component{  constructor(){
    super();
    this.state = {
    
      id:'',
      password:'',
      passwordViejo:'',
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
    let passwordValidacion = this.state.password;
    var regex= /^[0-9\b]+$/;
    var soloNum =regex.test(value);
    if(soloNum){
      this.setState({idValido:true,mensaje:''});
      if( passwordValidacion !== ''){
          this.setState({boton:true,mensaje:''});
      }else{
        mensajeValidacion = 'ingrese el password';
      this.setState({boton:false,mensaje:mensajeValidacion});
      }
      }
      else{ 
      mensajeValidacion = 'ingrese numeros solamente';
      this.setState({boton:false,mensaje:mensajeValidacion});
      } 
      break;
    case ('password' ):
    this.setState({password:value});

    var idV =this.state.idValido;
    var passV =this.state.passwordViejo;
    var passN=this.state.password;
    if(idV && passV != '' &&passN!=''){
      this.setState({boton:true,mensaje:''});
    }else{
      this.setState({boton:false,mensaje:'ingrese el numero de id o password'});
    }
    break;
   case ('passwordViejo' ):
    this.setState({passwordViejo:value});
    var idV =this.state.idValido;
    var passV =this.state.passwordViejo;
    var passN=this.state.password;
    if(idV && passV != '' &&passN!=''){
      this.setState({boton:true,mensaje:''});
    }else{
      this.setState({boton:false,mensaje:'ingrese el numero de id o password'});
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
      var nom= this.state.password;
      console.log(id);
      this.requestCambiar(id,nom);
    }
    requestCambiar(id,nom){
          const params = new URLSearchParams();
    params.append('funcion', 'cambiarPassword');
    params.append('id', id);
    params.append('password',nom);
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
              <p><label className='label' htmlFor="passwordViejo">password viejo</label><br/>
            <input  className='input' type="password" className="form-control"
              name="passwordViejo" value={this.state.passwordViejo}
              onChange={this.handleUserInput}  /></p>
              <p><label className='label' htmlFor="password">Nuevo password</label><br/>
            <input  className='input' type="password" className="form-control"
              name="password" value={this.state.password}
              onChange={this.handleUserInput}  /></p>

        
        <button  className='boton' disabled={!this.state.boton} onClick={this.handleClick}>
              Cambiar password
            </button>
         <p> {this.state.mensaje}</p>
         </div>
         
       </div>
       )
    
    
  } 
  
  
}export default ModificarPassword