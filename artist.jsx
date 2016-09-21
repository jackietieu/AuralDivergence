import React from 'react';

class Artist extends React.Component{
  constructor(props){
    super(props);
    this.artist = this.props.artist;
  }

  render(){
    return(
      <li className="artist-list-item">
        <span
          onClick={this.props.clickHandler}
          className={this.artist.name}
          id={this.artist.id}>{this.artist.name}</span>
      </li>
    );
  }
}

export default Artist;
