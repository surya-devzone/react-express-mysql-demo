import React, { Component } from 'react';
import axios from 'axios';

  export default class Register extends Component {
      constructor() {
        super();
        this.state = {
          name:'',
          email: '',
          password: '',
          status:'',
          message: 'Fill the details below!'
        };
      }

      onChange = (e) => {
            this.setState({ [e.target.name]: e.target.value });       
      }


      onSubmit = (e) => {
        e.preventDefault();
        const { name,email, password } = this.state;

        axios.post('http://localhost:4001/register', { name,email, password } )
        .then((result) => {
          console.log(result.data.status)
        this.setState({status:result.data.status, message: result.data.message})
           if(result.data.status==="success!"){
             this.setState({
               name:'',
               email:'',
               password:''
             })
           }
        })   
        .catch((error) => {
          console.log(error)
        })  
      }

      render() {
        const {message, status} = this.state;
        return (
            <>
            <div className="alert alert-success" role="alert">
              <h4 className="alert-heading">{status}&nbsp;{message}</h4>
              <p></p>
              <p className="mb-0"></p>
            </div>
        <div className="col-md-6">
            <h3 align="center">User Registration</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                    <label>Name :  </label>
        <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.onChange}
                      />
                </div>

                <div className="form-group">
                    <label>Email :  </label>
        <input type="text" name="email" className="form-control" value={this.state.email} onChange={this.onChange}
                      />
                </div>
                <div className="form-group">
                    <label>Password : </label>
        <input type="text" name="password" className="form-control" value={this.state.password} onChange={this.onChange}
                      />
                </div>

               

                <div className="form-group">
        <input type="submit" value="Login" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        </>
        );
      }
    }
  