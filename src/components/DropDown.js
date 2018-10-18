import React,{Component} from 'react';
import axios from 'axios';
class DropDown extends Component {

    state={
        data: ''
    }

    selectionChanged = e=>{
            console.log(e.target.value);
            this.props.onSelectionChange(this.props.type,e.target.value);
    }

    componentDidMount(){
        axios( {
            method:'POST',
            url:'http://CRLHL-AHMADBIL1:8080/OrderPowerWeb/getCommonList',
            params:{
                type:this.props.type
            },
            data :{
                type:this.props.type
            }
            , headers:{
                "OPTOKEN": localStorage.getItem("OPSessionID"),
                    "Content-Type":"application/json;charset=UTF-8" 
              }
    } ).then( response => {
  
              const listData = response.data.map(item=>{
                  return (
                      <option value={item.code}>{item.code} - {item.description}</option>  
                  );
              });
                
              this.setState({...this.state,data:listData});
              
          } )
          .catch(error => {
               console.log(error);
              //this.setState({error: true});
          });
    }

    render(){
            
        return <select className="pure-input" onChange={this.selectionChanged.bind(this)}>
               
                <option value="">Select Value</option>
               
                {this.state.data}
            </select>
    }
}

export default DropDown;