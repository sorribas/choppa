var through = require('through2');

var choppa = function(chunkSize) {
  chunkSize = chunkSize === undefined ? 1 : chunkSize;
  var prev = new Buffer(0);

  var transform = function(chunk, enc, cb) {
    chunk = Buffer.concat([prev, chunk]);
    var self = this;
    if (chunkSize > 0) {
      while (chunk.length >= chunkSize) {
        self.push(chunk.slice(0, chunkSize));
        chunk = chunk.slice(chunkSize);
      }
      prev = chunk;
    } else {
      while (chunk.length) {
        var size = Math.floor(Math.random() * chunk.length) + 1;
        self.push(chunk.slice(0, size));
        chunk = chunk.slice(size);
      }
    }

    cb();
  };

  var flush = function(cb) {
    this.push(prev);
    cb();
  };

  return through(transform, flush);
};

module.exports = choppa;
