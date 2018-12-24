const Parser = require("jison").Parser;
const FileReader = require("../file-reader");

const Grammar = (new FileReader("src/Parser/parser.jison")).read();

module.exports = new Parser(Grammar);