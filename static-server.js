const express = require('express');
const path = require('path');

const app = express();

const port = 8080;
const root = path.join(__dirname, 'candidates');
const index = path.join(root, 'index.html')

app.use(express.static(root));

app.get('/*', function(request, response) {
  response.sendFile(path.resolve(index));
});

app.listen(port);

console.log('--------------------------');
console.log(`Serving files from ${root}`);
console.log(`Unknown requests are getting ${index}`);
console.log(`Listening on ${port}`);
console.log('--------------------------');
console.log('Press CTRL+C to stop.');
