var TypeCheck = require("../src/type-check").TypeCheck;
var st = require('../src/symbol-table');
var SymbolTable = st.SymbolTable;
var SymbolEntry = st.SymbolEntry;
var Scope = st.Scope;


const tree = {
    nome: 'fatorial_recursivo',
    variaveis: [{
        variaveis: ['x'],
        tipo: 'INTEIRO'
    }],
    corpo: [
        {
            op: 'CHAMADA-FUNCAO',
            nome: 'imprima',
            argumentos: ['Digite um número:']
        },
        {
            esquerda: 'x',
            direita: {
                op: 'CHAMADA-FUNCAO',
                nome: 'leia',
                argumentos: []
            },
            acao: 'ATRIBUIR'
        },
        {
            op: 'CHAMADA-FUNCAO',
            nome: 'imprima',
            argumentos: ['fatorial de ',
                'x',
                ' é igual a ',
                {
                    op: 'CHAMADA-FUNCAO',
                    nome: 'fatorial',
                    argumentos: ['x']
                }
            ]
        }
    ],
    funcoes: [{
        nome: 'fatorial',
        parametros: [{
            nome: 'z',
            tipo: 'INTEIRO'
        }],
        tipo: 'INTEIRO',
        variaveis: [],
        corpo: [{
            acao: 'SE',
            condicao: {
                op: 'COMPARA-IGUALDADE',
                esquerda: 'z',
                direita: 1
            },
            corpo: [{
                acao: 'RETORNE',
                expressao: 1
            }],
            senao: [{
                acao: 'RETORNE',
                expressao: {
                    op: 'MULTIPLICA',
                    esquerda: 'z',
                    direita: {
                        op: 'CHAMADA-FUNCAO',
                        nome: 'fatorial',
                        argumentos: [{
                            op: 'SUBTRAI',
                            esquerda: 'z',
                            direita: 1
                        }]
                    }
                }
            }]
        }]
    }]
};

describe("Verifica tipos: ", function () {
    var type;
    beforeEach(function () {
        type = new TypeCheck(tree);
    });

    it("Verifica a cópia do objeto", function () {
        expect(type.ast).toEqual(tree);
    });

    it("Verifica criação da tabela de símbolos", function(){
        expect(type.SymbolTable).toBeDefined();
    });

    it("Todos os escopos estão na tabela de símbolos", function(){
        type.createScopesAndDeclareVariables();
        expect(type.SymbolTable.scopes.fatorial_recursivo).toBeDefined();
        expect(type.SymbolTable.scopes.fatorial).toBeDefined();
    });

    it("Variáveis em funções e fora de função possuem entradas", function(){
        type.createScopesAndDeclareVariables();
        expect(type.SymbolTable.scopes.fatorial_recursivo.x.id).toEqual(1);
        expect(type.SymbolTable.scopes.fatorial.z.id).toEqual(1);
    });
});