import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './ReclaimedList.css'

class ReclaimedList extends React.Component {
  state = {
    creators: []
  }

  async componentDidMount() {
    let response = await axios.get('/creators')
    this.setState({
      creators: response.data.payload
    })
  }

  render() {
    const { creators } = this.state
    return (
      <div className='main-list'>
        <h2>Users With Reclaimed</h2>
        <div className='creatorsList'>
          {creators.map((creator) => {

            let linkString = `/creator/${creator.id}`
            let creatorAvatarUrl = creator.avatar_url
            let materialsString = creator.materials.join(', ')

            return (
              <div>
                {creator.count !== "0" ? (
                  <Link to={linkString} key={creator.id} className="j-card">
                    <div className='all--card j-flex-row'>
                      {/* <div> */}
                        <img className='creator--avatar' src={creatorAvatarUrl} alt="Avatar Url"></img>
                        <div className='creator--textdiv'>
                        <h3 className='card--name'>{creator.firstname} {creator.lastname}</h3>
                      {/* </div> */}

                        <p className='creator--materials'><strong>Available Materials:</strong><br />{materialsString}</p>
                        <p className='creator--postscount'><strong>Posts:</strong><br />{creator.count}</p>
                      </div>
                    </div>
                  </Link>
                ) : (<div></div>)}
              </div>
            )
          })}

        </div>
      </div>
    )
  }
}

export default ReclaimedList
