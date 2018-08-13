var parser = require("../src/Parser/parser").parser;
var fs = require("fs");

describe("Verifica funcionamento do parser", () => {


    it("Verifica se dado uma entrada haverá saída", () => {
        var inputText = fs.readFileSync("examples/fatorial-recursivo.gpt", "utf8");
        expect(parser.parse(inputText)).toBeDefined();
    });
});