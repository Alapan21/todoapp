const path = require('path');
const util = require('util');
const fs = require('fs');

// file reader method
function fileReader(fileName) {
    const dpath = path.join(__dirname, fileName);
    return fs.readFileSync(dpath, (err, data) => data);
}

//file write method
function fileWriter(fileName, data) {
    const dpath = path.join(__dirname, fileName);
    fs.writeFileSync(dpath, JSON.stringify(data));
}

module.exports = {
    fileReader, fileWriter
}



