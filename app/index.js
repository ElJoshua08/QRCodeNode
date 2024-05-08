const express = require('express');
const ejs = require('ejs');
const app = express();
const port = process.env.PORT || 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => {
  res.send('So now this should work');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
