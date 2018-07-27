import React,{ Component} from 'react';

import peso from './img/peso.jpg';

class Peso extends Component{


constructor(props) {
    super(props);
    
    this.state = {
			horaCreado:Date.parse(Date(this.props.hora))
			,
			hace:'',
		};

  }
	componentDidMount(){
		this.interval=setInterval(() => this.verTiempo(), 1000);
	
	
	}
	componentWillUnmount() {
    	clearInterval(this.interval);
  	}
	verTiempo(){
			var segundos=this.state.horaCreado;
			var ahora=new Date();
			var dif= Math.trunc((ahora- segundos)/1000.0);
			switch(true){
				case (dif<60 ):
				this.setState({hace:(dif +'segundos')});
				break;
				case(dif>60 && dif<3600):
				var min =Math.trunc(dif/60);
				this.setState({hace:(min +'minutos')});
				break;
				case(dif >=3600):
				var hor =Math.trunc(dif/3600);
				this.setState({hace:(hor +'Horas')});
				break;
				default:
				console.log(dif<60 ,dif>60 && dif<3600,dif >=3600);
				console.log(this.state.hace);
				break;

			}
			
	}
	render(){
		return (
				<div className="moneda">
				<div className="contenido">
				<p><div className="etiqueta">{this.props.tipo}</div></p>
				 <img src={peso} className="imgMoneda" alt="Peso" />
				<p><div className="etiqueta">Venta :</div>{this.props.venta}<br/>
				<div className="etiqueta"> Compra :</div>{this.props.compra}<br/>
				<div className="etiqueta"> Actualizacion :</div>{this.props.fecha}<br/>
				<div className="etiqueta"> creado hace :</div> {this.state.hace}</p>
				 </div>
			 </div>
			 )
		
		
	}
}export default Peso