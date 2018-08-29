module.exports = {
  FunctionNotFound(data) {
    return `Received unknown function ${data} invocation.`;
  },
  InvalidNumberOfArgs(data) {
    return `This function requires ${data} amount of arguments, including the key.`;
  },
  AlreadyExists(data) {
    return `The object you're trying to persist with key: ${data}, already exists.`;
  },
  InvalidDate(data) {
    return `Invalid date: ${data} was passed as an argument. Please check the format (YYYY-MM-DD).`;
  }
};
