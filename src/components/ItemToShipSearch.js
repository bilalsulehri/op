import React, { Component } from 'react';
import { RingLoader } from 'react-spinners';
//import './Style.css';
import axios from '../axios';
import { Select, Accordion, Icon } from 'semantic-ui-react';
import DropDown from './DropDown';
import SearchModal from './SearchModal';
import DataGrid from './DataGrid';


class ItemToShipSearch extends Component {


  
  state={vendorNumber:'',vendorLabel:'',resultData:null,spinner:'', activeIndex:-1, showModal:false, searchName:'PRIMARY_VENDOR',
      itemGLClass:'', itemTaxClass:'', productGroup:'',itemCode:''
      };

  itemSearchFun(){
    this.setState({...this.state,resultData:null, spinner:<center><RingLoader color={'#123abc'} loading='false'/></center>,
      searchRequest:{
        "itemCode" : this.state.itemCode,
        "description" : this.refs.description.value,
        "itemGLClass": this.state.itemGLClass,
        "itemTaxClass" : this.state.itemTaxClass,
        "productGroup" : this.state.productGroup,
        "primaryVendor" : this.refs.primaryVendor.value,
        "vendorReference":'',
        "web":this.refs.web.value,
        "pageProps":{
          pageNumber:1,
          sortColumn:"ITEM_NUMBER",
          sortOrder:"ascending"
        }
    } } );

    axios.post( '/getItems',{
      "itemCode" :this.state.itemCode,
      "description" : this.refs.description.value,
      "itemGLClass": this.state.itemGLClass,
      "itemTaxClass" : this.state.itemTaxClass,
      "productGroup" : this.state.productGroup,
      "primaryVendor" : this.refs.primaryVendor.value,
      "vendorReference":'',
      "web":this.refs.web.value,
      "pageProps":{
        pageNumber:1
      }
  } 
  , {"headers":{
    "OPTOKEN": localStorage.getItem("OPSessionID"),
        "Content-Type":"application/json;charset=UTF-8" 
  }}
).then( response => {

            const itemData = response.data;

            this.setState({resultData: itemData,spinner:'', url:'/getItems'});
            // console.log( response );
        } )
        .catch(error => {
            // console.log(error);
            //this.setState({error: true});
        });


    //this.setState({itemData:<table border='1'><tbody><tr><th>item # </th><th>Name</th></tr><tr><td>1234</td><td>Bilal</td></tr></tbody></table>});
  }

itemNumSetter(callback, searchName,itemCode, description){
  callback('ITEM_TO_SHIP',itemCode,description);
  console.log(callback);
 //this.setState({...this.state,itemCode:'', itemLabel:itemCode+'-'+description, showModal:false});
}



handleAccordianClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({...this.state, activeIndex: newIndex })
  }

  unsetVendorNumber(){
    this.setState({...this.state,vendorNumber:'', vendorlabel:''});
  }
  
  setVendorNumber(vendorNumber, vendorName){
    
      this.setState({...this.state,vendorNumber:vendorNumber, vendorlabel:vendorNumber,showModal:false});
    
  }
  showDialog(searchName){

    this.setState({...this.state,showModal:!this.state.showModal,searchName:searchName});
    return false;
  }
  onClose(e){
    this.setState({...this.state,showModal:false});
  }

  ddSelectionChanged(type, value){
      // itemGLClass:'', itemTaClass:'', productGroup:''
      if(type==='ITEM_GL'){
        this.setState({...this.state,itemGLClass: value});
      }else if(type==='ITEM_TAX'){
        this.setState({...this.state,itemTaxClass: value});
      }else if(type==='ITEM_PRODUCT_GROUP'){
        this.setState({...this.state,productGroup: value});
      }
      
  }

  itemChange(e){
    this.setState({...this.state,itemCode:e.target.value.toUpperCase() });
  }

  render() {
    const { activeIndex } = this.state;

    // let items=null;
    // if(this.state.items){
    //    items = this.state.items.map(item=>{
    //     return <tr><td><a href="#" onClick={this.itemNumSetter.bind(this,this.props.customerNumSetter,this.props.searchName,item.itemCode, item.description)}>{item.itemCode}</a></td>
    //       <td>{item.description}</td><td>{item.itemGLClass}</td><td>{item.itemTaxClass}</td>
    //     <td>{item.productGroup}</td><td>{item.primaryVendor}</td><td>{item.vendorReference}</td><td>{item.web}</td>
    //     </tr>;
    //   });
    // }
    // let itemTable=null;
    // if(this.state.items && this.state.items.length>0){
    //       itemTable=<table border='1'>
    //     <tbody>
    //     <tr>
    //     <th>Item Code</th>  <th>Description</th>  <th>Item GL Class</th>  <th>Item Tax Class</th>  <th>Product Group </th>
    //       <th>Primary Vendor</th> <th>Vendor Reference</th><th>Web</th>
    //     </tr>
    //     {items}  </tbody></table>;
    // }
    let resultTable=null;
    if(this.state.resultData && this.state.resultData.data && this.state.resultData.data.length>0){

      const columnHeaders=this.state.resultData.header;
      
      const tableData=this.state.resultData.data;
      console.log(tableData);
      const totalPages=this.state.resultData.pageProps.totalPages;
      resultTable=<DataGrid columnHeaders={columnHeaders}  tableData={tableData} 
          searchRequest={this.state.searchRequest} totalPages={totalPages} url={this.state.url}
          defaultSortColumn='ITEM_NUMBER' idSetter={this.itemNumSetter.bind(this,this.props.customerNumSetter,this.props.searchName)}
          idSetterId="ITEM_NUMBER" idSetterDescription="DESCRIPTION"/>
      

        
    }else{
      resultTable=null;
    }
  const scrollStyle={'overflow-x':'scroll'};
    return (

      <div>



            <div className="row">
              <div className="col-20">
                <label htmlFor="itemCode" >Item Code</label>
             </div>
              <div className="col-30">
                <input type="text" className="pure-input" id="itemCode" ref="itemCode" placeholder="Item Code" onChange={this.itemChange.bind(this)}
                 value={this.state.itemCode}/>
              </div>
              <div className="col-5"/>
              <div className="col-15">
                <label htmlFor="description" >Description</label>
             </div>
              <div className="col-30">
                  <input type="text"  className="pure-input"  id="description" ref="description" placeholder="Description"/>

              </div>



              </div>
              <div className="row">
                <div className="col-20">
                <label htmlFor="itemGLClass" >Item GL Class</label>
               </div>
                <div className="col-30">
                <DropDown type="ITEM_GL" onSelectionChange={this.ddSelectionChanged.bind(this)}/>
                </div>
                <div className="col-5"/>
              <div className="col-15">
                  <label htmlFor="lastName" >Item Tax Class</label>
               </div>
                <div className="col-30">
                    <DropDown type="ITEM_TAX" onSelectionChange={this.ddSelectionChanged.bind(this)}/>

                </div>

            </div>

            <div className="row">
                <div className="col-20">
                <label htmlFor="itemGLClass" >Product Group</label>
               </div>
                <div className="col-30">
                <DropDown type="ITEM_PRODUCT_GROUP" onSelectionChange={this.ddSelectionChanged.bind(this)}/>
                </div>
                <div className="col-5"/>
              <div className="col-15">
                <label htmlFor="primaryVendor" >Primary Vendor</label>
               </div>
                <div className="col-30">
                <input type="text"  className="pure-input"  style={{'width':'70%'}} id="primaryVendor" ref="primaryVendor" placeholder="Primary Vendor"
                  value={this.state.vendorlabel}/>
                <label className="search-button" onClick={this.unsetVendorNumber.bind(this)}><i className="fa fa-close"></i></label>
            <label className="search-button"  onClick={this.showDialog.bind(this,'VendorSearch')}><i className="fa fa-search"></i></label>

                </div>
                 

            </div>
 


            <div className="row">
              <div className="col-20">
              <label htmlFor="vendorReference" >Vendor Reference</label>
             </div>
              <div className="col-30">
              <input type="text"  className="pure-input"  id="vendorReference" ref="vendorReference" placeholder="Vendor Reference"/>
              </div>
           
              <div className="col-5"/>
              <div className="col-15">
                <label htmlFor="web" >Web</label>
             </div>
              <div className="col-30">
                  <input type="text"  className="pure-input"  id="web" ref="web" placeholder="Web"/>
              </div>


            </div>




        <div className="row">
          <button type="button" className="btn info" onClick={this.itemSearchFun.bind(this)}>Search</button>

        </div>



        {resultTable}

          {this.state.spinner}


      <SearchModal showDialog={this.state.showModal} onClose={this.onClose.bind(this)} searchName={this.state.searchName}
       vendorNumSetter={this.setVendorNumber.bind(this)} >

      </SearchModal>

      </div>

    );
  }
}

export default ItemToShipSearch;
