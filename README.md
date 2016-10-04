## Aural Divergence

### Background

Sometimes you're browsing the web and you run across something familiar on your screen: was there an artist that went by this name? Perhaps you want to check out some of their latest work or some other artists with a similar vibe.

This Chrome extension will make discovering similar artists and sample tracks much simpler. With the use of Spotify's API, users of this extension can easily track down similar artists and sample tracks by highlighting a string and clicking on the popup icon to run a search query on the selected string.

This extension wouldn't be possible without Spotify's API. Here is a code snippet of how I retrieved random tracks from the selected artist:

```JavaScript
  $.ajax({
    url: `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`,
    method: 'get',
    success: res => {
      let data = res.tracks;

      data.forEach(trackObj => {
        tracks.push(trackObj);
      });

      let randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
      let audio = new Audio(randomTrack.preview_url);

      this.setState({
        randomTrackUrl: randomTrack.preview_url,
        randomTrackTitle: randomTrack.name,
        audioObject: audio,
        trackId: randomTrack.id,
        playing: true
      },
        () => {audio.play();}
      );
    }
  });
```

### Installation

1. Download this extension by visiting this link: [Chrome App Store](https://chrome.google.com/webstore/detail/auraldivergence/aogloaiblbpeggpcnbifdemlaedmbilg)

### Instructions

1. Highlight any string of text on your screen.

2. Click this extension's popup icon:

![first click](http://res.cloudinary.com/dnmknegr2/image/upload/c_crop/v1474845786/Screen_Shot_2016-09-25_at_4.17.47_PM_jkvuky.png)

3. Select what you'd like to do next. You can play random tracks from an artist, visit their Spotify page, search for similar artists, or visit the random track's Spotify page. Go ahead and explore some new music!

![second click](http://res.cloudinary.com/dnmknegr2/image/upload/v1474845871/Screen_Shot_2016-09-25_at_4.18.00_PM_ycmbwq.png)

### Technologies Used

1. ReactJS
2. HTML/CSS
3. Chrome Extension API
4. Spotify API

### Future Features to Implement:

1. Add images of the currently selected artist/track to the page in a non-obtrusive manner
2. Redesign layout
3. Add additional functionality to the extension by combining interesting elements offered by the endpoints of the Spotify API
