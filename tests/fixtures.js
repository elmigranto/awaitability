'use strict';

module.exports = {
  createWorkFunction (started) {
    return (ms) => new Promise(resolve => {
      setTimeout(() => resolve(Date.now() - started), ms || 0);
    });
  }
};
