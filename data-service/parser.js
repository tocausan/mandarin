/** parser data service
 * JSON used as primary data format
 * **/

var _ = require('lodash'),
    fs = require('fs'),
    fileFormatEnum = require('../enums/file-format'),
    dictionaryItemEnum = require('../enums/dictionary-item');


module.exports = {

    // read utf8 file
    readFileUtf8: function (filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },

    // read json file
    readJson: function (filePath, desiredData) {
        this.readFileUtf8(filePath).then((data) => {
            // select desired data
            return data.filter((dataItem) => {
                dataItem.traditional
                //desiredData.forEach((desiredItem) => {

                //});
            });
        });
    },
    
    
    






    // chinese edict u8 dictionary parser
    getChineseEdictU8: function (data, dictionaryEnum) {
        return new Promise((resolve, reject) => {

            // split text > lines > characters
            // example: 龐加萊 庞加莱 [Pang2 jia1 lai2] /Henri Poincaré (1854-1912), French mathematician, physician and philosopher/
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
                            translation: betweenSlashes ? betweenSlashes[0].slice(1, betweenSlashes[0].length - 1) : null
                        };

                    parsedLine.pinyinTone = this.pinyinNumberToTone(parsedLine.pinyinNumber);

                    parsedData.push(parsedLine);
                }
            });

            let wantedData = [];
            switch (dictionaryEnum) {
                case dictionaryItemEnum.ALL:
                    wantedData = parsedData;
                    resolve(JSON.stringify(wantedData));
                    break;

                case dictionaryItemEnum.TRADITIONAL:
                    parsedData.map((data) => {
                        wantedData.push(data.traditional);
                    });
                    resolve(JSON.stringify(wantedData));
                    break;

                case dictionaryItemEnum.SIMPLIFIED:
                    parsedData.map((data) => {
                        wantedData.push(data.simplified);
                    });
                    resolve(JSON.stringify(wantedData));
                    break;

                case dictionaryItemEnum.PINYIN_NUMBER:
                    parsedData.map((data) => {
                        wantedData.push(data.pinyinNumber);
                    });
                    resolve(JSON.stringify(wantedData));
                    break;

                case dictionaryItemEnum.PINYIN_TONE:
                    parsedData.map((data) => {
                        wantedData.push(data.pinyinTone);
                    });
                    resolve(JSON.stringify(wantedData));
                    break;

                case dictionaryItemEnum.PINYIN_ATONE:
                    parsedData.map((data) => {
                        wantedData.push(data.pinyinTone.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
                    });
                    resolve(JSON.stringify(wantedData));
                    break;

                default:
                    reject('Dictionary enum not correct')
            }


        });
    },


    // chinese hsk cn-en parser
    getChineseHsk: function (data) {
        return new Promise((resolve, reject) => {
            // split text > lines > characters
            // example: 打电话	打電話	da3 dian4hua4	dǎ diànhuà	make a phone call
            let lines = data.split('\n'),
                parsedData = [];

            // map lines > object
            lines.map((line) => {
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
                    parsedData.push(parsedLine);
                }
            });
            resolve(JSON.stringify(parsedData));
        })
    },


    // pinyin number to pinyin tone
    getPinyinNumberToTone: function (sentence) {
        // example: dui4bu5qi3

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



