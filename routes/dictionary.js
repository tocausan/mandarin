/** dictionary routes **/

var dataAccess = require('../data-access'),
    services = require('../services'),
    Word = require('../models/Word'),
    enums = require('../enums'),
    config = require('../config'),
    errorRoutes = require('./errors');


let errorHandler = function(err, req, res, next){
    res.locals.message = err;
    errorRoutes.error500(req, res, next);
};

module.exports = {
    /** get all dictionary **/
    getAll: function (req, res, next) {
        dataAccess.dictionary.getDictionary(enums.dictionaryItem.ALL).then(data => {
            res.json(data);
        }, errorHandler);
    },

    /** get traditional only **/
    getTraditional: function (req, res) {
        dataAccess.dictionary.getDictionary(enums.dictionaryItem.TRADITIONAL).then(data => {
            res.json(data);
        }, errorHandler);
    },

    /** get simplified only **/
    getSimplified: function (req, res) {
        dataAccess.dictionary.getDictionary(enums.dictionaryItem.SIMPLIFIED).then(data => {
            res.json(data);
        }, errorHandler);
    },

    /** get pinyin number only **/
    getPinyinNumber: function (req, res) {
        dataAccess.dictionary.getDictionary(enums.dictionaryItem.PINYIN_NUMBER).then(data => {
            res.json(data);
        }, errorHandler);
    },

    /** get pinyin tone only **/
    getPinyinTone: function (req, res) {
        dataAccess.dictionary.getDictionary(enums.dictionaryItem.PINYIN_TONE).then(data => {
            res.json(data);
        }, errorHandler);
    },

    /** get pinyin atone only **/
    getPinyinAtone: function (req, res) {
        dataAccess.dictionary.getDictionary(enums.dictionaryItem.PINYIN_ATONE).then(data => {
            res.json(data);
        }, errorHandler);
    },

    /** get translation only **/
    getTranslation: function (req, res) {
        dataAccess.dictionary.getDictionary(enums.dictionaryItem.TRANSLATION).then(data => {
            res.json(data);
        }, errorHandler);
    }
};
