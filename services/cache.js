'use strict';

const mongoose = require('mongoose');
const redis = require('redis');

const util = redis('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function () {
  const key = Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name,
  });

  // See if we have a value for 'key' in redis

  // if return that


  // otherwise issue the query and store it in redis

  return exec.apply(this, arguments);
};
