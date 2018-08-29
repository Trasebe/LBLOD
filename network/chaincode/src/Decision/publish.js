async function Create(stub, args) {
  // Validate if the correct amount of arguments is parsed
  if (args.length !== 5) {
    throw new Error(ErrorMessages.InvalidNumberOfArgs(5));
  }

  // decreases size of args as it strips the key out of it
  const key = args.shift();

  // Check if key already exists
  const keyExists = await exists(stub, key);
  if (keyExists) {
    throw new Error(ErrorMessages.AlreadyExists(key));
  }

  // Map the arguments to a JSON object and validate the scheme
  const myObject = await ValidateWatchModel(args);
  // Parse the object to satisfy fabric's putState method
  const myParsedObject = Buffer.from(JSON.stringify(myObject));

  // Update ledger with the new object and it's key
  return await stub.putState(key, myParsedObject);
}

module.exports = Create;
