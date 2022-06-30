const express = require('express');
const app = express()
const PORT = 3000;

console.log('im inside server.js')
app.use('/', express.static('../public/index.html'))

app.listen(PORT, () => {
    console.log("server is running!");
  });