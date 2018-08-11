function SymbolTable() {
    this.created = true;
}


// Testes
describe('Cria tabela de símbolos', function () {
    console.log(SymbolTable);
    it('Foi criada', function () {
        var table = new SymbolTable();
        console.log(table);
        expect(table.created).toBe(true);
    });
});