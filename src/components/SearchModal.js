import React, { Component } from 'react';
import CustomerSearch from './CustomerSearch';
import MediaList from './MediaList';
import ItemToShipSearch from './ItemToShipSearch';
import VendorSearch from './VendorSearch';
class SearchModal extends Component {

  screenHeadings={
    "ORDER_CUSTOMER":"Order Customer Selection",
    "BILLED_CUSTOMER":"Billing Customer Selection",
    "MediaSearch":"Media Selection",
    "SHIPPED_CUSTOMER":"Ship To Customer Selection",
    "ItemsToSearch":"Item Selection",
    "VendorSearch":"Vendor Selection"
  }

  render() {

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
      maxWidth:'60%',
      minHeight:'60%',
      maxHeight:'80%',
      margin: '0 auto',
      padding: 30,
      position: 'Relative',
      overflow:'scroll'

    }

    const footerStyle={
      position:'absolulte',
      bottom: '20px'
    }

    const style={display:'none'};
     if(!this.props.showDialog){
       return null;
     }

     const centerText={
       'text-align': 'center'
     }

    var searchComponent=null;
    //alert(this.props.searchName);
    if(this.props.searchName==='MediaSearch'){
      searchComponent=<MediaList  mediaSetter={this.props.mediaSetter} searchName={this.props.searchName}/>
    }else if(this.props.searchName==='ORDER_CUSTOMER' || this.props.searchName==='BILLED_CUSTOMER' || this.props.searchName==='SHIPPED_CUSTOMER'){
      searchComponent=<CustomerSearch  customerNumSetter={this.props.customerNumSetter} searchName={this.props.searchName}/> ;
    }else if(this.props.searchName==='ItemsToSearch')
    {
      searchComponent=<ItemToShipSearch  customerNumSetter={this.props.customerNumSetter} searchName={this.props.searchName}/> ;
    }else if(this.props.searchName==='VendorSearch'){
      searchComponent=<VendorSearch vendorNumSetter={this.props.vendorNumSetter} searchName={this.props.searchName} />;
    }

    return (

      <div style={backdropStyle}>


        <div style={modalStyle}>
            <div style={{'text-align':'right'}}>
            <label onClick={this.props.onClose}><i className="fa fa-close" style={{'cursor':'pointer'}}></i></label>

            </div>
            <hr/>

        <p></p><p></p>
          <p style={centerText}><b>{this.screenHeadings[this.props.searchName]}</b></p>
          <p></p>
          {this.props.children}
          <div style={footerStyle}>

          {searchComponent}

         </div>
        </div>
      </div>
    );
  }
}

export default SearchModal;
