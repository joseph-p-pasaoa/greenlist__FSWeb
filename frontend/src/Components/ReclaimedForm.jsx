import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './ReclaimedForm.css';


class ReclaimedForm extends Component {
  state = {
    isNeedSelect: false,
    titleTxt: "",
    compositionTxt: "",
    quantityNum: 1,
    quantityLabelSelect: "default",
    postBodyTxt: "",
    photoFiles: [],
    errorMsg: ""
  };

  // REFS CREATION
  refTitleInput = React.createRef();
  refCompositionInput = React.createRef();
  refQuantityInput = React.createRef();
  refQuantityLabel = React.createRef();
  refBodyInput = React.createRef();
  refFileInput = React.createRef();
  refBtnSubmit = React.createRef();


  // EVENT HANDLERS
  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  handleFileInput = (e) => {
    this.setState({
        photoFiles: e.target.files
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.refBtnSubmit.current.blur();

    const {
      isNeedSelect,
      titleTxt,
      compositionTxt,
      quantityNum,
      quantityLabelSelect,
      postBodyTxt,
      photoFiles
    } = this.state;

    // input checks
    let errorsOutput = [];
    const errorRefs = [
      this.refTitleInput,
      this.refCompositionInput,
      this.refQuantityInput,
      this.refQuantityLabel,
      this.refBodyInput
    ];
    let errors = [];
    if (!titleTxt || !titleTxt.trim() || titleTxt.trim().length > 50) {
      errorsOutput.push("Post title is empty or too long");
      errors.push(0);
    }
    if (!compositionTxt || !compositionTxt.trim() || compositionTxt.trim().length > 150) {
      errorsOutput.push("Fabrics entry is empty or too long");
      errors.push(1);
    }
    const qtyNumCheck1 = isNaN(parseInt(quantityNum));
    const qtyNumCheck2 = ("" + quantityNum).length !== parseInt(quantityNum).toString().length;
    if (qtyNumCheck1 || qtyNumCheck2) {
      errorsOutput.push("Quantity is invalid. Please check your number");
      errors.push(2);
    }
    if (quantityLabelSelect === "default") {
      errorsOutput.push("Please choose a unit of quantity");
      errors.push(3);
    }
    if (!postBodyTxt || !postBodyTxt.trim()) {
      errorsOutput.push("Post body is empty or missing. Please add a description of your materials for reclaim");
      errors.push(4);
    }
    if (errorsOutput.length > 0) {
      this.setState({ errorMsg: errorsOutput.join('\n') });
      errorRefs[errors[0]].current.focus();
    } else {

      // proceed with add request to server
      const reclaimPost = new FormData();

      reclaimPost.append("name", titleTxt);
      reclaimPost.append("composition", compositionTxt);
      reclaimPost.append("quantity_num", quantityNum);
      reclaimPost.append("quantity_label", quantityLabelSelect);
      reclaimPost.append("body", postBodyTxt);
      reclaimPost.append("creator_id", this.props.loggedUser.id);
      reclaimPost.append("is_need", isNeedSelect);
      for (let i = 0; i < photoFiles.length; i++) {
        reclaimPost.append('reclaimPhotos', photoFiles[i]);
      }

      /* DEMO DISABLE
      await axios.post("/reclaims/add", reclaimPost);

      this.props.history.push({
          pathname: `/creator/${this.props.loggedUser.id}`
      });
      */

      this.setState({ errorMsg: 'Thank you for your post. Unfortunately successful submissions have been disabled in this demo.' })
    }
  }


  render() {
    const { titleTxt, compositionTxt, quantityNum, quantityLabelSelect, postBodyTxt, errorMsg } = this.state;

    return (
      <div className="container-stage">

        <div className="center-this">
          <h2>New Reclaimed Post</h2>

          <form
            onSubmit={this.handleSubmit}
            className="j-form flex-column add-reclaim"
            encType="multipart/form-data"
          >

            {/* title input */}
            {/* <div className="form-row flex-row"> */}
              <label htmlFor="titleTxt">Post Title:</label>
              <input
                type="text"
                name="titleTxt"
                id="titleTxt"
                placeholder="Start with a title"
                className="input-title el-box"
                ref={this.refTitleInput}
                value={titleTxt}
                onChange={this.handleChange}
              />
            {/* </div> */}

            {/* fabric input */}
            {/* <div className="form-row flex-row"> */}
              <label htmlFor="compositionTxt">Fabric:</label>
              <input
                type="text"
                name="compositionTxt"
                id="compositionTxt"
                placeholder="What fabric do you have?"
                className="input-composition el-box"
                ref={this.refCompositionInput}
                value={compositionTxt}
                onChange={this.handleChange}
              />
            {/* </div> */}

            {/* amount input */}
            {/* <div className="form-row flex-row"> */}
              <label htmlFor="quantityNum">Amount Available:</label>
              <div className="form-row flex-row el-box">
                <input
                  type="number"
                  name="quantityNum"
                  id="quantityNum"
                  placeholder="10"
                  min="1"
                  className="input-quantity-num"
                  ref={this.refQuantityInput}
                  value={quantityNum}
                  onChange={this.handleChange}
                />
                <select
                  id="quantityLabelSelect"
                  name="quantityLabelSelect"
                  ref={this.refQuantityLabel}
                  value={quantityLabelSelect}
                  onChange={this.handleChange}
                >
                  <option value="default" autoFocus disabled>-- unit type --</option>
                  <option value="lbs">lbs</option>
                  <option value="kgs">kgs</option>
                  <option value="oz">ounces</option>
                  <option value="grams">grams</option>
                  <option value="units">units</option>
                </select>
              </div>
            {/* </div> */}

            {/* body input */}
            {/* <div className="form-row flex-row"> */}
              <label htmlFor="postBodyTxt">Post Body:</label>
              <textarea
                type="text"
                name="postBodyTxt"
                id="postBodyTxt"
                placeholder="Tell everyone more about your fabrics to reclaim"
                className="input-body el-box"
                ref={this.refBodyInput}
                value={postBodyTxt}
                onChange={this.handleChange}
              />
            {/* </div> */}

            {/* file input */}
            <label>Upload Images:</label>
            <input
              type="file"
              accept="image/*"
              ref={this.refFileInput}
              onInput={this.handleFileInput}
              onChange={e => e.target.value}
              className="el-box"
              multiple
            />

            <button ref={this.refBtnSubmit}>Submit</button>

            <p className="msg--error">{errorMsg}</p>
          </form>
        </div>
      </div>
    );
  };
}


export default withRouter(ReclaimedForm);
