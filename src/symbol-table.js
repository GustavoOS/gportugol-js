module.exports.SymbolTable = SymbolTable;
module.exports.SymbolEntry = SymbolEntry;
module.exports.Scope = Scope;

function SymbolTable(algoritmo = "algoritmo") {
    this.scopes = {};
    this.algoritmo = algoritmo;
    this.declareVariable = function (name, scope = this.algoritmo, type = undefined, dimensions = undefined, location = undefined) {
        if (this.scopes[scope][name] !== undefined) return false;
        this.scopes[scope][name] = new SymbolEntry(
            ++this.scopes[scope].variableCount,
            type,
            dimensions,
            location
        );
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

function SymbolEntry(id, type=undefined, dimensions = undefined, location = undefined) {
    this.location = [location];
    this.type = type;
    this.id = id;
    this.dimensions = dimensions;
}

function Scope(type = undefined, variableCount = 0) {
    this.variableCount = variableCount;
    this.type = type;
}