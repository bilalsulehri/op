import React, { Component } from 'react';
import { RingLoader } from 'react-spinners';
//import './Style.css';
import axios from '../axios';
import { Select, Accordion, Icon } from 'semantic-ui-react';
import DropDown from './DropDown';


class VendorSearch extends Component {


    state={vendors:"",spinner:''};
    vendorSearchFun(){
      this.setState({...this.state,resultData:'', spinner:<center><RingLoader color={'#123abc'} loading='false'/></center>});
      axios.post( '/getVendors',{
        "zipCode" : this.refs.zipCode.value,
        "telephone" : this.refs.telephone.value,
        "searchName": this.refs.searchName.value,
        "vendorNumber" : this.refs.vendorNumber.value,
        "duns" : this.refs.duns.value
        
    } 
    , {"headers":{
      "OPTOKEN": localStorage.getItem("OPSessionID"),
          "Content-Type":"application/json;charset=UTF-8" 
    }}
  ).then( response => {
  
              const vendorData = response.data;
  
              this.setState({vendors: vendorData,spinner:''});
              // console.log( response );
          } )
          .catch(error => {
               console.log(error);
              //this.setState({error: true});
          });
  
  
      //this.setState({customerData:<table border='1'><tbody><tr><th>Customer # </th><th>Name</th></tr><tr><td>1234</td><td>Bilal</td></tr></tbody></table>});
    }
  
  vendorNumSetter(callback,vendorNumber, vendorName){
    //console.log(callback, vendorNumber, vendorName);
  callback(vendorNumber, vendorName);
  
  }
  
  
    render() {
  
  
      let vendors=null;
      if(this.state.vendors){
         vendors = this.state.vendors.map(vendor=>{
          return <tr><td><a href="#" onClick={this.vendorNumSetter.bind(this,this.props.vendorNumSetter,vendor.vendorNumber, vendor.vendorName)}>{vendor.vendorNumber}</a></td>
          <td>{vendor.vendorName}</td><td>{vendor.companyName}</td><td>{vendor.city}</td>
          <td>{vendor.zip}</td><td>{vendor.address}</td><td>{vendor.telephone}</td><td>{vendor.vendorPreference}</td><td>{vendor.duns}</td>
          </tr>;
        });
      }
      let vendorTable=null;
      if(this.state.vendors && this.state.vendors.length>0){
            vendorTable=<table border='1'>
          <tbody>
          <tr>
          <th>Vendor#</th><th>Vendor Name</th> <th>Company</th> <th>City</th><th>Zip Code</th> <th>Address</th>      <th>Telephone </th> 
            <th>Vnd Pref</th><th>DUNS</th>
          </tr>
          {vendors}  </tbody></table>;
      }
  
    const scrollStyle={'overflow-x':'scroll'};
      return (
  
        <div>
  
  
  
              <div className="row">
                <div className="col-20">
                  <label htmlFor="zipCode" >Zip Code</label>
               </div>
                <div className="col-30">
                  <input type="text" className="pure-input" id="zipCode" ref="zipCode" placeholder="Zip Code"/>
                </div>
                <div className="col-5"/>
              <div className="col-15">
                  <label htmlFor="itemship" >Telephone</label>
               </div>
                <div className="col-30">
                    <input type="text"  className="pure-input"  id="telephone" ref="telephone" placeholder="Telephone"/>
  
                </div>
  
  
  
                </div>
                <div className="row">
                  <div className="col-20">
                  <label htmlFor="searchName" >Search Name</label>
                 </div>
                  <div className="col-30">
                  <input type="text"  className="pure-input"  id="searchName" ref="searchName" placeholder="Search Name"/>
                  </div>
                  <div className="col-5"/>
              <div className="col-15">
                    <label htmlFor="vendorNumber" >Vendor Number</label>
                 </div>
                  <div className="col-30">
                      <input type="text"  className="pure-input"  id="vendorNumber" ref="vendorNumber" placeholder="Vendor Number"/>
  
                  </div>
  
              </div>
  
  
              <div className="row">
                <div className="col-20">
                <label htmlFor="vendPref" >Vendor Preference</label>
               </div>
                <div className="col-30">
                <input type="text"  className="pure-input"  id="vendPref" ref="vendPref" placeholder="Vendor Preference"/>
                </div>
                <div className="col-5"/>
              <div className="col-15">
                  <label htmlFor="duns" >DUNS</label>
               </div>
                <div className="col-30">
                    <input type="text"  className="pure-input"  id="duns" ref="duns" placeholder="DUNS"/>
  
                </div>
  
            </div>
  
              
          <div className="row">
            <button type="button" className="btn info" onClick={this.vendorSearchFun.bind(this)}>Search</button>
  
          </div>
  
  
  
          {vendorTable}
  
            {this.state.spinner}
  
        </div>
  
      );
    }
  }
export default VendorSearch;
