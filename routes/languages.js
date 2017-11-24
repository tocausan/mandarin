var express = require('express');
var router = express.Router();
var path = require('path');
var appDir = path.dirname(require.main.filename);
var jsonParser = require('../services/jsonParser');

router.get('/', function(req, res, next) {
  res.json({});
});

router.get('/zn-CN', function(req, res, next) {
  jsonParser.u8ToJson(process.env.PWD + '/data/languages/cedict_ts.u8.txt').then(function(data) {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.json(data);
  });
});

module.exports = router;
