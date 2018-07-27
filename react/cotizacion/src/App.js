import React, { Component } from 'react';
import axios from 'axios';
import Peso from './Peso';
import Dolar from './Dolar';
import Real from './Real';
import logo from './logo.svg';
import './css/style.css';
import './App.css';



class App extends Component {
	constructor(props) {
    	super(props);
    	this.state = {hora:'',resultados:[]};		
				
  }

	valorPeso= () =>{
		const params = new URLSearchParams();
		params.append('funcion', 'cotizacion');
		params.append('moneda', 'peso');
		axios.post('https://serkono.000webhostapp.com/testvm/api.php',
			params)
		.then(res => {        
		//la respuesta siempre sera error por el codigo 501
      	})
      	.catch(error => {
		var t ='peso';
		var v =error.message
		var c =error.message
		var f =error.message
		var h =new Date().toLocaleString();
 		this.setState({venta:v,
 		compra:c,
 		hora:h,
 		fecha:f});
 		var resultado =this.state.resultados.slice();
 		resultado.push([t,v,c,f,h]);
 		this.setState({resultados:resultado});
 		localStorage.setItem("aMostrar",JSON.stringify(resultado));
 		this.valorReal();
		});
	}
	valorReal= () =>{
		const params = new URLSearchParams();
		params.append('funcion', 'cotizacion');
		params.append('moneda', 'real');
		axios.post('https://serkono.000webhostapp.com/testvm/api.php',
			params)
		.then(res => {        
		//siempre es erro por 501
      	})
      	.catch(error => {
		var t ='real';
		var v =error.message;
		var c =error.message;
		var f =error.message;
		var h =new Date().toLocaleString();
 		this.setState({venta:v,
 		compra:c,
 		hora:h,
 		fecha:f});
 		var resultado =this.state.resultados.slice();
 		resultado.push([t,v,c,f,h]);
 		this.setState({resultados:resultado});
 		localStorage.setItem("aMostrar",JSON.stringify(resultado));
 		var jsonLocal =JSON.parse(localStorage.getItem("aMostrar"));
 		
 		if (jsonLocal === ''){console.log("local no definido");}			
		});
	}

	valorDolar= () =>{
		const params = new URLSearchParams();
		params.append('funcion', 'cotizacion');
		params.append('moneda', 'dolar');
		axios.post('https://serkono.000webhostapp.com/testvm/api.php',
			params)
		.then(res => {        
		var t ='dolar';
		var v =res.data.dolar[0];
		var c =res.data.dolar[1];
		var f =res.data.dolar[2];
		var h =new Date().toString();
 		this.setState({venta:v,
 		compra:c,
 		hora:h,
 		fecha:f});
 		var resultado =this.state.resultados.slice();
 		resultado.push([t,v,c,f,h]);
 		this.setState({resultados:resultado});
 		localStorage.setItem("aMostrar",JSON.stringify(resultado));
 		var jsonLocal =JSON.parse(localStorage.getItem("aMostrar"));		
		this.valorPeso();
      	})
      	.catch(error => {
      		console.log("hubo error");
    	console.log(error.res)
		});
	}
	valores= () =>{
		console.log("entro a valores");
		this.valorDolar();
	}
	loopDivs= () =>{
		let divs= [];
		console.log("entro al loopdivs");
		var i;
		for (i=0 ; i <this.state.resultados.length ;i++){
			var valores=this.state.resultados[i];
			var valTipo=valores[0];
			var valCompra=valores[1];
			var valVenta=valores[2];
			var valFecha=valores[3];
			var valHora=valores[4]
			divs.push(this.crearDiv(valTipo,valCompra,valVenta,valFecha,valHora));
		}
		return divs;
	}
	crearDiv(ti,ve,co,fe,ho){
		switch(ti){
			case 'dolar':
				return( <Dolar  tipo= {ti}  compra={co}venta ={ve} fecha ={fe} hora={ho}/> );
				break;
			case 'peso':
				return( <Peso  tipo= {ti} compra={co}venta ={ve} fecha ={fe} hora={ho}/> );
				break;	
			case 'real':
				return( <Real  tipo= {ti} compra={co}venta ={ve} fecha ={fe} hora={ho}/> );
				break;
			default:
			break;		
		}

		
	}
   componentDidMount() {	
  	this.interval=setInterval(() => this.valores(), 10000);
  }
  componentWillMount() {
    console.log("componentWillMount");
    
    	var aMostrar=(localStorage.getItem("aMostrar"));
		if(typeof amostrar!==undefined &&aMostrar.length>0){
			var aMostrar=JSON.parse((localStorage.getItem("aMostrar")));
			console.log("largo a mostrar",aMostrar.length);
			var resultado =this.state.resultados.slice();
			var resultadosViejos= resultado.concat(aMostrar);
			this.setState({resultados:resultadosViejos});
		}
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {

    return (

      <div className="App">

        <header className="App-header">

          <img src={logo} className="App-logo" alt="logo" />

          <h1 className="App-title">Welcome to React</h1>

        </header>

        <div className='wrapMoneda'>
        
        {this.loopDivs()}
      
        </div>
      </div>

    	);

  	}

}


export default App;