const { createClient } = require('redis');

const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

client.on('error', (err) => console.error('Redis Client Error', err));

client.on('connect', () => console.log('Connected to redis successfully'));

client.connect();

const setEx = (key, value, expire) =>
  client.setEx(key, expire, JSON.stringify(value));

const get = (key) => client.get(key);

const del = (key) => client.del(key);

module.exports = { setEx, get, del };
