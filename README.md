choppa
======

Through stream that chops a stream into specified size chunks. The main purpose of the module is to test if your
stream behaves the same way when it receives different sized chunks.

Install
-------

```
npm install choppa
```

![get to da choppa](http://i.imgur.com/gU2Tw.gif)

Usage
-----

```js
var choppa = require('choppa');

readableStream.pipe(choppa()).pipe(writableStream);  // writable stream will receive 1 byte at a time.
readableStream.pipe(choppa(5)).pipe(writableStream); // writable stream will receive 5 byte at a time.


//You can also pass a 0 to the choppa constructor and the size of each chunk will be random
readableStream.pipe(choppa(0)).pipe(writableStream);
```
