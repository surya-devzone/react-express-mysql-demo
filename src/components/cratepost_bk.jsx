import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      title: '',
      body: ''
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  

  onSubmit(e) {
    e.preventDefault();
    const obj = {  title: this.state.title,  body: this.state.body };
    axios.post('http://localhost:4001/createpost', obj)
        .then(res => console.log(res.data))
        .then(error => console.log(error))
    
    this.setState({
      title: '',
      body: '',
      pic: ''
    })
    this.props.history.push('/postlist');
    // window.location.reload();
  }
 
  render() {
    return (
        <div className="col-md-6">
            <h3 align="center">Create Post</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Title :  </label>
        <input type="text" name="title" className="form-control" value={this.state.title} onChange={this.onChange}
                      />
                </div>
                <div className="form-group">
                    <label>Body : </label>
        <input type="text" name="body" className="form-control" value={this.state.body} onChange={this.onChange}
                      />
                </div>



                <div className="form-group">
        <input type="submit" value="Create Post" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}