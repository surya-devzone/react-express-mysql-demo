import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

class TableRow extends Component {

  // constructor(props) {
  //       super(props);
  //       // this.delete = this.delete.bind(this);
  //   }
    // delete() {
    //     axios.delete('http://localhost:4000/deletepost/'+this.props.obj.id)
    //     .then(response => {
    //       this.setState(console.log('deleted successfully...' + response));
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     })
    // }
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.title}
          </td>
          <td>
            {this.props.obj.body}
          </td>
          <td>
            <img src={'http://localhost:3000/images/'+this.props.obj.pic} height="100" width="100" alt="img"/>
          </td>
          <td>
            <Link to={"/editpost/"+this.props.obj.id} className="btn btn-primary">Edit</Link>
          </td>
          {/* <td>
            <button onClick={this.delete()} className="btn btn-danger">Delete</button>
          </td> */}
        </tr>
    );
  }
}

export default TableRow;