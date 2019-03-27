const express = require('express');
const knex = require('knex');
// knex takes an object as an argument, that's why you need to call
// the `development` object from knexfile export
const knexConfig = require('./knexfile').development;

const app = express();
const db = knex(knexConfig);

app.get('/', (req, res) => {
  res.status(200).json('GET Hello');
});


app.listen(1234, () => console.log('Express app listening on http://127.0.0.1:1234'));