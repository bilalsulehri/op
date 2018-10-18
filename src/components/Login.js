import React, { Component } from 'react';
import axios from '../axios';
import {Route, NavLink,Switch} from 'react-router-dom';
import OrderList from '../components/OrderList';
import Companies from './Companies';
class Login extends Component {

  state={showLogin:true, message:'', showCompanies:true};


  componentDidMount(){
    localStorage.setItem('OPSessionID',null);
  }
  login(){

    
    axios.post( '/login',{
        'username': this.refs.username.value,
        'password':this.refs.password.value
  } ).then( response => {
          //alert('response');
            const loginResponse = response.data;
            console.log(response);
            if(loginResponse.authenticated ){
              localStorage.setItem('OPSessionID', loginResponse.OPSessionID);
              console.log("login status false?? " +loginResponse.authenticated);
              this.setState({...this.state, showLogin:false, showCompanies:true});

             
              
            }else{
              console.log("login status passed?? " +loginResponse);
              this.setState({message: 'Invalid user name Or Password'})
            }
            // console.log( response );
        } )
        .catch(error => {
            // console.log(error);
            //this.setState({error: true});
        });


  }

  closeScreen(){
    this.setState({...this.state, showCompanies:false, showLogin:false});
  }

  keyPress=(e)=>{
    if(e.key=='Enter' || e.key=='enter'){
      this.login();
    }
  }

  render() {

    

    
    // if(!this.state.showLogin)
    //   return 
    
    const backdropStyle={
      position: 'fixed',
      top: 0,
      bottom: 0,
      left:0,
      right:0,
      backgroundColor:'rgba(0,0,0,0.3)',
      padding:50
    }

    const modalStyle={
      border : '1px solid black',
      backgroundColor: '#fff',
      borderRadius:'5px',
      maxWidth:800,
      minHeight:400,
      maxHeight:400,
      margin: '0 auto',
      padding: 30,
      position: 'Relative',
      overflow:'hidden'

    }

    const footerStyle={
      position:'absolulte',
      bottom: '20px'
    }

    const style={display:'none'};


     const centerText={
       'text-align': 'center'
     }





     let pageContents=null;
     if(this.state.showLogin){
       pageContents=<div style={backdropStyle}>
      <div style={modalStyle}>

         <p style={centerText}><b>Login Form</b></p>
         <p></p>

           <div className="row">
             <div className="col-10"/>
             <div className="col-20">
             <label htmlFor="username" >User Name</label>
            </div>
             <div className="col-50">
                 <input className="pure-input" type="text"  id="username" ref="username" onKeyPress={this.keyPress}/>

             </div>
           </div>
           <div className="row">
             <div className="col-10"/>
             <div className="col-20">
             <label htmlFor="username" >Password</label>
            </div>
             <div className="col-50">
                 <input className="pure-input" type="password"  id="password" ref="password"   onKeyPress={this.keyPress}/>

             </div>
           </div>

           <p></p><p></p>
           <div className="row">
               <div className="col-10"/>
               <div className="col-20">
                 <button type="button" className="btn info" onClick={this.login.bind(this)}>Login</button>
               </div>
           </div>

           <p></p>
           <center>{this.state.message}</center>
       </div>
     </div>;
     }else if(this.state.showCompanies){
       pageContents=
       <div style={backdropStyle}>
          

            <div style={modalStyle}>
       
              <Companies  closeScreen={this.closeScreen.bind(this)}></Companies>
            </div>
        </div>
     }else{
        //pageContents =<OrderList/>
        /*<div><Route path="/" exact component={OrderList}/></div>;*/
     }

    return (
      <div>
      {pageContents}
      </div>
    );
  }
}

export default Login;
