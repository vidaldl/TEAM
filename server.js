// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { auth } = require('express-openid-connect');
const connectDb = require('./db/connect');

dotenv.config();
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: 'http://localhost:3000',
  clientID: 'kUTj0pThkL70hWi47hOX46PK4Z6oe6KX',
  issuerBaseURL: 'https://dev-3spjq07b2t223qop.us.auth0.com',
};

app.use(auth(config));
app.use('/', require('./routes'));

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
