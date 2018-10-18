import React, { Component } from 'react';
import CustomField from './CustomField';
import SearchModal from './SearchModal';



class OrderEntry extends Component {

componentWillMount(){
  this.setState({itmes:[]});
}
//state={};

addItemHandler(){
  let items=this.state.items;

  let item={
    qty:this.refs.quantity.value,
    item:this.refs.item.value,
    price:this.refs.price.value,
    description:'Test Description'
  }

  if(items){
    items.push(item);
    console.log('item pushed');
  }
  else
    items=[item];
    console.log(item.item +", " + items.length);
  this.setState({...this.state,items:items});
}


showDialog(searchName){
  this.setState({...this.state,showModal:!this.state.showModal,searchName:searchName});
}

onClose(e){
  this.setState({...this.state,showModal:false});
}
  render() {
    let items=[];
    if(this.state.items){

    items=this.state.items.map(item=>{
      return <tr><td>{item.qty}</td><td>{item.item}</td><td>{item.description}</td><td>{item.price}</td></tr>;
    });

}

    return (
      <div>
      <header id="main-header">

      		<div id="page-heading">
      			<h1 >Order Entry Form</h1>
      		</div>
      	</header>


      <div className="main-contents" id="main-contents">
        <CustomField idValue="orderby" labelValue="Order By" showDialog={this.showDialog.bind(this)} searchName='searchCustomer'/>
        <CustomField idValue="billedto" labelValue="Billed To" showDialog={this.showDialog.bind(this)} searchName='Search Billed To Customer' />
        <CustomField idValue="shipto" labelValue="Ship To" />
        <CustomField idValue="Ship Via" labelValue="ship Via" />
        <div className="row">
          <div className="col-25">
            <label>Req Ship Date</label>
          </div>
          <div className="col-75">
            <input type="date"/>
          </div>
        </div>

        <CustomField idValue="orderOrigin" labelValue="Order Origin" />
        <CustomField idValue="customerClass" labelValue="Customer Class" />
        <CustomField idValue="emailClass" labelValue="Email Class" />
        <div className="row">
          <div className="col-25">
            <label>Hold</label>
          </div>
          <div className="col-75">
            <input type="checkbox"/>
          </div>
        </div>

        <CustomField idValue="holdCode" labelValue="Hold Code" />
        <CustomField idValue="priorityCode" labelValue="Priority Code" />
        <CustomField idValue="salesPerson1" labelValue="Salesperson1" />
        <CustomField idValue="salesPerson2" labelValue="SalesPerson2" />

        <div className="row">
          <div className="col-10">
            <label className="inlineLabel">Item</label>
          </div>
          <div className="col-10">
            <input className="inlineTextField" type="text" ref="item"/>
          </div>
          <div className="col-10">
            <label className="inlineLabel">Quantity</label>
          </div>
          <div className="col-10">
              <input type="text" ref="quantity"/>
          </div>
          <div className="col-10">
            <label className="inlineLabel">Price</label>
          </div>
          <div className="col-10">
              <input type="text" ref="price"/>
          </div>
          <div className="col-10">
            <label className="inlineLabel">Ship To</label>
          </div>
          <div className="col-10">
              <input type="text" />
          </div>
          <div className="col-10">
            <label className="inlineLabel">Via</label>
          </div>
          <div className="col-10">
              <input type="text"/>
          </div>
        </div>

        <div className="row">

        <input type="button" value="Add Item" onClick={this.addItemHandler.bind(this)} />
        </div>

        <table border="1">
        <tbody>
          <tr>
            <th>Quantity</th><th>Item</th><th>Description</th><th>Price</th>

          </tr>
          {items}
          </tbody>
        </table>


        </div>


        <SearchModal showDialog={this.state.showModal} onClose={this.onClose.bind(this)} searchName={this.state.searchName}>
          {this.state.searchName} Screen
        </SearchModal>

        {this.state.showModal}

      </div>



    );
  }
}

export default OrderEntry;
