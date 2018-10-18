import React,{Component} from 'react';
import axios from '../axios';
import { RingLoader } from 'react-spinners';
//import {Route, NavLink,Switch} from 'react-router-dom';
import { Accordion } from 'semantic-ui-react';

class OrderDetails extends Component {

    state={
        data: null,spinner:null
    }

    goBackToList(){
        console.log('go back to list');
        this.props.history.push({
            pathname: '/orderList',
             state: { cacheFlag: true }
          })
    }

    z(v){
        if(v==0)
            return "";
        else
            return v;
    }

    componentDidMount(){
       console.log("Order Detail screen",this.props.location.state.orderNumber);
        this.setState({...this.state,spinner:<center><RingLoader color={'#123abc'} loading='false'/></center>})
       axios.post( '/orderDetails/'+this.props.location.state.orderNumber,{}
    , {"headers":{
      "OPTOKEN": localStorage.getItem("OPSessionID"),
          "Content-Type":"application/json;charset=UTF-8" 
    }}
  
      ).then( response => {
  
              const data = response.data;
              //console.log('response recieved',customerData);
              //this.setState({customers: customerData,spinner:''});
              this.setState({...this.state,data:data,spinner:null});
              // console.log( response );
              // console.log( response );
          } )
          .catch(error => {
              // console.log(error);
              this.setState({...this.state,error: true,spinner:null});
              
          });
  
        const data={
            "orderDetailHeader": {
                "orderNumber": 311775,
                "orderDate": "06/23/2014",
                "status": "  HELD-TST   ",
                "ordCusNumber": 59,
                "billCusNumber": 59,
                "tender": "$  ",
                "preauthorization": "Pre-Approved by OE       ",
                "authorization": "Approved by OE           ",
                "referenceOrder": 16,
                "bank": "    ",
                "purchaseOrder": "                    ",
                "pirority": "1  ",
                "freightCollect": "N",
                "customerClass": "SS ",
                "emailClass": "BON",
                "termsCode": "NET",
                "earliestShipDate": "06/23/2014"
            },
            "orderDetailLines": [
                {
                    "itemNumber": "GRIMCOA        ",
                    "shippingCustomer": 54908,
                    "itemDescription": "Grimco test item - A              *BASE*",
                    "orderQuantity": 1,
                    "shipQuantity": 1,
                    "status": "Active",
                    "warehouse": "MIA",
                    "line": "1"
                },
                {
                    "itemNumber": "TRAINS         ",
                    "shippingCustomer": 54908,
                    "itemDescription": "Trains po1 next pos2 next pos3 lst pos40",
                    "orderQuantity": 1,
                    "shipQuantity": 1,
                    "status": "Active",
                    "warehouse": "MIA",
                    "line": "2"
                },
                {
                    "itemNumber": "TRAINS         ",
                    "shippingCustomer": 54908,
                    "itemDescription": "Trains po1 next pos2 next pos3 lst pos40",
                    "orderQuantity": 1,
                    "shipQuantity": 1,
                    "status": "Active",
                    "warehouse": "MIA",
                    "line": "2"
                }
            ]
        }
      
    }

   
    render(){
      let headerDOM=null;
      let linesDOM=null;
      let AdditionalDOM=null;
        if(this.state.data){
            const detailHeader=this.state.data.orderDetailHeader;
            const detailLines=this.state.data.orderDetailLines;
            headerDOM=<div>

              


                <div className="row">
                    <div className="col-15"><label>Order Number</label></div>
                    <div className="col-15"><input className="label_text" value={this.z(detailHeader.orderNumber)} disabled /></div>
                    <div className="col-5"></div> 
                    <div className="col-15"><label>Order Date</label></div>
                    <div className="col-15"><input className="label_text" value={detailHeader.orderDate} disabled /></div>
                    <div className="col-5"></div> 
                    <div className="col-15"><label>Status (Last-Next)</label></div>
                    <div className="col-15"><input className="label_text" value={detailHeader.status} disabled /></div>

                </div>
                <div className="row">
                    <div className="col-15"><label>Customer</label></div>
                    <div className="col-15"><input className="label_text" value={this.z(detailHeader.ordCusNumber)} disabled /></div>
                    <div className="col-5"></div> 
                    <div className="col-15"><label>Bill To</label></div>
                    <div className="col-15"><input className="label_text" value={this.z(detailHeader.billCusNumber)} disabled /></div>
                    <div className="col-5"></div> 
                    <div className="col-15"><label>Tender</label></div>
                    <div className="col-15"><input className="label_text" value={detailHeader.tender} disabled /></div>
                </div>

                  <div className="row">
                    <div className="col-15"><label>Completed</label></div>
                    <div className="col-15"><input className="label_text" value={detailHeader.completionDate} disabled /></div>
                    <div className="col-5"></div> 
                    <div className="col-15"><label>Expiration</label></div>
                    <div className="col-15"><input className="label_text" value={this.z(detailHeader.expiration)} disabled /></div>
                    <div className="col-5"></div> 
                    <div className="col-15"><label>Bank</label></div>
                    <div className="col-15"><input className="label_text" value={detailHeader.bank} disabled /></div>
                </div>
              
                <div className="row">
                    <div className="col-15"><label>Reference Order</label></div>
                    <div className="col-15"><input className="label_text" value={this.z(detailHeader.referenceOrder)} disabled /></div>
                    <div className="col-5"></div> 
                    <div className="col-15"><label>Purchase Order</label></div>
                    <div className="col-15"><input className="label_text" value={this.z(detailHeader.purchaseOrder)} disabled /></div>
                    <div className="col-5"></div> 
                    <div className="col-15"><label>Credit Memo</label></div>
                    <div className="col-15"><input className="label_text" value={detailHeader.creditMemo} disabled /></div>

                </div>
                <div className="row">
                   
                    
                    <div className="col-15"><label>Pirority Code</label></div>
                    <div className="col-15"><input className="label_text" value={detailHeader.pirority} disabled /></div>
                    <div className="col-5"></div> 
                    <div className="col-15"><label>Freight Collect</label></div>
                    <div className="col-15"><input className="label_text" value={detailHeader.freightCollect} disabled /></div>
                    <div className="col-5"></div> 
                    <div className="col-15"><label>Customer Class</label></div>
                    <div className="col-15"><input className="label_text" value={detailHeader.customerClass} disabled /></div>
                </div>
               
               <div className="row">
                <div className="col-15"><label>Email Class</label></div>
                <div className="col-15"><input className="label_text" value={detailHeader.emailClass} disabled /></div>
                <div className="col-5"></div> 
                <div className="col-15"><label>Terms</label></div>
                <div className="col-15"><input className="label_text" value={detailHeader.termsCode} disabled /></div>
                <div className="col-5"></div> 
                <div className="col-15"><label>Earliest Ship Date</label></div>
                <div className="col-15"><input className="label_text" value={detailHeader.earliestShipDate} disabled /></div>
                
               
                </div>

                <fieldset>
                    <legend>Pre Authorization</legend>
                    <p>{detailHeader.preauthorization}</p>
                <div className="row">
                    <div className="col-15"><label>Declined</label></div>
                    <div className="col-15"><input className="label_text" value={detailHeader.preAuthDecline} disabled /></div>
                    <div className="col-5"></div> 
                    <div className="col-15"><label>Declined Recieved # </label></div>
                    <div className="col-15"><input className="label_text" value={this.z(detailHeader.preauthDeclRcvd)} disabled /></div>
                    <div className="col-5"></div>
                    <div className="col-15"><label>Date</label></div>
                    <div className="col-15"><input className="label_text" value={detailHeader.preAuthDeclineDate} disabled /></div>
                </div>
                
                </fieldset>
                <p></p>

                <fieldset>
                    <legend>Authorization</legend>
                    <p>{detailHeader.authorization}</p>
                <div className="row">
                    <div className="col-15"><label>Declined</label></div>
                    <div className="col-15"><input className="label_text" value={detailHeader.authDecline} disabled /></div>
                    <div className="col-5"></div> 
                    <div className="col-15"><label>Declined Recieved # </label></div>
                    <div className="col-15"><input className="label_text" value={this.z(detailHeader.authDeclRcvd)} disabled /></div>
                    <div className="col-5"></div>
                    <div className="col-15"><label>Date</label></div>
                    <div className="col-15"><input className="label_text" value={detailHeader.authDeclineDate} disabled /></div>
                </div>
                
                </fieldset>
                <p></p>
                <fieldset>
                    <legend>Totals</legend>
                    <p>{detailHeader.preauthorization}</p>
                <div className="row">
                    <div className="col-15"><label>Original</label></div>
                    <div className="col-15"><input className="label_text" value={this.z(detailHeader.totalOriginal)} disabled /></div>
                    <div className="col-5"></div> 
                    <div className="col-15"><label>Cancelled</label></div>
                    <div className="col-15"><input className="label_text" value={this.z(detailHeader.totalCancelled)} disabled /></div>
                    <div className="col-5"></div>
                    <div className="col-15"><label>Net</label></div>
                    <div className="col-15"><input className="label_text" value={this.z(detailHeader.totalNet)} disabled /></div>
                </div>
                <div className="row">
                    <div className="col-15"><label>Invoiced</label></div>
                    <div className="col-15"><input className="label_text" value={this.z(detailHeader.totalInvoiced)} disabled /></div>
                    <div className="col-5"></div> 
                    <div className="col-15"><label>OE Tendered</label></div>
                    <div className="col-15"><input className="label_text" value={this.z(detailHeader.totalAmountTendered)} disabled /></div>
                    <div className="col-5"></div>
                    <div className="col-15"><label>Unposted Payments</label></div>
                    <div className="col-15"><input className="label_text" value={this.z(detailHeader.totalUnpostedPayments)} disabled /></div>
                </div>
               
                </fieldset>



                

            <p></p>
         
            </div>;
         AdditionalDOM=<div>

              


         <div className="row">
             <div className="col-15"><label>Counter Sale</label></div>
             <div className="col-15"><input type="text" className="label_text" value={this.z(detailHeader.counterSale)} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>Web Store #</label></div>
             <div className="col-15"><input className="label_text" value={this.z(detailHeader.websiteNumber)} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>Suppress Refund</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.supressRefund} disabled /></div>

         </div>
         <div className="row">
             <div className="col-15"><label>Batch</label></div>
             <div className="col-15"><input className="label_text" value={this.z(detailHeader.batchNumber)} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>Cr Memo Print</label></div>
             <div className="col-15"><input className="label_text" value={this.z(detailHeader.creditMemo)} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>Suspend FTCs</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.suspendFTC} disabled /></div>

