'use strict';

const runOnObject = async (tasks, awaitable) => {
  const entries = Object.entries(tasks);
  const promises = entries.map(([key, val]) => val);
  const results = await awaitable(promises);

  return entries.reduce((accumulator, [key], idx) => {
    accumulator[key] = results[idx];
    return accumulator;
  }, {});
};

const parallelArray = (tasks) => Promise.all(tasks.map(t => t()));
const parallelLimitArray = async (limit, tasks) => {
  const results = [];

  for (let current = 0; current < tasks.length; current += limit)
    results.push(...await parallelArray(tasks.slice(current, current + limit)));

  return results;
};

const parallelObject = (tasks) => runOnObject(
  tasks,
  promises => parallelArray(promises)
);

const parallelLimitObject = (limit, tasks) => runOnObject(
  tasks,
  promises => parallelLimitArray(limit, promises)
);

module.exports = function (limit, tasks) {
  return (arguments.length === 1)
    ? (Array.isArray(limit) ? parallelArray : parallelObject)(limit)
    : (Array.isArray(tasks) ? parallelLimitArray : parallelLimitObject)(limit, tasks);
};
