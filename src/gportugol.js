var parser = require("../src/Parser/parser").parser;
var fs = require('fs');

module.exports.Analysis = Analysis;

function Analysis (inputPath = "./examples/fatorial-recursivo.gpt", encoding = "utf-8") {
    this.input = fs.readFileSync(inputPath, encoding);
    this.analyse = function () {
        this.ast = parser.parse(this.input);
    };
};