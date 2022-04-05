const express = require('express');
const morgan = require('morgan');
// database
const connect = require('./database/connect');
// routes
const admin = require('./routes/admin');
const user = require('./routes/user');
const auth = require('./routes/auth');

const { MONGODB, NODE_ENV, PORT } = require('./config.js');

const app = express();

app.use(express.json());

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/admin', admin);
app.use('/api/user', user);
app.use('/auth/user', auth);

app.listen(PORT, async () => {
  console.log(`Server running on ${NODE_ENV} mode on port ${PORT}`);
  await connect(MONGODB);
});
