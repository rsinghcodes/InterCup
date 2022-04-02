const express = require('express');
const morgan = require('morgan');
// database
const connect = require('./database/connect');
// routes
const admin = require('./routes/admin');
const mentee = require('./routes/mentee');

const { MONGODB, NODE_ENV, PORT } = require('./config.js');

const app = express();

app.use(express.json());

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/admin', admin);
app.use('/api/mentee', mentee);

app.listen(PORT, async () => {
  console.log(`Server running on ${NODE_ENV} mode on port ${PORT}`);
  await connect(MONGODB);
});
