var fs = require('fs');

module.exports = {

    // read utf8 file
    readFileUtf8: function (path) {
        "use strict";
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },


    // chinese edict u8 dictionary parser
    chineseEdictU8: function (data) {
        "use strict";
        return new Promise((resolve, reject) => {

            // split text > lines > characters
            // example: 龐加萊 庞加莱 [Pang2 jia1 lai2] /Henri Poincaré (1854-1912), French mathematician, physician and philosopher/
            var lines = data.split('\n'),
                parsedData = [];

            // map lines > object
            lines.map((line) => {
                if (line.length > 0 && line[0] !== '#') {
                    // splitted by space, bracket and slash
                    var spaced = line.split(' '),
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
            resolve(JSON.stringify(parsedData));
        });
    },


    // chinese hsk cn-en parser
    chineseHsk: function (data) {
        "use strict";
        return new Promise((resolve, reject) => {
            // split text > lines > characters
            // example: 打电话	打電話	da3 dian4hua4	dǎ diànhuà	make a phone call
            var lines = data.split('\n'),
                parsedData = [];

            // map lines > object
            lines.map((line) => {
                if (line.length > 0 && line[0] !== '#') {
                    // splitted by tab
                    var tabed = line.split('\t'),
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
    pinyinNumberToTone: function (sentence) {
        // example: dui4bu5qi3

        // tone numbers and accents
        var vowels = 'aeiouv',
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
            var splittedPinyinNumber = pinyinNumber.split(''),
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
                var vowel = pinyin[charIndex],
                    vowelTone = tones[vowels.indexOf(vowel)][toneIndex],
                    pinyinTone = pinyin.join('').replace(vowel, vowelTone);

                words[wordIndex] = pinyinTone;
            }
        });

        return words.join('');
    }


};



