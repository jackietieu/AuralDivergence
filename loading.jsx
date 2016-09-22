import React from 'react';
import Artist from './artist';

class Loading extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loadingState: this.props.loadingState
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({ loadingState: nextProps.loadingState });
  }

  render(){
    let artists = this.props.artists;
    if (this.props.loadingState === true) {
      return(
        <div className="sk-circle">
          <div className="sk-circle1 sk-child"></div>
          <div className="sk-circle2 sk-child"></div>
          <div className="sk-circle3 sk-child"></div>
          <div className="sk-circle4 sk-child"></div>
          <div className="sk-circle5 sk-child"></div>
          <div className="sk-circle6 sk-child"></div>
          <div className="sk-circle7 sk-child"></div>
          <div className="sk-circle8 sk-child"></div>
          <div className="sk-circle9 sk-child"></div>
          <div className="sk-circle10 sk-child"></div>
          <div className="sk-circle11 sk-child"></div>
          <div className="sk-circle12 sk-child"></div>
        </div>
      );
    } else {
      return(
        <table className="results">
          <thead>
            <tr>
              <th>Artist</th>
              <th>Random Track</th>
              <th>Followers</th>
              <th>Popularity</th>
              <th>Links</th>
            </tr>
          </thead>
          <tbody>{artists}</tbody>
        </table>
      );
    }

  }
}

// <div className="results">
//   {artists}
// </div>
export default Loading;
