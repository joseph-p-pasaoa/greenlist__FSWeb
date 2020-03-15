import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Carousel from "react-bootstrap/Carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import "./Creator.css"


class Creator extends React.Component {
  constructor() {
    super()
    this.state = {
      creatorInfo: {},
      allReclaims: [],
    }
  }

  async componentDidMount() {
    await this.handleGetCreatorInfo()
    await this.handleGetReclaimedByID()
  }



  async handleGetCreatorInfo() {
    try {
      let getCreatorInfo = await axios.get(`/creators/${this.props.match.params.id}`)
      let getCreatorInfoData = getCreatorInfo.data.payload
      this.setState({
        creatorInfo: {
          about: getCreatorInfoData.about,
          address: getCreatorInfoData.address,
          avatar_url: getCreatorInfoData.avatar_url,
          email: getCreatorInfoData.email,
          firstname: getCreatorInfoData.firstname,
          lastname: getCreatorInfoData.lastname,
          phone_number: getCreatorInfoData.phone_number,
          username: getCreatorInfoData.username,
          website_url: getCreatorInfoData.website_url,
        }
      })
    } catch (err) {
      console.log('ERROR', err)
    }
  }

  async handleGetReclaimedByID() {
    let creatorId = this.props.match.params.id
    try {
      let getReclaimed = await axios.get(`/reclaims/sellReclaimed/${creatorId}/false`, { id: creatorId, is_need: false })
      let getReclaimedData = getReclaimed.data.payload
      this.setState({
        allReclaims: getReclaimedData
      })
    } catch (err) {
      console.log('ERROR', err)
    }
  }

  async handleDeleteReclaimed(reclaimed_Id) {
    try{
    await axios.delete(`/reclaims/delete/${reclaimed_Id}`)
    this.handleGetReclaimedByID()
    }catch(err){
      console.log("ERROR", err)
    }
  }

  render() {
    const { creatorInfo, allReclaims } = this.state

    return (
      <div className='container-stage'>
        <div className='all-profiles center-this'>
        <h1 className="profile--name">{creatorInfo.username}</h1>
        <h4 className="sub--name">Creator / Designer Profile</h4>
          <div className="container--profile-avatar j-flex-row">
            <img className='profile-avatar' src={creatorInfo.avatar_url} alt="user avatar"></img>
            <div className="profile-info">
              <p className='creator-Info'><strong>First Name:</strong><br />{creatorInfo.firstname}</p>
              <p className='creator-Info'><strong>Last Name:</strong><br />{creatorInfo.lastname}</p>
              <p className='creator-Info'><strong>About:</strong><br />{creatorInfo.about}</p>
              <p className='creator-Info'><strong>Phone Numbers:</strong><br />{creatorInfo.phone_number}</p>
              <p className='creator-Info'><strong>Email:</strong><br />{creatorInfo.email}</p>
              <p className='creator-Info'><strong>Website:</strong><br />{creatorInfo.website_url}</p>
              <p className='creator-Info'><strong>Address:</strong><br />{creatorInfo.address}</p>
            </div>
          </div>
        </div>

        <div className="profile-add--button">
        {this.props.loggedUser.id === this.props.match.params.id ? (
          <div className="j-form">
            <Link to='/addReclaimed'>
              <button>Post New Reclaim</button>
            </Link>
          </div>
        ) : (
            <div>
            </div>
          )
        }
        </div>

        <div className='reclaimedStage center-this'>
        <h5>{creatorInfo.username}'s Reclaim Posts</h5>
          <div className='reclaimedContainer'>
            {allReclaims.map(reclaim => { 
              const reclaimId = reclaim.id

              return (
                <div className="reclaimedCard" key={reclaimId}>
                  <Carousel interval={null} wrap={false} >
                    {reclaim.photo_url.map((picture) => {
                      return (
                        <Carousel.Item key={picture} >
                          <div >
                            <img className='d-block w-100' src={picture} alt="reclaim view"></img>
                          </div>
                        </Carousel.Item>
                      )
                    })}
                  </Carousel>
                  <div className='reclaimedInfo'>
                    <p className='reclaimedName'>Name: {reclaim.name}</p>
                    <p className='reclaimedComposition'>Material(s): {reclaim.composition}</p>
                    <p className='reclaimedLabel'> Qty: {reclaim.quantity_num} {reclaim.quantity_label}</p>
                    <p className='reclaimedBody'>{reclaim.body}</p>
                  </div>
                  {this.props.loggedUser.id === this.props.match.params.id ? (
                      <div className="j-form j-flex-row reclaim-delete">
                        <button onClick = {() => { this.handleDeleteReclaimed(reclaimId) }}>Delete</button>
                      </div>
                  ) : (
                      <div>
                      </div>
                    )
                  }
                </div>
              )
            })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Creator
