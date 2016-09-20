import React from 'react';
import ReactDOM from 'react-dom';
import MainComponent from './main_component';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  ReactDOM.render(<MainComponent />, root);
});
