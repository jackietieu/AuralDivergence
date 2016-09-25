import React from 'react';
import $ from 'jquery';

class Artist extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      randomTrackUrl: undefined,
      randomTrackTitle: undefined,
      audioObject: undefined,
      playing: false
    };

    this.artist = this.props.artist;
    this.followers = this.artist.followers.total;
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
    let tracks = [];
    let id = e.currentTarget.id;

    if (this.state.randomTrackUrl) {
      this.state.audioObject.pause();
    }

    this.setState({
      randomTrackUrl: undefined,
      randomTrackTitle: undefined,
      audioObject: undefined,
      playing: false
    },
      () => {
        $.ajax({
          url: `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`,
          method: 'get',
          success: res => {
            let data = res.tracks;

            data.forEach(trackObj => {
              tracks.push(trackObj);
            });

            let randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
            let audio = new Audio(randomTrack.preview_url);

            this.setState({
              randomTrackUrl: randomTrack.preview_url,
              randomTrackTitle: randomTrack.name,
              audioObject: audio,
              playing: true
            },
              () => {audio.play();}
            );
          }
        });
      }
    );
  }

  clickForPlayPause(e){
    e.preventDefault();
    if (this.state.playing) {
      this.setState({
        playing: false
      },
        () => {this.state.audioObject.pause();}
      );
    } else {
      this.setState({
        playing: true
      },
        () => {this.state.audioObject.play();}
      );
    }
  }

  clickForSimilarArtists(e){
    if (this.state.audioObject !== undefined) {
      this.state.audioObject.pause();
    }

    this.setState({
      randomTrackUrl: undefined,
      randomTrackTitle: undefined,
      audioObject: undefined,
      playing: false
    },
      this.props.clickForSimilarArtists(e)
    );
  }

  render(){
    let buttonDisplay, nextTrack, trackTitle;
    let randomTrackClickHandler = this.clickForRandomTrack.bind(this);


    if (this.state.randomTrackUrl === undefined) {
      buttonDisplay =
        <i
          className="fa fa-play"
          aria-hidden="true"
          id={this.artist.id}
          onClick={randomTrackClickHandler}></i>;
    } else {
      trackTitle =
        <span className="random-track-title">
          {this.state.randomTrackTitle}
        </span>;
      nextTrack =
        <i
          className="fa fa-step-forward"
          aria-hidden="true"
          id={this.artist.id}
          onClick={randomTrackClickHandler}></i>;
      randomTrackClickHandler = this.clickForPlayPause.bind(this);
      if (this.state.playing === false) {
        buttonDisplay =
          <i
            className="fa fa-play"
            aria-hidden="true"
            onClick={randomTrackClickHandler}></i>;
      } else {
        buttonDisplay =
          <i
            className="fa fa-pause"
            aria-hidden="true"
            onClick={randomTrackClickHandler}></i>;
      }
    }

    return(
      <tr className="artist-list-item">
        <td className="artist-name">{this.artist.name}</td>
        <td className="random-track">
          {nextTrack}
          {trackTitle}
          {buttonDisplay}
        </td>
        <td>{this.followers}</td>
        <td>{this.artist.popularity}</td>
        <td className="search-buttons">
          <button
            id={this.artist.id}
            onClick={this.clickForSpotifyPage.bind(this)}>Spotify</button>
          <button
            onClick={this.clickForSimilarArtists.bind(this)}
            className={this.artist.name}
            id={this.artist.id}>Similar Artists</button>
        </td>
      </tr>
    );
  }
}

// <button
//   id={this.artist.id}
//   onClick={randomTrackClickHandler}>{buttonDisplay}</button>

export default Artist;
