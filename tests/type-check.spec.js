var TypeCheck = require("../src/type-check").TypeCheck;
var Local = require("../src/Parser/data-structure").Local;


const tree = {
    nome: 'fatorial_recursivo',
    variaveis: [{
        variaveis: ['x'],
        tipo: 'INTEIRO',
        local: {
            first_line: 3,
            last_line: 3,
            first_column: 4,
            last_column: 16
        }
    }],
    corpo: [{
            op: 'CHAMADA-FUNCAO',
            nome: 'imprima',
            argumentos: ['Digite um número:'],
            local: {
                first_line: 6,
                last_line: 6,
                first_column: 4,
                last_column: 32
            }
        },
        {
            esquerda: 'x',
            direita: {
                op: 'CHAMADA-FUNCAO',
                nome: 'leia',
                argumentos: [],
                local: {
                    first_line: 7,
                    last_line: 7,
                    first_column: 9,
                    last_column: 15
                }
            },
            local: {
                first_line: 7,
                last_line: 7,
                first_column: 4,
                last_column: 16
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
                    argumentos: ['x'],
                    local: {
                        first_line: 8,
                        last_line: 8,
                        first_column: 43,
                        last_column: 54
                    }
                }
            ],
            local: {
                first_line: 8,
                last_line: 8,
                first_column: 4,
                last_column: 55
            }
        }
    ],
    funcoes: [{
        nome: 'fatorial',
        parametros: [{
            nome: 'z',
            tipo: 'INTEIRO',
            local: {
                first_line: 10,
                last_line: 10,
                first_column: 16,
                last_column: 25
            }
        }],
        tipo: 'INTEIRO',
        variaveis: [{
            variaveis: ['m1'],
            tipo: 'INTEIRO',
            dimensoes: [2, 4],
            local: {
                first_line: 11,
                last_line: 11,
                first_column: 4,
                last_column: 33
            }
        }],
        corpo: [{
            acao: 'SE',
            condicao: {
                op: 'COMPARA-IGUALDADE',
                esquerda: 'z',
                direita: 1,
                local: {
                    first_line: 13,
                    last_line: 13,
                    first_column: 7,
                    last_column: 12
                }
            },
            corpo: [{
                acao: 'RETORNE',
                expressao: 1,
                local: {
                    first_line: 14,
                    last_line: 14,
                    first_column: 8,
                    last_column: 18
                }
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
                            direita: 1,
                            local: {
                                first_line: 16,
                                last_line: 16,
                                first_column: 29,
                                last_column: 32
                            }
                        }],
                        local: {
                            first_line: 16,
                            last_line: 16,
                            first_column: 20,
                            last_column: 33
                        }
                    },
                    local: {
                        first_line: 16,
                        last_line: 16,
                        first_column: 16,
                        last_column: 33
                    }
                },
                local: {
                    first_line: 16,
                    last_line: 16,
                    first_column: 8,
                    last_column: 34
                }
            }],
            local: {
                first_line: 13,
                last_line: 17,
                first_column: 4,
                last_column: 10
            }
        }],
        local: {
            first_line: 10,
            last_line: 18,
            first_column: 0,
            last_column: 3
        }
    }],
    local: {
        first_line: 1,
        last_line: 18,
        first_column: 0,
        last_column: 3
    }
}

describe("Verifica tipos: ", function () {
    var type;
    beforeEach(function () {
        type = new TypeCheck(tree);
    });

    it("Verifica a cópia do objeto", function () {
        expect(type.ast).toEqual(tree);
    });

    it("Verifica criação da tabela de símbolos", function () {
        expect(type.SymbolTable).toBeDefined();
    });

    it("Todos os escopos estão na tabela de símbolos", function () {
        type.createScopesAndDeclareVariables();
        expect(type.SymbolTable.scopes.fatorial_recursivo).toBeDefined();
        expect(type.SymbolTable.scopes.fatorial).toBeDefined();
    });

    it("Variáveis em funções e fora de função possuem entradas", function () {
        type.createScopesAndDeclareVariables();
        expect(type.SymbolTable.scopes.fatorial_recursivo.x.id).toEqual(1);
        expect(type.SymbolTable.scopes.fatorial.z.id).toEqual(1);
    });

    it("Matrizes estão armazenadas na tabela de símbolos", function () {
        type.createScopesAndDeclareVariables();
        expect(type.SymbolTable.scopes.fatorial.m1.dimensions).toEqual([2, 4]);
    });

    it("Verifica inserção de local ao inserir matriz", () => {
        type.createScopesAndDeclareVariables();
        expect(type.SymbolTable.scopes.fatorial.m1.location).toEqual([new Local(11, 11, 4, 33)]);
    });
});