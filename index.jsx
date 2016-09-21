import React from 'react';
import ReactDOM from 'react-dom';
import MainComponent from './main_component';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  chrome.tabs.executeScript({
    code: "window.getSelection().toString();"
  }, function(selection) {
    ReactDOM.render(<MainComponent selection={selection} />, root);
  });
});
