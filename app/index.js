const express = require('express');
const path = require('path');
const qrcode = require('qrcode');

const app = express();
const port = process.env.PORT || 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// Home route
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/qr/:data', (req, res) => {
  let data = req.params.data;
  console.log(data);

  qrcode.toDataURL(data, (err, url) => {
    if (err) {
      res.join({
        message: 'Error occured',
        status: 'ERROR',
      })
    };
    res.json({
      message: url,
      status: 'OK',
    });
  });

});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
