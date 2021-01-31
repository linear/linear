/* eslint-disable @typescript-eslint/no-empty-function */
import { logger } from "@linear/common";
import { LinearClient } from "../client";
import dotenv from "dotenv";

dotenv.config();

const client = new LinearClient({ apiKey: process.env.E2E_API_KEY });

describe("ApiKeys", () => {
  it("apiKeys", async () => {
    const apiKeys = await client.apiKeys();
    logger.trace(apiKeys);
  });
});
// requiredArgs ApplicationWithAuthorization scope: string[], clientId: string
// requiredArgs ArchivedModelSync identifier: string, modelClass: string
// requiredArgs ArchivedModelsSync modelClass: string, teamId: string
// no model AuthorizedApplications
describe("AvailableUsers", () => {
  it("availableUsers", async () => {
    const availableUsers = await client.availableUsers;
    logger.trace(availableUsers);
  });
});
describe("BillingDetails", () => {
  it("billingDetails", async () => {
    const billingDetails = await client.billingDetails;
    logger.trace(billingDetails);
  });
});
// requiredArgs CollaborativeDocumentJoin clientId: string, issueId: string, version: number
// requiredArgs Comment id: string
describe("Comments", () => {
  it("comments", async () => {
    const comments = await client.comments();
    logger.trace(comments);
  });
});
// requiredArgs CustomView id: string
describe("CustomViews", () => {
  it("customViews", async () => {
    const customViews = await client.customViews();
    logger.trace(customViews);
  });
});
// requiredArgs Cycle id: string
describe("Cycles", () => {
  it("cycles", async () => {
    const cycles = await client.cycles();
    logger.trace(cycles);
  });
});
// requiredArgs Emoji id: string
describe("Emojis", () => {
  it("emojis", async () => {
    const emojis = await client.emojis();
    logger.trace(emojis);
  });
});
// requiredArgs Favorite id: string
describe("Favorites", () => {
  it("favorites", async () => {
    const favorites = await client.favorites();
    logger.trace(favorites);
  });
});
// requiredArgs FigmaEmbedInfo fileId: string
// requiredArgs Integration id: string
// requiredArgs IntegrationResource id: string
describe("IntegrationResources", () => {
  it("integrationResources", async () => {
    const integrationResources = await client.integrationResources();
    logger.trace(integrationResources);
  });
});
describe("Integrations", () => {
  it("integrations", async () => {
    const integrations = await client.integrations();
    logger.trace(integrations);
  });
});
// requiredArgs InviteInfo userHash: string
// requiredArgs Issue id: string
// requiredArgs IssueLabel id: string
describe("IssueLabels", () => {
  it("issueLabels", async () => {
    const issueLabels = await client.issueLabels();
    logger.trace(issueLabels);
  });
});
// requiredArgs IssueRelation id: string
describe("IssueRelations", () => {
  it("issueRelations", async () => {
    const issueRelations = await client.issueRelations();
    logger.trace(issueRelations);
  });
});
// requiredArgs IssueSearch query: string
describe("Issues", () => {
  it("issues", async () => {
    const issues = await client.issues();
    logger.trace(issues);
  });
});
// requiredArgs Milestone id: string
describe("Milestones", () => {
  it("milestones", async () => {
    const milestones = await client.milestones();
    logger.trace(milestones);
  });
});
// requiredArgs Notification id: string
// requiredArgs NotificationSubscription id: string
describe("NotificationSubscriptions", () => {
  it("notificationSubscriptions", async () => {
    const notificationSubscriptions = await client.notificationSubscriptions();
    logger.trace(notificationSubscriptions);
  });
});
describe("Notifications", () => {
  it("notifications", async () => {
    const notifications = await client.notifications();
    logger.trace(notifications);
  });
});
describe("Organization", () => {
  it("organization", async () => {
    const organization = await client.organization;
    logger.trace(organization);
  });
});
// requiredArgs OrganizationExists urlKey: string
// requiredArgs OrganizationInvite id: string
describe("OrganizationInvites", () => {
  it("organizationInvites", async () => {
    const organizationInvites = await client.organizationInvites();
    logger.trace(organizationInvites);
  });
});
// requiredArgs Project id: string
// requiredArgs ProjectLink id: string
describe("ProjectLinks", () => {
  it("projectLinks", async () => {
    const projectLinks = await client.projectLinks();
    logger.trace(projectLinks);
  });
});
describe("Projects", () => {
  it("projects", async () => {
    const projects = await client.projects();
    logger.trace(projects);
  });
});
describe("PushSubscriptionTest", () => {
  it("pushSubscriptionTest", async () => {
    const pushSubscriptionTest = await client.pushSubscriptionTest;
    logger.trace(pushSubscriptionTest);
  });
});
// requiredArgs Reaction id: string
describe("Reactions", () => {
  it("reactions", async () => {
    const reactions = await client.reactions();
    logger.trace(reactions);
  });
});
// requiredArgs SsoUrlFromEmail email: string
// requiredArgs SyncBootstrap databaseVersion: number, sinceSyncId: number
// requiredArgs SyncUpdates sinceSyncId: number
// requiredArgs Team id: string
// requiredArgs TeamMembership id: string
describe("TeamMemberships", () => {
  it("teamMemberships", async () => {
    const teamMemberships = await client.teamMemberships();
    logger.trace(teamMemberships);
  });
});
describe("Teams", () => {
  it("teams", async () => {
    const teams = await client.teams();
    logger.trace(teams);
  });
});
// requiredArgs Template id: string
// no model Templates
// requiredArgs User id: string
describe("UserSettings", () => {
  it("userSettings", async () => {
    const userSettings = await client.userSettings;
    logger.trace(userSettings);
  });
});
describe("Users", () => {
  it("users", async () => {
    const users = await client.users();
    logger.trace(users);
  });
});
describe("Viewer", () => {
  it("viewer", async () => {
    const viewer = await client.viewer;
    logger.trace(viewer);
  });
});
// requiredArgs Webhook id: string
describe("Webhooks", () => {
  it("webhooks", async () => {
    const webhooks = await client.webhooks();
    logger.trace(webhooks);
  });
});
// requiredArgs WorkflowState id: string
describe("WorkflowStates", () => {
  it("workflowStates", async () => {
    const workflowStates = await client.workflowStates();
    logger.trace(workflowStates);
  });
});
