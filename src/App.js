import React, { Component } from 'react';
import './assets/bootstrap.min.css';
import {  Switch, Route } from 'react-router-dom';

import HomePage from './components/HomePage'
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import EditPost from './components/Edit';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <div className="container">
     

      <Navbar/>
          <Switch>
            <Route path="/" exact={true} component={HomePage}/>
              <Route exact path='/createpost' component={ CreatePost } />
              <Route path='/editpost/:id' component={ EditPost } />
              <Route path='/postlist' component={ PostList } />
              <Route path='/register' component={Register}/>
              <Route path='/login' component={Login}/>
          </Switch>
            
 
        </div>  
    );
  }
}

export default App;
