/* lexical grammar */
%lex
NUMERO_DECIMAL        [0-9]+
NUMERO_OCTAL          "0"[cC][0-8]+
NUMERO_HEXADECIMAL    "0"[xX][0-9a-fA-F]+
NUMERO_BINARIO        "0"[bB][01]+
NUMERO_REAL           [0-9]+"."[0-9]+
IDENTIFICADOR         [a-zA-Z_][a-zA-Z0-9_]*

a                     [aA]
b                     [bB]
c                     [cC]
d                     [dD]
e                     [eE]
f                     [fF]
g                     [gG]
h                     [hH]
i                     [iI]
j                     [jJ]
k                     [kK]  
l                     [lL]
m                     [mM]
n                     [nN]
o                     [oO]  
p                     [pP]
q                     [qQ]
r                     [rR]
s                     [sS]
t                     [tT]
u                     [uU]
v                     [vV]
w                     [wW]
y                     [yY]
x                     [xX]
z                     [zZ]

a_acento              [aAáÁãÃ]
e_acento              [eEéÉ]
i_acento              [iIíÍ]
o_acento              [oOóÓ]
u_acento              [uUúÚ]

c_cedilha             [cCçÇ]

%%

\s+                   /* skip whitespace */



{a}{l}{g}{o}{r}{i}{t}{m}{o}
                        return 'ALGORITMO'
{a}{t}{e_acento}        return 'ATE'
{c}{a}{r}{a}{c}{t}{e}{r}{e}{s}
                        return 'CARACTERES'
{c}{a}{r}{a}{c}{t}{e}{r}{e}
                        return 'CARACTERE'
{e}{n}{q}{u}{a}{n}{t}{o}
                        return 'ENQUANTO'
{d}{e}                  return 'DE'
{e}{n}{t}{a}{o}         return 'ENTAO'
{e}                     return 'E'
{f}{a}{c}{a}            return 'FACA'
{f}{a}{l}{s}{o}         return 'FALSO'
{f}{i}{m}"-"{e}{n}{q}{u}{a}{n}{t}{o}
                        return 'FIM-ENQUANTO'
{f}{i}{m}"-"{p}{a}{r}{a}
                        return 'FIM-PARA'
{f}{i}{m}"-"{v}{a}{r}{i}{a_acento}{v}{e}{i}{s}
                        return 'FIM-VARIAVEIS'
{f}{i}{m}"-"{s}{e}      return 'FIM-SE'
{f}{i}{m}               return 'FIM'
{f}{u}{n}{c_cedilha}{a_acento}{o}
                        return 'FUNCAO'
{i}{n}{i_acento}{c}{i}{o}
                        return 'INICIO'
{i}{n}{t}{e}{i}{r}{o}{s}
                        return 'INTEIROS'
{i}{n}{t}{e}{i}{r}{o}   return 'INTEIRO'
{l}{i}{t}{e}{r}{a}{i}{s}
                        return 'LITERAIS'
{l}{i}{t}{e}{r}{a}{l}   return 'LITERAL'
{l}{o_acento}{g}{i}{c}{o}{s}
                        return 'LOGICOS'
{l}{o_acento}{g}{i}{c}{o}
                        return 'LOGICO'
{m}{a}{t}{r}{i}{z}      return 'MATRIZ'
{n}{a_acento}{o}        return 'NAO'
{o}{u}                  return 'OU'
{p}{a}{r}{a}            return 'PARA'
{p}{a}{s}{s}{o}         return 'PASSO'
{r}{e}{a}{l}            return 'REAL'
{r}{e}{a}{i}{s}         return 'REAIS'
{r}{e}{t}{o}{r}{n}{e}   return 'RETORNE'
{s}{e}{n}{a_acento}{o}  return 'SENAO'
{s}{e}                  return 'SE'
{v}{a}{r}{i}{a_acento}{v}{e}{i}{s}
                        return 'VARIAVEIS'
{v}{e}{r}{d}{a}{d}{e}{i}{r}{o}
                        return 'VERDADEIRO'




