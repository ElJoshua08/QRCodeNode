const express = require('express');
const path = require('path');
const qrcode = require('qrcode');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Home route
app.get('/', (req, res) => {
  res.render('home');
});

app.post('/qr', (req, res) => {
  let data = req.body.content;

  qrcode.toDataURL(
    data,
    {
      width: 1024,
      color: {
        dark: '#fff',
        light: '#000',
      },
    },
    (err, url) => {
      if (err) {
        res.json({
          message: err,
          status: 'ERROR',
        });
      }
      res.json({
        content: url,
        status: 'OK',
      });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
