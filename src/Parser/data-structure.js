module.exports.Expressao = Expressao;
module.exports.Unario = Unario;

function Expressao(op, esquerda, direita) {
    this.op = op;
    this.esquerda = esquerda;
    this.direita = direita;
}

function Unario(op, direita) {
    this.op = op;
    this.direita = direita;
}

module.exports.Tipos = ['INTEIRO', 'REAL', 'CARACTERE', 'LITERAL', 'LOGICO'];