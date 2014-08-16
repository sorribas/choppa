var test = require('tape');
var fs = require('fs');
var choppa = require('./');

test('basic test', function(t) {
  var chars = [];
  var chp = choppa();
  fs.createReadStream('./fixtures').pipe(chp).on('data', function(data) {
    chars.push(data.toString());
  });

  chp.on('finish', function() {
    t.equal(chars[0],  'W');
    t.equal(chars[1],  'h');
    t.equal(chars[2],  'e');
    t.equal(chars[3],  'n');
    t.equal(chars[4],  ' ');
    t.equal(chars[5],  'G');
    t.equal(chars[6],  'r');
    t.equal(chars[7],  'e');
    t.equal(chars[8],  'g');
    t.equal(chars[9],  'o');
    t.equal(chars[10], 'r');
    t.end();
  });
});
