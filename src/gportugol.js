var parser = require("../src/Parser/parser").parser;
var FileReader = require("./file-reader");

module.exports.Analysis = Analysis;



function Analysis (input = (new FileReader()).read()) {
    this.input = input;
    this.analyse = function () {
        this.ast = parser.parse(this.input);
    };
};