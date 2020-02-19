import React, { Component } from 'react';
import axios from 'axios';

export default class EditPost extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      body: ''
    }
  }

  componentDidMount() {
      axios.get('http://localhost:4001/posts/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                title: response.data.title, 
                body: response.data.body
               });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  onChangeBody(e) {
    this.setState({
      body: e.target.value
    })  
  }
 

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      title: this.state.title,
      body: this.state.body
    };
    axios.post('http://localhost:4001/updatepost/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/postlist');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Post</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Title :  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.title}
                      onChange={this.onChangeTitle}
                      />
                </div>
                <div className="form-group">
                    <label>Body: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.body}
                      onChange={this.onChangeBody}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Body" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}