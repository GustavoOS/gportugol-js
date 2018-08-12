function SymbolTable() {
    this.scopes = {};
    this.declareVariable = function (name, scope = "algoritmo", location = 0) {
        if (this.scopes[scope] === undefined) {
            this.scopes[scope] = {};
        }
        if (this.scopes[scope][name] !== undefined) return false;
        this.scopes[scope][name] = [location];
        return true;
    };
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
    });

    it('Foi criada', function () {
        expect(table).toBeDefined();
    });

    it('Verifica se os escopos estão vazios', function () {
        expect(table.scopes).toBeDefined();
    });
});

describe('Inserção de símbolos', function () {
    var table;
    var nameList = [];

    beforeAll(function () {
        table = new SymbolTable();
        nameList = Teste().names;
    });

    beforeEach(function () {
        table.declareVariable("Joao");
    });

    it('Verifica se inserção funcionou', function () {
        expect(table.scopes.algoritmo.Joao).toBeDefined();
    });

    it('Verifica múltiplas inserções', function () {
        var allVariables = ["Joao"].concat(nameList);
        nameList.forEach(element => {
            table.declareVariable(element);
        });
        allVariables.forEach((variable) => {
            expect(table.scopes.algoritmo[variable]).toBeDefined();
        });
    });

    it('Verifica se inserção não colide', function () {
        var gotDeclared = table.declareVariable("Joao");
        expect(gotDeclared).toBeFalsy();
    });

    it("Inserção em dois escopos e mesmo nome", function () {
        table.declareVariable("Joao", Teste().scopes[1]);
        expect(table.scopes.algoritmo.Joao).toBeDefined();
        expect(table.scopes[Teste().scopes[1]].Joao).toBeDefined();
    });

    it("Inserção em vários escopos", () => {
        table.scopes = {};
        nameList.forEach((element, index) => {
            table.declareVariable(element, Teste().scopes[index]);
        });
        nameList.forEach((element, index) => {
            expect(table.scopes[Teste().scopes[index]][element]).toBeDefined();
        });
    });
});