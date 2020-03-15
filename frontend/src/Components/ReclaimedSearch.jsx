import React from 'react'
import { Link } from 'react-router-dom'

class ReclaimedSearch extends React.Component {
  state = {
    creators: []
  }

  async componentDidMount() {
    this.setState({
      creators: this.props.searchResult
    })
  }

  render() {
    const { creators } = this.state
    return (
      <div className='main-list'>
        <h2>RECLAIMED Search Results</h2>
        <div className='creatorsList'>
          {creators.map((creator) => {
            let linkString = `/creator/${creator.id}`
            let materialsString = creator.materials.join(', ')
            return (
              <Link to={linkString} key={creator.id} className="j-card">
                <div className='all--card j-flex-row'>
                  <div>
                    <h3 className='card--name'>{creator.firstname} {creator.lastname}</h3>
                    <img className='creator--avatar' src={creator.avatar_url} alt="Avatar Url"></img>
                  </div>
                  <div>
                    <p className='creator--materials'><strong>Materials:</strong><br />{materialsString}</p>
                    <p className='creator--postscount'><strong>Matching posts:</strong><br />{creator.count}</p>
                  </div>
                </div>
              </Link>
              // <Link to={linkString} key={creator.id}>
              //   <div className='creatorItem'>
              //     <img className='creatorPicRL' src={creator.avatar_url} alt="Avatar Url"></img>
              //     <p className='creatorName'>Creator: {creator.firstname} {creator.lastname}</p>
              //     <p className='creatorPosts'>Matching Posts: {creator.count}</p>
              //     <p className='creatorMaterials'>Materials: {materialsString}</p>
              //   </div>
              // </Link>
            )
          })}
        </div>
        { (this.props.searchResult[0] === undefined) ? <p className='noResults'>no results</p> : <></> }
      </div>
    )
  }
}

export default ReclaimedSearch
