import React, { Component } from 'react';
import { RingLoader } from 'react-spinners';
//import './Style.css';
import axios from '../axios';
import DataGrid from './DataGrid';

class CustomerSearch extends Component {


  state={customers:"",spinner:''};
  customerSearchFun(){

    
    this.setState({...this.state, resultData:null,spinner:<center><RingLoader color={'#123abc'} loading='false'/></center>,
          searchRequest:{
            "zipCode" : this.refs.zipCode.value,
            "telephone" : this.refs.telephone.value,
            "companyName": this.refs.companyName.value,
            "lastName" : this.refs.lastName.value,
            "customerNumber" : this.refs.customerNumber.value,
            "porspectNumber" : this.refs.porspectNumber.value,
            "email":this.refs.email.value,
            "tenderNumber":this.refs.tenderNumber.value,
            "pageProps":{
              pageNumber:1,
              sortColumn:"CUSTOMER",
              sortOrder:"ascending"
            }
          }});

    this.setState({...this.state, spinner:<center><RingLoader color={'#123abc'} loading='false'/></center>});
    //axios.defaults.withCredentials=true;
    //document.cookie="JSESSIONID="+localStorage.getItem("OPSessionID");
    axios.post( '/getCustomers',{
      "zipCode" : this.refs.zipCode.value,
      "telephone" : this.refs.telephone.value,
      "companyName": this.refs.companyName.value,
      "lastName" : this.refs.lastName.value,
      "customerNumber" : this.refs.customerNumber.value,
      "porspectNumber" : this.refs.porspectNumber.value,
      "email":this.refs.email.value,
      "tenderNumber":this.refs.tenderNumber.value,
      "pageProps":{
        pageNumber:1
      }
  }
  , {"headers":{
    "OPTOKEN": localStorage.getItem("OPSessionID"),
        "Content-Type":"application/json;charset=UTF-8" 
  }}

    ).then( response => {

            const customerData = response.data;
            console.log('response recieved',customerData);
            //this.setState({customers: customerData,spinner:''});
            this.setState({resultData: customerData,spinner:'', url:'/getCustomers'});
            // console.log( response );
            // console.log( response );
        } )
        .catch(error => {
            // console.log(error);
            //this.setState({error: true});
        });


    //this.setState({customerData:<table border='1'><tbody><tr><th>Customer # </th><th>Name</th></tr><tr><td>1234</td><td>Bilal</td></tr></tbody></table>});
  }

customerNumSetter(callback,srchName, cusno, cusName){
  console.log(srchName, cusno, cusName);
  callback(srchName, cusno, cusName);
  // if(srchName==='Order Customer Search'){
  //   callback('ORDER_CUSTOMER',cusno, cusName);
  // }else if(srchName==='Billing Customer Search'){
  //   callback('BILLED_CUSTOMER',cusno, cusName);
  // }else if(srchName==='Shipping Customer Search'){
  //   callback('SHIPPED_CUSTOMER',cusno,cusName);
  // }

}


  render() {


    let resultTable=null;
    if(this.state.resultData && this.state.resultData.data && this.state.resultData.data.length>0){

      const columnHeaders=this.state.resultData.header;
      
      const tableData=this.state.resultData.data;
      console.log(tableData);
      const totalPages=this.state.resultData.pageProps.totalPages;
      resultTable=<DataGrid columnHeaders={columnHeaders}  tableData={tableData} 
          searchRequest={this.state.searchRequest} totalPages={totalPages} url={this.state.url}
          defaultSortColumn='CUSTOMER' idSetter={this.customerNumSetter.bind(this,this.props.customerNumSetter,this.props.searchName)}
          idSetterId="CUSTOMER" idSetterDescription="NAME"/>
      

        
    }else{
      resultTable=null;
    }


    // let customers=null;
    // if(this.state.customers){
    //    customers = this.state.customers.map(customer=>{
    //     return <tr><td><a href="#" onClick={this.customerNumSetter.bind(this,this.props.customerNumSetter,this.props.searchName,customer.customerNumber, customer.customerName)}>{customer.customerNumber}</a></td><td>{customer.customerName}</td><td>{customer.companyName}</td><td>{customer.city}</td>
    //     <td>{customer.zip}</td><td>{customer.telephone}</td><td>{customer.lastName}</td><td>{customer.email}</td><td>{customer.state}</td>
    //     </tr>;
    //   });
    // }
    // let customerTable=null;
    // if(this.state.customers && this.state.customers.length>0){
    //       customerTable=<table border='1'>
    //     <tbody>
    //     <tr>
    //     <th>Customer#</th>  <th>Name</th>  <th>Company</th>  <th>City</th>  <th>ZIP </th><th>Telephone</th> <th>Last Name</th><th>Email</th><th>State</th>
    //     </tr>
    //     {customers}  </tbody></table>;
    // }

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
                <label htmlFor="companyName" >Company Name</label>
               </div>
                <div className="col-30">
                <input type="text"  className="pure-input"  id="companyName" ref="companyName" placeholder="Company Name"/>
                </div>

                <div className="col-5"/>
              <div className="col-15">
                  <label htmlFor="lastName" >Last Name</label>
               </div>
                <div className="col-30">
                    <input type="text"  className="pure-input"  id="lastName" ref="lastName" placeholder="Last Name"/>

                </div>

            </div>


            <div className="row">
              <div className="col-20">
              <label htmlFor="customerNumber" >Customer Number</label>
             </div>
              <div className="col-30">
              <input type="text"  className="pure-input"  id="customerNumber" ref="customerNumber" placeholder="Customer Number"/>
              </div>
              <div className="col-5"/>
              <div className="col-15">
                <label htmlFor="porspectNumber" >Prospect Number</label>
             </div>
              <div className="col-30">
                  <input type="text"  className="pure-input"  id="porspectNumber" ref="porspectNumber" placeholder="Prospect Number"/>

              </div>

          </div>

            <div className="row">
              <div className="col-20">
              <label htmlFor="prchord" >Email Address</label>
             </div>
              <div className="col-30">
              <input type="text"  className="pure-input"  id="email" ref="email" placeholder="Email Address"/>
              </div>
              <div className="col-5"/>
              <div className="col-15">
                <label htmlFor="itemship" >Tender Number</label>
             </div>
              <div className="col-30">
                  <input type="text"  className="pure-input"  id="tenderNumber" ref="tenderNumber" placeholder="Tender Number"/>

              </div>


            </div>




        <div className="row">
          <button type="button" className="btn info" onClick={this.customerSearchFun.bind(this)}>Search</button>

        </div>



        {resultTable}

          {this.state.spinner}

      </div>

    );
  }
}

export default CustomerSearch;
