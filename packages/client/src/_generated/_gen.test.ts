/* eslint-disable @typescript-eslint/no-empty-function */
import { logger } from "@linear/common";
import { LinearClient } from "../client";
import dotenv from "dotenv";

dotenv.config();

const client = new LinearClient({ apiKey: process.env.E2E_API_KEY });

/** Test all ApiKey queries */
describe("ApiKeys", () => {
  /** Test the root query for the ApiKey connection */
  it("apiKeys", async () => {
    const apiKeys = await client.apiKeys();
    logger.trace(apiKeys);
  });
});

// ApplicationWithAuthorization scope: string[], clientId: string - has required args

// ArchivedModelSync identifier: string, modelClass: string - has required args

// ArchivedModelsSync modelClass: string, teamId: string - has required args

// AuthorizedApplications - no model for query

/** Test AvailableUsers query */
describe("AvailableUsers", () => {
  /** Test the root query for the AvailableUsers */
  it("availableUsers", async () => {
    const availableUsers = await client.availableUsers;
    logger.trace(availableUsers);
  });
});

/** Test BillingDetails query */
describe("BillingDetails", () => {
  /** Test the root query for the BillingDetails */
  it("billingDetails", async () => {
    const billingDetails = await client.billingDetails;
    logger.trace(billingDetails);
  });
});

// CollaborativeDocumentJoin clientId: string, issueId: string, version: number - has required args

/** Test all Comment queries */
describe("Comments", () => {
  let _comment_id: string | undefined;

  /** Test the root query for the Comment connection */
  it("comments", async () => {
    const comments = await client.comments();
    const firstComment = comments?.nodes?.[0];
    _comment_id = firstComment?.id;
    logger.trace(comments);
  });

  /** Test the root query for a single Comment */
  it("comment", async () => {
    if (_comment_id) {
      const comment = await client.comment(_comment_id);
      logger.trace(comment);
    } else {
      throw new Error("No first Comment found from comments connection query - cannot test comment query");
    }
  });
});

/** Test all CustomView queries */
describe("CustomViews", () => {
  let _customView_id: string | undefined;

  /** Test the root query for the CustomView connection */
  it("customViews", async () => {
    const customViews = await client.customViews();
    const firstCustomView = customViews?.nodes?.[0];
    _customView_id = firstCustomView?.id;
    logger.trace(customViews);
  });

  /** Test the root query for a single CustomView */
  it("customView", async () => {
    if (_customView_id) {
      const customView = await client.customView(_customView_id);
      logger.trace(customView);
    } else {
      throw new Error("No first CustomView found from customViews connection query - cannot test customView query");
    }
  });
});

/** Test all Cycle queries */
describe("Cycles", () => {
  let _cycle_id: string | undefined;

  /** Test the root query for the Cycle connection */
  it("cycles", async () => {
    const cycles = await client.cycles();
    const firstCycle = cycles?.nodes?.[0];
    _cycle_id = firstCycle?.id;
    logger.trace(cycles);
  });

  /** Test the root query for a single Cycle */
  it("cycle", async () => {
    if (_cycle_id) {
      const cycle = await client.cycle(_cycle_id);
      logger.trace(cycle);
    } else {
      throw new Error("No first Cycle found from cycles connection query - cannot test cycle query");
    }
  });
});

/** Test all Emoji queries */
describe("Emojis", () => {
  let _emoji_id: string | undefined;

  /** Test the root query for the Emoji connection */
  it("emojis", async () => {
    const emojis = await client.emojis();
    const firstEmoji = emojis?.nodes?.[0];
    _emoji_id = firstEmoji?.id;
    logger.trace(emojis);
  });

  /** Test the root query for a single Emoji */
  it("emoji", async () => {
    if (_emoji_id) {
      const emoji = await client.emoji(_emoji_id);
      logger.trace(emoji);
    } else {
      throw new Error("No first Emoji found from emojis connection query - cannot test emoji query");
    }
  });
});

/** Test all Favorite queries */
describe("Favorites", () => {
  let _favorite_id: string | undefined;

  /** Test the root query for the Favorite connection */
  it("favorites", async () => {
    const favorites = await client.favorites();
    const firstFavorite = favorites?.nodes?.[0];
    _favorite_id = firstFavorite?.id;
    logger.trace(favorites);
  });

  /** Test the root query for a single Favorite */
  it("favorite", async () => {
    if (_favorite_id) {
      const favorite = await client.favorite(_favorite_id);
      logger.trace(favorite);
    } else {
      throw new Error("No first Favorite found from favorites connection query - cannot test favorite query");
    }
  });
});

