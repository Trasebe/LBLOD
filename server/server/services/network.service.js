import path from "path";
import os from "os";
import Fabric_Client from "fabric-client"; // eslint-disable-line
import Fabric_CA_Client from "fabric-ca-client"; // eslint-disable-line
import log from "../../config/Log";
import * as labels from "../../config/labels";
import config from "../../config/config";

const fabricClient = new Fabric_Client();
let fabricCaClient = null;
let channel = null;
let eventHub = null;
let adminUser = null;

const {
  CHANNEL_NAME,
  PEERS,
  ORDERERS,
  CA_DOMAIN,
  CA_URL,
  ORG_MSP,
  EVENTHUB
} = config;

const validateUser = userContext => !!(userContext && userContext.isEnrolled());

const login = async user => {
  // TODO usee getUserContext with username + password
  const userFromStore = await fabricClient.getUserContext(user.username, true);
  const retrievedUser = validateUser(userFromStore) ? userFromStore : null;
  log(labels.NETWORK).info(`Logged in as ${retrievedUser}`);
  return userFromStore;
};

const register = async (user, secret = null) => {
  // Check is user is already enrolled or not
  // TODO usee getUserContext with username + password
  const userFromStore = await fabricClient.getUserContext(user.username, true);

  // If user is already enrolled, return null
  if (validateUser(userFromStore)) {
    log(labels.NETWORK).info(`${userFromStore._name} is already registered.`);

    // TODO reject
    return Promise.reject(
      new Error(`${userFromStore._name} is already registered.`)
    );
  }

  // If secret is given, use that. Else register and create secret
  if (!secret) {
    // eslint-disable-next-line no-param-reassign
    secret = await fabricCaClient
      .register(
        {
          role: user.role,
          enrollmentID: user.username,
          affiliation: user.affiliation,
          attrs: [
            {
              name: user.role,
              value: user.identification,
              ecert: true
            }
          ]
        },
        adminUser
      )
      .catch(err => Promise.reject(new Error(`${err}. Failed to register.`)));
  }

  // Enroll the user
  const enrollment = await fabricCaClient
    .enroll({
      enrollmentID: user.username,
      enrollmentSecret: secret
    })
    .catch(err => Promise.reject(new Error(`${err}. Failed to enroll.`)));

  // Create the user
  return fabricClient.createUser({
    username: user.username,
    mspid: ORG_MSP,
    cryptoContent: {
      privateKeyPEM: enrollment.key.toBytes(),
      signedCertPEM: enrollment.certificate
    },
    skipPersistence: false
  });
};

const initFabric = async () => {
  // setup the fabric network
  channel = fabricClient.newChannel(CHANNEL_NAME);

  // Add peers
  PEERS.map(peer => {
    const currentPeer = fabricClient.newPeer(peer);
    channel.addPeer(currentPeer);
  });

  // Add orderers
  ORDERERS.map(orderer => {
    const currentOrderer = fabricClient.newOrderer(orderer);
    channel.addOrderer(currentOrderer);
  });

  // Add event hub
  eventHub = fabricClient.newEventHub();
  eventHub.setPeerAddr(EVENTHUB);

  // Define storepath
  const storePath = path.join(os.homedir(), ".hfc-key-store");
  log(labels.NETWORK).info(`Store path is located at: ${storePath}`);

  // Set new crypto suite
  const cryptoSuite = Fabric_Client.newCryptoSuite();
  fabricClient.setCryptoSuite(cryptoSuite);

  // Set default key-value store to storePath
  const stateStore = await Fabric_Client.newDefaultKeyValueStore({
    path: storePath
  });
  fabricClient.setStateStore(stateStore);

  // Set crypto keystore to storePath
  const cryptoStore = Fabric_Client.newCryptoKeyStore({ path: storePath });
  cryptoSuite.setCryptoKeyStore(cryptoStore);

  const tlsOptions = {
    trustedRoots: [],
    verify: false
  };

  // Set Fabric Certificate Authority client
  // be sure to change the http to https when the CA is running TLS enabled
  fabricCaClient = new Fabric_CA_Client(
    CA_URL,
    tlsOptions,
    CA_DOMAIN,
    cryptoSuite
  );

  // Check if admin is enrolled
  const userFromStore = await fabricClient.getUserContext("admin", true);

  // If admin exists, set admin
  // Else enroll admin and set admin
  if (userFromStore && userFromStore.isEnrolled()) {
    adminUser = userFromStore;
  } else {
    // TODO no hardcoding
    adminUser = await register(
      {
        username: "admin",
        role: "admin",
        affiliation: "org1.department1"
      },
      "adminpw"
    );
  }

  // Return statement
  return Promise.resolve(adminUser);
};

const getFabricClient = () => fabricClient;
const getChannel = () => channel;
const getEventHub = () => eventHub;

export default {
  getFabricClient,
  getChannel,
  getEventHub,
  initFabric,
  register,
  login
};
