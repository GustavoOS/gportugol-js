function SymbolTable() {
    this.scopes = {};
    this.addSymbol = function (name, scope = "algoritmo", location = 0) {
        var newSymbol = new SymbolEntry(name, scope, location);
        if (this.scopes[scope]) {
            var foundSymbolIndex = this.findIndex(name, scope);
            if (foundSymbolIndex >= 0) {
                this.scopes[scope][foundSymbolIndex].addLocation(location);
            } else {
                this.scopes[scope].push(newSymbol);
            }
        } else {
            this.scopes[scope] = [newSymbol];
        }
    };
    this.find = function (name, scope = "algoritmo") {
        if (this.scopes[scope]) {
            return this.scopes[scope].find((rs) => {
                return rs.name === name;
            });
        }
        return;
    };
    this.findIndex = function (name, scope = "algoritmo") {
        if (this.scopes[scope]) {
            return this.scopes[scope].findIndex((rs) => {
                return rs.name === name;
            });
        }
        return -1;
    };

}

function SymbolEntry(name, scope = "algoritmo", location = 0) {
    this.name = name;
    this.scope = scope;
    this.location = [location];

    this.addLocation = function (local = 1) {
        this.location.push(1);
    };

    this.unsetFunctions = function () {
        this.addLocation = undefined;
        this.unsetFunctions = undefined;
        return this;
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

function unsetFunctionsFromArrayOfEntries(arrayOfEntries) {
    arrayOfEntries.forEach(
        (el) => el.unsetFunctions()
    );
    return arrayOfEntries;
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
        nameList = Teste().names;
    });

    beforeEach(function () {
        table = new SymbolTable();
        table.addSymbol("Joao");
    });

    it('Verifica se inserção funcionou', function () {
        expect(table.find("Joao")).toBeDefined();
    });

    it('Verifica múltiplas inserções', function () {
        var expectedArray = [new SymbolEntry("Joao")];
        nameList.forEach(element => {
            expectedArray.push(new SymbolEntry(element));
            table.addSymbol(element);
        });
        expect(unsetFunctionsFromArrayOfEntries(table.scopes.algoritmo)).toEqual(
            unsetFunctionsFromArrayOfEntries(expectedArray));
    });

    it('Verifica se inserção não colide', function () {
        table.addSymbol("Joao");
        expect(table.find("Joao").location.length).toBe(2);
        expect(table.scopes.algoritmo.length).toBe(1);
    });

    it("Inserção em dois escopos e mesmo nome", function () {
        table.addSymbol("Joao", Teste().scopes[1]);
        expect(unsetFunctionsFromArrayOfEntries(
            table.scopes[Teste().scopes[1]])).toEqual(
            [(new SymbolEntry(
                "Joao", Teste().scopes[1])).unsetFunctions()]);
        expect(table.scopes.algoritmo.length).toBe(1);
    });
});