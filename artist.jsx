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

//convert to table

  render(){
    return(
      <li className="artist-list-item">
        <div className="artist-name">
          <span>{this.artist.name}</span>
        </div>

        <div className="search-buttons">
          <button>Spotify</button>
          <button
            onClick={this.props.clickForSimilarArtists}
            className={this.artist.name}
            id={this.artist.id}>Similar Artists</button>
        </div>
      </li>
    );
  }
}

export default Artist;
