import React, { Component } from 'react';
import searchIcon from './searchIcon.png';

class CustomField extends Component {

showDialog=()=>{
  if(this.props.showDialog!=null){
    this.props.showDialog(this.props.searchName);
  }
}

  render() {
    return (
      <div className="row">
          <div className="col-25">
          <label >{this.props.labelValue} </label>
          </div>
          <div className="col-65">

          <input type="text" id={this.props.idValue}/>
          </div>
            <div className="col-10">
          <img src={searchIcon} height="30px" width="30px" alt="search" onClick={this.showDialog}/>
          </div>
      </div>
    );
  }
}

export default CustomField;
