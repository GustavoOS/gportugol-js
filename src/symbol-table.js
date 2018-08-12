function SymbolTable() {
    this.scopes = {};
    this.declareVariable = function (name, scope = "algoritmo", location = 0, type = "INTEIRO") {
        if (this.scopes[scope][name] !== undefined) return false;
        this.scopes[scope][name] = new SymbolEntry(
            location,
            type,
            ++this.scopes[scope].variableCount);
        return true;
    };
    this.declareScope = function (name = "algoritmo") {
        this.scopes[name] = {
            variableCount: 0
        };
    };
}

function SymbolEntry(location, type, id) {
    this.location = [location];
    this.type = type;
    this.id = id;
}


// Testes
function Teste() {
    var mass = {
        names: ['Gilberto', 'Adenor', 'Damares', 'Rubi'],
        scopes: ['algoritmo', 'sort', 'order', 'grow']
    };
    return mass;
}


describe('Cria tabela de símbolos', function () {
    var table;

    beforeEach(function () {
        table = new SymbolTable();
        Teste().scopes.forEach((el) => table.declareScope(el));
    });

    it('Foi criada', function () {
        expect(table).toBeDefined();
    });

    it('Verifica se os escopos estão vazios', function () {
        for (var scope in table.scopes) {
            expect(table.scopes[scope].variableCount).toBe(0);
        }
    });
});

describe('Inserção de símbolos', function () {
    var table;
    var nameList = [];
    var scopeList = [];



    beforeEach(function () {
        table = new SymbolTable();
        scopeList = Teste().scopes;
        nameList = Teste().names;
        scopeList.forEach((el) => table.declareScope(el));
    });

    it('Verifica se inserção funcionou', function () {
        table.declareVariable("Joao");
        expect(table.scopes.algoritmo.Joao).toEqual(new SymbolEntry(0, "INTEIRO", 1));
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