/** file parser tool
 *
 * - parse u8 file to json
 * - parse txt file to json
 * **/

let _ = require('lodash'),
    databaseConfig = require('../config/database'),
    databaseServices = require('../services/database'),
    fileServices = require('../services/file'),
    Word = require('../classes/word'),
    dictionaryFilePath = './data/original/chinese-cedict_ts.u8',
    hskFilePath = './data/original/hsk_*_cn-en.txt',
    jsonFolder = './data/json/';


module.exports = {

    /** parse chinese dictionary u8
     * data sample: 龐加萊 庞加莱 [Pang2 jia1 lai2] /Henri Poincaré (1854-1912), French mathematician, physician and philosopher/
     * split text > lines > characters
     * **/
    parseDictionaryFile: function () {
        // parse chinese dictionary u8 file
        return fileServices.readFile(dictionaryFilePath).then((data) => {
            var lines = data.split('\n'),
                dictionary = [];

            // map lines > object
            lines.map((line) => {
                if (line.length > 0 && line[0] !== '#') {
                    // splitted by space, bracket and slash
                    let spaceSplit = line.split(' '),
                        bracketSplit = line.match(new RegExp("\\[.*?\\]", "g")),
                        slashSplit = line.match(new RegExp("\\/.*?\\/", "g"));
                    // push word in dictionary¬
                    dictionary.push(new Word({
                        traditional: spaceSplit ? spaceSplit[0] : null,
                        simplified: spaceSplit && spaceSplit.length >= 2 ? spaceSplit[1] : null,
                        pinyinNumber: bracketSplit ? bracketSplit[0].slice(1, bracketSplit[0].length - 1) : null,
                        translation: slashSplit ? slashSplit[0].slice(1, slashSplit[0].length - 1) : null
                    }));
                }
            });

            // drop & insert collection in database
            databaseServices.dropCollection(databaseConfig.collections.dictionary).then(dropResult => {
                console.log(dropResult);
                databaseServices.insertMany(databaseConfig.collections.dictionary, dictionary).then(insertResult => {
                    //console.log(insertResult);
                }, err => {
                    console.log(err);
                });
            }, err => {
                console.log(err);
            });

            // write json file
            let fileName = _.last(dictionaryFilePath.split('/'));
            return fileServices.writeJsonFile(jsonFolder, fileName, dictionary);
        });
    },


    /** parse hsk tabed csv file
     * data sample: 打电话    打電話    da3 dian4hua4    dǎ diànhuà    make a phone call
     * split text > lines > characters
     * **/
    parseHskFile: function () {
        // get 6 hsk files
        for (let i = 0; i < 6; i++) {

            // get file path
            let filePath = hskFilePath.replace('*', i + 1);

            //parse hsk txt file
            fileServices.readFile(filePath).then((data) => {
                // split lines by tab
                let lines = data.split('\n'),
                    level = null,
                    dictionary = [];

                // map lines > object
                lines.map((line) => {
                    // get hsk level from comment
                    if (line[0] === '#' && line.indexOf('hsk')) {
                        level = line.match(/\d+/g)[0][0];
                    }

                    if (line.length > 0 && line[0] !== '#') {
                        // line splitted by tab
                        let splittedLine = line.split('\t');
                        // push word in dictionary
                        dictionary.push(new Word({
                            simplified: splittedLine ? splittedLine[0] : null,
                            traditional: splittedLine && splittedLine.length >= 2 ? splittedLine[1] : null,
                            pinyinNumber: splittedLine && splittedLine.length >= 3 ? splittedLine[2] : null,
                            translation: splittedLine && splittedLine.length >= 5 ? splittedLine[4] : null
                        }));
                    }
                });

                // drop & insert collection in database
                let collection = databaseConfig.collections.hsk.replace('*', level);
                databaseServices.dropCollection(collection).then(dropResult => {
                    console.log(dropResult);
                    databaseServices.insertMany(collection, dictionary).then(insertResult => {
                        //console.log(insertResult);
                    }, err => {
                        console.log(err);
                    });
                }, err => {
                    console.log(err);
                });

                // write json file
                let fileName = _.last(filePath.split('/'));
                fileServices.writeJsonFile(jsonFolder, fileName, dictionary);
            });
        }
    }
};

