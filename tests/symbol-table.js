describe('Cria tabela de símbolos', function () {
    var table = new SymbolTable();
    it('Foi criada', function(){
        expect(table.created).toBe(true);
    });
});