import React from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import NavDropdown from 'react-bootstrap/NavDropdown'
import './NavigationBar.css'
const logo = require('../assets/images/logo_200228.png');


class NavigationBar extends React.Component {
  constructor(props) {
    super()
    this.state = {
      allMaterials: [],
      navbarWidth: 0  // width of #jNavbar element, used for slider width responsiveness
    }
  }


  async componentDidMount() {
    this.setState({ navbarWidth: this.setNavbarWidth() });
    window.addEventListener('resize', () => this.setState({ navbarWidth: this.setNavbarWidth() }));
    await this.handleGetMaterials()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.navbarWidth !== this.state.navbarWidth) this.setState({ navbarWidth: this.setNavbarWidth() });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.setState({ navbarWidth: this.setNavbarWidth() }));
  }

  // checks and returns width of #jNavbar each window resize call through lifecycle components above
  setNavbarWidth() {
    let navbarWidth = document.querySelector('#jNavbar').offsetWidth;
    return navbarWidth;
  }


  async handleGetMaterials() {
    // const { allMaterials } = this.state
    try {
      let getMaterialInfo = await axios.get(`/materials`)
      let getMaterialInfoData = getMaterialInfo.data.payload
      this.setState({
        allMaterials: getMaterialInfoData
      })
    } catch (err) {
      console.log('ERROR', err)
    }
  }


  render() {
    // PRE-RETURN
    // navbar animation sys
    let sliderStyle = { transX: "translateX(0px)", opacity: 1 };
    let
      navMain = null,
      navProfile = null,
      navAddReclaim = null,
      navMaterials = null;
    const matchPath = this.props.match.path;
    switch (matchPath) {
      case '/creator/:id':
        sliderStyle = { transX: `translateX(${this.state.navbarWidth * .2}px)`, opacity: 1 };
        navProfile = {color: "#1590cf"}; break;
      case '/addReclaimed':
        sliderStyle = { transX: `translateX(${this.state.navbarWidth * .4}px)`, opacity: 1 };
        navAddReclaim = {color: "#1590cf"}; break;
      case '/material/:id':
        sliderStyle = { transX: `translateX(${this.state.navbarWidth * .6}px)`, opacity: 1 };
        navMaterials = {color: "#1590cf"}; break;
      default:
        sliderStyle = { transX: "translateX(0px)", opacity: 1 };
        navMain = {color: "#1590cf"}; break;
    }


    const { allMaterials } = this.state;

    return (
      <div className='container-navbar'>
        <div className="container-logo j-flex-row">
          <img src={logo} alt="Greenlist" className="image-logo" />
        </div>
        <ul className='j-navbar j-flex-row' id='jNavbar'>
            <li id="active-slide" style={{transform: sliderStyle.transX, opacity: sliderStyle.opacity}}></li>
            <Link to='/main'><li style={navMain}>Main</li></Link>
            <Link to={`/creator/${this.props.loggedUser.id}`}><li style={navProfile}>My Profile</li></Link>
            <Link to='/addReclaimed'><li style={navAddReclaim}>Post reclaimed</li></Link>
            <li>
              <NavDropdown id="nav-dropdown" title="Research" style={navMaterials}>
                {allMaterials.map(material => {
                  return (
                    <Link to={`/material/${parseInt(material.id)}`} key={material.id}>
                      <p className='dropdownItem'>{material.name}</p>
                    </Link>
                  )
                })}
              </NavDropdown>
            </li>
            <Link onClick={this.props.resetUser} to="/"><li>Log out</li></Link>
        </ul>
      </div>
    )
  }
}

export default withRouter(NavigationBar);
