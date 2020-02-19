import React from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends React.Component{
  constructor(props){
    super(props);
    this.state = {username:'Login'}
  }

  // componentDidMount(){
  //   const userData = localStorage.getItem('user');
  //   const storage = JSON.parse(userData)
  //   const username = storage.name;

  //   if(!localStorage.getItem('user')){
  //     this.setState({username:`Login`})
  //   }
  //   else{
  //   this.setState({username:`Hi! ${username}`})
  //   }
  // }


removeUser = () => {
  localStorage.removeItem('user');
}

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to={'/'} className="navbar-brand">REACT-NODE-EXPRESS</Link>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={'/'} className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/createpost'} className="nav-link">Create a Post</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/postlist'} className="nav-link">List of Posts</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/register'} className="nav-link">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/login'} className="nav-link">{this.state.username}</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/login'} onClick={this.removeUser} className="nav-link">Logout</Link>
                  </li>
                </ul>
              </div>
            </nav>
    
        )
    }
}