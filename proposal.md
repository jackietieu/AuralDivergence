## Aural Divergence

### Background

Finding similar artists usually takes a few extra clicks or search queries when you're checking out one of their tracks.  This Chrome extension will make discovering similar artists much simpler. With the use of MusicGraph's API, users of this extension can easily track down similar.

### Functionality & MVP

With this extension, users will be able to:

- [ ] Receive a list of possible artists that matches the highlighted text
- [ ] View a list of Spotify links to similar artists of the selected artist in the first search query
- [ ] Navigate to a newly discovered artist's Spotify page in a new tab

### Wireframes

![wireframes](http://res.cloudinary.com/dnmknegr2/image/upload/v1474264862/ADWireframe_ri8aqu.png)

### Technologies & Technical Challenges

This extension will be constructed by using Javascript, HTML, CSS and MusicGraph's API. In addition to the `manifest.json` and `package.json` files, there will be additional scripts to handle API calls:

- `searchArtists.js`: will contain the logic for making API calls for artists that match the highlighted and inserting it into the context menu
- `similarArtists.js`: will contain the logic for making API calls for similar artists of whoever is selected and inserting it into the context menu

The primary technical challenges will be:

- Linking search queries of the highlighted text to the context menu
- Firing another API call for similar artists of whoever is highlighted
- Creating another sub menu that will link to the Spotify page of the similar artists

### Implementation Timeline

**Day 1**: Setup infrastructure of the extension

- [ ] Setup `package.json`
- [ ] Setup `manifest.json`
- [ ] Setup files for firing API call

**Day 2**: Integrate API calls with highlighted text

- [ ] Use `window.getSelection().toString()` to begin searching for matching artists
- [ ] Display list of matching artists to a sub-menu in the context menu using the `chrome.contextMenus` API

**Day 3**: Construct functionality for rendering list of similar artists when an artist has been selected from the first API call

- [ ] Render a list of Spotify links to similar artists

**Day 4**: Bonus: Give users the option of having the search query appear in a popup or within the context menu
