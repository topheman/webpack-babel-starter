/**
 * This file is ran via `npm run contributing-test`
 */

const BUILD_DIR = __dirname + '/../../build';
const DIST_DIR = BUILD_DIR + '/dist';

const expect = require('chai').expect;
const fs = require('fs');
const helpers = require('./helpers');
const package = require('../../package.json');
//const stats = require(DIST_DIR + '/stats.json');

const fileNames = {
  'bundle.js': 'bundle.js',
  'main.css': 'main.css'
}

describe('[TEST]npm run build', function() {
  describe('check generated files by extension', function() {
    var listOfFilesByExtension;
    before(function() {
      listOfFilesByExtension = helpers.listFilesByExtensionFromDirectory(DIST_DIR)
      Object.assign(listOfFilesByExtension, helpers.listFilesByExtensionFromDirectory(DIST_DIR + '/assets'));
    });
    it('1 .html file should have ben generated', function() {
      expect(listOfFilesByExtension.html.length).to.be.eql(1);
    });
    it('3 .js file should have ben generated', function() {
      expect(listOfFilesByExtension.js.length).to.be.eql(3);
    });
    it('1 .css file should have ben generated', function() {
      expect(listOfFilesByExtension.css.length).to.be.eql(1);
    });
    it('4 .map file should have ben generated', function() {
      expect(listOfFilesByExtension.map && listOfFilesByExtension.map.length || 0).to.be.eql(4);
    });
    it('4 .png file should have ben generated', function() {
      expect(listOfFilesByExtension.png.length).to.be.eql(4);
    });
  });
  describe('check external references in index.html', function() {
    var indexFileContent;
    before(function() {
      indexFileContent = fs.readFileSync(DIST_DIR + '/index.html').toString();
    });
    it(`link to ${fileNames['main.css']} should be relative`, function() {
      const matches = indexFileContent.match(/\<link href=\"((.*)\.css)\" rel=\"stylesheet\">/m);
      reg = new RegExp(`^${fileNames['main.css']}$`);
      expect(matches[1]).to.match(reg);
    });
    it(`link to ${fileNames['bundle.js']} should be relative`, function() {
      const matches = indexFileContent.match(/\<script src=\"((.*)\.js)\"><\/script>/m);
      reg = new RegExp(`^${fileNames['bundle.js']}$`);
      expect(matches[1]).to.match(reg);
    });
    it('link to <img> webpack-logo.png should be relative', function() {
      const matches = indexFileContent.match(/\<img src=\"((.*)\.png)\"(.*)\/>/m);
      expect(matches[1]).to.match(/^assets/);
    });
  });
  describe('check footers and headers decorations', function() {
    it('index.html should contain a footer with a correct version', function() {
      indexFileContent = fs.readFileSync(DIST_DIR + '/index.html').toString();
      matches = indexFileContent.match(/(\@version v(\d\.\d.\d))/);
      expect(matches[1]).to.match(/^\@version/);
      expect(matches[2]).to.eql(package.version);
    });
    it(`${fileNames['bundle.js']} should contain a header with a correct version`, function() {
      indexFileContent = fs.readFileSync(DIST_DIR + '/' + fileNames['bundle.js']).toString();
      matches = indexFileContent.match(/(\@version v(\d\.\d.\d))/);
      expect(matches[1]).to.match(/^\@version/);
      expect(matches[2]).to.eql(package.version);
    });
    it(`${fileNames['main.css']} should contain a header with a correct version`, function() {
      indexFileContent = fs.readFileSync(DIST_DIR + '/' + fileNames['main.css']).toString();
      matches = indexFileContent.match(/(\@version v(\d\.\d.\d))/);
      expect(matches[1]).to.match(/^\@version/);
      expect(matches[2]).to.eql(package.version);
    });
  });
});
