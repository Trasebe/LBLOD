const initialData = require("../__mocks__/initialData");
const DocTypes = require("../utils/DocTypes");

async function initLedger(stub) {
  const data = [];

  for (let i = 0; i < initialData.length; i++) {
    const key = `${DocTypes.WATCHMOVEMENT}-${i}`;

    const myObject = initialData[i];
    myObject.docType = DocTypes.WATCHMOVEMENT;

    const myParsedObject = Buffer.from(JSON.stringify(myObject));
    const result = await stub.putState(key, myParsedObject);
    data.push(result);
  }

  return data;
}

module.exports = initLedger;
