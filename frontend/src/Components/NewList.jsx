import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './NewList.css'

class NewList extends React.Component {
  state = {
    resourcers: []
  }

  async componentDidMount() {
    let response = await axios.get('/resourcers')
    this.setState({
      resourcers: response.data.payload
    })
  }

  render() {
    const { resourcers } = this.state
    return (
      <div className='main-list'>
        <h2>Suppliers</h2>
        <div className='resourcersList'>
          {resourcers.map((resourcer) => {
            let linkString = `/resourcer/${resourcer.id}`
            let materialsString = resourcer.materials.join(', ')
            let resourcerAvatarUrl = resourcer.avatar_url
            return (

              <Link to={linkString} key={resourcer.id} className="j-card">
                <div className='all--card j-flex-row'>
                  <div>
                    <h3 className='card--name'>{resourcer.company}</h3>
                    <img className='resourcer--avatar' src={resourcerAvatarUrl} alt="Avatar Url"></img>
                  </div>
                  <p className='resourcer--materials'><strong>Materials:</strong><br />{materialsString}</p>
                </div>
              </Link>

            )
          })}
        </div>
      </div>
    )
  }
}

export default NewList