// FigmaEmbedInfo fileId: string - has required args

/** Test all IntegrationResource queries */
describe("IntegrationResources", () => {
  let _integrationResource_id: string | undefined;

  /** Test the root query for the IntegrationResource connection */
  it("integrationResources", async () => {
    const integrationResources = await client.integrationResources();
    const firstIntegrationResource = integrationResources?.nodes?.[0];
    _integrationResource_id = firstIntegrationResource?.id;
    logger.trace(integrationResources);
  });

  /** Test the root query for a single IntegrationResource */
  it("integrationResource", async () => {
    if (_integrationResource_id) {
      const integrationResource = await client.integrationResource(_integrationResource_id);
      logger.trace(integrationResource);
    } else {
      throw new Error(
        "No first IntegrationResource found from integrationResources connection query - cannot test integrationResource query"
      );
    }
  });
});

/** Test all Integration queries */
describe("Integrations", () => {
  let _integration_id: string | undefined;

  /** Test the root query for the Integration connection */
  it("integrations", async () => {
    const integrations = await client.integrations();
    const firstIntegration = integrations?.nodes?.[0];
    _integration_id = firstIntegration?.id;
    logger.trace(integrations);
  });

  /** Test the root query for a single Integration */
  it("integration", async () => {
    if (_integration_id) {
      const integration = await client.integration(_integration_id);
      logger.trace(integration);
    } else {
      throw new Error("No first Integration found from integrations connection query - cannot test integration query");
    }
  });
});

// InviteInfo userHash: string - has required args

/** Test all IssueLabel queries */
describe("IssueLabels", () => {
  let _issueLabel_id: string | undefined;

  /** Test the root query for the IssueLabel connection */
  it("issueLabels", async () => {
    const issueLabels = await client.issueLabels();
    const firstIssueLabel = issueLabels?.nodes?.[0];
    _issueLabel_id = firstIssueLabel?.id;
    logger.trace(issueLabels);
  });

  /** Test the root query for a single IssueLabel */
  it("issueLabel", async () => {
    if (_issueLabel_id) {
      const issueLabel = await client.issueLabel(_issueLabel_id);
      logger.trace(issueLabel);
    } else {
      throw new Error("No first IssueLabel found from issueLabels connection query - cannot test issueLabel query");
    }
  });
});

/** Test all IssueRelation queries */
describe("IssueRelations", () => {
  let _issueRelation_id: string | undefined;

  /** Test the root query for the IssueRelation connection */
  it("issueRelations", async () => {
    const issueRelations = await client.issueRelations();
    const firstIssueRelation = issueRelations?.nodes?.[0];
    _issueRelation_id = firstIssueRelation?.id;
    logger.trace(issueRelations);
  });

  /** Test the root query for a single IssueRelation */
  it("issueRelation", async () => {
    if (_issueRelation_id) {
      const issueRelation = await client.issueRelation(_issueRelation_id);
      logger.trace(issueRelation);
    } else {
      throw new Error(
        "No first IssueRelation found from issueRelations connection query - cannot test issueRelation query"
      );
    }
  });
});

// IssueSearch query: string - has required args

/** Test all Issue queries */
describe("Issues", () => {
  let _issue_id: string | undefined;

  /** Test the root query for the Issue connection */
  it("issues", async () => {
    const issues = await client.issues();
    const firstIssue = issues?.nodes?.[0];
    _issue_id = firstIssue?.id;
    logger.trace(issues);
  });

  /** Test the root query for a single Issue */
  it("issue", async () => {
    if (_issue_id) {
      const issue = await client.issue(_issue_id);
      logger.trace(issue);
    } else {
      throw new Error("No first Issue found from issues connection query - cannot test issue query");
    }
  });
});

/** Test all Milestone queries */
describe("Milestones", () => {
  let _milestone_id: string | undefined;

  /** Test the root query for the Milestone connection */
  it("milestones", async () => {
    const milestones = await client.milestones();
    const firstMilestone = milestones?.nodes?.[0];
    _milestone_id = firstMilestone?.id;
    logger.trace(milestones);
  });

  /** Test the root query for a single Milestone */
  it("milestone", async () => {
    if (_milestone_id) {
      const milestone = await client.milestone(_milestone_id);
      logger.trace(milestone);
    } else {
      throw new Error("No first Milestone found from milestones connection query - cannot test milestone query");
    }
  });
});

