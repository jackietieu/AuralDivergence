import React from 'react';
import * as POPUP from './popup';
import Artist from './artist';

class MainComponent extends React.Component{
  constructor(props){
    super(props);
    this.selection = this.props.selection;
    this.state = {
      searchQueryArtists: [],
      query: "initial"
    };

  }

  componentDidMount(){
    POPUP.getArtists(this.selection, artists => {
      this.setState({ searchQueryArtists: artists });
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

          this.setState({ searchQueryArtists: similarArtists, query: "similar" });
        }
      }
    };
  }



  render(){
    let header;
    let artists;

    if (this.state.searchQueryArtists.length > 0) {
      if (this.state.query === "initial") {
        header = <span>Searching for artists that match {this.selection}:</span>;
        artists = this.state.searchQueryArtists.map(artist =>
          <Artist
            artist={artist}
            id={artist.id}
            clickHandler={this.clickForSimilarArtists.bind(this)}
            key={artist.id} />
        );
      } else if (this.state.query === "similar") {
        header = <span>Spotify links for artists similar to {this.selection}:</span>;
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
        <ul className="search-results">
          {artists}
        </ul>
      </section>
    );
  }
}

export default MainComponent;
