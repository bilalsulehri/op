import React, { Component } from 'react';
import { RingLoader } from 'react-spinners';
class SpinnerScreen extends Component {



  render() {

    const backdropStyle={
      position: 'fixed',
      top: 0,
      bottom: 0,
      left:0,
      right:0,
      backgroundColor:'rgba(0,0,0,0)',
      padding:50
    }

    const modalStyle={
      border : '1px solid black',
      backgroundColor: '#fff',
      borderRadius:'5px',
        width:'100%',
        height:'100%',
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
    //  if(!this.props.showDialog){
    //    return null;
    //  }

     const centerText={
       'text-align': 'center'
     }

    var searchComponent=null;
    
    return (

      <div style={backdropStyle}>


        <div style={modalStyle}>
            

         
          <div style={footerStyle}>

          <center><RingLoader color={'#123abc'} loading='true'/></center>
         </div>
        </div>
      </div>
    );
  }
}

export default SpinnerScreen;
