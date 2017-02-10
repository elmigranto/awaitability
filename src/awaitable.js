'use strict';

// awaitable(fn, [arg1, [arg2[, ..., argN]]])
// Always returns array of results.
const awaitableSpread = (fn, ...args) => {
  if (typeof fn !== 'function')
    throw new Error(`awaitable() needs a function as first argument, got "${typeof func}"`);

  return new Promise((resolve, reject) => {
    fn.call(null, ...args, (err, ...results) => {
      return err
        ? reject(err)
        : resolve(results);
    });
  });
};

// Same as awaitableSpread() except always returns first result.
const awaitable = async (...everything) => (await awaitableSpread(...everything))[0];

module.exports = awaitable;
module.exports.spread = awaitableSpread;
