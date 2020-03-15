import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

import './Main.css';
import NewList from './NewList'
import NewSearch from './NewSearch'
import ReclaimedList from './ReclaimedList'
import ReclaimedSearch from './ReclaimedSearch'

class Main extends React.Component {
  state = {
    list: 'new',
    input: '',
    searchResult: []
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handleSearch = async (event) => {
    event.preventDefault()
    const { list, input } = this.state
    let body = {
      input: input
    }
    let route = list.slice(0,3)
    let response = await axios.put(`/search/${route}`, body)
    this.setState({
      list: ''
    })
    this.setState({
      list: `${route}Search`,
      searchResult: response.data.payload
    })
  }

  showNew = () => {
    this.setState({
      list: 'new',
      input: ''
    })
  }

  showReclaimed = () => {
    this.setState({
      list: 'reclaimed',
      input: ''
    })
  }

  showRequests = () => {
    this.setState({
      list: 'requests',
      input: ''
    })
  }

  render() {
    const { list, input, searchResult } = this.state;

    // sub navbar sys
    let
      subNavSuppliers = null,
      subNavReclaimed = null,
      subNavRequests = null;
    switch (list) {
      case "new":
      case "newSearch":
        subNavSuppliers = {color: "#fff", textShadow: "1px 1px 4px #252525"}; break;
      case "reclaimed":
      case "recSearch":
        subNavReclaimed = {color: "#fff", textShadow: "1px 1px 4px #252525"}; break;
      default:
        subNavRequests = {color: "#fff", textShadow: "1px 1px 4px #252525"}; break;
    }


    return (
      <div className='container-stage main-stage-grid'>
        <div className="sub-bar j-flex-column container-navbar">
          <ul className='j-main-subnav j-flex-row'>
            <Link to='/main' onClick={this.showNew}><li style={subNavSuppliers}>Suppliers</li></Link>
            <Link to='/main' onClick={this.showReclaimed}><li style={subNavReclaimed}>Reclaimeds</li></Link>
            <Link to='/main' onClick={this.showRequests}><li style={subNavRequests}>Your Requests</li></Link>
          </ul>
          <form onSubmit={this.handleSearch} className='j-form searchBar'>
            <input onChange={this.handleInput} type='text' placeholder='search by material' value={input}></input>
            <button>SEARCH</button>
          </form>
        </div>

        {/* <button onClick={this.showNew}>SUPPLIERS</button>
        <span> / </span>
        <button onClick={this.showReclaimed}>RECLAIMED</button>
        <span> / </span>
        <button>REQUESTS</button> */}
        <div className="main-results">
          <div className="center-this pad-bottom">
            { (list === 'reclaimed') ? <ReclaimedList/> : <></>}
            { (list === 'new') ? <NewList/> : <></>}
            { (list === 'recSearch') ? <ReclaimedSearch searchResult={searchResult}/> : <></>}
            { (list === 'newSearch') ? <NewSearch searchResult={searchResult}/> : <></>}
            { (list === 'requests') ? <></> : <></>}
          </div>
        </div>

      </div>
    )
  }
}

export default Main
