import React, { Component } from 'react';

//import './Style.css';
import axios from '../axios';

class MediaList extends Component {


  state={mediaList:""};
  componentDidMount(){

    axios.get('/getMediaList', {"headers":{
      "OPTOKEN": localStorage.getItem("OPSessionID"),
          "Content-Type":"application/json;charset=UTF-8" 
    }}
    , {"headers":{
      "OPTOKEN": localStorage.getItem("OPSessionID"),
          "Content-Type":"application/json;charset=UTF-8" 
    }}
  ).then( response => {

            const media = response.data;

            this.setState({mediaList: media});
            // console.log( response );
        } )
        .catch(error => {
            // console.log(error);
            //this.setState({error: true});
        });


    //this.setState({customerData:<table border='1'><tbody><tr><th>Customer # </th><th>Name</th></tr><tr><td>1234</td><td>Bilal</td></tr></tbody></table>});
  }

mediaSetter(callback,media){
  callback(media);

}


  render() {


    let medias=null;
    if(this.state.mediaList){
       medias = this.state.mediaList.map(media=>{
        return <tr><td><a href="#" onClick={this.mediaSetter.bind(this,this.props.mediaSetter, media.mediaCode)}>{media.mediaCode}</a></td><td>{media.description}</td>
        <td>{media.book}</td><td>{media.dailySpecial}</td><td>{media.delete}</td>
        </tr>;
      });
    }
    let mediaTable=null;
    if(this.state.mediaList && this.state.mediaList.length>0){
          mediaTable=<table border='1'>
        <tbody>
        <tr>
        <th>Media</th>  <th>Description</th>  <th>Book</th>  <th>Daily Special</th>  <th>Deleted </th>
        </tr>
        {medias}  </tbody></table>;
    }

  const scrollStyle={'overflow-x':'scroll'};
    return (

      <div>


        {mediaTable}

      </div>

    );
  }
}

export default MediaList;