/** Test all NotificationSubscription queries */
describe("NotificationSubscriptions", () => {
  let _notificationSubscription_id: string | undefined;

  /** Test the root query for the NotificationSubscription connection */
  it("notificationSubscriptions", async () => {
    const notificationSubscriptions = await client.notificationSubscriptions();
    const firstNotificationSubscription = notificationSubscriptions?.nodes?.[0];
    _notificationSubscription_id = firstNotificationSubscription?.id;
    logger.trace(notificationSubscriptions);
  });

  /** Test the root query for a single NotificationSubscription */
  it("notificationSubscription", async () => {
    if (_notificationSubscription_id) {
      const notificationSubscription = await client.notificationSubscription(_notificationSubscription_id);
      logger.trace(notificationSubscription);
    } else {
      throw new Error(
        "No first NotificationSubscription found from notificationSubscriptions connection query - cannot test notificationSubscription query"
      );
    }
  });
});

/** Test all Notification queries */
describe("Notifications", () => {
  let _notification_id: string | undefined;

  /** Test the root query for the Notification connection */
  it("notifications", async () => {
    const notifications = await client.notifications();
    const firstNotification = notifications?.nodes?.[0];
    _notification_id = firstNotification?.id;
    logger.trace(notifications);
  });

  /** Test the root query for a single Notification */
  it("notification", async () => {
    if (_notification_id) {
      const notification = await client.notification(_notification_id);
      logger.trace(notification);
    } else {
      throw new Error(
        "No first Notification found from notifications connection query - cannot test notification query"
      );
    }
  });
});

/** Test Organization query */
describe("Organization", () => {
  /** Test the root query for the Organization */
  it("organization", async () => {
    const organization = await client.organization;
    logger.trace(organization);
  });
});

// OrganizationExists urlKey: string - has required args

/** Test all OrganizationInvite queries */
describe("OrganizationInvites", () => {
  /** Test the root query for the OrganizationInvite connection */
  it("organizationInvites", async () => {
    const organizationInvites = await client.organizationInvites();
    logger.trace(organizationInvites);
  });
});

/** Test all ProjectLink queries */
describe("ProjectLinks", () => {
  let _projectLink_id: string | undefined;

  /** Test the root query for the ProjectLink connection */
  it("projectLinks", async () => {
    const projectLinks = await client.projectLinks();
    const firstProjectLink = projectLinks?.nodes?.[0];
    _projectLink_id = firstProjectLink?.id;
    logger.trace(projectLinks);
  });

  /** Test the root query for a single ProjectLink */
  it("projectLink", async () => {
    if (_projectLink_id) {
      const projectLink = await client.projectLink(_projectLink_id);
      logger.trace(projectLink);
    } else {
      throw new Error("No first ProjectLink found from projectLinks connection query - cannot test projectLink query");
    }
  });
});

/** Test all Project queries */
describe("Projects", () => {
  let _project_id: string | undefined;

  /** Test the root query for the Project connection */
  it("projects", async () => {
    const projects = await client.projects();
    const firstProject = projects?.nodes?.[0];
    _project_id = firstProject?.id;
    logger.trace(projects);
  });

  /** Test the root query for a single Project */
  it("project", async () => {
    if (_project_id) {
      const project = await client.project(_project_id);
      logger.trace(project);
    } else {
      throw new Error("No first Project found from projects connection query - cannot test project query");
    }
  });
});

/** Test PushSubscriptionTest query */
describe("PushSubscriptionTest", () => {
  /** Test the root query for the PushSubscriptionTest */
  it("pushSubscriptionTest", async () => {
    const pushSubscriptionTest = await client.pushSubscriptionTest;
    logger.trace(pushSubscriptionTest);
  });
});

/** Test all Reaction queries */
describe("Reactions", () => {
  let _reaction_id: string | undefined;

  /** Test the root query for the Reaction connection */
  it("reactions", async () => {
    const reactions = await client.reactions();
    const firstReaction = reactions?.nodes?.[0];
    _reaction_id = firstReaction?.id;
    logger.trace(reactions);
  });

  /** Test the root query for a single Reaction */
  it("reaction", async () => {
    if (_reaction_id) {
      const reaction = await client.reaction(_reaction_id);
      logger.trace(reaction);
    } else {
      throw new Error("No first Reaction found from reactions connection query - cannot test reaction query");
    }
  });
});

