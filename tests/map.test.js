'use strict';

const map = require('../src/map');
const {createWorkFunction} = require('./fixtures');

describe('map()', () => {
  it('maps things in parallel', async () => {
    const work = createWorkFunction(Date.now());
    const times = await map(work, [0, 0, 0, 0, 0]); // each works for >=0ms
    expect(times).to.have.length(5);
    times.every(t => expect(t).to.be.within(0, 5));
  });

  it('maps things in limit', async () => {
    const work = createWorkFunction(Date.now());
    const times = await map(work, 2, [5, 5, 5]); // each works for >=5ms
    expect(times).to.have.length(3);
    times.slice(0, 2).every(t => expect(t).to.be.within(5, 10));
    expect(times[2]).to.be.within(10, 15);
  });
});
