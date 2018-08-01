%{
    var stringBuffer;

    function output_error(message){
        console.log(message);
    }
%}

/* lexical grammar */
%lex
NUMERO_DECIMAL        [0-9]+
NUMERO_OCTAL          "0"[cC][0-8]+
NUMERO_HEXADECIMAL    "0"[xX][0-9a-fA-F]+
NUMERO_BINARIO        "0"[bB][01]+
NUMERO_REAL           [0-9]+"."[0-9]+
IDENTIFICADOR         [a-zA-Z_][a-zA-Z0-9_]*


ESPECIAIS            ":="|"<="|">="|"<>"
SIMBOLOS              "+"|"-"|"*"|"/"|";"|","|"<"|":"|"@"|"("|")"|"~"|"{"|"}"|"="|"."|"|"|"^"

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

single_quote          [']


%x MultiLineComment SingleLineComment quotes

%%

\s+                   /* skip whitespace */

<INITIAL>"/*"                         this.begin("MultiLineComment");
<MultiLineComment>"*"+\/              this.popState();
<MultiLineComment>[^\n\*]*            ;
<MultiLineComment>"*"+[^\n\/]         ;//Deletes most characters
<MultiLineComment>\n                  ;
<MultiLineComment>[^\n]               ;//Deletes missing characters if needed
<MultiLineComment><<EOF>>             ;// Ignore


<INITIAL>"//"                         this.begin("SingleLineComment");
<SingleLineComment>[^\n]              ; // Delete
<SingleLineComment>\n                 this.popState();
<SingleLineComment><<EOF>>            this.popState();


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
{e}|"&&"                return 'E'
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
{o}{u}|"||"             return 'OU'
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
                            output_error("BINARIO " + yytext + "\n");
                            return 'BINARIO';
                        %}
{NUMERO_OCTAL}          %{
                            output_error("OCTAL " + yytext + "\n");
                            return 'OCT';
                        %}
{NUMERO_HEXADECIMAL}    %{
                            output_error("HEXADECIMAL " + yytext + "\n");
                            return 'HEX';
                        %}
{NUMERO_REAL}           %{
                            output_error("REAL "+ yytext + "\n");
                            return 'NUMERO_R';
                        %}
{NUMERO_DECIMAL}        %{
                            output_error("DECIMAL " + yytext + "\n");
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

<INITIAL>\"             %{
                            stringBuffer = "";
                            this.begin("quotes");
                        %}
<quotes>\"              %{                        
                            this.popState();
                            return 'STR_CONST';
                        %}



