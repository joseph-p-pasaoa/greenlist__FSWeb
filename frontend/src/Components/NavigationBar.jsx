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
      allMaterials: []
    }
  }

  async componentDidMount() {
    await this.handleGetMaterials()

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
        sliderStyle = { transX: "translateX(145px)", opacity: 1 };
        navProfile = {color: "#1590cf"}; break;
      case '/addReclaimed':
        sliderStyle = { transX: "translateX(290px)", opacity: 1 };
        navAddReclaim = {color: "#1590cf"}; break;
      case '/material/:id':
        sliderStyle = { transX: "translateX(435px)", opacity: 1 };
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
        <ul className='j-navbar j-flex-row'>
            <Link to='/main'><li style={navMain}>Main</li></Link>
            <Link to={`/creator/${this.props.loggedUser.id}`}><li style={navProfile}>Profile</li></Link>
            <Link to='/addReclaimed'><li style={navAddReclaim}>Post reclaimed</li></Link>
            <li>
              <NavDropdown id="nav-dropdown" title="Material" style={navMaterials}>
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
            <li id="active-slide" style={{transform: sliderStyle.transX, opacity: sliderStyle.opacity}}></li>
        </ul>
      </div>
    )
  }
}

export default withRouter(NavigationBar);
