import _ from 'lodash'
import React, { Component } from 'react'

import { Icon, Label, Menu, Table, Pagination } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from '../axios';

import SpinnerScreen from './SpinnerScreen';
import { RingLoader } from 'react-spinners';

export default class TableExample extends Component {
  state = {
    column: this.props.defaultSortColumn,
    data: this.props.tableData,
    searchRequest: this.props.searchRequest,
    direction: 'ascending',
    pageNumber:1,
    totalPages:0,
    spinner:'',
    url:this.props.url
  }

  centerStyle={
    
        'position': 'fixed',
        // 'width': '100px',
        // 'height': '50px',
        'top': '50%',
        'left': '50%',
        //'margin-left': '-50px', /* margin is -0.5 * dimension */
        //'margin-top': '-25px', 
        'z-index':500
   
  }

//   constructor(){
//       super();
//       this.handlePaginationChange=this.handlePaginationChange.bind(this);
//   }
  
  handleSort = clickedColumn => () => {
    this.setState({...this.state,spinner:<center style={this.centerStyle}><RingLoader  color={'#123abc'} loading='true'/></center>});
  
    const { column, direction } = this.state;

 
    if (column !== clickedColumn) {
      this.setState({...this.state,
        column: clickedColumn,
        //data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })
      this.sortData(clickedColumn, this.state.direction);
      return;
    }

    const newDirec=direction === 'ascending' ? 'descending' : 'ascending';
    this.setState({...this.state,
      //data: data.reverse(),
      direction: newDirec
    })

    this.sortData(this.state.column,newDirec);
  }

  sortData (sortColumn, sortOrder){
      console.log(sortColumn, sortOrder);
    //console.log(e,a);
    // alert(a.activePage);

     let searchRequest={...this.state.searchRequest};
     
    let pageProps={...searchRequest.pageProps,pageNumber:this.state.pageNumber,totalPages:this.state.totalPages,sortColumn:sortColumn, sortOrder:sortOrder};
    
    searchRequest.pageProps=pageProps;

     axios.post( this.state.url, searchRequest
      , {"headers":{
        "OPTOKEN": localStorage.getItem("OPSessionID"),
            "Content-Type":"application/json;charset=UTF-8" 
      }}
    
    ).then( response => {
         //alert('response');
           const orderData = response.data;
         //  alert('response recieved');
         //  console.log(orderData);
           this.setState({...this.state, data: orderData.data, spinner:'' });
           // console.log( response );
       } )
       .catch(error => {
            console.log(error);
            this.setState({...this.state,spinner:''});
           //this.setState({error: true});
       });
   //   this.setState({
   //       ...this.state,
         
   //   });
  }

  handlePaginationChange = (e, a) => {
      console.log(e,a);
     // alert(a.activePage);
     this.setState({...this.state,spinner:<center style={this.centerStyle}><RingLoader  color={'#123abc'} loading='true'/></center>});
      let searchRequest={...this.props.searchRequest};
      searchRequest.pageProps.pageNumber=a.activePage;

      axios.post( this.state.url, searchRequest
        , {"headers":{
          "OPTOKEN": localStorage.getItem("OPSessionID"),
              "Content-Type":"application/json;charset=UTF-8" 
        }}
      ).then( response => {
          //alert('response');
            const orderData = response.data;
          //  alert('response recieved');
          //  console.log(orderData);
            this.setState({...this.state, data: orderData.data, pageNumber:a.activePage, totalPages: orderData.pageProps.totalPages,spinner:'' });
            // console.log( response );
        } )
        .catch(error => {
             console.log(error);
             this.setState({...this.state,spinner:''});
            //this.setState({error: true});
        });
    //   this.setState({
    //       ...this.state,
          
    //   });
      
  }

  render() {
    //alert('rendering again');
    const { column, data, direction } = this.state;
    const totalPages=this.props.totalPages;
    
    const columnHeadings=this.props.columnHeaders.map(col=>{
       // console.log('[Inside table example]',col), this.props.columnHeaders;
        return <Table.HeaderCell sorted={column===col.fieldName ? direction : null} onClick={this.handleSort(col.fieldName)}> {col.displayName} </Table.HeaderCell>;
    });


    if( this.props.tableData==null && this.state.data==null){
        return null;
    }
    var key=0, colIndex=0;
    /*
     <Table.HeaderCell
              sorted={column === 'name' ? direction : null}
              onClick={this.handleSort('name')}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'age' ? direction : null}
              onClick={this.handleSort('age')}
            >
              Age
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'gender' ? direction : null}
              onClick={this.handleSort('gender')}
            >
              Gender
            </Table.HeaderCell>*/

    return (
        <div>
            {this.state.spinner}
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>

            { columnHeadings}
           
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(row => {
        //      console.log('row ' + Object.values(row));
              key++;
              colIndex=0;
              return (
                <Table.Row key={key}>
                   {

                     this.props.columnHeaders.map(d=>{
                       colIndex++;
   //                         console.log('row field name mapping', row[d.fieldName]);
                        //if(colIndex==1 && this.props.idSetter){
                        if(this.props.idSetter && d.fieldName==this.props.idSetterId ){
                        return (<Table.Cell ><a href='#' onClick={()=>this.props.idSetter(row[this.props.idSetterId], row[this.props.idSetterDescription])} > {row[d.fieldName]}</a></Table.Cell>);
                        }else{
                          return (<Table.Cell >{row[d.fieldName]}</Table.Cell>);
                        }
                        // onClick={this.props.idSetter(row[this.props.idSetterId], row[this.props.idSetterDescription])}
                    })

                }
           </Table.Row>

              );
          }
        )
        }
        </Table.Body>
        <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan={this.props.columnHeaders.length}>
            <center><Pagination activePage={this.state.pageNumber} totalPages={totalPages} boundaryRange={1} siblingRange={1} onPageChange={this.handlePaginationChange.bind(this)}/></center>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
      </Table>
      </div>
    )
  }
}
