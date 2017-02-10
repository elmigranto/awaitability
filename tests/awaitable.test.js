'use strict';

const awaitable = require('../src/awaitable');

describe('awaitable()', () => {
  it('awaitable.spread(fn)', async () => {
    const callbackApi = (cb) => setImmediate(cb);
    await awaitable.spread(callbackApi);
  });

  it('awaitable.spread(fn, oneArg)', async () => {
    const callbackApi = (x, cb) => setImmediate(cb, null, x);
    const result = await awaitable.spread(callbackApi, 1);
    expect(result).to.eql([1]);
  });

  it('awaitable.spread(fn, multiple, argu, ments)', async () => {
    const callbackApi = (x, y, z, cb) => setImmediate(cb, null, x, y, z);
    const result = await awaitable.spread(callbackApi, 1, 2, 3);
    expect(result).to.eql([1, 2, 3]);
  });

  it('awaitable(non-function) throws', async () => {
    const mustThrow = async (fn) => {
      try {
        await awaitable(fn);
      }
      catch (e) {
        expect(e).to.be.instanceof(Error);
        expect(e.message).to.match(/needs a function/);
      }
    };

    mustThrow();
    mustThrow(null);
  });

  it('awaitable.spread(non-function) throws', () => {
    expect(awaitable.spread).to.throw(/needs a function/);
    expect(() => awaitable.spread(42)).to.throw(/needs a function/);
  });

  describe('awaitable() always returns first argument', () => {
    const callbackApi = (...args) => setImmediate(args[args.length - 1], null, ...args.slice(0, -1));

    it('no arguments', async () => {
      expect(await awaitable(callbackApi)).to.equal(undefined);
    });

    it('single argument', async () => {
      expect(await awaitable(callbackApi, 1)).to.equal(1);
    });

    it('multiple arguments', async () => {
      expect(await awaitable(callbackApi, ...[1, 2, 3])).to.equal(1);
    });
  });

  describe('awaitable.spread() always returns array', () => {
    const callbackApi = (...args) => setImmediate(args[args.length - 1], null, ...args.slice(0, -1));

    it('no arguments', async () => {
      expect(await awaitable.spread(callbackApi)).to.eql([]);
    });

    it('single argument', async () => {
      expect(await awaitable.spread(callbackApi, ...[1])).to.eql([1]);
    });

    it('multiple arguments', async () => {
      expect(await awaitable.spread(callbackApi, ...[1, 2, 3])).to.eql([1, 2, 3]);
    });
  });
});
