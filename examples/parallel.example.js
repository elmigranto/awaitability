'use strict';

const fs = require('fs');
const dns = require('dns');
const awaitable = require('../src/awaitable');
const parallel = require('../src/parallel');

const main = async () => {
  // Run multiple tasks in parallel.
  // Make sure to provide a function that returns a promise
  // (as opposed to passing array of promises directly, like with Promise.all).
  const parallelArray = await parallel([
    () => awaitable(fs.stat, __filename),
    () => awaitable(dns.lookup, 'localhost')
  ]);

  // You can limit concurency (max number of tasks running at any given time).
  // When using array of tasks, promises are ran in that order.
  const started = Date.now();
  const parallelArrayLimit = await parallel(2, [
    () => awaitable(fs.stat, __filename),
    () => new Promise(resolve => setTimeout(() => resolve(Date.now() - started))),
    () => awaitable(dns.lookup, 'localhost'),
    () => new Promise(resolve => setTimeout(() => resolve(Date.now() - started))),
  ]);

  // It is possible to use objects as well, both with and without limit.
  // Note that order of execution is not guranteed.
  const parallelObject = await parallel({
    fsStat: () => awaitable(fs.stat, __filename),
    dnsLookup: () => awaitable(dns.lookup, 'localhost')
  });

  console.log({ // eslint-disable-line no-console
    parallelArray,
    parallelArrayLimit,
    parallelObject
  });
};

if (!module.parent)
  main();
