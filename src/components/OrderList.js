import React, { Component } from 'react';
import { RingLoader } from 'react-spinners';
import DatePicker from 'react-date-picker';

//import moment from 'moment';
import axios from '../axios';

import SearchModal from './SearchModal';


import DataGrid from './DataGrid';
import {connect} from 'react-redux';

class OrderList extends Component {

  state={
    orders:{},showModal:false,
    orderCustomer:'',billedCustomer:'',shippedCustomer:'',
    spinner:'', orderDate:"", shipDate:"",itemcode:'', itemLabel:'',
    searchRequest:{}
  };



  componentDidMount(){
    let cacheFlag=false;
    console.log(this.props);
    if(this.props.location.state && this.props.location.state.cacheFlag)
      cacheFlag=true;
    let orderListCached=null;
    if(cacheFlag){
      console.log('order list mounted : cache flag' + cacheFlag);
      //orderListCached=this.props.orderListCached;
      this.setState({...this.state,showModal:false,cacheFlag:cacheFlag, ...this.props.cachedState});

    }else{
      console.log('order listl : loading data')
      this.setState({...this.state,showModal:false,cacheFlag:false});
    }
  }
  showDialog(searchName){

  this.setState({...this.state,showModal:!this.state.showModal,searchName:searchName});
  return false;
}
onClose(e){
  this.setState({...this.state,showModal:false});
}

setCustomerNumber(customerType, customerNo, cusName){
  console.log('setCustomerNumber'+customerNo);
  if(customerType==='ORDER_CUSTOMER'){
    this.setState({...this.state,orderCustomer:customerNo, orderCustomerLabel:customerNo, showModal:false});
  }else if(customerType==='BILLED_CUSTOMER'){
    this.setState({...this.state,billedCustomer:customerNo, billedCustomerLabel:customerNo,showModal:false});
  }else if(customerType==='SHIPPED_CUSTOMER'){
    this.setState({...this.state,shippedCustomer:customerNo, shippedCustomerLabel:customerNo,showModal:false});
  }else if(customerType==='ITEM_TO_SHIP'){
    this.setState({...this.state,itemCode:customerNo, itemLabel:customerNo, showModal:false});
  }
}

customerNumSetter(customerType, customerNo, cusName){
  console.log('CustomerNumSetter');
 this.setCustomerNumber(customerType, customerNo, cusName)
}

unsetCustomerNumber(type){

  if(type==='ORDER_CUSTOMER'){
    this.setState({...this.state,orderCustomer:'', orderCustomerLabel:''});
  }else if(type==='BILLED_CUSTOMER'){
    this.setState({...this.state,billedCustomer:'', billedCustomerLabel:''});
  }else if(type==='SHIPPED_CUSTOMER'){
    this.setState({...this.state,shippedCustomer:'', shippedCustomerLabel:''});
  }else if(type==='MEDIA'){
    this.setState({...this.state,media:''});
  }else if(type==='ITEM_TO_SHIP'){
    this.setState({...this.state,itemCode:'', itemLabel:''});
  }

}

onOrderDateChange = ( date) =>{
 // alert('date changed'+date.toString());
  this.setState({...this.state, orderDate:date });
} 
onShipDateChange = date => this.setState({...this.state, shipDate:date })

onOrderDateEndChange = ( date) =>{
  // alert('date changed'+date.toString());
   this.setState({...this.state, orderDateEnd:date });
 } 
 onShipDateEndChange = date => this.setState({...this.state, shipDateEnd:date })

 /*
   "ordrCustNum":this.state.orderCustomerLabel,
            "shipCustNum":this.state.shippedCustomerLabel,
            "billCustNum":this.state.billedCustomerLabel,*/
orderCustomerChange (e){
  console.log("customer changed" , e.target.value);
  this.setState({...this.state,orderCustomerLabel:e.target.value});
}
shipCustomerChange (e){
  
  this.setState({...this.state,shippedCustomerLabel:e.target.value});
}
billCustomerChange (e){
  this.setState({...this.state,billedCustomerLabel:e.target.value});
}

itemChange (e){
  this.setState({...this.state,itemLabel:e.target.value.toUpperCase()});
}
setMedia(media){
  this.setState({...this.state,media:media,showModal:false});
}


