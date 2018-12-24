var TypeCheck = require("../src/type-check").TypeCheck;
var Local = require("../src/Parser/data-structure").Local;

const tree = require("./test-ast");


describe("Verifica tipos: ", function () {
    var type;
    beforeEach(function () {
        type = new TypeCheck(tree);
    });

    it("Verifica a cópia do objeto", function () {
        expect(type.ast).toEqual(tree);
    });

    it("Verifica criação da tabela de símbolos", function () {
        expect(type.SymbolTable).toBeDefined();
    });

    it("Todos os escopos estão na tabela de símbolos", function () {
        type.createScopesAndDeclareVariables();
        expect(type.SymbolTable.scopes.fatorial_recursivo).toBeDefined();
        expect(type.SymbolTable.scopes.fatorial).toBeDefined();
    });

    it("Variáveis em funções e fora de função possuem entradas", function () {
        type.createScopesAndDeclareVariables();
        expect(type.SymbolTable.scopes.fatorial_recursivo.x.id).toEqual(1);
        expect(type.SymbolTable.scopes.fatorial.z.id).toEqual(1);
    });

    it("Matrizes estão armazenadas na tabela de símbolos", function () {
        type.createScopesAndDeclareVariables();
        expect(type.SymbolTable.scopes.fatorial.m1.dimensions).toEqual([2, 4]);
    });

    it("Verifica inserção de local ao inserir matriz", () => {
        type.createScopesAndDeclareVariables();
        expect(type.SymbolTable.scopes.fatorial.m1.location).toEqual([new Local(11, 11, 4, 33)]);
    });
});