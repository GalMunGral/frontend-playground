const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { url, dbName } = require('./config');

const app = express();
app.use(express.static(__dirname))
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
  next();
})

app.get('/data.json', async (req, res) => {
  let db;
  try {
    client = await MongoClient.connect(url + '/' + dbName);
    assert.notEqual(client, null);
    db = await client.db(dbName);
    assert.notEqual(db, null);
    records = await db.collection('tabsession').find().toArray();
    res.send(JSON.stringify(records));
  } catch (err) {
    console.log(err)
  }
});

app.get('*', (req, res) => {
  return res.sendFile(req.path);
})

app.listen(8080, () => {
  console.log('Listening on 8080')
});