  searchOrder(){


    const searchRequest={
      
    };

    // let od="";

    // if(this.state.orderDate && this.state.orderDate.length>0 )
    //   od=this.state.orderDate.getFullYear()+"-"+(this.state.orderDate.getMonth()+1) + "-" + this.state.orderDate.getDate();

    this.setState({...this.state, orders:null,spinner:<center><RingLoader color={'#123abc'} loading='false'/></center>,
          searchRequest:{

            "mailListCriteria":{
            "zipCode" : this.refs.zipcode.value,
            "companyName" : this.refs.company.value
          },
            "orderHeaderCriteria":{
            "ordrCustNum":this.state.orderCustomerLabel,
            "shipCustNum":this.state.shippedCustomerLabel,
            "billCustNum":this.state.billedCustomerLabel,
            "orderNumber":this.refs.ordno.value,
            "mediaNum":this.refs.media.value,
            "purchaseOrderNum": this.refs.prchordnum.value,
            "batchNumber":this.refs.batchNum.value,
            "orderDate":this.state.orderDate,
            "orderDateEnd":this.state.orderDateEnd,
            "refOrderNum":this.refs.referenceOrder.value,
            "tenderNumber":this.refs.tenderNum.value,
            "salesperson1":this.refs.salesperson.value,
            "info":this.refs.searchHDR.value

          },
          "orderDetailCriteria" :{
            "itemToShip":this.state.itemLabel,
            "schdShipDate":this.state.shipDate,
            "schdShipDateEnd":this.state.shipDateEnd
          },
          "orderManCriteria" :{
          "packageId":this.refs.packageid.value,
          "trackingNumber":this.refs.trackerNum.value
        },
        "pageProps":{
          pageNumber:1,
          sortColumn:"orderNumber",
          sortOrder:"ascending"
        }
          

        } 
      });
//alert('search orders');

  /*  const criteria={
          "mailListCriteria":{
            "zipCode" : this.refs.zipcode.value,
            "companyName" : this.refs.company.value
          }
    };
    */
    //console.log(criteria);
  //  alert("Hello world");
    /*
    private int ordrCustNum;
	private int shipCustNum;
	private int billCustNum;
	private int orderNumber;
	private String itemToShip;
  */
  //alert('before post');
    axios.post( '/getOrders', {

            "mailListCriteria":{
            "zipCode" : this.refs.zipcode.value,
            "companyName" : this.refs.company.value
          },
            "orderHeaderCriteria":{
            "ordrCustNum":this.state.orderCustomerLabel,
            "shipCustNum":this.state.shippedCustomerLabel,
            "billCustNum":this.state.billedCustomerLabel,
            "orderNumber":this.refs.ordno.value,
            "mediaNum":this.refs.media.value,
            "purchaseOrderNum": this.refs.prchordnum.value,
            "batchNumber":this.refs.batchNum.value,
            "orderDate":this.state.orderDate,
            "orderDateEnd":this.state.orderDateEnd,
            "refOrderNum":this.refs.referenceOrder.value,
            "tenderNumber":this.refs.tenderNum.value,
            "salesperson1":this.refs.salesperson.value,
            "info":this.refs.searchHDR.value
          },
          "orderDetailCriteria" :{
            "itemToShip":this.state.itemLabel,
            "schdShipDate":this.state.shipDate,
            "schdShipDateEnd":this.state.shipDateEnd

          },
          "orderManCriteria" :{
          "packageId":this.refs.packageid.value,
          "trackingNumber":this.refs.trackerNum.value
        },
        "pageProps":{
          pageNumber:1
        }
          

  }
  , {"headers":{
    "OPTOKEN": localStorage.getItem("OPSessionID"),
        "Content-Type":"application/json;charset=UTF-8" 
  }}
  ).then( response => {
          //alert('response');
            const orderData = response.data;
          //  console.log(orderData);
            this.setState({orders: orderData,spinner:'', url:'/getOrders'});
            //this.props.cacheOrderList();
            // console.log( response );
        } )
        .catch(error => {
            // console.log(error);
            //this.setState({error: true});
        });

  //alert('kkkkk');

  }

  handlePageChange(pageNumber){


  }

  handleSort(sortColumn, direction){

  }

  showOrderDetail(orderNumber){
    //alert(orderNumber);
    this.props.cacheOrderList(this.state);
    console.log(this.props);
    this.props.history.push({
      pathname: '/OrderDetails',
     
      state: { orderNumber: orderNumber }
    })
    //this.props.history.push('/OrderDetails/311775');
  }

