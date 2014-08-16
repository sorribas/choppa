var through = require('through2');

var choppa = function(chunkSize) {
  chunkSize = chunkSize || 1;
  var prev = new Buffer(0);

  var transform = function(chunk, enc, cb) {
    chunk = Buffer.concat([prev, chunk]);
    var self = this;
    while (chunk.length >= chunkSize) {
      self.push(chunk.slice(0, chunkSize));
      chunk = chunk.slice(chunkSize);
    }

    prev = chunk;
    cb();
  };

  var flush = function() {
    this.push(prev);
  };

  return through(transform, flush);
};

module.exports = choppa;
