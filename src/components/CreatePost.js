import React, { Component } from 'react';
import axios from 'axios';

  export default class CreatePost extends Component {
      constructor() {
        super();
        this.state = {
          title: '',
          body: '',
          pic: ''
        };
      }

      onChange = (e) => {
        switch (e.target.name) {
          case 'pic':
            this.setState({ pic: e.target.files[0] });
            break;
          default:
            this.setState({ [e.target.name]: e.target.value });
        }
      }

      onSubmit = (e) => {
        e.preventDefault();
        const { title, body, pic } = this.state;
        let formData = new FormData();

        formData.append('title', title);
        formData.append('body', body);
        formData.append('pic', pic);

        axios.post('http://localhost:4001/createpost', formData)
      
            .then(res => console.log(res.data))
            .then(error => console.log(error))
            this.props.history.push('/postlist');
            window.location.reload();
      }

      render() {
        // const { title, body, pic } = this.state;
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
                    <label>Upload Image : </label>
        <input type="file" name="pic" className="form-control" onChange={this.onChange}
                      />
                </div>

                <div className="form-group">
        <input type="submit" value="Create Post" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        );
      }
    }
  