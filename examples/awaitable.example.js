'use strict';

const fs = require('fs');
const dns = require('dns');
const awaitable = require('../src/awaitable');

const main = async () => {
  // Use awaitabale() when:
  //   - callback() is invoked with single argument;
  //   - or you only interested in the first argument anyways.
  const stat = await awaitable(fs.stat, __filename);
  const address = await awaitable(dns.lookup, 'localhost');

  // Here's an example of how to pass multiple arguments
  // and access multiple callback() arguments using destructuring.
  const source = await awaitable(fs.readFile, __filename, 'utf8');
  const [address6, family6] = await awaitable.spread(dns.lookup, 'localhost', 6);

  console.log({ // eslint-disable-line no-console
    stat,
    source,
    address,
    address6, family6
  });
};

if (!module.parent)
  main();
