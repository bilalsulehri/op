import React, { Component } from 'react';
import {Route, NavLink,Switch} from 'react-router-dom';
import CustomField from '../components/CustomField';
import SearchModal from '../components/SearchModal';
import OrderEntry from '../components/OrderEntry';
import OrderList from '../components/OrderList';
import OrderDetails from '../components/OrderDetails';
import logo from '../images/csLogo.png';
import Login from '../components/Login';
import axios from '../axios';
//import './App.css';
import './Style.css';


class Main extends Component {

  state={navbarStyle:['topnav'], showLoginModal:false};

  responsiveMenu(){

    if(this.state.navbarStyle.length==1){
        this.setState({navbarStyle:['topnav responsive']});
    }else{
      this.setState({navbarStyle:['topnav']});
    }

  }

  logout(){
    axios.post( '/logout',{}
    , {"headers":{
      "OPTOKEN": localStorage.getItem("OPSessionID"),
          "Content-Type":"application/json;charset=UTF-8" 
    }}
  ).then( response => {
        //alert('response');
          this.setState({showLoginModal:true})
          // console.log( response );
      } )
      .catch(error => {
          // console.log(error);
          //this.setState({error: true});
          this.setState({showLoginModal:true})
      });
  }
  navigateToOrderList(){}
  render() {
    const logoURL=require('../images/csLogo.png');
    
    let loginComp=<Login showDialog="true"/>;
    if(!this.state.showLoginModal){
      loginComp=null;
    }

    return (

      
      <div className="container" id="container" >
      <div className="row">
      <div  className="col-20">
        <img id="logo" src={logoURL} height="50px" width="200px" style={{'float':'left'}}></img>
      </div>
      <div className="col-75" style={{'float':'right','display':'inline'}}>

      <div className={this.state.navbarStyle} id="main-navbar">
      <div className="dropdown">
        <button className="dropbtn">Order Entry <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <NavLink to="/OrderEntry" exact>Order Entry</NavLink>
          <NavLink to="/orderList" exact>Order List</NavLink>
          <a href="#">Item/Order Inquiry</a>
          <a href="#">Counter Sales Order Entry</a>
          <a href="#">Counter Sales Order Inquiry</a>
          <a href="#">Counter Sales Item/Order Inquiry</a>
          <a href="#">Inventory Status Inquiry</a>
         </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Activity Tracking <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
        <a href="#">Activity Tracking Inquiry</a>
        <a href="#">Representative Productivity Report</a>
        <a href="#">Activity Report</a>
        <a href="#">Aged Activity Report</a>
        <a href="#">Vendor Performance Report</a>
        <a href="#">Closed Activity Report </a>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Order Processing <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
        <a href="#">Release Orders for Pick Tickets</a>
      	<a href="#">Release Orders Estimate</a>
      	<a href="#">Reprint Pick Ticket</a>
      	<a href="#">Void Pick Ticket</a>
      	<a href="#">Backorder Pick Ticket</a>
      	<a href="#">Pick Batch Log Display</a>
        </div>
      </div>
      <div style={{'float':'right'}}>
        <NavLink to="/Logout" exact>Logout</NavLink>
       
      </div>
      <div style={{'display':'none'}}>
      <div className="dropdown">
        <button className="dropbtn">Gift Certificates <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
        <a href="#">Prepare Gift Certificates for Print</a>
      	<a href="#">Update Gift Certificate Information</a>
      	<a href="#">Print Gift Certificates</a>
      	<a href="#">Post Gift Certificates</a>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Return Authorizations <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
        <a href="#">Return Authorization Entry & Maintenance</a>
      	<a href="#">Return Authorization Inquiry</a>
      	<a href="#">Return Authorization Listing</a>
      	<a href="#">Return Authorization Receiving Document</a>
      	<a href="#">Receivings Entry & Maintenance</a>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Authorizations <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
        <a href="#">Load Authorization Transaction File</a>
      	<a href="#">Transmit Authorization Data</a>
      	<a href="#">Receive Authorization Data</a>
      	<a href="#">Post Authorization Transaction File</a>
      	<a href="#">Clear Loaded Auth or Settlement File</a>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Import Orders <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
        <a href="#">Import/Edit/Post Imported Orders from Work File</a>
      	<a href="#">Maintain Imported Orders in Error Status</a>
      	<a href="#">Post Imported Orders</a>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Accounts Receivable <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
        <a href="#">AR Entry - Online Posting</a>
      	<a href="#">AR Entry - Batch  Posting</a>
      	<a href="#">AR Inquiry</a>
      	<a href="#">Upd/Reverse Declined AR Payments</a>
      	<a href="#">Cash Report</a>
      	<a href="#">AR Activity Report</a>
        <div className="dropdown">
          <button className="dropbtn">Mail List Management <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
          <a href="#">Work with Mailing List</a>
          <a href="#">Select for Mailing</a>
          <a href="#">RFM Select for Mailing</a>
          <a href="#">Catalog Request Label Selection</a>
          <a href="#">Produce Mailing</a>
          <a href="#">Clear Mailing Selections</a>
          <a href="#">Mailing Selection Count</a>
          </div>
        </div>
        </div>
      </div>
      </div>



        <a href="javascript:void(0);" style={{'fontSize':'15px'}} className="icon" onClick={this.responsiveMenu.bind(this)}>&#9776;</a>
</div>

  </div>
</div>
 

      <p></p>  <p></p>
      
      <Route path="/logout" exact component={Login}/>
      <Login showDialog="true"/>

      <p></p>
        <Switch>

        <Route path="/orderList" exact component={OrderList}/>
        <Route path="/OrderEntry" exact component={OrderEntry} />
        <Route path="/OrderDetails" exact component={OrderDetails} />

        </Switch>


      </div>

    );
  }
}

export default Main;