  render() {
    const longWidth={
      width:'100%'
    }
    let orders=null;
    let header=null;
    // if(this.state.orders && this.state.orders.searchedOrders){

    //   header =this.state.orders.header;
    //   console.log(header);
    //    orders = this.state.orders.searchedOrders.map(order=>{

    //       let row=
    //           header.map(heading=>{
    //             let fn=heading.fieldName;
    //             console.log(order.orderNumber + fn);   
    //             return <td>{order[fn]}</td>
    //           });
    //         // for(var i=0;i<header.length;i++){
    //         //   let fn=header[i].fieldName;
    //         //   console.log(order[fn]);
    //         //   row += (<td> + order[fn] +</td>);
    //         // }

    //         return <tr>{row}</tr>;
    //   });
    // }
    let orderTable=null;
    if(this.state.orders && this.state.orders.data && this.state.orders.data.length>0){

      const columnHeaders=this.state.orders.header;
      
      const tableData=this.state.orders.data;

      const totalPages=this.state.orders.pageProps.totalPages;
      orderTable=<DataGrid columnHeaders={columnHeaders}  tableData={tableData} 
          searchRequest={this.state.searchRequest} totalPages={totalPages} url={this.state.url} 
          idSetter={this.showOrderDetail.bind(this)} idSetterId="orderNumber"
          defaultSortColumn='orderNumber' />
      

        
    }else{
      orderTable=null;
    }


     return (

      <div >
        <center><h2>Order Search Screen</h2></center>
        <p></p>
      	<form>
      <div className="row" style={{display:'none'}}>
        <div className="col-10">
          <label htmlFor="zipcode">Zip Code</label>
        </div>

        <div className="col-20">
          	<input type="text"  id="zipcode" ref="zipcode" placeholder="Zip Code"/>
        </div>
        <div className="col-5"/>
        <div className="col-10">
          <label htmlFor="company" >Company</label>
        </div>
        <div className="col-20">
          <input type="text"  id="company" ref="company" placeholder="Company"/>
        </div>
        <div className="col-5"/>
        <div className="col-10">
          <label htmlFor="lastName" >Last Name</label>
        </div>
        <div className="col-20">
            <input type="text"  id="lastName" ref="lastname" placeholder="Last Name"/>
        </div>



      </div>



      <div className="row">
        <div className="col-20">
          <label htmlFor="ordcus" >Order Customer</label>
       </div>
        <div className="col-30">

            <input className="search-input" style={{'width':'70%'}} type="text" id="ordrcusno" ref="ordrcusno" 
                value={this.state.orderCustomerLabel} onChange={this.orderCustomerChange.bind(this)} placeholder="Order Customer"/>
            <label className="search-button" onClick={this.unsetCustomerNumber.bind(this,'ORDER_CUSTOMER')}><i className="fa fa-close"></i></label>
            <label className="search-button"  onClick={this.showDialog.bind(this,'ORDER_CUSTOMER')}><i className="fa fa-search"></i></label>
        </div>
        <div className="col-20">
        <label htmlFor="ordno" className="inlineLabel">Order#</label>
       </div>
        <div className="col-30">
            <input className="pure-input" type="text"  id="ordno" ref="ordno" />

        </div>


      </div>



      <div className="row">
        <div className="col-20">
        <label htmlFor="billcus" >Billing Customer</label>
        </div>
        <div className="col-30">
            <input  className="pure-input" style={{'width':'70%'}} type="text" id="billcus" ref="billcus" placeholder="Billing Customer" value={this.state.billedCustomerLabel}
             onChange={this.billCustomerChange.bind(this)}/>
             <label className="search-button" onClick={this.unsetCustomerNumber.bind(this,'BILLED_CUSTOMER')}><i className="fa fa-close"></i></label>
            <label className="search-button" onClick={this.showDialog.bind(this,'BILLED_CUSTOMER')}><i className="fa fa-search"></i></label>
        </div>
        <div className="col-20">
        <label htmlFor="shipcus" className="inlineLabel">Ship To Customer</label>
        </div>
        <div className="col-30">
          <input type="text"  className="pure-input"  style={{'width':'70%'}} id="shipcus" ref="shipcus" placeholder="Ship to Customer" value={this.state.shippedCustomerLabel}
           onChange={this.shipCustomerChange.bind(this)}/>
           <label className="search-button" onClick={this.unsetCustomerNumber.bind(this,'SHIPPED_CUSTOMER')}><i className="fa fa-close"></i></label>
          <label className="search-button" onClick={this.showDialog.bind(this,'SHIPPED_CUSTOMER')}><i className="fa fa-search"></i></label>
        </div>
      </div>

      <div className="row">
        <div className="col-20">
          <label htmlFor="media">Media</label>
        </div>
        <div className="col-30">
        <input type="text" className="pure-input" style={{'width':'70%'}} id="media" ref="media" placeholder="Media" value={this.state.media}/>
        <label className="search-button" onClick={this.unsetCustomerNumber.bind(this,'MEDIA')}><i className="fa fa-close"></i></label>
        <label className="search-button" onClick={this.showDialog.bind(this,'MediaSearch')}><i className="fa fa-search"></i></label>
        </div>
        <div className="col-20">
          <label htmlFor="ordrdate" className="inlineLabel">Order Date</label>
        </div>
        <div className="col-30">
        <div className="pure-input">
        <DatePicker onChange={this.onOrderDateChange.bind(this)} value={this.state.orderDate} locale="en-US" 
           ref="orderDate" value={this.state.orderDate}
          />
          </div>
        </div>
      </div>



      <div className="row">
        <div className="col-20">
          <label htmlFor="prchordnum" >Purchase Order #</label>
        </div>
        <div className="col-30">
          <input type="text" className="pure-input" id="prchordnum" placeholder="Purchase Order #" ref="prchordnum"/>
        </div>
        <div className="col-20">
          <label htmlFor="itemship" className="inlineLabel">Item To Ship</label>
        </div>
        <div className="col-30">
        <input type="text" className="pure-input" style={{'width':'70%'}} id="itemship" ref="itemship" placeholder="Item to Ship"
          value={this.state.itemLabel} onChange={this.itemChange.bind(this)}/>
        
            <label className="search-button" onClick={this.unsetCustomerNumber.bind(this,'ITEM_TO_SHIP')}><i className="fa fa-close"></i></label>
            <label className="search-button"  onClick={this.showDialog.bind(this,'ItemsToSearch')}><i className="fa fa-search"></i></label>
        </div>
    </div>

    <div className="row">
        <div className="col-20">
        <label htmlFor="shipDate" >Scheduled Ship Date</label>
        </div>
        <div className="col-30">
        <div className="pure-input">
        <DatePicker onChange={this.onShipDateChange.bind(this)} value={this.state.shipDate} locale="en-US" 
           ref="shipDate" value={this.state.shipDate} style={{'width':'100%'}}
          /> 
          </div>
        </div>
        <div className="col-20">
        <label htmlFor="packageid" className="inlineLabel">Package Id</label>
        </div>
        <div className="col-30">
          <input type="text" className="pure-input" id="packageid" ref="packageid" placeholder="Package Id"/>
        </div>
    </div>

    <div className="row">
        <div className="col-20">
          <label htmlFor="trackerNum" >Tracker Number</label>
        </div>
        <div className="col-30">
          <input type="text" className="pure-input" id="trackerNum" placeholder="Tracker Number" ref="trackerNum"/>
        </div>
        <div className="col-20">
          <label htmlFor="batchNum" className="inlineLabel">Batch Number</label>
        </div>
        <div className="col-30">
        <input type="text" className="pure-input" id="batchNum" ref="batchNum" placeholder="Batch Number"/>
        </div>
      </div>

      <div className="row">
        <div className="col-20">
          <label htmlFor="referenceOrder" >Referenced Order #</label>
        </div>
        <div className="col-30">
          <input type="text" className="pure-input" id="referenceOrder" placeholder="Referenced Order #" ref="referenceOrder"/>
        </div>
        <div className="col-20">
          <label htmlFor="tenderNum" className="inlineLabel">Tender Number</label>
        </div>
        <div className="col-30">
        <input type="text" className="pure-input" id="tenderNum" ref="tenderNum" placeholder="Tender Number"/>
        </div>
      </div>

      <div className="row">
        <div className="col-20">
          <label htmlFor="salesperson" >Salesperson</label>
        </div>
        <div className="col-30">
          <input type="text" className="pure-input" id="salesperson" placeholder="Salesperson" ref="salesperson"/>
        </div>
        <div className="col-20">
          <label htmlFor="searchHDR" className="inlineLabel">Search HDR1</label>
        </div>
        <div className="col-30">
        <input type="text" className="pure-input" id="searchHDR" ref="searchHDR" placeholder="Search HDR1"/>
        </div>
      </div>




      <div className="row">
            <div >
            <button type="button" className="btn info" onClick={this.searchOrder.bind(this)}>Search</button>
            </div>
      </div>


      </form>


      {orderTable}


      <SearchModal showDialog={this.state.showModal} onClose={this.onClose.bind(this)} searchName={this.state.searchName}
       customerNumSetter={this.setCustomerNumber.bind(this)} mediaSetter={this.setMedia.bind(this)}>

      </SearchModal>

        {this.state.spinner}
      </div>



    );
  }
}

const mapStateToProps = state =>{
  console.log('mapping state to props');
  return {
     cachedState:state.cachedState
  };
}

const mapDispatchToProps = dispatch =>{
  
  
  console.log('mapping dispatch to props')
  return {
    cacheOrderList : (state)=>{
      dispatch({
      type:'ORDER_LIST_CACHE',
      cachedState: {...state}
    });
  }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderList);
