/** index tool **/

let program = require('commander'),
    databaseServices = require('../services/database'),
    fileParserTool = require('./file-parser'),
    userGeneratorTool = require('./user-generator');


/** program **/
program
    .version('0.1.0')
    .option('-a, --all', 'Call all tools')
    .option('-c, --check-connection', 'Check database connection')
    .option('-p, --parse-data-files', 'Parse data files to json and fill the database')
    .option('-u, --generate-users', 'Generate users')
    .parse(process.argv);


let indexTool = {

    /** all **/
    callAllTools: function(){
        this.checkConnection();
        this.parseDataFiles();
        this.generateUsers();
    },

    /** check database connection **/
    checkConnection: function () {
        databaseServices.checkConnection().then((result) => {
            console.log(result);
        }, (err) => {
            throw err;
        });
    },

    /** parse data files to json and fill the database **/
    parseDataFiles: function () {
        fileParserTool.parseDictionaryFile();
        fileParserTool.parseHskFile();
    },

    /** generate users **/
    generateUsers: function(){
        userGeneratorTool.generateAdmin();
    }

}

switch(true){
    case program.all:
        indexTool.callAllTools();
        break;

    case program.checkConnection:
        indexTool.checkConnection();
        break;

    case program.parseDataFiles:
        indexTool.parseDataFiles();
        break;

    case program.generateUsers:
        indexTool.generateUsers();
        break;
}

