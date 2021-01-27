/* eslint-disable @typescript-eslint/no-empty-function */
import { logger } from "@linear/common";
import { LinearClient } from "../client";
import dotenv from "dotenv";

dotenv.config();

const client = new LinearClient({ apiKey: process.env.E2E_API_KEY });

// requiredArgs SyncBootstrap databaseVersion: number, sinceSyncId: number
// requiredArgs SyncUpdates sinceSyncId: number
// requiredArgs ArchivedModelSync identifier: string, modelClass: string
// requiredArgs ArchivedModelsSync modelClass: string, teamId: string
describe("ApiKeys", () => {
  it("apiKeys", async () => {
    const apiKeys = await client.apiKeys();
    logger.trace(apiKeys);
  });
});
// requiredArgs ApplicationWithAuthorization scope: string[], clientId: string
// no model AuthorizedApplications
describe("AvailableUsers", () => {
  it("availableUsers", async () => {
    const availableUsers = await client.availableUsers;
    logger.trace(availableUsers);
  });
});
// requiredArgs SsoUrlFromEmail email: string
describe("BillingDetails", () => {
  it("billingDetails", async () => {
    const billingDetails = await client.billingDetails;
    logger.trace(billingDetails);
  });
});
// requiredArgs CollaborativeDocumentJoin clientId: string, issueId: string, version: number
describe("Comments", () => {
  it("comments", async () => {
    const comments = await client.comments();
    logger.trace(comments);
  });
});
// requiredArgs Comment id: string
describe("CustomViews", () => {
  it("customViews", async () => {
    const customViews = await client.customViews();
    logger.trace(customViews);
  });
});
// requiredArgs CustomView id: string
describe("Cycles", () => {
  it("cycles", async () => {
    const cycles = await client.cycles();
    logger.trace(cycles);
  });
});
// requiredArgs Cycle id: string
describe("Emojis", () => {
  it("emojis", async () => {
    const emojis = await client.emojis();
    logger.trace(emojis);
  });
});
// requiredArgs Emoji id: string
describe("Favorites", () => {
  it("favorites", async () => {
    const favorites = await client.favorites();
    logger.trace(favorites);
  });
});
// requiredArgs Favorite id: string
// requiredArgs FigmaEmbedInfo fileId: string
describe("Integrations", () => {
  it("integrations", async () => {
    const integrations = await client.integrations();
    logger.trace(integrations);
  });
});
// requiredArgs Integration id: string
describe("IntegrationResources", () => {
  it("integrationResources", async () => {
    const integrationResources = await client.integrationResources();
    logger.trace(integrationResources);
  });
});
// requiredArgs IntegrationResource id: string
// requiredArgs InviteInfo userHash: string
describe("IssueLabels", () => {
  it("issueLabels", async () => {
    const issueLabels = await client.issueLabels();
    logger.trace(issueLabels);
  });
});
// requiredArgs IssueLabel id: string
describe("IssueRelations", () => {
  it("issueRelations", async () => {
    const issueRelations = await client.issueRelations();
    logger.trace(issueRelations);
  });
});
// requiredArgs IssueRelation id: string
describe("Issues", () => {
  it("issues", async () => {
    const issues = await client.issues();
    logger.trace(issues);
  });
});
// requiredArgs Issue id: string
// requiredArgs IssueSearch query: string
describe("Milestones", () => {
  it("milestones", async () => {
    const milestones = await client.milestones();
    logger.trace(milestones);
  });
});
// requiredArgs Milestone id: string
describe("Notifications", () => {
  it("notifications", async () => {
    const notifications = await client.notifications();
    logger.trace(notifications);
  });
});
// requiredArgs Notification id: string
describe("NotificationSubscriptions", () => {
  it("notificationSubscriptions", async () => {
    const notificationSubscriptions = await client.notificationSubscriptions();
    logger.trace(notificationSubscriptions);
  });
});
// requiredArgs NotificationSubscription id: string
describe("OrganizationInvites", () => {
  it("organizationInvites", async () => {
    const organizationInvites = await client.organizationInvites();
    logger.trace(organizationInvites);
  });
});
// requiredArgs OrganizationInvite id: string
describe("Organization", () => {
  it("organization", async () => {
    const organization = await client.organization;
    logger.trace(organization);
  });
});
// requiredArgs OrganizationExists urlKey: string
describe("ProjectLinks", () => {
  it("projectLinks", async () => {
    const projectLinks = await client.projectLinks();
    logger.trace(projectLinks);
  });
});
// requiredArgs ProjectLink id: string
describe("Projects", () => {
  it("projects", async () => {
    const projects = await client.projects();
    logger.trace(projects);
  });
});
// requiredArgs Project id: string
describe("PushSubscriptionTest", () => {
  it("pushSubscriptionTest", async () => {
    const pushSubscriptionTest = await client.pushSubscriptionTest;
    logger.trace(pushSubscriptionTest);
  });
});
describe("Reactions", () => {
  it("reactions", async () => {
    const reactions = await client.reactions();
    logger.trace(reactions);
  });
});
// requiredArgs Reaction id: string
describe("TeamMemberships", () => {
  it("teamMemberships", async () => {
    const teamMemberships = await client.teamMemberships();
    logger.trace(teamMemberships);
  });
});
// requiredArgs TeamMembership id: string
describe("Teams", () => {
  it("teams", async () => {
    const teams = await client.teams();
    logger.trace(teams);
  });
});
// requiredArgs Team id: string
// no model Templates
// requiredArgs Template id: string
describe("Users", () => {
  it("users", async () => {
    const users = await client.users();
    logger.trace(users);
  });
});
// requiredArgs User id: string
describe("Viewer", () => {
  it("viewer", async () => {
    const viewer = await client.viewer;
    logger.trace(viewer);
  });
});
describe("UserSettings", () => {
  it("userSettings", async () => {
    const userSettings = await client.userSettings;
    logger.trace(userSettings);
  });
});
describe("Webhooks", () => {
  it("webhooks", async () => {
    const webhooks = await client.webhooks();
    logger.trace(webhooks);
  });
});
// requiredArgs Webhook id: string
describe("WorkflowStates", () => {
  it("workflowStates", async () => {
    const workflowStates = await client.workflowStates();
    logger.trace(workflowStates);
  });
});
// requiredArgs WorkflowState id: string
