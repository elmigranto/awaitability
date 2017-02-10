'use strict';

const fs = require('fs');
const awaitable = require('../src/awaitable');
const map = require('../src/map');

const main = async () => {
  // Let's create a little helper function that we'll use
  // to retrieve inode numbers for file paths.
  const inode = async (pathname) => (await awaitable(fs.stat, pathname)).ino;
  const files = [__filename, __dirname, '/etc/passwd'];

  // map() allows you to translate array of inputs via the promise maker.
  // These run simultaneously (in parallel).
  const simpleMap = await map(inode, files);

  // If conviniet, feel free to create specific functions.
  const statFiles = map.bind(null, inode);
  const boundMap = await statFiles(files);

  // You can also pass in additional argument to limit concurrency
  // (number of tasks that are running at any given moment).
  const limitedMap = await map(inode, 1, files);
  const boundLimitedMap = await statFiles(1, files);

  console.log({ // eslint-disable-line no-console
    simpleMap,
    boundMap,
    limitedMap,
    boundLimitedMap
  });
};

if (!module.parent)
  main();
