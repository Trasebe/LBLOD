const DocTypes = require("../utils/DocTypes");

const format = "utf8";
const keyPrefix = `${DocTypes.WATCHMOVEMENT}-`;

async function QueryAll(stub, args) {
  const startKey = `${keyPrefix}0`;
  const endKey = `${keyPrefix}999999999`;

  const iterator = await stub.getStateByRange(startKey, endKey);

  if (iterator.response.results.length === 0) {
    return Buffer.from(JSON.stringify([]));
  }

  const allResults = [];
  while (true) {
    const it = await iterator.next();
    const { value, done } = it;
    const valueString = value.value.toString(format);

    if (value && valueString) {
      const jsonRes = {
        Key: value.key
      };

      try {
        jsonRes.Record = JSON.parse(valueString);
      } catch (err) {
        jsonRes.Record = valueString;
      }
      allResults.push(jsonRes);
    }
    if (done) {
      await iterator.close();
      return Buffer.from(JSON.stringify(allResults));
    }
  }
}

module.exports = QueryAll;
