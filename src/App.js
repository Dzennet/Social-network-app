import './App.css';
import React, { useEffect } from 'react';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Header from './Components/Header/Header';
import ProfileContainer from './Components/Profile/ProfileContainer';
import UsersContainer from './Components/Users/UsersContainer';
import { initializeApp } from './Store/appReducer';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Preloader from './common/Preloader';

const App = ({ isAppInitialized, initializeApp }) => {

  useEffect(() => {
    initializeApp()
  }, [])


  if (!isAppInitialized) {
    return <Preloader />
  }

  return (
    <div className="App">
      <Header />
      <div className="App-wrapper-content" >
        <Navbar />
        <div className="App-content">
          <Route exact path='/' render={() => <Redirect to='/profile' />} />
          <Route path='/profile/:userId?' component={ProfileContainer} />
          <Route path='/users' component={UsersContainer} />
          <Route path='/login' component={Login} />
        </div>
      </div>
    </div>
  );
}

let mapStateToProps = (state) => ({
  isAppInitialized: state.app.isAppInitialized,
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);
