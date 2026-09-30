# node-compress-buffer 

Synchronous Buffer compression library for Node.js.


## Synopsis

```javascript
compress = require('compress-buffer').compress;
uncompress = require('compress-buffer').uncompress;

var rawData = fs.readFileSync("/etc/passwd");

var compressed   = compress(rawData);
var uncompressed = uncompress(compressed);

uncompressed == rawData // true!
```


## Why? 

For the sake of the KISS principle. Most of the time you don't need a streaming compression, you need to compress an existing and already complete data. 


## Options 

<code>compress()</code> takes two arguments: the data (must be a <code>Buffer()</code>) and optional compression level which must be within 1..9. It returns compressed <code>Buffer()</code> or <code>undefined</code> on error.

<code>uncompress()</code> takes a single argument: the data (must be a <code>Buffer()</code>) and returns uncompressed <code>Buffer()</code> or <code>undefined</code> on error.

Both functions could throw exceptions in the following cases:

* zlib initialisation fails;
* first argument is not a <code>Buffer</code> instance.


## Installation

This is a native addon built with <code>node-gyp</code>, which needs a C++ toolchain, Python 3 and the zlib development files:

* Debian/Ubuntu: <code>sudo apt-get install build-essential python3 zlib1g-dev</code>
* Fedora/RHEL: <code>sudo dnf install gcc-c++ make python3 zlib-devel</code>
* Alpine: <code>apk add build-base python3 zlib-dev</code>
* macOS: <code>xcode-select --install</code> (zlib is included)

Then:

	npm install compress-buffer

or

	npm install .


## License

See LICENSE file. Basically, it's a kind of "do-whatever-you-want-for-free" license.


## Thanks to 

* A lot of thanks for important suggestions goes to Konstantin Käfer who implemented a nice similar module node-zlib (https://github.com/kkaefer/node-zlib) earlier than me;
* Oleg Kertanov, pccowboy, addisonj, David Swift

## Author

Egor Egorov <me@egorfine.com>.

