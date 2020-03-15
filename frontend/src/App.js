/*
GROUP 4: ARANSA GARCIA, JOSEPH P. PASAOA, KATHY PUMA, AND SERGIO SALAMA
Client APP Main | Greenlist Registry (a full-stack sustainable material forum app)
*/


/* IMPORTS */
import React from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'

import './reset.css';
import './App.css';

import NavigationBar from './Components/NavigationBar'
import Main from './Components/Main'
import RegisterForm from './Components/RegisterForm'
import Resourcer from './Components/Resourcer'
import Material from './Components/Material'
import Creator from './Components/Creator'
import ReclaimedForm from './Components/ReclaimedForm'
import Welcome from './Components/Welcome'


/* MAIN */
class App extends React.Component {
  state = {
    id: localStorage.getItem('cId'),
    username: localStorage.getItem('cUsername'),
    avatarUrl: localStorage.getItem('cAvatarUrl')
  }
  nullState = {
    id: null,
    username: null,
    avatarUrl: null
  }

  componentDidUpdate = (prevProps, prevStates) => {
    if (prevStates.id !== this.state.id) {
      this.resyncCurrent();
    }
  }

  resyncCurrent = () => {
    const cId = localStorage.getItem('cId');
    const cUsername = localStorage.getItem('cUsername');
    const cAvatarUrl = localStorage.getItem('cAvatarUrl');
    this.setState({
        id: cId,
        username: cUsername,
        avatarUrl: cAvatarUrl
    });
  }

  resetUser = () => {
    localStorage.removeItem('cId');
    localStorage.removeItem('cUsername');
    localStorage.removeItem('cAvatarUrl');
    this.setState(this.nullState);
    this.props.history.push("/");
  }

  setUser = (id, username, avatarUrl) => {
    localStorage.setItem('cId', id);
    localStorage.setItem('cUsername', username);
    localStorage.setItem('cAvatarUrl', avatarUrl);
    this.setState({
      id, username, avatarUrl
    })
    this.props.history.push("/main");
  }


  renderRegisterForm = () => {
    if (this.state.id !== null) {
      return <Redirect to="/main" />;
    }
    return (
      <>
        <RegisterForm setUser={this.setUser} />
      </>
    )
  }

  renderMain = () => {
    if (this.state.id === null) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <NavigationBar z-index="200" loggedUser={this.state} resetUser={this.resetUser} />
        <Main loggedUser={this.state} z-index="100" />
      </>
    )
  }

  renderResourcer = (routeProps) => {
    if (this.state.id === null) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <NavigationBar loggedUser={this.state} resetUser={this.resetUser} />
        <Resourcer loggedUser={this.state} {...routeProps} />
      </>
    )
  }

  renderMaterial = (routeProps) => {
    if (this.state.id === null) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <NavigationBar loggedUser={this.state} resetUser={this.resetUser} />
        <Material loggedUser={this.state} {...routeProps} />
      </>
    )
  }

  renderCreator = (routeProps) => {
    if (this.state.id === null) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <NavigationBar loggedUser={this.state} resetUser={this.resetUser} />
        <Creator loggedUser={this.state} {...routeProps} />
      </>
    )
  }

  renderReclaimedForm = () => {
    if (this.state.id === null) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <NavigationBar loggedUser={this.state} resetUser={this.resetUser} />
        <ReclaimedForm loggedUser={this.state} />
      </>
    )
  }

  renderWelcome = () => {
    if (this.state.id !== null) {
      return <Redirect to="/main" />;
    }
    return (
      <>
        <Welcome setUser={this.setUser} />
      </>
    )
  }


  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/register' render={this.renderRegisterForm} />
          <Route path='/main' render={this.renderMain} />
          <Route path='/resourcer/:id' render={this.renderResourcer} />
          <Route path='/material/:id' render={this.renderMaterial} />
          <Route path='/creator/:id' render={this.renderCreator} />
          <Route path='/addReclaimed' render={this.renderReclaimedForm} />
          <Route path='/' render={this.renderWelcome} />
        </Switch>
      </div>
    )
  }
}


export default withRouter(App);
