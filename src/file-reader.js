var fs = require('fs');


const FileReader = function (path = "./examples/fatorial-recursivo.gpt", encoding = "utf-8"){
    this.path = path;
    this.encoding = encoding;
    this.read = () => fs.readFileSync(this.path, this.encoding);
}


module.exports = FileReader;