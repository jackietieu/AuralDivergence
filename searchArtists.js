//MusicGraph API Key 4deb62f4b8e4d6307009ae775169ecaa
//URL http://api.musicgraph.com/

function getArtists(queryString, tab){
  console.log(`retrieving artists matching ${queryString}`);
  //fire GET request with prefix=queryString
  //response is json object
  //response.data is an array of objects
  let validArtists = [];
  response.data.forEach(artistObj => {
    if (Object.keys(artistObj).includes("artist_ref_id")){
      validArtists.push(artistObj);
    }
  });
}

chrome.contextMenus.create({
  title: "Search for Artists: %s",
  contexts: ["selection"],
  onclick: getArtists
});

//click on an artists in the context menu
function onArtistClick(){
  //chrome.contextMenus.removeAll(callback)
    //contextMenu will be cleared of original query
    //the cb will fire an API call to retrieve similar artists
    //and their spotify IDs
}

function onSimilarArtistClick(){
  //link them to new page
}

chrome.tabs.create({

});
