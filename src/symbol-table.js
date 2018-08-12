module.exports.SymbolTable = SymbolTable;
module.exports.SymbolEntry = SymbolEntry;
module.exports.Scope = Scope;

function SymbolTable(algoritmo = "algoritmo") {
    this.scopes = {};
    this.algoritmo = algoritmo;
    this.declareVariable = function (name, scope = this.algoritmo, location = 0, type = "INTEIRO") {
        if (this.scopes[scope][name] !== undefined) return false;
        this.scopes[scope][name] = new SymbolEntry(
            location,
            type,
            ++this.scopes[scope].variableCount);
        return true;
    };
    this.declareScope = function (name = this.algoritmo, type = undefined) {
        this.scopes[name] = new Scope(type);
    };

    this.find = function (name, scope = this.algoritmo) {
        return this.scopes[scope][name];
    };

    this.getScope = function (scope = this.algoritmo) {
        return new Scope(this.scopes[scope].type, this.scopes[scope].variableCount);
    }

    this.refer = function (name, location, scope = this.algoritmo) {
        var result = this.find(name, scope);
        if (result) {
            this.scopes[scope][name].location.push(location);
            return true;
        } else {
            result = this.find(name);
            if (result) {
                this.scopes[this.algoritmo][name].location.push(location);
                return true;
            } else {
                return false;
            }
        }
    };
}

function SymbolEntry(location, type, id) {
    this.location = [location];
    this.type = type;
    this.id = id;
}

function Scope(type = undefined, variableCount = 0) {
    this.variableCount = variableCount;
    this.type = type;
}