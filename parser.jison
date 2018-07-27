/* lexical grammar */
%lex
NUMERO_DECIMAL        [0-9]+
NUMERO_OCTAL          "0"[cC][0-8]+
NUMERO_HEXADECIMAL    "0"[xX][0-9a-fA-F]+
NUMERO_BINARIO        "0"[bB][01]+
NUMERO_REAL           [0-9]+"."[0-9]+
%%

\s+                   /* skip whitespace */
{NUMERO_BINARIO}        %{
                            console.log("BINARIO " + yytext + "\n");
                            return 'BINARIO'
                        %}
{NUMERO_HEXADECIMAL}    %{
                            console.log("OCTAL " + yytext + "\n");
                            return 'OCT'
                        %}
{NUMERO_HEXADECIMAL}    %{
                            console.log("HEXADECIMAL " + yytext + "\n");
                            return 'HEX'
                        %}
{NUMERO_REAL}           %{
                            console.log("REAL "+ yytext + "\n");
                            return 'NUMERO'
                        %}
{NUMERO_DECIMAL}        %{
                            console.log("DECIMAL " + yytext + "\n");
                            return 'NUMERO'
                        %}
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"!"                   return '!'
"%"                   return '%'
"("                   return '('
")"                   return ')'
"PI"                  return 'PI'
"E"                   return 'E'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

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
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
    ;

