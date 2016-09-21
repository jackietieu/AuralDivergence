import React from 'react';
import Artist from './artist';
import Loading from './loading';

class MainComponent extends React.Component{
  constructor(props){
    super(props);
    this.selection = this.props.selection;
    this.state = {
      searchQueryArtists: [],
      query: "initial",
      loadingState: true
    };
  }

  componentDidMount(){
    this.getArtists(this.selection, artists => {
      this.setState({ searchQueryArtists: artists, loadingState: false });
    });
  }

  clickForSimilarArtists(e){
    e.preventDefault();
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

          this.setState({ searchQueryArtists: similarArtists, query: "similar", loadingState: false });
        }
      }
    };
  }

  getArtists(selection, callback){
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
      header = <span>Searching for artists that match {this.selection}:</span>;
    } else if (this.state.loadingState === false && this.state.query === "initial") {
      header = <span>Artists that match {this.selection}:</span>;
    } else {
      header = <span>Spotify links for artists similar to {this.selection}:</span>;
    }

    if (this.state.searchQueryArtists.length > 0) {
      if (this.state.query === "initial") {
        artists = this.state.searchQueryArtists.map(artist =>
          <Artist
            artist={artist}
            id={artist.id}
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
