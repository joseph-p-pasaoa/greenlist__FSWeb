import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Resourcer.css';

class Resourcer extends React.Component {
  constructor(props) {
    super()
    this.state = {
      resourcerInfo: {},
      productInfo: [],
    }
  }

  async componentDidMount() {
    await this.handleGetResoucerByID()
    await this.handleGetProductByID()

  }

  async handleGetResoucerByID() {
    let resourcerId = parseInt(this.props.match.params.id)
    try {
      let getResourcerInfo = await axios.get(`/resourcers/${resourcerId}`)
      let getResourcerInfoData = getResourcerInfo.data.payload
      this.setState({
        resourcerInfo: {
          about: getResourcerInfoData.about,
          address: getResourcerInfoData.address,
          avatar_url: getResourcerInfoData.avatar_url,
          company: getResourcerInfoData.company,
          email: getResourcerInfoData.email,
          phone_number: getResourcerInfoData.phone_number,
          website_url: getResourcerInfoData.website_url
        }
      })

    } catch (err) {
      console.log('ERROR', err)
    }
  }

  async handleGetProductByID() {
    let resourcerId = parseInt(this.props.match.params.id)
    try {
      let getproductInfo = await axios.get(`/products/${resourcerId}`)
      let getproductInfoData = getproductInfo.data.payload
      this.setState({
        productInfo: getproductInfoData
      })
    } catch (err) {
      console.log('ERROR', err)
    }
  }


  render() {
    const { resourcerInfo, productInfo } = this.state
    return (
      <div className='container-stage'>
        <div className='all-profiles center-this'>
          <h1 className="profile--name">{resourcerInfo.company}</h1>
          <h4 className="sub--name">Supplier Profile</h4>
          <div className="container--profile-avatar j-flex-row">
            <img className='profile-avatar' src={resourcerInfo.avatar_url} alt="resourcer's avatar"></img>
            <div className="profile-info">
              <p className='resourcerInfo'><strong>About:</strong><br />{resourcerInfo.about}</p>
              <p className='resourcerInfo'><strong>Phone Number:</strong><br />{resourcerInfo.phone_number}</p>
              <p className='resourcerInfo'><strong>Email:</strong><br />{resourcerInfo.email}</p>
              <p className='resourcerInfo'><strong>Website:</strong><br />{resourcerInfo.website_url}</p>
              <p className='resourcerInfo'><strong>Address:</strong><br />{resourcerInfo.address}</p>
            </div>
          </div>
            
          <h5>Supplier Postings</h5>
          <br />
          <div className='productsContainer'>
            {productInfo.map(el => {
              return (
                <div key ={el.id}>
                  <Link to={`/material/${el.id}`} className="product-link">
                    <div className='productCard j-flex-row'>
                    <img className='productPic' src={el.photo_url} alt="material"></img>
                      <div>
                        <p className='productName'><strong>Product Name:</strong><br />{el.name}</p>
                        <p className='productName'><strong>Product Material:</strong><br />{el.materials_name}</p>
                        <p className='productBody'><strong>Product Description:</strong><br />{el.body}</p>
                      </div>

                    </div>
                  </Link>
                  <br /> <br />
                </div>
              )
            })}

          </div>
        </div>
      </div>
    )
  }
}

export default Resourcer



