import React from 'react';

class Artist extends React.Component{
  constructor(props){
    super(props);
    this.artist = this.props.artist;
  }

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
