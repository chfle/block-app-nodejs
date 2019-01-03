'use strict';

const { clearHash } = require('../services/cache');

module.exports = async (reg, res, next) => {
  await next();

  clearHash(reg.user.id);
};
