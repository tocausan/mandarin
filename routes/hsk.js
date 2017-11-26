var express = require('express'),
    parser = require('../services/parser');


module.exports = express.Router()

// get hsk list by level
    .get('/:number', (req, res, next) => {
        var dictionaryPath = process.env.PWD + '/data/hsk/hsk_' + req.params.number + '_cn-en.txt';
        parser.readFileUtf8(dictionaryPath).then((rawData) => {
            parser.chineseHsk(rawData).then((parsedData)=> {
                res.set({'content-type': 'application/json; charset=utf-8'});
                res.json(parsedData)
            }, (err) => {
                console.log(err);
            })
        });
    });
