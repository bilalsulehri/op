import React,{Component} from 'react';
import axios from '../axios';
import { RingLoader } from 'react-spinners';
import {Route, NavLink,Switch} from 'react-router-dom';
import Login from './Login';
class Companies extends Component {

    state={
        data: '',companyNumber:null, selectedIndex:1
    }

 

    componentDidMount(){
       
        // axios({
        //     "url":"/getCompanies",
        //     "method":"post",
        //     "data":{"CHEENPON":"PONCHEEN"}
        //     // ,
        //     // "headers":{
        //     //     "OPTOKEN": localStorage.getItem("OPSessionID"),
        //     //      "Content-Type":"application/json;charset=UTF-8" 
        //     // }
        // }).then( response => {
        //               //alert('response');
        //                 const data = response.data;
        //                 console.log(response);
        //                 this.setState({...this.state, data:data});
        //                 // console.log( response );
        //             } )
        //             .catch(error => {
        //                 // console.log(error);
        //                 //this.setState({error: true});
        //             });
        this.setState({...this.state,spinner:<center><RingLoader color={'#123abc'} loading='false'/></center>});
        axios.post( '/getCompanies',{'param':localStorage.getItem("OPSessionID")}
      , {"headers":{
        "OPTOKEN": localStorage.getItem("OPSessionID"),
            "Content-Type":"application/json;charset=UTF-8" 
      }}
     ).then( response => {
              //alert('response');
                const data = response.data;
                console.log(response);
                this.setState({...this.state, data:data, spinner:''});
                // console.log( response );
            } )
            .catch(error => {
                console.log(error);
                //this.setState({error: true});
                this.setState({...this.state,spinner:'',error:true});
            });
    
    }

    onSelect(){
        this.setState({...this.state,spinner:<center><RingLoader color={'#123abc'} loading='false'/></center>});
            axios.post( '/setCompany',{'param': this.state.companyNumber} 
            , {"headers":{
                "OPTOKEN": localStorage.getItem("OPSessionID"),
                    "Content-Type":"application/json;charset=UTF-8" 
            }}
        ).then( response => {
                    // console.log( response );
                    this.props.closeScreen();
                } )
                .catch(error => {
                    // console.log(error);
                    //this.setState({error: true});
                    this.setState({...this.state,spinner:'',error:true});
                });

         
    }

    onChange(e){
        //alert(e.target.key);
        this.setState({...this.state,companyNumber:e.target.value, selectedIndex:e.target.key});
       
    }

    render(){
        
        

        let  tableData=null;
        let mainTable=null;
        let checked='checked';
        let key=1;
        if(this.state.error){
            return(
                <div>
                    Something went wrong or session timed out Please <NavLink to="/login" exact>clickhere </NavLink>to log in again
                    <Route path="/logout" exact component={Login}/>
                    <Switch>
                    <Login showDialog="true"/>
                    </Switch>
                </div>
            );

        }

        if(this.state.data){
           tableData = this.state.data.map(row=>{
                let temp=<input type="radio" key={key} name="rcmp" ref="refcmp" value={row.companyNumber} onChange={this.onChange.bind(this)}/>;
            if(this.state.selectedIndex==key){
                temp=<input type="radio" key={key} name="rcmp" ref="refcmp" value={row.companyNumber} checked onChange={this.onChange.bind(this)}/>;
                if(this.state.companyNumber==null)
                    this.setState({...this.state, companyNumber:row.companyNumber});
                
            }
            key++;
            return <tr>
                <td> {temp}</td>
                <td>{row.companyNumber}</td>
                <td>{row.companyName}</td>
                <td>{row.combineInventory}</td>
                <td>{row.combineList}</td>
            </tr>;
          });

          mainTable=<div><table border='1'>
            <tbody>
            <tr>
            <th>Select</th>  <th>Company</th>  <th>Name</th>  <th>Inventory</th>  <th>List </th>
            </tr>
            {tableData}  </tbody></table>
            <button type="button" className="btn info" onClick={this.onSelect.bind(this)} >Submit</button>
            </div>;
        }
       
        return(
        <div>
              <p style={{'text-align':'center'}}><b>Select Company</b></p>
         <p></p>
            {this.state.spinner}
            {mainTable}
            <p></p>
           
        </div>
        );
    }
}

export default Companies;