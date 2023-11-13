var express = require('express');
var router = express.Router();
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
/*
var adapter = new FileSync('/opt/train-schedule/data/trains.json')
var db = low(adapter)

 GET trains listing. 
router.get('/', function(req, res, next) {
  res.send(db.get('trains').sortBy('name').value());
});*/

module.exports = router;
