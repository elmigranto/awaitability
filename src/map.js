'use strict';

// const map = ({
//   concurrency = Infinity
// } = {})

const map = (toPromise, things) => Promise.all(things.map(t => toPromise(t)));
const mapLimit = async function (toPromise, limit, things) {
  const results = [];

  for (let current = 0; current < things.length; current += limit)
    results.push(...await map(toPromise, things.slice(current, current + limit)));

  return results;
};

module.exports = function (toPromise, limit, array) {
  return arguments.length === 2
    ? map(toPromise, limit)
    : mapLimit(toPromise, limit, array);
};

// TODO
// this stuff
//
// module.exports.values = function (toPromise, limit, object) {
//   return arguments.length === 2
//     ? map(toPromise, Object.values(limit))
//     : mapLimit(toPromise, limit, Object.values(object));
// };
