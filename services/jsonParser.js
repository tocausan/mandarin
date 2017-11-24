var fs = require('fs');

var jsonParser = {

    // u8 file to json
    u8ToJson: function (filename) {
        return new Promise(function (resolve, reject) {
            fs.readFile(filename, 'utf8', function (err, data) {
                if (err) {
                    reject(err)
                } else {
                    // split text > lines > characters
                    // 龐加萊 庞加莱 [Pang2 jia1 lai2] /Henri Poincaré (1854-1912), French mathematician, physician and philosopher/
                    var parsedData = [];
                    var lines = data.split('/n');
                    // map lines > object
                    lines.forEach(function (line) {
                        if (line[0] !== '#' && line.length > 0) {
                            var test = '龐加萊 庞加莱 [Pang2 jia1 lai2] /Henri Poincaré (1854-1912), French mathematician, physician and philosopher/';
                            console.log(test);
                            console.log(test.split(' ')[0])

                            var spaced = line.split(' ')
                                //betweenBracket = line.match(/\[(.*)]/),
                                //betweenSlashes = line.match(/\/(.*)\//);

                            var parsedLine = {
                                traditional: spaced ? spaced : null
                                //simplified: spaced && spaced.length >= 2 ? spaced[1] : null,
                                //pinyin: betweenBracket ? betweenBracket[0].substr(1, betweenBracket[0].length - 1) : null,
                                //translation: betweenSlashes ? betweenSlashes[0].substr(1, betweenSlashes[0].length - 1) : null
                            };

                            //console.log(line)
                            //console.log('>>> ' + line.split(' ')[0])
                            parsedData.push(parsedLine);
                        }
                    });
                    //console.log(JSON.stringify(parsedData))
                    resolve(JSON.stringify(parsedData));
                }
            });
        });
    }
};

module.exports = jsonParser;
