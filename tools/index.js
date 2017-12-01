/** index tool **/

let program = require('commander'),
    fileParserTool = require('./file-parser');


/** program **/
program
    .version('0.1.0')
    .option('-c, --check-connection', 'Check database connection')
    .option('-p, --parse-data-files', 'Parse data files to json and fill the database')
    .parse(process.argv);

// check database connection
if (program.checkConnection) {
    fileParserTool.checkDatabaseConnection().then((result) => {
        console.log(result);
    }, (err) => {
        throw err;
    });
}

// parse data files to json and fill the database
if (program.parseDataFiles) {
    fileParserTool.parseDictionaryFile();
    fileParserTool.parseHskFile();
}


