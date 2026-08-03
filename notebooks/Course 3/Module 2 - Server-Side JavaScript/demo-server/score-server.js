// The scoreboard from "Server-Sent Events".
//
// Run it:   node score-server.js
// Visit:    http://localhost:3000  in two browser windows at once
//
// The score changes on the server every few seconds, and every connected
// browser is told the moment it does. Nothing polls, and no browser ever
// asks for an update.

const http = require('http');
const fs = require('fs');
const path = require('path');

// #region source
// The score, and the list of functions to call whenever it changes.
const score = { home: 0, away: 0 };
const listeners = [];

function startListening(callback) {
  listeners.push(callback);
}

function stopListening(callback) {
  const index = listeners.indexOf(callback);

  if (index !== -1) {
    listeners.splice(index, 1);
  }
}

function changeScore() {
  if (Math.random() < 0.5) {
    score.home = score.home + 1;
  } else {
    score.away = score.away + 1;
  }

  console.log('score is now ' + score.home + '-' + score.away
    + ', telling ' + listeners.length + ' client(s)');

  for (const callback of listeners) {
    callback(score);
  }
}

setInterval(changeScore, 4000);
// #endregion

const server = http.createServer((request, response) => {
  // #region endpoint
  if (request.url === '/score') {
    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Connection', 'keep-alive');

    const onScoreChange = (newScore) => {
      response.write('data: ' + JSON.stringify(newScore) + '\n\n');
    };

    onScoreChange(score);
    startListening(onScoreChange);

    request.on('close', () => {
      stopListening(onScoreChange);
      response.end();
    });

    return;
  }
  // #endregion

  const filePath = path.join(__dirname, 'score-page', 'index.html');

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404 Not Found');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(content);
    }
  });
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
