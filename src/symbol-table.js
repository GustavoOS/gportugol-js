function SymbolTable() {
    this.scopes = {};
    this.addSymbol = function (name, scope = "algoritmo") {
        if (this.scopes[scope] ) {
            if (this.find(name, scope) === undefined) this.scopes[scope].push(name);
        } else {
            this.scopes[scope] = [name];
        }
    };
    this.find = function (name, scope = "algoritmo") {
        if (this.scopes[scope]) {
            return this.scopes[scope].find((rs) => {
                return rs === name;
            });
        }
        return;
    }
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
        nameList.forEach(element => {
            table.addSymbol(element);
        });
        expect(table.scopes.algoritmo).toEqual(["Joao"].concat(nameList));
    });

    it('Verifica se inserção não colide', function () {
        table.addSymbol("Joao");
        expect(table.scopes.algoritmo).toEqual(["Joao"]);
    });

    it("Inserção em dois escopos e mesmo nome", function(){
        table.addSymbol("Joao", Teste().scopes[1]);
        expect(table.scopes[Teste().scopes[1]]).toEqual(["Joao"]);
        expect(table.scopes.algoritmo.length).toBe(1);
    });
});