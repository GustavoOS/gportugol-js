module.exports.Expressao = Expressao;
module.exports.Unario = Unario;

function Expressao(op, esquerda, direita, local) {
    this.op = op;
    this.esquerda = esquerda;
    this.direita = direita;
    this.local = local;
}

function Unario(op, direita, local) {
    this.op = op;
    this.direita = direita;
    this.local = local;
}

function Local(primeira_linha, ultima_linha, primeira_coluna, ultima_coluna) {
    this.first_line = primeira_linha;
    this.last_line = ultima_linha;
    this.first_column = primeira_coluna;
    this.last_column = ultima_coluna;
}

module.exports.Local = Local;
module.exports.Tipos = ['INTEIRO', 'REAL', 'CARACTERE', 'LITERAL', 'LOGICO'];