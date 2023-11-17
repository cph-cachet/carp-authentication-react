function prepareLib() {
    const fs = require('fs')

    const source = fs.readFileSync(__dirname + "/../package.json").toString('utf-8');
    const sourceObj = JSON.parse(source);
    sourceObj.scripts = {};
    sourceObj.devDependencies = {};
    sourceObj.dependencies = {};

    fs.writeFileSync(__dirname + "/../lib/package.json", Buffer.from(JSON.stringify(sourceObj, null, 2), "utf-8") );
    fs.copyFileSync(__dirname + "/../.npmignore", __dirname + "/../lib/.npmignore");
    fs.copyFileSync(__dirname + "/../README.md", __dirname + "/../lib/README.md");
}

prepareLib();