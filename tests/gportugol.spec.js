var Analysis = require('../src/gportugol').Analysis;

describe("Verifica a análise: ", function () {
    var compiler;

    beforeEach(() => {
        compiler = new Analysis();
    });

    it("Verifica leitura", () => {
        expect(compiler.input).toBeDefined();
    });

    it("Verifica se parser funciona", () => {
        compiler.analyse();
        expect(compiler.ast).toBeDefined();
    });
});