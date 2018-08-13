module.exports.TypeCheck = TypeCheck;

var st = require('../src/symbol-table');
var SymbolTable = st.SymbolTable;
var SymbolEntry = st.SymbolEntry;
var Scope = st.Scope;

function TypeCheck(ast){
    this.ast = ast;
    this.SymbolTable = new SymbolTable(ast.nome);
}