         </div>
         <div className="row">
             <div className="col-15"><label>Media</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.media} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>Reference Ord</label></div>
             <div className="col-15"><input className="label_text" value={this.z(detailHeader.referenceOrder)} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>Apply Credit</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.applyCredit} disabled /></div>

         </div>
         <div className="row">
             <div className="col-15"><label>Salesperson 1</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.salesperson1} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>Shp#</label></div>
             <div className="col-15"><input className="label_text" value={this.z(detailHeader.applyCreditShp)} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>Transmit</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.transmitCode} disabled /></div>

         </div>
         <div className="row">
             <div className="col-15"><label>Salesperson 2</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.salesperson2} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>AVS Code</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.avsCode} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-30"></div>
             

         </div>

          <div className="row">
             <div className="col-15"><label>Comm Factor</label></div>
             <div className="col-15"><input className="label_text" value={this.z(detailHeader.commFactor1) + ' ' + this.z(detailHeader.commFactor2)} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>Reference RA</label></div>
             <div className="col-15"><input className="label_text" value={this.z(detailHeader.referenceRA)} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>Ship Complete</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.shipComplete} disabled /></div>

         </div>

         <div className="row">
             <div className="col-15"><label>Order Origin</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.orderOrigin} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>Hold Order</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.holdOrder} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>Active Lines</label></div>
             <div className="col-15"><input className="label_text" value={this.z(detailHeader.activeLines)} disabled /></div>

         </div>
         <div className="row">
             <div className="col-15"><label>Gift Order</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.gift} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-30"></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>On Segments</label></div>
             <div className="col-15"><input className="label_text" value={this.z(detailHeader.linesOnSegments)} disabled /></div>

         </div>
         <div className="row">
             <div className="col-15"><label>OE Payment Post</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.paymentPostDate} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>Source Code</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.sourceCode} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>Additional Labels</label></div>
             <div className="col-15"><input className="label_text" value={this.z(detailHeader.additionalLabels)} disabled /></div>

         </div>
         <div className="row">
             <div className="col-15"><label>Requested Ship</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.requestShipDate} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>Search HDR1</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.searchHDR1} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>GRSource</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.reason1} disabled /></div>

         </div>
         <div className="row">
             <div className="col-15"><label>Status Changed</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.statusDate} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"></div>
             <div className="col-15"></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>UR OH2</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.reason2} disabled /></div>

         </div>

         <div className="row">
             <div className="col-15"><label>Acknowledgement</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.acknowledgment} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"></div>
             <div className="col-15"></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>UR OH3</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.reason3} disabled /></div>

         </div>
         <div className="row">
             <div className="col-15"><label>Ship Label</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.shipLabel1 + ' ' + detailHeader.shipLabel1} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>Store Id</label></div>
             <div className="col-15"><input className="label_text" value={this.z(detailHeader.storeId)} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>Third Party Billing</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.thirdPartyBilling} disabled /></div>

         </div>
         <div className="row">
             <div className="col-15"><label>Tax Exempt 1</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.overrideTaxExampt1} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>Tax Exempt 2</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.overrideTaxExampt1} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><label>PO Match Code</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.supressRefund} disabled /></div>

         </div>   

         <div className="row">
             <div className="col-15"><label>Special Instructions</label></div>
             <div className="col-15"><input className="label_text" value={detailHeader.specialInstr1} disabled /></div>
             <div className="col-5"></div> 
             <div className="col-15"><input className="label_text" value={detailHeader.specialInstr2} disabled /></div>
             
             <div className="col-5"></div> 
             <div className="col-15"><input className="label_text" value={detailHeader.specialInstr2} disabled /></div>
             <div className="col-15"></div>
             <div className="col-15"></div>
         </div>   
        <p></p>
        </div>;




          let lines=null;
          
             lines = detailLines.map(line=>{
              return <tr><td>{line.itemNumber}</td><td>{line.itemDescription}</td><td>{line.shippingCustomer}</td>
              <td>{line.shippingCustomerName}</td><td>{line.orderQuantity}</td><td>{line.shipQuantity}</td>
              <td>{line.committedQuantity}</td>
              <td>{line.status}</td><td>{line.warehouse}</td><td>{line.line}</td><td>{line.merchandise}</td><td>{line.discount}</td>
              <td>{line.shipHandling}</td><td>{line.misc1}</td><td>{line.misc2}</td><td>{line.tax1}</td><td>{line.tax2}</td>
              <td>{line.total}</td>
              </tr>;
            });
          
         
          
            linesDOM=<table border='1'>
              <tbody>
              <tr>
              <th>Item</th>  <th>Description</th><th>Ship To</th><th>Ship To Name</th> <th>Order Quantity</th> <th>Ship Quantity</th>
              <th>Committed Quantity</th>
              <th>Status</th>  <th>Warehouse</th>  <th>Line </th><th>Merch</th><th>Discount</th>
              <th>Ship Handling</th><th>Misc1</th><th>Misc2</th><th>Tax1</th><th>Tax2</th><th>Total</th>
              </tr>
              {lines}  </tbody></table>;
          
            
           

        }

        const panels = [
            { key: 'panel-1', title: 'Order Header Display', content: { content: headerDOM } },
            { key: 'panel-2', title: 'Order Additional Display', content: { content: AdditionalDOM } },
          ]
          
       
        return(
        <div>
            {this.state.spinner}
            <center><h3>Order Header</h3></center>
            <div className="row">
                <Accordion fluid styled defaultActiveIndex={0} panels={panels} styled />
             </div>
             <p></p>
             <center><h3>Order Details</h3></center>
             <div style={{'overflow':'auto'}}>
             <table >
             {linesDOM}
             </table>
             </div>
           
             <button
                   type="button" className="btn info"
                    onClick={this.goBackToList.bind(this) }
                    >Back to List</button>
        </div>
        );
    }
}

export default OrderDetails;