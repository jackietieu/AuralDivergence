import React from 'react';
import $ from 'jquery';

class Artist extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      randomTrackUrl: undefined,
      randomTrackTitle: undefined,
    };

    this.artist = this.props.artist;
    this.href = this.artist.href;
    this.followers = this.artist.followers.total;
    this.id = this.artist.id;
    this.popularity = this.artist.popularity;

    this.imageUrls = this.artist.images.map(imageObj => {
      if ((imageObj.width > 640) || (imageObj.height > 640)) {
        return imageObj.url;
      }
    });
  }

  clickForSpotifyPage(e){
    e.preventDefault();
    let url = `https://open.spotify.com/artist/${e.currentTarget.id}`;
    chrome.tabs.create({ url: url });
  }

  clickForRandomTrack(e){
    e.preventDefault();
    let tracks = []; //track urls of artist

    $.ajax({
      url: `https://api.spotify.com/v1/artists/${e.currentTarget.id}/top-tracks?country=US`,
      method: 'get',
      success: res => {
        let data = res.tracks; //array
        data.forEach(trackObj => {
          tracks.push(trackObj);
        });
        let randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
        this.setState({
          randomTrackUrl: randomTrack.preview_url,
          randomTrackTitle: randomTrack.name
        });
      }
    });
  }

  //playing random track sample
  //setup click handler to run ajax request to pull tracks of artist
  //once loaded, looks at all object keys/tracks in response
  //randomly picks out a track
  //start playing preview_url

  //convert clickhandler of button to stop playing audio
  //clickhandler becomes play/pause of random track once random track is picked

  render(){

    // if (this.randomTrack !== undefined) {
    //   //convert random track button to play/pause
    // }

    return(
      <tr className="artist-list-item">
        <td className="artist-name">{this.artist.name}</td>
        <td className="random-track">
          <button
            id={this.artist.id}
            onClick={this.clickForRandomTrack.bind(this)}>{this.state.randomTrackTitle}</button>
        </td>
        <td>{this.followers}</td>
        <td>{this.artist.popularity}</td>
        <td className="search-buttons">
          <button
            id={this.artist.id}
            onClick={this.clickForSpotifyPage.bind(this)}>Spotify</button>
          <button
            onClick={this.props.clickForSimilarArtists}
            className={this.artist.name}
            id={this.artist.id}>Similar Artists</button>
        </td>
      </tr>
    );
  }
}

export default Artist;
