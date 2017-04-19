import React from 'react';
import Search from './search';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      search: null
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({search: <Search key={this.state.value} selection={this.state.value} />});
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    return(
  			<div id="wrapper">
          <header id="header" className="alt style2">
            <a href="index.html" className="logo"><strong>AuralDivergence</strong> <span>by Jackie Tieu</span></a>
          </header>

          <section id="banner" className="style2">
            <div className="inner">
              <span className="image">
                <img src="images/pic07.jpg" alt="" />
              </span>
              <header className="major">
                <h1>AuralDivergence</h1>
              </header>
              <div className="content">
                <p>
                  A chrome extension for those who can't get enough music in their lives.<br />
                  Made possible with the use of the Spotify API and ReactJS.
                </p>
              </div>
              <a className="actions button" href="https://chrome.google.com/webstore/detail/auraldivergence/aogloaiblbpeggpcnbifdemlaedmbilg">Download</a>
            </div>
          </section>

          <div id="main">

              <section id="one">
                <div className="inner">
                  <header className="major">
                    <h2>How it works</h2>
                  </header>
                  <ol>
                    <li>Once the extension is downloaded, you can start your search by highlighting text on your screen.</li>
                    <li>Click the extension icon and any artists/bands that match the highlighted text will appear.</li>
                    <li>You can sample random tracks from the artist/band, check out their spotify page, or look for recommendations.</li>
                    <li>Keep clicking through the recommendations as much as you'd like.</li>
                  </ol>
                </div>
              </section>

            <section id='three'>
              <div className="content">
                <div className="inner">
                  <header className="major">
                    <h2>Demo</h2>
                  </header>
                  <p>With the extension, you can search by highlighting text on the screen.<br />
                     To simplify the process, you can just type your search query here.</p>
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="6u 12u$(xsmall)">
                      <input type="text" name="demo-name" id="demo-name" onChange={this.handleChange.bind(this)} value={this.state.value} placeholder="Search for artists/bands..."></input>
                    </div>
                    <input type="submit" value="Submit" className="actions button" />
                  </form>
                </div>
                {this.state.search}
              </div>
            </section>
          </div>

          <footer id="footer">
            <div className="inner">
              <ul className="icons">
                <li><a href="https://github.com/jackietieu" className="icon alt fa-github"><span className="label">GitHub</span></a></li>
                <li><a href="https://www.linkedin.com/in/jackie-tieu-45aa8610a/" className="icon alt fa-linkedin"><span className="label">LinkedIn</span></a></li>
              </ul>
              <ul className="copyright">
                <li>&copy; Jackie Tieu 2016</li><li>Design: <a href="https://html5up.net">HTML5 UP</a></li>
              </ul>
            </div>
          </footer>
  			</div>
    )
  }
}

export default Main;
