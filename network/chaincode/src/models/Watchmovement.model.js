const moment = require("moment");
const yup = require("yup");

const DocTypes = require("../utils/DocTypes");
const ErrorMessages = require("../utils/ErrorMessages");

async function WatchmovementModel(args) {
  const dateFromArgs = args[0];
  const date = moment(dateFromArgs, "YYYY-MM-DD", true);
  if (!date.isValid()) {
    throw new Error(ErrorMessages.InvalidDate(dateFromArgs));
  }

  const myObject = {
    docType: DocTypes.WATCHMOVEMENT,
    PurchaseDate: date,
    WatchHolder: args[1],
    WatchBrand: args[2],
    WatchType: args[3]
  };

  const schema = yup.object().shape({
    docType: yup.string().matches(/(watchmovement)/),
    PurchaseDate: yup.date().required(),
    WatchHolder: yup.string().required(),
    WatchBrand: yup.string().required(),
    WatchType: yup.string().required()
  });

  await schema.validate(myObject).catch(err => {
    throw new Error(err.errors);
  });

  return myObject;
}

module.exports = WatchmovementModel;
