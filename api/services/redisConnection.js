const redis = require("redis");
const redisclient = redis.createClient();

(async () => {
  await redisclient.connect();
})();

console.log("Redis: Connecting to the Redis");

redisclient.on("ready", () => {
  console.log("Redis: Connected!");
});

redisclient.on("error", (err) => {
  console.log("Redis: Error in the Connection");
});

async function setMValue(key1, key2, value) {
  //await redisclient.set(key, value);
  await redisclient.hSet(key1, key2, value);
}

async function setValue(key, value) {
  await redisclient.set(key, value);
}

async function getValue(key) {
  const v = await redisclient.get(key);
  return v;
}

async function getMValue(key1, key2) {
  const v = await redisclient.hGet(key1, key2);
  return v;
}

// async function hsetValue(key1, key1, value) {
//   const client = await createClient()
//     .on("error", (err) => console.error("Redis Client Error", err))
//     .connect();
//   await client.hset(key1, key1, value);
// }

async function clearCache(key) {
  console.log("salam");
  await redisclient.del(key);
}

module.exports.setValue = setValue;
module.exports.getValue = getValue;
module.exports.setMValue = setMValue;
module.exports.clearCache = clearCache;
module.exports.getMValue = getMValue;
