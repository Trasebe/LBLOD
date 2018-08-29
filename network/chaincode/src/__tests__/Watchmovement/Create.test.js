// Import function to test
const Create = require("../../Watchmovement/Create");

// Import mocks/stub
const stub = require("../../__mocks__/stub");

// Import functions to mocks/stubs
const Utils = require("../../helpers/utils");
const ErrorMessages = require("../../helpers/ErrorMessages");

// Import all functions, only override the ones you want to mock
jest.mock("../../helpers/utils", () =>
  Object.assign(require.requireActual("../../helpers/utils"), {
    exists: jest.fn()
  })
);

describe("Creating an acknowledgement", () => {
  let ackNoArgs;
  let ackCorrect;

  beforeEach(() => {
    ackNoArgs = [];
    ackCorrect = [
      "erkenning-005",
      "DV.O101814",
      "VLAIO",
      "2018-06-26",
      "",
      "0694.685.789",
      "2.111.222.333",
      "Basiskennis Bedrijfsbeheer",
      "eenBehandelaar",
      "001"
    ];
  });

  it("Should throw error - incorrect number of arguments", async () => {
    // Setup
    const objectUsed = ackNoArgs;
    Utils.exists.mockResolvedValue(false);

    // Execution
    const call = CreateAcknowledgement(stub, objectUsed);

    // Assertion
    await expect(call).rejects.toThrow();
    expect(Utils.exists).not.toHaveBeenCalled();
  });

  it("Should Succeed with status 001", async () => {
    // Setup
    const objectUsed = ackCorrect;
    Utils.exists.mockResolvedValue(false);

    // Execution
    const call = CreateAcknowledgement(stub, objectUsed);

    // Assertion
    await expect(call).resolves.not.toBe(undefined);
    expect(objectUsed.length).toBe(9);
    expect(Utils.exists).toHaveBeenCalled();
  });

  it("Should Succeed with status 002", async () => {
    // Setup
    ackNoStatus.push("002");
    const objectUsed = ackNoStatus;
    Utils.exists.mockResolvedValue(false);

    // Execution
    const call = CreateAcknowledgement(stub, objectUsed);

    // Assertion
    await expect(call).resolves.not.toBe(undefined);
    expect(objectUsed.length).toBe(9);
    expect(objectUsed[objectUsed.length - 1]).toBe("002");
    expect(Utils.exists).toHaveBeenCalled();
  });

  it("Should throw error as the acknowledgement already exists", async () => {
    // Setup
    const objectUsed = ackCorrect;
    Utils.exists.mockResolvedValue(true);

    // Execution
    const call = CreateAcknowledgement(stub, objectUsed);

    // Assertion
    await expect(call).rejects.toThrow(ErrorMessages.AckAlreadyExists);
    await expect(call).rejects.not.toThrow(ErrorMessages.KeyNotFound);
    await expect(call).rejects.not.toThrow(ErrorMessages.AckIncorrectStatus);
  });

  it("Should throw error as the status is 003", async () => {
    // Setup
    ackNoStatus.push("003");
    const objectUsed = ackNoStatus;
    Utils.exists.mockResolvedValue(false);

    // Execution
    const call = CreateAcknowledgement(stub, objectUsed);

    // Assertion
    await expect(call).rejects.toThrow(ErrorMessages.AckIncorrectStatus);
    await expect(call).rejects.not.toThrow(ErrorMessages.KeyNotFound);
    await expect(call).rejects.not.toThrow(ErrorMessages.AckAlreadyExists);

    expect(objectUsed.length).toBe(9);
    expect(objectUsed[objectUsed.length - 1]).toBe("003");
    expect(Utils.exists).toHaveBeenCalled();
  });

  it("Should throw error as the status is 004", async () => {
    // Setup
    ackNoStatus.push("004");
    const objectUsed = ackNoStatus;
    Utils.exists.mockResolvedValue(false);

    // Execution
    const call = CreateAcknowledgement(stub, objectUsed);

    // Assertion
    await expect(call).rejects.toThrow(ErrorMessages.AckIncorrectStatus);
    await expect(call).rejects.not.toThrow(ErrorMessages.KeyNotFound);
    await expect(call).rejects.not.toThrow(ErrorMessages.AckAlreadyExists);

    expect(objectUsed.length).toBe(9);
    expect(objectUsed[objectUsed.length - 1]).toBe("004");
    expect(Utils.exists).toHaveBeenCalled();
  });

  it("Should work with a start date in the future and empty endDate", async () => {
    // Setup
    const objectUsed = ackValidDate;
    Utils.exists.mockResolvedValue(false);

    // Execution
    const call = CreateAcknowledgement(stub, objectUsed);

    // Assertion
    await expect(call).resolves.not.toBe(undefined);
    expect(Utils.exists).toHaveBeenCalled();
  });

  it("Should work with a start date in the future and given endDate", async () => {
    // Setup
    const objectUsed = ackValidDate2;
    Utils.exists.mockResolvedValue(false);

    // Execution
    const call = CreateAcknowledgement(stub, objectUsed);

    // Assertion
    await expect(call).resolves.not.toBe(undefined);
    expect(Utils.exists).toHaveBeenCalled();
  });

  it("Should not work - invalid start date", async () => {
    // Setup
    const objectUsed = ackInvalidDate;
    Utils.exists.mockResolvedValue(false);

    // Execution
    const call = CreateAcknowledgement(stub, objectUsed);

    // Assertion
    await expect(call).rejects.toThrow(ErrorMessages.InvalidDate);
    await expect(call).rejects.not.toThrow(ErrorMessages.KeyNotFound);
    await expect(call).rejects.not.toThrow(ErrorMessages.AckAlreadyExists);
    expect(Utils.exists).toHaveBeenCalled();
  });
});
