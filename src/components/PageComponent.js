import React, { Component } from 'react';


class PageComponent extends Component {



  render(){

    let activePage=this.props.activepage;
    let visiblePages=this.props.visiblePages;
    let pageCells='';


    return <div className="pagination">
          <a  href="#">&laquo;</a>

          <a href="#">1</a>
          <a href="#" >2</a>
          <a href="#" className="active">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">6</a>
          <a href="#">&raquo;</a>
        </div>
  }
}

export default PageComponent;
