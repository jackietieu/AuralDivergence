import React from 'react';

class Artist extends React.Component{
  constructor(props){
    super(props);

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

  clickHandler(e){
    e.preventDefault();
    let url = `https://open.spotify.com/artist/${e.currentTarget.id}`;
    chrome.tabs.create({ url: url });
  }

  render(){
    return(
      <tr className="artist-list-item">
        <td className="artist-name">{this.artist.name}</td>
        <td>{this.followers}</td>
        <td>{this.artist.popularity}</td>
        <td className="search-buttons">
          <button
            id={this.artist.id}
            onClick={this.clickHandler.bind(this)}>Spotify</button>
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
