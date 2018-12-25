const parser = require("../src/Parser/parser").parser;
const FileReader = require("./file-reader");
const TypeCheck = require("./type-check").TypeCheck;

module.exports.Analysis = Analysis;



function Analysis (input = (new FileReader()).read()) {
    this.input = input;
    this.analyse = function () {
        this.ast = parser.parse(this.input);
        (new TypeCheck(this.ast)).execute();
    };
};