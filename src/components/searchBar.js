import React from 'react';
import axios from 'axios';

const cloudFcnAddress = "https://us-central1-youtubeutility.cloudfunctions.net/youtubeGetVideoInfo";


class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      urlAddress: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAfterSearch = this.handleAfterSearch.bind(this);

  }

  handleChange(e) {
    this.setState({
      urlAddress: e.target.value
    });
    console.log("Search Changing: " + e.target.value);
  }

  handleAfterSearch(e) {
    // 서치 결과를 보여줘야한다.
    console.log('Search Result: Thumbnail [' + e.thumbnail + ']');

  }

  handleSubmit(e) {
    console.log('07:Submit clicked: ' + this.state.urlAddress +
                ' To ' + cloudFcnAddress);

    /*
    axios({
      method: 'post',
      url: cloudFcnAddress,
      data: {
        videoUrl: this.state.urlAddress
      }
    })
    .then(res => this.handleAfterSearch)
    .catch(err => console.log('Search Error: ' + err));
    */

    const formData = new FormData();
    formData.append('videoUrl', this.state.urlAddress);

    fetch(cloudFcnAddress, {
      method: 'POST',
      body: JSON.stringify({
        'videoUrl': this.state.urlAddress
      })
    })
    .then(res => res.json())      // .json() 혹은 .text(). 이게 없으면 그냥 빈게 나옴.
    .then(res => {
      //console.log('Result: type is ' + typeof res + ' => ' + JSON.stringify(res));
      this.handleAfterSearch(res);
    })
    .catch(err => console.log('Search Error: ' + err));


    e.preventDefault(); // 뭐지 이게?
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Address:
          <input type="text" value={this.state.urlAddress}
            onChange={this.handleChange} />
        </label>
        <input type="submit" name="Submit" />
      </form>

    );
  }
}

export default SearchBar;