{NUMERO_BINARIO}        %{
                            console.log("BINARIO " + yytext + "\n");
                            return 'BINARIO';
                        %}
{NUMERO_OCTAL}          %{
                            console.log("OCTAL " + yytext + "\n");
                            return 'OCT';
                        %}
{NUMERO_HEXADECIMAL}    %{
                            console.log("HEXADECIMAL " + yytext + "\n");
                            return 'HEX';
                        %}
{NUMERO_REAL}           %{
                            console.log("REAL "+ yytext + "\n");
                            return 'NUMERO';
                        %}
{NUMERO_DECIMAL}        %{
                            console.log("DECIMAL " + yytext + "\n");
                            return 'NUMERO';
                        %}
{IDENTIFICADOR}         return 'IDENTIFICADOR'
"*"                     return '*'
"/"                     return '/'
"-"                     return '-'
"+"                     return '+'
"^"                     return '^'
"!"                     return '!'
"%"                     return '%'
"("                     return '('
")"                     return ')'
"PI"                    return 'PI'
<<EOF>>                 return 'EOF'
.                       return 'INVALID'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'
%left UMINUS

%start expressions

%% /* language grammar */

expressions
    : e EOF
        { typeof console !== 'undefined' ? console.log($1) : print($1);
          return $1; }
    ;

e
    : e '+' e
        {$$ = $1+$3;}
    | e '-' e
        {$$ = $1-$3;}
    | e '*' e
        {$$ = $1*$3;}
    | e '/' e
        {$$ = $1/$3;}
    | e '^' e
        {$$ = Math.pow($1, $3);}
    | e '!'
        {{
          $$ = (function fact (n) { return n==0 ? 1 : fact(n-1) * n })($1);
        }}
    | e '%'
        {$$ = $1/100;}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUMERO
        {$$ = Number(yytext);}
    | BINARIO
        {

            $$ = parseInt(yytext.substring(2), 2);
        }
    | OCT
        {
            $$ = parseInt(yytext.substring(2), 8);
        }
    | HEX
        {
            $$ = parseInt(yytext.substring(2), 16);
        }

    | palavras-reservadas
        {
            $$ = 1;
            console.log("palavra reservada" + $1);
        }
    | IDENTIFICADOR
        {
            $$ = 2;
        }
    | PI
        {$$ = Math.PI;}
    ;

palavras-reservadas
    : FIM-VARIAVEIS { $$ = yytext;}
    | ALGORITMO { $$ = yytext;}
    | VARIAVEIS { $$ = yytext;}
    | INTEIRO { $$ = yytext;}
    | REAL { $$ = yytext;}
    | CARACTERE { $$ = yytext;}
    | LITERAL { $$ = yytext;}
    | LOGICO { $$ = yytext;}
    | INICIO { $$ = yytext;}
    | VERDADEIRO { $$ = yytext;}
    | FALSO { $$ = yytext;}
    | FIM { $$ = yytext;}
    | OU { $$ = yytext;}
    | E { $$ = yytext;}
    | NAO { $$ = yytext;}
    | SE { $$ = yytext;}
    | SENAO { $$ = yytext;}
    | ENTAO { $$ = yytext;}
    | FIM-SE { $$ = yytext;}
    | ENQUANTO { $$ = yytext;}
    | FACA { $$ = yytext;}
    | FIM-ENQUANTO { $$ = yytext;}
    | PARA { $$ = yytext;}
    | DE { $$ = yytext;}
    | ATE { $$ = yytext;}
    | FIM-PARA { $$ = yytext;}
    | MATRIZ { $$ = yytext;}
    | INTEIROS { $$ = yytext;}
    | REAIS { $$ = yytext;}
    | CARACTERES { $$ = yytext;}
    | LITERAIS { $$ = yytext;}
    | LOGICOS { $$ = yytext;}
    | FUNCAO { $$ = yytext;}
    | RETORNE { $$ = yytext;}
    | PASSO { $$ = yytext;}
    ;

