const fs = require('fs');
const path = require('path');

function listFilesByExtensionFromDirectory(directory) {
  return listFilesFromDirectory(directory)
    .reduce(function(filesByExt, filename) {
      var ext = filename.split('.');
      ext = ext[ext.length - 1];
      filesByExt[ext] = filesByExt[ext] || [];
      filesByExt[ext].push(filename);
      return filesByExt;
    }, {});
}

function listFilesFromDirectory(directory) {
  return fs.readdirSync(directory)
    .filter(function(filename) {
      return !fs.statSync(path.resolve(directory, filename)).isDirectory();
    });
}

module.exports = {
  listFilesByExtensionFromDirectory: listFilesByExtensionFromDirectory,
  listFilesFromDirectory: listFilesFromDirectory
};
