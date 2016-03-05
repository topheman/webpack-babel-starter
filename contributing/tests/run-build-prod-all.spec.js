/**
 * This file is ran via `npm run contributing-test`
 */

const BUILD_DIR = __dirname + '/../../build';
const DIST_DIR = BUILD_DIR + '/dist';
const DEVTOOLS_DIR = DIST_DIR + '/devtools';

const expect = require('chai').expect;
const fs = require('fs');
const helpers = require('./helpers');
const package = require('../../package.json');
//const stats = require(DIST_DIR + '/stats.json');

describe('[TEST]npm run build-prod-all', function() {
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
    it('0 .map file should have ben generated', function() {
      expect(listOfFilesByExtension.map && listOfFilesByExtension.map.length || 0).to.be.eql(0);
    });
    it('4 .png file should have ben generated', function() {
      expect(listOfFilesByExtension.png.length).to.be.eql(4);
    });
  });
  describe('check generated files by extension in /devtools', function() {
    var listOfFilesByExtension;
    before(function() {
      listOfFilesByExtension = helpers.listFilesByExtensionFromDirectory(DEVTOOLS_DIR)
      Object.assign(listOfFilesByExtension, helpers.listFilesByExtensionFromDirectory(DEVTOOLS_DIR + '/assets'));
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
});
