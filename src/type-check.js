module.exports.TypeCheck = TypeCheck;

var st = require('../src/symbol-table');
var SymbolTable = st.SymbolTable;
var SymbolEntry = st.SymbolEntry;
var Scope = st.Scope;

function TypeCheck(ast) {
    this.ast = ast;
    this.SymbolTable = new SymbolTable(ast.nome);
    this.execute = function () {};
    this.createScopesAndDeclareVariables = function () {
        this.SymbolTable.declareScope();
        this.declareVariables();
        this.ast.funcoes.forEach((funcao) => {
            this.SymbolTable.declareScope(funcao.nome, funcao.tipo);
            this.declareParameters(funcao);
            this.declareVariables(funcao.variaveis, funcao.nome);
        });
    };
    this.declareVariables = function (variables = this.ast.variaveis, scope = this.ast.nome) {
        variables.forEach(variableDeclaration => {
            variableDeclaration.variaveis.forEach((variable) => {
                this.SymbolTable.declareVariable(variable, scope, variableDeclaration.tipo, variableDeclaration.dimensoes);
            });
        });
    };

    this.declareParameters = function(funcao){
        funcao.parametros.forEach((p)=>{
            this.SymbolTable.declareVariable(p.nome, funcao.nome, p.tipo);
        });
    };
}