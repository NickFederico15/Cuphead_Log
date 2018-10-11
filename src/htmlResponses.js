const fs = require('fs');

// html, css, js references
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const materializeCSS = fs.readFileSync(`${__dirname}/../client/css/materialize.min.css`);
const materializeJS = fs.readFileSync(`${__dirname}/../client/js/materialize.min.js`);

// gets the index page
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// gets the css page
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// gets materialize css
const getMaterializeCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(materializeCSS);
  response.end();
};

// gets materialize js
const getMaterializeJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(materializeJS);
  response.end();
};

// set out public exports
module.exports = {
  getIndex,
  getCSS,
  getMaterializeCSS,
  getMaterializeJS,
};
