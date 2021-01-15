export default {
  ID_NAME: "id",
  CONNECTION_TYPE: "Connection",
  EDGE_TYPE: "Edge",
  SKIP_FIELDS: [
    "edges",
    "availableUsers",
    // "adminUserAccountLookup",
    // "adminCommand",
    // "adminBulkEmail",
    // "adminCreateStripeCustomer",
    // "adminScheduleAnonymousTask",
    // "adminUserAccountChangeEmail",
    // "adminDeleteIntegration",
    // "userPromoteAdmin",
    // "userDemoteAdmin",
    // "availableUsers",
    // "integrationResource",
    // "organizationInviteCreate",
  ],
  SKIP_OBJECTS: ["UserSettings"],
  SKIP_DIRECTIVES: ["skipSdk", "deprecated"],
};