<quotes>[^\\\n\0\"]+      stringBuffer+=yytext;
<quotes>\\[^btnf0\0\n]    stringBuffer+=yytext.substring(1);
<quotes>\\\n              stringBuffer+="\n";
<quotes>\\b               stringBuffer+="\b";
<quotes>\\t               stringBuffer+="\t";
<quotes>\\n               stringBuffer+="\n";
<quotes>\\f               stringBuffer+="\f";
<quotes>\\0               stringBuffer+="0";
<quotes>\\                ;
<quotes>\n              %{
                            output_error("Unterminated string constant");
                            this.popState();
                        %}
<quotes>[\0]|\0$        %{
                            output_error("String contains null character");
                            this.popState();
                        %}                                     
<quotes><<EOF>>         %{
                            output_error("EOF in string constant");
                            this.popState();
                        %}


{single_quote}"\\n"{single_quote}               %{stringBuffer ="\n"; return C_CONST; %}
{single_quote}"\\b"{single_quote}               %{stringBuffer = "\b"; return C_CONST; %}
{single_quote}"\\t"{single_quote}               %{stringBuffer = "\t"; return C_CONST; %}
{single_quote}"\\n"{single_quote}               %{stringBuffer = "\n"; return C_CONST; %}
{single_quote}"\\f"{single_quote}               %{stringBuffer = "\f"; return C_CONST; %}
{single_quote}[^\n]{single_quote}               %{stringBuffer = yytext.slice(1,-1); return C_CONST;%}
{single_quote}{single_quote}                    %{stringBuffer = ""; return C_CONST;%}


{ESPECIAIS}            %{
                            return yytext;
                        %}                       
{SIMBOLOS}              %{
                            return yytext;
                        %}
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
        { typeof console !== 'undefined' ? output_error($1) : print($1);
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
    | NUMERO_R
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
            output_error("palavra reservada" + $1);
        }
    | IDENTIFICADOR
        {
            $$ = 2;
        }
    | PI
        {$$ = Math.PI;}
    | STR_CONST
        {
            $$ = Number(stringBuffer);
        }
    ;

algoritmo
    : declaracao_algoritmo bloco_declaracao fun_decl_list EOF
    | declaracao_algoritmo var_decl_block bloco_declaracao fun_decl_list EOF
    ;

declaracao_algoritmo
    : ALGORITMO IDENTIFICADOR ';'
    ;

var_decl_block
    : VARIAVEIS var-decl-list FIM-VARIAVEIS
    ;

var-decl-list
    : var_decl ';'
    | var-dec-list var_decl ';'
    ;

var_decl
    : IDENTIFICADOR var-list ':' tipo_primitivo
    | IDENTIFICADOR var-list ':' tipo_matriz
    ;

var-list
    : var-list ',' IDENTIFICADOR
    | %empty
    ;

tipo_primitivo
    : INTEIRO
    | REAL
    | CARACTERE
    | LITERAL
    | LOGICO
    ;

tipo_matriz
    : MATRIZ lista_dimensoes DE tipo_primitivo-plural
    ;

lista_dimensoes
    : '[' inteiro_literal ']'
    | lista_dimensoes '[' inteiro_literal ']'
    ;

inteiro_literal
    : NUMERO
    | BINARIO
    | HEX
    | OCT
    ;


tipo_primitivo-plural
    : INTEIROS
    | REAIS
    | CARACTERES
    | LITERAIS
    | LOGICOS
    ;

bloco_declaracao
    : INICIO lista_declaracao FIM
    ;

lista_declaracao
    : declaracao
    | lista_declaracao declaracao
    | %empty
    ;

declaracao
    : declaracao_atribuicao
    | chamada_funcao ';'
    | declaracao_retorno
    | declaracao_se
    | declaracao_enquanto
    | declaracao_para
    ;

declaracao_retorno
    : RETORNE ';'
    | RETORNE expressao ';'
    ;

lvalue
    : IDENTIFICADOR lista_indices
    | IDENTIFICADOR
    ;

lista_indices
    : '['expressao']'
    | lista_indices '[' expressao ']'
    ;

declaracao_atribuicao
    : lvalue ':=' expr ';'
    ;

declaracao_se
    : SE expressao ENTAO lista_declaracao FIM-SE
    | SE expressao ENTAO lista_declaracao SENAO lista_declaracao FIM-SE
    ;

declaracao_enquanto
    : ENQUANTO expressao FACA lista_declaracao FIM-ENQUANTO
    ;

declaracao_para
    : PARA lvalue DE expressao ATE expressao FACA lista_declaracao FIM-PARA
    | PARA lvalue DE expressao ATE expressao passo_mudanca FACA lista_declaracao FIM-PARA
    ;
    
passo_mudanca
    : PASSO inteiro_literal
    | PASSO '+' inteiro_literal
    | PASSO '-' inteiro_literal
    ;

expressao
    : expressao OU expressao
    | expressao E expressao
    | expressao "|" expressao
    | expressao "^" expressao
    | expressao "&" expressao
    | expressao "=" expressao
    | expressao "<>" expressao
    | expressao ">" expressao
    | expressao ">=" expressao
    | expressao "<" expressao
    | expressao "<=" expressao
    | expressao "+" expressao
    | expressao "-" expressao
    | expressao "/" expressao
    | expressao "*" expressao
    | expressao "%" expressao
    | "+" termo
    | "-" termo
    | "~" termo
    | NAO termo
    | termo
    ;

termo
    : chamada_funcao
    | lvalue
    | literal
    | "(" expressao ")"
    ;

chamada_funcao
    : IDENTIFICADOR "(" argumentos ")"
    | IDENTIFICADOR "(" ")"
    ;

argumentos
    : expressao
    | argumentos ',' expressao
    ;

literal
    : STR_CONST
    | inteiro_literal
    | NUMERO_R
    | C_CONST
    | VERDADEIRO
    | FALSO
    ;

declaracao_funcao
    : FUNCAO IDENTIFICADOR "("  ")" declaracao_var_fun bloco_declaracao
    | FUNCAO IDENTIFICADOR "(" lista_parametros ")" declaracao_var_fun bloco_declaracao
    | FUNCAO IDENTIFICADOR "("  ")" ":" tipo_primitivo declaracao_var_fun bloco_declaracao
    | FUNCAO IDENTIFICADOR "(" lista_parametros ")" ":" tipo_primitivo declaracao_var_fun bloco_declaracao
    ;

declaracao_var_fun
    : var_decl ';'
    | declaracao var_decl ';'
    | %empty
    ;

lista_parametros
    : parametro
    | lista_parametros ',' parametro
    ;

parametro
    : IDENTIFICADOR ':' tipo_primitivo
    | IDENTIFICADOR ':' tipo_matriz
    ;

