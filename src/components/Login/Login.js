import React, { Component } from 'react';
import axios from 'axios';

  export default class login extends Component {
      constructor() {
        super();
        this.state = {
          email: '',
          password: '',
          status:'',
          message: 'Please give your credentials!',
          user:''
        };
      }

      onChange = (e) => {
            this.setState({ [e.target.name]: e.target.value });       
      }


      onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;

        axios.post('http://localhost:4001/login', { email, password } )
        .then((result) => {
          const user = JSON.stringify(result.data.userData)
        this.setState({status:result.data.status, message: result.data.message,  user:localStorage.setItem('user',user)})
           if(result.data.status==="success!"){
             this.setState({
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
            <h3 align="center">Login</h3>
            <form onSubmit={this.onSubmit}>

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
  