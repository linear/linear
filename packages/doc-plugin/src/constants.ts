export default {
  ID_NAME: "id",
  CONNECTION_TYPE: "Connection",
  EDGE_TYPE: "Edge",
  SKIP_FIELDS: [
    "edges",
    "adminUserAccountLookup",
    "adminCommand",
    "adminBulkEmail",
    "adminCreateStripeCustomer",
    "adminScheduleAnonymousTask",
    "adminUserAccountChangeEmail",
    "adminDeleteIntegration",
    "userPromoteAdmin",
    "userDemoteAdmin",
  ],
  SKIP_DIRECTIVES: ["skipSdk"],
  RECURSION_LIMIT: 3000,
};
