import React from 'react';
import Artist from './artist';
import Loading from './loading';
import $ from "jquery";

class Search extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchQueryArtists: [],
      query: "initial",
      searchingFor: this.props.selection,
      loadingState: true
    };

    this.clickForSimilarArtists = this.clickForSimilarArtists.bind(this);
  }

  componentDidMount(){
    this.getMatchingArtists(this.state.searchingFor, artists => {
      this.setState({
        searchQueryArtists: artists,
        loadingState: false,
        searchingFor: this.state.searchingFor
      });
    });
  }

  clickForSimilarArtists(e){
    e.preventDefault();
    this.setState({
      searchingFor: e.currentTarget.className,
      loadingState: true
    });
    let id = e.currentTarget.id;
    let similarArtists = [];

    $.ajax({
      url: `https://api.spotify.com/v1/artists/${id}/related-artists`,
      method: 'get',
      success: res => {
        let data = res.artists; //array
        data.forEach(artistObj => {
          similarArtists.push(artistObj);
        });

        this.setState({
          searchQueryArtists: similarArtists,
          query: "similar",
          loadingState: false
        });
      }
    });
  }

  getMatchingArtists(selection, callback){
    let validArtists = [];

    $.ajax({
      url: `https://api.spotify.com/v1/search?q=${selection}&type=artist`,
      method: 'get',
      success: res => {
        let data = res.artists.items; //array
        data.forEach(artistObj => {
          validArtists.push(artistObj);
        });

        callback(validArtists);
      }
    });
  }

  render(){
    let header;
    let artists;

    if (this.state.loadingState === true && this.state.query === "initial") {
      header = <h3>Searching for artists that match {this.state.searchingFor}:</h3>;
    } else if (this.state.loadingState === false && this.state.query === "initial") {
      header = <h3>Artists that match {this.state.searchingFor}:</h3>;
    } else if (this.state.loadingState === true && this.state.query === "similar") {
      header = <h3>Searching for artists similar to {this.state.searchingFor}:</h3>;
    } else {
      header = <h3>Displaying artists similar to {this.state.searchingFor}:</h3>;
    }

    if (this.state.searchQueryArtists.length > 0) {
      artists =
        this.state.searchQueryArtists
          .sort((artist1, artist2) => (artist2.followers.total - artist1.followers.total))
          .map(artist =>
          <Artist
            artist={artist}
            clickForSimilarArtists={this.clickForSimilarArtists}
            key={artist.id} />
      );
    }

    return(
      <section className="search-results">
        {header}
        <br />
        <Loading loadingState={this.state.loadingState} artists={artists} />
      </section>
    );
  }
}

export default Search;
