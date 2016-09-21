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
          id={this.artist.id}>{this.artist.name}</span>
      </li>
    );
  }
}

export default Artist;
