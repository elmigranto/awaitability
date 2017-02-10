'use strict';

const parallel = require('../src/parallel');
const {createWorkFunction} = require('./fixtures');

describe('parallel()', () => {
  it('runs array of tasks', async () => {
    const work = createWorkFunction(Date.now());
    const results = await parallel([
      () => work(0),
      () => work(0),
      () => work(0)
    ]);
    expect(results).to.have.length(3);
    expect(results.every(t => t < 5)).to.be.true;
  });

  it('runs array of tasks with concurrency limit', async () => {
    const work = createWorkFunction(Date.now());
    const results = await parallel(2, [
      () => work(5),
      () => work(5),
      () => work(5)
    ]);
    expect(results).to.have.length(3);
    results.slice(0, 2).every(t => expect(t).to.be.within(5, 10));
    expect(results[2]).to.be.within(10, 15);
  });

  it('runs object of tasks', async () => {
    const work = createWorkFunction(Date.now());
    const results = await parallel({
      first: () => work(0),
      second: () => work(0),
      third: () => work(0)
    });

    expect(results).to.have.all.keys('first', 'second', 'third');
    expect(Object.values(results).every(t => t < 5)).to.be.true;
  });

  it('runs object of tasks with concurrency limit', async () => {
    const work = createWorkFunction(Date.now());
    const results = await parallel(1, {
      first: () => work(5),
      second: () => work(5),
      third: () => work(5)
    });

    expect(results).to.have.all.keys('first', 'second', 'third');
    expect(results.first).to.be.within(5, 10);
    expect(results.second).to.be.within(10, 15);
    expect(results.third).to.be.within(15, 20);
  });
});
