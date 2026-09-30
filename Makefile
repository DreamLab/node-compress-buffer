TESTS = test/

all: test

build: clean configure compile

configure:
	node-gyp configure

compile: configure
	node-gyp build

test: build
	@node --test $(TESTS)

clean:
	node-gyp clean


.PHONY: clean test build
