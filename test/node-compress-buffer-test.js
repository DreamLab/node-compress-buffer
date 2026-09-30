const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const crypto = require('crypto');
const compress = require('../index').compress;
const uncompress = require('../index').uncompress;

function md5(data) {
	var md5=crypto.createHash('md5');
	md5.update(data);
	return md5.digest('hex');
}

var loremIpsum="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

test('basic compress', function() {
	var uncompressed = Buffer.from(loremIpsum);
	var compressed = compress(uncompressed);
	assert.equal(compressed.length,282);
	// byte 9 of the gzip header is the OS id set by zlib; pin it to Unix (3) so the hash is platform independent
	var normalized = Buffer.from(compressed);
	normalized[9] = 3;
	assert.equal(md5(normalized), "6e31946d851b7cab51e058653a16b666");
});

test('basic uncompress', function() {
	var uncompressed = Buffer.from(loremIpsum);
	var compressed = compress(uncompressed);
	uncompressed = uncompress(compressed);
	assert.equal(uncompressed.length,loremIpsum.length);
	assert.equal(md5(uncompressed), "fa5c89f3c88b81bfd5e821b0316569af");
});

test('compress with compression levels', function() {
	var uncompressedBuffer = fs.readFileSync(__dirname+"/node-compress-buffer-test.js");

	var compressed1 = compress(uncompressedBuffer, 1);
	var compressed9 = compress(uncompressedBuffer, 9);
	assert.ok(compressed1.length>compressed9.length);
});

test('string exceptions', function() {
	assert.throws(function() {
		compress(loremIpsum);
	});

	assert.throws(function() {
		uncompress(loremIpsum);
	});
});

test('compress short', function() {
	var buffer, compressed;

	buffer = Buffer.from("too short");
	compressed = compress(buffer);
	assert.notEqual(compressed,buffer);
	assert.notEqual(compressed.length,buffer.length);
});

test('errors', function() {
	var compressed = compress(Buffer.from(""));
	assert.ok(compressed.length>=0);

	var nothing = uncompress(Buffer.from(" sfsdcfgdfgsdgfdsgdgdsgdfgsdfgsdfgdfgfsfd "));
	assert.ok(nothing==null);
});