// SsoUrlFromEmail email: string - has required args

// SyncBootstrap databaseVersion: number, sinceSyncId: number - has required args

// SyncUpdates sinceSyncId: number - has required args

/** Test all TeamMembership queries */
describe("TeamMemberships", () => {
  let _teamMembership_id: string | undefined;

  /** Test the root query for the TeamMembership connection */
  it("teamMemberships", async () => {
    const teamMemberships = await client.teamMemberships();
    const firstTeamMembership = teamMemberships?.nodes?.[0];
    _teamMembership_id = firstTeamMembership?.id;
    logger.trace(teamMemberships);
  });

  /** Test the root query for a single TeamMembership */
  it("teamMembership", async () => {
    if (_teamMembership_id) {
      const teamMembership = await client.teamMembership(_teamMembership_id);
      logger.trace(teamMembership);
    } else {
      throw new Error(
        "No first TeamMembership found from teamMemberships connection query - cannot test teamMembership query"
      );
    }
  });
});

/** Test all Team queries */
describe("Teams", () => {
  let _team_id: string | undefined;

  /** Test the root query for the Team connection */
  it("teams", async () => {
    const teams = await client.teams();
    const firstTeam = teams?.nodes?.[0];
    _team_id = firstTeam?.id;
    logger.trace(teams);
  });

  /** Test the root query for a single Team */
  it("team", async () => {
    if (_team_id) {
      const team = await client.team(_team_id);
      logger.trace(team);
    } else {
      throw new Error("No first Team found from teams connection query - cannot test team query");
    }
  });
});

// Template id: string - has required args

// Templates - no model for query

/** Test UserSettings query */
describe("UserSettings", () => {
  /** Test the root query for the UserSettings */
  it("userSettings", async () => {
    const userSettings = await client.userSettings;
    logger.trace(userSettings);
  });
});

/** Test all User queries */
describe("Users", () => {
  let _user_id: string | undefined;

  /** Test the root query for the User connection */
  it("users", async () => {
    const users = await client.users();
    const firstUser = users?.nodes?.[0];
    _user_id = firstUser?.id;
    logger.trace(users);
  });

  /** Test the root query for a single User */
  it("user", async () => {
    if (_user_id) {
      const user = await client.user(_user_id);
      logger.trace(user);
    } else {
      throw new Error("No first User found from users connection query - cannot test user query");
    }
  });
});

/** Test Viewer query */
describe("Viewer", () => {
  /** Test the root query for the Viewer */
  it("viewer", async () => {
    const viewer = await client.viewer;
    logger.trace(viewer);
  });
});

/** Test all Webhook queries */
describe("Webhooks", () => {
  let _webhook_id: string | undefined;

  /** Test the root query for the Webhook connection */
  it("webhooks", async () => {
    const webhooks = await client.webhooks();
    const firstWebhook = webhooks?.nodes?.[0];
    _webhook_id = firstWebhook?.id;
    logger.trace(webhooks);
  });

  /** Test the root query for a single Webhook */
  it("webhook", async () => {
    if (_webhook_id) {
      const webhook = await client.webhook(_webhook_id);
      logger.trace(webhook);
    } else {
      throw new Error("No first Webhook found from webhooks connection query - cannot test webhook query");
    }
  });
});

/** Test all WorkflowState queries */
describe("WorkflowStates", () => {
  let _workflowState_id: string | undefined;

  /** Test the root query for the WorkflowState connection */
  it("workflowStates", async () => {
    const workflowStates = await client.workflowStates();
    const firstWorkflowState = workflowStates?.nodes?.[0];
    _workflowState_id = firstWorkflowState?.id;
    logger.trace(workflowStates);
  });

  /** Test the root query for a single WorkflowState */
  it("workflowState", async () => {
    if (_workflowState_id) {
      const workflowState = await client.workflowState(_workflowState_id);
      logger.trace(workflowState);
    } else {
      throw new Error(
        "No first WorkflowState found from workflowStates connection query - cannot test workflowState query"
      );
    }
  });
});
