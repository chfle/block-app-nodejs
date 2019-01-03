'use strict';

const mongoose = require('mongoose');
const redis = require('redis');

const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
  const key = JSON.stringify(Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name,
  }));

  // See if we have a value for 'key' in redis
  const cacheValue = await client.get(key);

  // if return that
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);

    // create a model for each obj or array
    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }

  // otherwise issue the query and store it in redis
  const result = await exec.apply(this, arguments);

  client.set(key, JSON.stringify(result));

  return result;
};
