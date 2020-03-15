import React from 'react'
import { Link } from 'react-router-dom'

class NewSearch extends React.Component {
  state = {
    resourcers: []
  }

  async componentDidMount() {
    this.setState({
      resourcers: this.props.searchResult
    })
  }

  render() {
    const { resourcers } = this.state
    return (
      <div className='main-list'>
        <h2>New</h2>
        <div className='resourcersList'>
          {resourcers.map((resourcer) => {
            let linkString = `/resourcer/${resourcer.id}`
            let materialsString = resourcer.materials.join(', ')
            return (
              <Link to={linkString} key={resourcer.id} className="j-card">
              <div className='all--card j-flex-row'>
                <div>
                  <h3 className='card--name'>{resourcer.company}</h3>
                  <img className='resourcer--avatar' src={resourcer.avatar_url} alt="Avatar Url"></img>
                </div>
                <p className='resourcer--materials'><strong>Materials:</strong><br />{materialsString}</p>
              </div>
            </Link>
            )
          })}
        </div>
        { (this.props.searchResult[0] === undefined) ? <p className='noResults'>no results</p> : <></> }
      </div>
    )
  }
}

export default NewSearch
