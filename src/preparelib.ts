import * as fs from 'fs';

function prepareLib() {
    const source = fs.readFileSync(__dirname + "/../package.json").toString('utf-8');
    const sourceObj = JSON.parse(source);
    sourceObj.scripts = {};
    sourceObj.devDependencies = {};
    sourceObj.dependencies = {};

    fs.writeFileSync(__dirname + "/package.json", Buffer.from(JSON.stringify(sourceObj, null, 2), "utf-8") );
    fs.copyFileSync(__dirname + "/../.npmignore", __dirname + "/.npmignore");
    fs.copyFileSync(__dirname + "/../README.md", __dirname + "/README.md");
}

prepareLib();