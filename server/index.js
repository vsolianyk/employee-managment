const express        = require('express');
const bodyParser     = require('body-parser');
const cookieParser   = require('cookie-parser');
const mongoose       = require('mongoose');
const cors           = require('cors');
const path           = require("path");

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const cookieSecretKey = '12345!';
app.use(cookieParser(cookieSecretKey));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('dotenv').config();

// app.use(express.static(path.join(__dirname, '../client/build')));
// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;
db.once('open', () => {
  require('./routes')(app, db);

  const port = process.env.PORT;
  app.listen(port, () => {
      console.log('We are live on ' + port);
  });     
});
