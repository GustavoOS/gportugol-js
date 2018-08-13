var st = require('../src/symbol-table');
var SymbolTable = st.SymbolTable;
var SymbolEntry = st.SymbolEntry;
var Scope = st.Scope;

// Testes
function Teste() {
    var mass = {
        names: {
            list: ['Gilberto', 'Adenor', 'Damares', 'Rubi'],
            types: ["INTEIRO", "LOGICO", "LITERAL", "REAL"]
        },
        scopes: {
            list: ['algoritmo', 'sort', 'order', 'grow'],
            types: [undefined, "REAL", "LOGICO", "CARACTERE"]
        }
    };
    return mass;
}


describe('Cria tabela de símbolos', function () {
    var table;

    beforeEach(function () {
        table = new SymbolTable();
    });

    it('Foi criada', function () {
        expect(table).toBeDefined();
    });

    it('Verifica se os escopos estão vazios', function () {
        Teste().scopes.list.forEach((el) => table.declareScope(el));
        for (var scope in table.scopes) {
            expect(table.scopes[scope].variableCount).toBe(0);
        }
    });

    it("Verifica o nome do algoritmo", () => {
        expect(table.algoritmo).toBe("algoritmo");
    });

    it("Verifica algoritmo com outro nome", () => {
        table = new SymbolTable("fatorial");
        expect(table.algoritmo).toBe("fatorial");
    });

    it("Declara escopos com tipos diferentes", () => {
        var scopes = Teste().scopes;
        var scopeCount = 0;
        scopes.list.forEach((s, index) => {
            table.declareScope(s, scopes.types[index]);
        });
        for (var s in table.scopes) {
            scopeCount++;
            expect(table.scopes[s].variableCount).toBe(0);
            var index = scopes.list.findIndex((el) => el === s);
            expect(table.scopes[s].type).toBe(scopes.types[index]);
        }
        expect(scopeCount).toBe(scopes.list.length);
    });

});

describe('Inserção de símbolos', function () {
    var table;
    var nameList = [];
    var scopeList = [];



    beforeEach(function () {
        table = new SymbolTable();
        scopeList = Teste().scopes.list;
        nameList = Teste().names.list;
        scopeList.forEach((el) => table.declareScope(el));
    });

    it('Verifica se inserção funcionou', function () {
        table.declareVariable("Joao");
        expect(table.scopes.algoritmo.Joao).toEqual(new SymbolEntry(0, "INTEIRO", 1));
        expect(table.scopes.algoritmo.Joao.dimensions).toBeUndefined();
    });

    it("Verifica a inserção de matrizes", function(){
        table.declareVariable("mat", "algoritmo", 12, "INTEIROS", [2, 3, 5]);
        expect(table.scopes.algoritmo.mat).toEqual(new SymbolEntry(12, "INTEIROS", 1, [2, 3, 5]));
        expect(table.scopes.algoritmo.mat.dimensions).toEqual([2, 3, 5]);
    });

    it("Declara variáveis de tipos diferentes num mesmo escopo", () => {
        table.declareScope("empilha");
        table.declareVariable("stack", "empilha", 23, "CARACTERE");
        table.declareVariable("item", "empilha", 25, "REAL");
        expect(table.scopes.empilha.stack).toEqual(
            new SymbolEntry(23, "CARACTERE", 1)
        );
        expect(table.scopes.empilha.item).toEqual(
            new SymbolEntry(25, "REAL", 2)
        );
    });

    it('Verifica múltiplas inserções', function () {
        nameList.forEach((element) => {
            table.declareVariable(element);
        });
        nameList.forEach((variable, index) => {
            expect(table.scopes.algoritmo[variable]).toEqual(
                new SymbolEntry(0, "INTEIRO", index + 1)
            );
        });
    });

    it('Verifica se inserção não colide', function () {
        table.declareVariable("Joao");
        var gotDeclared = table.declareVariable("Joao");
        expect(gotDeclared).toBeFalsy();
    });

    it("Inserção em dois escopos e mesmo nome", function () {
        table.declareVariable("Joao");
        table.declareVariable("Joao", scopeList[1]);
        expect(table.scopes.algoritmo.Joao).toBeDefined();
        expect(table.scopes[scopeList[1]].Joao).toBeDefined();
    });

    it("Inserção em vários escopos", () => {
        nameList.forEach((element, index) => {
            table.declareVariable(element, scopeList[index]);
        });
        nameList.forEach((element, index) => {
            expect(table.scopes[scopeList[index]][element]).toEqual(
                new SymbolEntry(0, "INTEIRO", 1)
            );
        });
    });
});

describe("Referência e busca:", () => {
    var table;
    beforeEach(() => {
        table = new SymbolTable();
        Teste().scopes.list.forEach((el, i) => {
            table.declareScope(el, Teste().scopes.types[i]);
        });
        Teste().names.list.forEach((el, i) => {
            table.declareVariable(el, "sort", i + 1, Teste().scopes.types[i]);
        });
    });

    it("Referência", () => {
        expect(table.refer("Adenor", 45, "sort")).toBeTruthy();
        expect(table.scopes.sort.Adenor.location).toEqual([2, 45]);
    });

    it("Referenciar não declarado", () => {
        expect(table.refer("Manoel", 23)).toBeFalsy();
    });

    it("Busca", () => {
        expect(table.find("Adenor", "sort")).toEqual(table.scopes.sort.Adenor);
    });

    it("Busca escopo", () => {
        expect(table.getScope("sort")).toEqual(new Scope("REAL", 4));
    });
});