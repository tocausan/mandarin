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
                    var spaced = line.split(' '),
                        betweenBracket = line.match(/\[(.*)]/),
                        betweenSlashes = line.match(/\/(.*)\//);

                    var parsedLine = {
                        traditional: spaced ? spaced[0] : null,
                        simplified: spaced && spaced.length >= 2 ? spaced[1] : null,
                        pinyin: betweenBracket ? betweenBracket[0].substr(1, betweenBracket[0].length - 1) : null,
                        translation: betweenSlashes ? betweenSlashes[0].substr(1, betweenSlashes[0].length - 1) : null
                    };

                    parsedData.push(parsedLine);
                }
            });

            resolve(JSON.stringify(parsedData));
        });
    },


    // chinese hsl cn-en parser
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
                    var spaced = line.split(' '),
                        betweenBracket = line.match(/\[(.*)]/),
                        betweenSlashes = line.match(/\/(.*)\//);

                    var parsedLine = {
                        traditional: spaced ? spaced[0] : null,
                        simplified: spaced && spaced.length >= 2 ? spaced[1] : null,
                        pinyin: betweenBracket ? betweenBracket[0].substr(1, betweenBracket[0].length - 1) : null,
                        translation: betweenSlashes ? betweenSlashes[0].substr(1, betweenSlashes[0].length - 1) : null
                    };

                    parsedData.push(parsedLine);
                }
            });

            resolve(JSON.stringify(parsedData));
        })
    }

};



