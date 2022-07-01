const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

// Serve static files
app.use('/', express.static(path.resolve(__dirname, '../build')));

// Serve index
app.get('/*', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../build/index.html')));

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });