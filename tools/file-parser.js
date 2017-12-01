/** file parser tool
 *
 * - list files
 * - parse u8 file to json
 * - parse txt file to json
 * **/

let fs = require('fs'),
    mongoDb = require('mongodb'),
    databasePath = 'mongodb://localhost:27017/chinese-api',
    dictionaryCollection = 'dictionary',
    hskCollection = 'hsk',
    dictionaryFilePath = './data/chinese-cedict_ts.u8',
    hskFilePath = './data/hsk_*_cn-en.txt'


module.exports = {

    /** list files **/
    listFiles: function (path) {
        // show files with path
        fs.readdirSync(path || './').map((item) => {
            console.log(path + '/' + item);
        });
    },


    /** read file **/
    readFile: function (filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    },


    /** write json file **/
    writeJsonFile: function (filePath, givenData) {
        return new Promise((resolve, reject) => {
            // check if data is json
            if (JSON.stringify(givenData)) {
                // beautify code with stringify parameters
                fs.writeFileSync(filePath + '.json', JSON.stringify(givenData, null, 4), (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            } else {
                reject('nope');
            }
        });
    },

    /** check database connection **/
    checkDatabaseConnection: function () {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(databasePath, (err, db) => {
                //error
                if (err) reject('database not available: \n' + err);

                // success
                resolve('database available');

                // close
                db.close();
            });
        });
    },

    /** drop database collection **/
    dropDatabaseCollection: function (collection) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(databasePath, (err, db) => {
                // error
                if (err) reject('database not available: \n' + err);

                // check if collection empty
                this.findDatabaseCollection(collection).then((data) => {
                    // drop if data
                    if (data.length > 0) {
                        // drop collection
                        db.collection(collection).drop((err, result) => {
                            // error
                            if (err) reject('collection drop failed: \n' + err);

                            // success
                            resolve('collection dropped: ' + result);
                        });
                    } else {
                        // success
                        resolve('collection empty not dropped');
                    }
                });
                // close
                db.close();
            });
        })
    },

    /** insert data in database **/
    insertDatabaseCollection: function (collection, data) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(databasePath, (err, db) => {
                // error
                if (err) reject('database not available: \n' + err);

                // insert data in collection
                db.collection(collection).insertMany(data, (err, result) => {
                    // error
                    if (err) reject('insert collection failed: \n' + err);

                    // success
                    resolve('inserted ' + data.length + ' documents: ' + result);

                    // close
                    db.close();
                });
            })
        })
    },

    /** get database collection **/
    findDatabaseCollection: function (collection) {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(databasePath, (err, db) => {
                // error
                if (err) reject('database not available: \n' + err);

                // find all documents
                db.collection(collection).find().toArray((err, result) => {
                    // error
                    if (err) reject('collection not available: \n' + err);

                    // success
                    resolve(result);

                    // close
                    db.close();
                });
            });
        });
    },

    /** parse chinese dictionary u8
     * data sample: 龐加萊 庞加莱 [Pang2 jia1 lai2] /Henri Poincaré (1854-1912), French mathematician, physician and philosopher/
     * split text > lines > characters
     * **/
    parseDictionaryFile: function () {
        // parse chinese dictionary u8 file
        return this.readFile(dictionaryFilePath).then((data) => {
            var lines = data.split('\n'),
                parsedData = [];

            // map lines > object
            lines.map((line) => {
                if (line.length > 0 && line[0] !== '#') {
                    // splitted by space, bracket and slash
                    let spaced = line.split(' '),
                        betweenBracket = line.match(new RegExp("\\[.*?\\]", "g")),
                        betweenSlashes = line.match(new RegExp("\\/.*?\\/", "g")),
                        parsedLine = {
                            traditional: spaced ? spaced[0] : null,
                            simplified: spaced && spaced.length >= 2 ? spaced[1] : null,
                            pinyinNumber: betweenBracket ? betweenBracket[0].slice(1, betweenBracket[0].length - 1) : null,
                            pinyinTone: '',
                            pinyinAtone: '',
                            translation: betweenSlashes ? betweenSlashes[0].slice(1, betweenSlashes[0].length - 1) : null
                        };
                    parsedLine.pinyinTone = this.pinyinNumberToTone(parsedLine.pinyinNumber);
                    parsedLine.pinyinAtone = parsedLine.pinyinTone.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

                    parsedData.push(parsedLine);
                }
            });

            // drop database collection
            this.dropDatabaseCollection(dictionaryCollection).then((dropResult) => {
                console.log(dropResult);

                // insert in database if connected
                this.insertDatabaseCollection(dictionaryCollection, parsedData).then((insertResult) => {
                    console.log(insertResult);
                }, (err) => {
                    console.log(err);
                });
            }, (err) => {
                console.log(err);
            });

            // write json file
            return this.writeJsonFile(dictionaryFilePath, parsedData);
        });
    },


    /** parse hsk tabed csv file
     * data sample: 打电话    打電話    da3 dian4hua4    dǎ diànhuà    make a phone call
     * split text > lines > characters
     * **/
    parseHskFile: function () {
        // get 6 hsk files
        for (let i = 0; i < 7; i++) {

            // get file path
            let filePath = hskFilePath.replace('*', i);

            //parse hsk txt file
            this.readFile(filePath).then((data) => {
                // split lines by tab
                let lines = data.split('\n'),
                    level = null,
                    parsedData = [];

                // map lines > object
                lines.map((line) => {
                    // get hsk level from comment
                    if (line[0] === '#' && line.indexOf('hsk')) {
                        level = line.match(/\d+/g)[0][0];
                    }

                    if (line.length > 0 && line[0] !== '#') {
                        // splitted by tab
                        let tabed = line.split('\t'),
                            parsedLine = {
                                simplified: tabed ? tabed[0] : null,
                                traditional: tabed && tabed.length >= 2 ? tabed[1] : null,
                                pinyinNumber: tabed && tabed.length >= 3 ? tabed[2] : null,
                                pinyinTone: tabed && tabed.length >= 4 ? tabed[3] : null,
                                translation: tabed && tabed.length >= 5 ? tabed[4] : null
                            };
                        if (parsedLine.pinyinTone) {
                            parsedLine.pinyinAtone = parsedLine.pinyinTone.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                        }
                        parsedData.push(parsedLine);
                    }
                });

                let collection = hskCollection + '_' + level;

                // drop database collection
                this.dropDatabaseCollection(collection).then((dropResult) => {
                    console.log(dropResult);

                    // insert in database if connected
                    this.insertDatabaseCollection(collection, parsedData).then((insertResult) => {
                        console.log(insertResult);
                    }, (err) => {
                        console.log(err);
                    });
                }, (err) => {
                    console.log(err);
                });


                // write json file
                this.writeJsonFile(filePath, parsedData);
            });
        }
    },


    /** pinyin number to pinyin tone **/
    pinyinNumberToTone: function (sentence) {
        // data sample: dui4bu5qi3
        // tone numbers and accents
        let vowels = 'aeiouv',
            tones = ['āáăàa', 'ēéĕèe', 'īíĭìi', 'ōóŏòo', 'ūúŭùu', 'ǖǘǚǜü'],
            splittedSentence = sentence.split(''),
            wordStartIndex = 0,
            words = [];

        // split sentence into words
        splittedSentence.map((character, index) => {
            // extract word if found number
            if (Number.isInteger(parseInt(character))) {
                // extract word from sentence
                var word = splittedSentence.slice(wordStartIndex, index + 1);
                words.push(word.join(''));
                // update sentence
                wordStartIndex = index + 1;
            }
        });

        // update pinyin with accent
        words.map((pinyinNumber, wordIndex) => {
            let splittedPinyinNumber = pinyinNumber.split(''),
                toneIndex = parseInt(splittedPinyinNumber[splittedPinyinNumber.length - 1]) - 1,
                pinyin = splittedPinyinNumber.slice(0, splittedPinyinNumber.length - 1),
                charIndex = -1;

            // detect the last vowel
            pinyin.map((char, index) => {
                if (vowels.indexOf(char) >= 0) {
                    charIndex = index;
                }
            });

            if (charIndex !== -1) {
                // update last vowel into tone
                let vowel = pinyin[charIndex],
                    vowelTone = tones[vowels.indexOf(vowel)][toneIndex],
                    pinyinTone = pinyin.join('').replace(vowel, vowelTone);

                words[wordIndex] = pinyinTone;
            }
        });
        return words.join('');
    }
};

