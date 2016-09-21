import React from 'react';
import Artist from './artist';
import Loading from './loading';

class MainComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchQueryArtists: [],
      query: "initial",
      searchingFor: this.props.selection,
      loadingState: true
    };
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
    this.setState({ searchingFor: e.currentTarget.className, loadingState: true });
    let id = e.currentTarget.id;
    let similarArtists = [];
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://api.musicgraph.com/api/v2/artist/${id}/similar?api_key=4deb62f4b8e4d6307009ae775169ecaa`);
    xmlhttp.send();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          let response = JSON.parse(xmlhttp.responseText);
          response.data.forEach(artistObj => {
            if (Object.keys(artistObj).includes("artist_ref_id")){
              similarArtists.push(artistObj);
            }
          });

          this.setState({
            searchQueryArtists: similarArtists,
            query: "similar",
            loadingState: false
          });
        }
      }
    };
  }

  getMatchingArtists(selection, callback){
    let validArtists = [];
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `http://api.musicgraph.com/api/v2/artist/suggest?api_key=4deb62f4b8e4d6307009ae775169ecaa&prefix=${selection[0]}`);
    xmlhttp.send();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          let response = JSON.parse(xmlhttp.responseText);
          response.data.forEach(artistObj => {
            if (Object.keys(artistObj).includes("artist_ref_id")){
              validArtists.push(artistObj);
            }
          });

          callback(validArtists);
        }
      }
    };
  }

  render(){
    let header;
    let artists;

    if (this.state.loadingState === true && this.state.query === "initial") {
      header = <span>Searching for artists that match {this.state.searchingFor}:</span>;
    } else if (this.state.loadingState === false && this.state.query === "initial") {
      header = <span>Artists that match {this.state.searchingFor}:</span>;
    } else if (this.state.loadingState === true && this.state.query === "similar") {
      header = <span>Searching for artists similar to {this.state.searchingFor}:</span>;
    } else {
      header = <span>Spotify links for artists similar to {this.state.searchingFor}:</span>;
    }

    if (this.state.searchQueryArtists.length > 0) {
      if (this.state.query === "initial") {
        artists = this.state.searchQueryArtists.map(artist =>
          <Artist
            artist={artist}
            clickHandler={this.clickForSimilarArtists.bind(this)}
            key={artist.id} />
        );
      } else if (this.state.query === "similar") {
        artists = this.state.searchQueryArtists.map(artist =>
          <Artist
            artist={artist}
            id={artist.id}
            key={artist.id} />
        );
      }
    }

    return(
      <section className="search">
        {header}
        <br />
        <Loading loadingState={this.state.loadingState} artists={artists} />
      </section>
    );
  }
}

export default MainComponent;
