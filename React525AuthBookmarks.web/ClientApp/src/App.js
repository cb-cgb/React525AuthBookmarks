import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import MyBookmarks from './Pages/MyBookmarks';
import AddBookmark from './Pages/AddBookmark';
import Logout from './Pages/Logout';
import {AuthContextComponent} from './AuthContext';
import PrivateRoute from './PrivateRoute';


 class App extends React.Component {
  

  render () {
    return (
     <AuthContextComponent>
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component = {Signup}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/add' component={AddBookmark}/>
        {/* <Route exact path='/bookmarks' component={MyBookmarks}/>         */}
        <Route exact path='/logout' component={Logout}/>
        <PrivateRoute exact path='/bookmarks' component={MyBookmarks}/> 
      </Layout>
    </AuthContextComponent>



    );
  }
}

export default App;
