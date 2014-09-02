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

test('test limit', function(t) {
  var chars = [];
  var chp = choppa(3);
  fs.createReadStream('./fixtures').pipe(chp).on('data', function(data) {
    chars.push(data.toString());
  });

  chp.on('finish', function() {
    t.equal(chars[0],  'Whe');
    t.equal(chars[1],  'n G');
    t.equal(chars[2],  'reg');
    t.equal(chars[3],  'or ');
    t.end();
  });
});

test('async pipe', function(t) {
  var chars = [];
  var chp = choppa();

  setTimeout(function() {
    chp.on('data', function(data) {
      chars.push(data.toString());
    });
  }, 400);

  chp.on('end', function() {
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
  fs.createReadStream('./fixtures').pipe(chp);
});

test('strings instead of buffers', function(t) {
  var chars = [];
  var chp = choppa();
  chp.on('data', function(data) {
    chars.push(data.toString());
  });
  chp.write('When Gregor Samsa');
  chp.end();

  chp.on('end', function() {
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


