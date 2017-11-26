var express = require('express'),
    parser = require('../services/parser'),
    dictionaryEnums = require('../enums/dictionary'),
    dictionary = process.env.PWD + '/data/dictionary/chinese-cedict_ts.u8.txt';
;


module.exports = express.Router()

// get dictionary
    .get('/', (req, res, next) => {
        parser.readFileUtf8(dictionary).then((rawData) => {
            parser.chineseEdictU8(rawData, dictionaryEnums.ALL).then((parsedData) => {
                res.set({'content-type': 'application/json; charset=utf-8'});
                res.json(parsedData)
            }, (err) => {
                console.log(err);
            });
        });
    })

// get traditional only
    .get('/traditional', (req, res, next) => {
        parser.readFileUtf8(dictionary).then((rawData) => {
            parser.chineseEdictU8(rawData, dictionaryEnums.TRADITIONAL).then((parseData) => {
                res.set({'content-type': 'application/json; charset=utf-8'});
                res.json(parseData);
            }, (err) => {
                console.log(err);
            });
        });
    })

    // get simplified only
    .get('/simplified', (req, res, next) => {
        parser.readFileUtf8(dictionary).then((rawData) => {
            parser.chineseEdictU8(rawData, dictionaryEnums.SIMPLIFIED).then((parseData) => {
                res.set({'content-type': 'application/json; charset=utf-8'});
                res.json(parseData);
            }, (err) => {
                console.log(err);
            });
        });
    })

    // get pinyin number only
    .get('/pinyin_number', (req, res, next) => {
        parser.readFileUtf8(dictionary).then((rawData) => {
            parser.chineseEdictU8(rawData, dictionaryEnums.PINYIN_NUMBER).then((parseData) => {
                res.set({'content-type': 'application/json; charset=utf-8'});
                res.json(parseData);
            }, (err) => {
                console.log(err);
            });
        });
    })

    // get pinyin tone only
    .get('/pinyin_tone', (req, res, next) => {
        parser.readFileUtf8(dictionary).then((rawData) => {
            parser.chineseEdictU8(rawData, dictionaryEnums.PINYIN_TONE).then((parseData) => {
                res.set({'content-type': 'application/json; charset=utf-8'});
                res.json(parseData);
            }, (err) => {
                console.log(err);
            });
        });
    })

    // get pinyin atone only
    .get('/pinyin_atone', (req, res, next) => {
        parser.readFileUtf8(dictionary).then((rawData) => {
            parser.chineseEdictU8(rawData, dictionaryEnums.PINYIN_ATONE).then((parseData) => {
                res.set({'content-type': 'application/json; charset=utf-8'});
                res.json(parseData);
            }, (err) => {
                console.log(err);
            });
        });
    })