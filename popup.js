//MusicGraph API Key 4deb62f4b8e4d6307009ae775169ecaa
//URL http://api.musicgraph.com/

//for the first step, just retrieve artists that match string query

// function getArtists(queryString, tab, callback){
//   console.log(`retrieving artists matching ${queryString}`);
//
//   $.ajax({
//     url: `http://api.musicgraph.com/api/v2/artist/suggest?api_key=4deb62f4b8e4d6307009ae775169ecaa&prefix=${queryString}`,
//     method: "GET",
//     success: (data) => {
//       console.log(data);
//       //remove old artist search query, replace with similar artists
//       // chrome.contextMenus.removeAll({
//       //
//       // });
//       //what to do when data is received?
//       //retain artist id
//       //render to page with links that will fire a second API request for similar artists
//     }
//   });

  //create tab as success callback
  // chrome.tabs.create({ 'url': 'chrome://extensions/?index=' + chrome.runtime.id });

  //fire GET request with prefix=queryString
  //response is json object
  //response.data is an array of objects
  // let validArtists = [];
  // let xmlhttp = new XMLHttpRequest();
  // xmlhttp.onreadystatechange = () => {
  //   if (xmlhttp.readyStaet === 4) {
  //     if (xmlhttp.status === 200) {
  //       let response = JSON.parse(xmlhttp.responseText);
  //       response.data.forEach(artistObj => {
  //         if (Object.keys(artistObj).includes("artist_ref_id")){
  //           validArtists.push(artistObj);
  //         }
  //       });
  //
  //       callback(validArtists);
  //     }
  //   } else {
  //
  //   }
  // };
//
// }

// chrome.contextMenus.create({
//   title: "Search for Artists: %s",
//   contexts: ["selection"],
//   onclick: getArtists
// });

//click on an artists in the context menu
export function onArtistClick(id, callback){
  //chrome.contextMenus.removeAll(callback)
    //contextMenu will be cleared of original query
    //the cb will fire an API call to retrieve similar artists
    //and their spotify IDs

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

        callback(similarArtists);
      }
    }
  };
}

function onSimilarArtistClick(){
  //link them to new page
}

// function getCurrentTabUrl(callback) {
//   // Query filter to be passed to chrome.tabs.query - see
//   // https://developer.chrome.com/extensions/tabs#method-query
//   var queryInfo = {
//     active: true,
//     currentWindow: true
//   };

  // chrome.tabs.query(queryInfo, function(tabs) {
  //   // chrome.tabs.query invokes the callback with a list of tabs that match the
  //   // query. When the popup is opened, there is certainly a window and at least
  //   // one tab, so we can safely assume that |tabs| is a non-empty array.
  //   // A window can only have one active tab at a time, so the array consists of
  //   // exactly one tab.
  //   var tab = tabs[0];
  //
  //   // A tab is a plain object that provides information about the tab.
  //   // See https://developer.chrome.com/extensions/tabs#type-Tab
  //   var url = tab.url;
  //
  //   // tab.url is only available if the "activeTab" permission is declared.
  //   // If you want to see the URL of other tabs (e.g. after removing active:true
  //   // from |queryInfo|), then the "tabs" permission is required to see their
  //   // "url" properties.
  //   console.assert(typeof url == 'string', 'tab.url should be a string');
  //
  //   callback(url);
  // });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
// }
//
// /**
//  * @param {string} searchTerm - Search term for Google Image search.
//  * @param {function(string,number,number)} callback - Called when an image has
//  *   been found. The callback gets the URL, width and height of the image.
//  * @param {function(string)} errorCallback - Called when the image is not found.
//  *   The callback gets a string that describes the failure reason.
//  */
// function getImageUrl(searchTerm, callback, errorCallback) {
//   // Google image search - 100 searches per day.
//   // https://developers.google.com/image-search/
//   var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
//     '?v=1.0&q=' + encodeURIComponent(searchTerm);
//   var x = new XMLHttpRequest();
//   x.open('GET', searchUrl);
//   // The Google image search API responds with JSON, so let Chrome parse it.
//   x.responseType = 'json';
//   x.onload = function() {
//     // Parse and process the response from Google Image Search.
//     var response = x.response;
//     if (!response || !response.responseData || !response.responseData.results ||
//         response.responseData.results.length === 0) {
//       errorCallback('No response from Google Image search!');
//       return;
//     }
//     var firstResult = response.responseData.results[0];
//     // Take the thumbnail instead of the full image to get an approximately
//     // consistent image size.
//     var imageUrl = firstResult.tbUrl;
//     var width = parseInt(firstResult.tbWidth);
//     var height = parseInt(firstResult.tbHeight);
//     console.assert(
//         typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
//         'Unexpected response from the Google Image Search API!');
//     callback(imageUrl, width, height);
//   };
//   x.onerror = function() {
//     errorCallback('Network error.');
//   };
//   x.send();
// }
//
// function renderStatus(statusText) {
//   document.getElementById('status').textContent = statusText;
// }
//
// function listArtistsQuery(artists, callback){
//
// }
//
// document.addEventListener('DOMContentLoaded', function() {
//   chrome.tabs.executeScript({
//     code: "window.getSelection().toString();"
//   }, function(selection) {
//     let validArtists = [];
//     let xmlhttp = new XMLHttpRequest();
//     xmlhttp.open("GET", `http://api.musicgraph.com/api/v2/artist/suggest?api_key=4deb62f4b8e4d6307009ae775169ecaa&prefix=${selection[0]}`);
//     xmlhttp.send();
//     xmlhttp.onreadystatechange = () => {
//       if (xmlhttp.readyState === 4) {
//         if (xmlhttp.status === 200) {
//           let response = JSON.parse(xmlhttp.responseText);
//           response.data.forEach(artistObj => {
//             if (Object.keys(artistObj).includes("artist_ref_id")){
//               validArtists.push(artistObj);
//             }
//           });
//
//           console.log('success', validArtists);
//           //`https://open.spotify.com/artist/${artistObj.spotify_id}`
//           // callback(validArtists);
//         }
//       } else {
//         console.log('fail', JSON.parse(xmlhttp.responseText));
//       }
//     };
//       document.getElementById("root").innerHTML = selection[0];
//   });
// });

export function getArtists(selection, callback){
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
