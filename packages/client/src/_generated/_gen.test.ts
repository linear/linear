import { logger } from "@linear/common";
import * as D from "../index";
import dotenv from "dotenv";

/** Load environment variables */
dotenv.config();

/** Initialize Linear client with the api key */
const client = new D.LinearClient({
  apiKey: process.env.E2E_API_KEY,
  apiUrl: process.env.E2E_API_URL,
});

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
  /** Test the root query for AvailableUsers */
  it("availableUsers", async () => {
    const availableUsers = await client.availableUsers;
    logger.trace(availableUsers);
  });
});

/** Test BillingDetails query */
describe("BillingDetails", () => {
  /** Test the root query for BillingDetails */
  it("billingDetails", async () => {
    const billingDetails = await client.billingDetails;
    logger.trace(billingDetails);
  });
});

// CollaborativeDocumentJoin clientId: string, issueId: string, version: number - has required args

/** Test all Comment queries */
describe("Comments", () => {
  let _comment: D.Comment | undefined;
  let _comment_id: string | undefined;

  /** Test the root query for the Comment connection */
  it("comments", async () => {
    const comments = await client.comments();
    const comment = comments?.nodes?.[0];
    _comment_id = comment?.id;
    logger.trace(comments);
  });

  /** Test the root query for a single Comment */
  it("comment", async () => {
    if (_comment_id) {
      const comment = await client.comment(_comment_id);
      _comment = comment;
      logger.trace(comment);
    } else {
      throw new Error("No first Comment found from comments connection query - cannot test comment query");
    }
  });

  /** Test the comment.issue query for D.Issue */
  it("comment.issue", async () => {
    if (_comment) {
      const comment_issue = await _comment.issue;
      logger.trace(comment_issue);
    } else {
      throw new Error("No Comment found from comment query - cannot test comment.issue query");
    }
  });

  /** Test the comment.user query for D.User */
  it("comment.user", async () => {
    if (_comment) {
      const comment_user = await _comment.user;
      logger.trace(comment_user);
    } else {
      throw new Error("No Comment found from comment query - cannot test comment.user query");
    }
  });
});

/** Test all CustomView queries */
describe("CustomViews", () => {
  let _customView: D.CustomView | undefined;
  let _customView_id: string | undefined;

  /** Test the root query for the CustomView connection */
  it("customViews", async () => {
    const customViews = await client.customViews();
    const customView = customViews?.nodes?.[0];
    _customView_id = customView?.id;
    logger.trace(customViews);
  });

  /** Test the root query for a single CustomView */
  it("customView", async () => {
    if (_customView_id) {
      const customView = await client.customView(_customView_id);
      _customView = customView;
      logger.trace(customView);
    } else {
      throw new Error("No first CustomView found from customViews connection query - cannot test customView query");
    }
  });

  /** Test the customView.creator query for D.User */
  it("customView.creator", async () => {
    if (_customView) {
      const customView_creator = await _customView.creator;
      logger.trace(customView_creator);
    } else {
      throw new Error("No CustomView found from customView query - cannot test customView.creator query");
    }
  });

  /** Test the customView.organization query for D.Organization */
  it("customView.organization", async () => {
    if (_customView) {
      const customView_organization = await _customView.organization;
      logger.trace(customView_organization);
    } else {
      throw new Error("No CustomView found from customView query - cannot test customView.organization query");
    }
  });

  /** Test the customView.team query for D.Team */
  it("customView.team", async () => {
    if (_customView) {
      const customView_team = await _customView.team;
      logger.trace(customView_team);
    } else {
      throw new Error("No CustomView found from customView query - cannot test customView.team query");
    }
  });
});

/** Test all Cycle queries */
describe("Cycles", () => {
  let _cycle: D.Cycle | undefined;
  let _cycle_id: string | undefined;

  /** Test the root query for the Cycle connection */
  it("cycles", async () => {
    const cycles = await client.cycles();
    const cycle = cycles?.nodes?.[0];
    _cycle_id = cycle?.id;
    logger.trace(cycles);
  });

  /** Test the root query for a single Cycle */
  it("cycle", async () => {
    if (_cycle_id) {
      const cycle = await client.cycle(_cycle_id);
      _cycle = cycle;
      logger.trace(cycle);
    } else {
      throw new Error("No first Cycle found from cycles connection query - cannot test cycle query");
    }
  });

  /** Test the cycle.team query for D.Team */
  it("cycle.team", async () => {
    if (_cycle) {
      const cycle_team = await _cycle.team;
      logger.trace(cycle_team);
    } else {
      throw new Error("No Cycle found from cycle query - cannot test cycle.team query");
    }
  });

  /** Test the cycle.issues connection query for D.IssueConnection */
  it("cycle.issues", async () => {
    if (_cycle) {
      const cycle_issues = await _cycle.issues();
      logger.trace(cycle_issues);
    } else {
      throw new Error("No Cycle found from cycle query - cannot test cycle.issues connection query");
    }
  });

  /** Test the cycle.uncompletedIssuesUponClose connection query for D.IssueConnection */
  it("cycle.uncompletedIssuesUponClose", async () => {
    if (_cycle) {
      const cycle_uncompletedIssuesUponClose = await _cycle.uncompletedIssuesUponClose();
      logger.trace(cycle_uncompletedIssuesUponClose);
    } else {
      throw new Error(
        "No Cycle found from cycle query - cannot test cycle.uncompletedIssuesUponClose connection query"
      );
    }
  });
});

/** Test all Emoji queries */
describe("Emojis", () => {
  let _emoji: D.Emoji | undefined;
  let _emoji_id: string | undefined;

  /** Test the root query for the Emoji connection */
  it("emojis", async () => {
    const emojis = await client.emojis();
    const emoji = emojis?.nodes?.[0];
    _emoji_id = emoji?.id;
    logger.trace(emojis);
  });

  /** Test the root query for a single Emoji */
  it("emoji", async () => {
    if (_emoji_id) {
      const emoji = await client.emoji(_emoji_id);
      _emoji = emoji;
      logger.trace(emoji);
    } else {
      throw new Error("No first Emoji found from emojis connection query - cannot test emoji query");
    }
  });

  /** Test the emoji.creator query for D.User */
  it("emoji.creator", async () => {
    if (_emoji) {
      const emoji_creator = await _emoji.creator;
      logger.trace(emoji_creator);
    } else {
      throw new Error("No Emoji found from emoji query - cannot test emoji.creator query");
    }
  });

  /** Test the emoji.organization query for D.Organization */
  it("emoji.organization", async () => {
    if (_emoji) {
      const emoji_organization = await _emoji.organization;
      logger.trace(emoji_organization);
    } else {
      throw new Error("No Emoji found from emoji query - cannot test emoji.organization query");
    }
  });
});

/** Test all Favorite queries */
describe("Favorites", () => {
  let _favorite: D.Favorite | undefined;
  let _favorite_id: string | undefined;

  /** Test the root query for the Favorite connection */
  it("favorites", async () => {
    const favorites = await client.favorites();
    const favorite = favorites?.nodes?.[0];
    _favorite_id = favorite?.id;
    logger.trace(favorites);
  });

  /** Test the root query for a single Favorite */
  it("favorite", async () => {
    if (_favorite_id) {
      const favorite = await client.favorite(_favorite_id);
      _favorite = favorite;
      logger.trace(favorite);
    } else {
      throw new Error("No first Favorite found from favorites connection query - cannot test favorite query");
    }
  });

  /** Test the favorite.cycle query for D.Cycle */
  it("favorite.cycle", async () => {
    if (_favorite) {
      const favorite_cycle = await _favorite.cycle;
      logger.trace(favorite_cycle);
    } else {
      throw new Error("No Favorite found from favorite query - cannot test favorite.cycle query");
    }
  });

  /** Test the favorite.issue query for D.Issue */
  it("favorite.issue", async () => {
    if (_favorite) {
      const favorite_issue = await _favorite.issue;
      logger.trace(favorite_issue);
    } else {
      throw new Error("No Favorite found from favorite query - cannot test favorite.issue query");
    }
  });

  /** Test the favorite.label query for D.IssueLabel */
  it("favorite.label", async () => {
    if (_favorite) {
      const favorite_label = await _favorite.label;
      logger.trace(favorite_label);
    } else {
      throw new Error("No Favorite found from favorite query - cannot test favorite.label query");
    }
  });

  /** Test the favorite.project query for D.Project */
  it("favorite.project", async () => {
    if (_favorite) {
      const favorite_project = await _favorite.project;
      logger.trace(favorite_project);
    } else {
      throw new Error("No Favorite found from favorite query - cannot test favorite.project query");
    }
  });

  /** Test the favorite.projectTeam query for D.Project */
  it("favorite.projectTeam", async () => {
    if (_favorite) {
      const favorite_projectTeam = await _favorite.projectTeam;
      logger.trace(favorite_projectTeam);
    } else {
      throw new Error("No Favorite found from favorite query - cannot test favorite.projectTeam query");
    }
  });

  /** Test the favorite.user query for D.User */
  it("favorite.user", async () => {
    if (_favorite) {
      const favorite_user = await _favorite.user;
      logger.trace(favorite_user);
    } else {
      throw new Error("No Favorite found from favorite query - cannot test favorite.user query");
    }
  });
});

// FigmaEmbedInfo fileId: string - has required args

/** Test all IntegrationResource queries */
describe("IntegrationResources", () => {
  let _integrationResource: D.IntegrationResource | undefined;
  let _integrationResource_id: string | undefined;

  /** Test the root query for the IntegrationResource connection */
  it("integrationResources", async () => {
    const integrationResources = await client.integrationResources();
    const integrationResource = integrationResources?.nodes?.[0];
    _integrationResource_id = integrationResource?.id;
    logger.trace(integrationResources);
  });

  /** Test the root query for a single IntegrationResource */
  it("integrationResource", async () => {
    if (_integrationResource_id) {
      const integrationResource = await client.integrationResource(_integrationResource_id);
      _integrationResource = integrationResource;
      logger.trace(integrationResource);
    } else {
      throw new Error(
        "No first IntegrationResource found from integrationResources connection query - cannot test integrationResource query"
      );
    }
  });

  /** Test the integrationResource.integration query for D.Integration */
  it("integrationResource.integration", async () => {
    if (_integrationResource) {
      const integrationResource_integration = await _integrationResource.integration;
      logger.trace(integrationResource_integration);
    } else {
      throw new Error(
        "No IntegrationResource found from integrationResource query - cannot test integrationResource.integration query"
      );
    }
  });

  /** Test the integrationResource.issue query for D.Issue */
  it("integrationResource.issue", async () => {
    if (_integrationResource) {
      const integrationResource_issue = await _integrationResource.issue;
      logger.trace(integrationResource_issue);
    } else {
      throw new Error(
        "No IntegrationResource found from integrationResource query - cannot test integrationResource.issue query"
      );
    }
  });
});

/** Test all Integration queries */
describe("Integrations", () => {
  let _integration: D.Integration | undefined;
  let _integration_id: string | undefined;

  /** Test the root query for the Integration connection */
  it("integrations", async () => {
    const integrations = await client.integrations();
    const integration = integrations?.nodes?.[0];
    _integration_id = integration?.id;
    logger.trace(integrations);
  });

  /** Test the root query for a single Integration */
  it("integration", async () => {
    if (_integration_id) {
      const integration = await client.integration(_integration_id);
      _integration = integration;
      logger.trace(integration);
    } else {
      throw new Error("No first Integration found from integrations connection query - cannot test integration query");
    }
  });

  /** Test the integration.creator query for D.User */
  it("integration.creator", async () => {
    if (_integration) {
      const integration_creator = await _integration.creator;
      logger.trace(integration_creator);
    } else {
      throw new Error("No Integration found from integration query - cannot test integration.creator query");
    }
  });

  /** Test the integration.organization query for D.Organization */
  it("integration.organization", async () => {
    if (_integration) {
      const integration_organization = await _integration.organization;
      logger.trace(integration_organization);
    } else {
      throw new Error("No Integration found from integration query - cannot test integration.organization query");
    }
  });

  /** Test the integration.team query for D.Team */
  it("integration.team", async () => {
    if (_integration) {
      const integration_team = await _integration.team;
      logger.trace(integration_team);
    } else {
      throw new Error("No Integration found from integration query - cannot test integration.team query");
    }
  });
});

// InviteInfo userHash: string - has required args

/** Test all IssueLabel queries */
describe("IssueLabels", () => {
  let _issueLabel: D.IssueLabel | undefined;
  let _issueLabel_id: string | undefined;

  /** Test the root query for the IssueLabel connection */
  it("issueLabels", async () => {
    const issueLabels = await client.issueLabels();
    const issueLabel = issueLabels?.nodes?.[0];
    _issueLabel_id = issueLabel?.id;
    logger.trace(issueLabels);
  });

  /** Test the root query for a single IssueLabel */
  it("issueLabel", async () => {
    if (_issueLabel_id) {
      const issueLabel = await client.issueLabel(_issueLabel_id);
      _issueLabel = issueLabel;
      logger.trace(issueLabel);
    } else {
      throw new Error("No first IssueLabel found from issueLabels connection query - cannot test issueLabel query");
    }
  });

  /** Test the issueLabel.creator query for D.User */
  it("issueLabel.creator", async () => {
    if (_issueLabel) {
      const issueLabel_creator = await _issueLabel.creator;
      logger.trace(issueLabel_creator);
    } else {
      throw new Error("No IssueLabel found from issueLabel query - cannot test issueLabel.creator query");
    }
  });

  /** Test the issueLabel.team query for D.Team */
  it("issueLabel.team", async () => {
    if (_issueLabel) {
      const issueLabel_team = await _issueLabel.team;
      logger.trace(issueLabel_team);
    } else {
      throw new Error("No IssueLabel found from issueLabel query - cannot test issueLabel.team query");
    }
  });

  /** Test the issueLabel.issues connection query for D.IssueConnection */
  it("issueLabel.issues", async () => {
    if (_issueLabel) {
      const issueLabel_issues = await _issueLabel.issues();
      logger.trace(issueLabel_issues);
    } else {
      throw new Error("No IssueLabel found from issueLabel query - cannot test issueLabel.issues connection query");
    }
  });
});

/** Test all IssueRelation queries */
describe("IssueRelations", () => {
  let _issueRelation: D.IssueRelation | undefined;
  let _issueRelation_id: string | undefined;

  /** Test the root query for the IssueRelation connection */
  it("issueRelations", async () => {
    const issueRelations = await client.issueRelations();
    const issueRelation = issueRelations?.nodes?.[0];
    _issueRelation_id = issueRelation?.id;
    logger.trace(issueRelations);
  });

  /** Test the root query for a single IssueRelation */
  it("issueRelation", async () => {
    if (_issueRelation_id) {
      const issueRelation = await client.issueRelation(_issueRelation_id);
      _issueRelation = issueRelation;
      logger.trace(issueRelation);
    } else {
      throw new Error(
        "No first IssueRelation found from issueRelations connection query - cannot test issueRelation query"
      );
    }
  });

  /** Test the issueRelation.issue query for D.Issue */
  it("issueRelation.issue", async () => {
    if (_issueRelation) {
      const issueRelation_issue = await _issueRelation.issue;
      logger.trace(issueRelation_issue);
    } else {
      throw new Error("No IssueRelation found from issueRelation query - cannot test issueRelation.issue query");
    }
  });

  /** Test the issueRelation.relatedIssue query for D.Issue */
  it("issueRelation.relatedIssue", async () => {
    if (_issueRelation) {
      const issueRelation_relatedIssue = await _issueRelation.relatedIssue;
      logger.trace(issueRelation_relatedIssue);
    } else {
      throw new Error("No IssueRelation found from issueRelation query - cannot test issueRelation.relatedIssue query");
    }
  });
});

// IssueSearch query: string - has required args

/** Test all Issue queries */
describe("Issues", () => {
  let _issue: D.Issue | undefined;
  let _issue_id: string | undefined;

  /** Test the root query for the Issue connection */
  it("issues", async () => {
    const issues = await client.issues();
    const issue = issues?.nodes?.[0];
    _issue_id = issue?.id;
    logger.trace(issues);
  });

  /** Test the root query for a single Issue */
  it("issue", async () => {
    if (_issue_id) {
      const issue = await client.issue(_issue_id);
      _issue = issue;
      logger.trace(issue);
    } else {
      throw new Error("No first Issue found from issues connection query - cannot test issue query");
    }
  });

  /** Test the issue.assignee query for D.User */
  it("issue.assignee", async () => {
    if (_issue) {
      const issue_assignee = await _issue.assignee;
      logger.trace(issue_assignee);
    } else {
      throw new Error("No Issue found from issue query - cannot test issue.assignee query");
    }
  });

  /** Test the issue.creator query for D.User */
  it("issue.creator", async () => {
    if (_issue) {
      const issue_creator = await _issue.creator;
      logger.trace(issue_creator);
    } else {
      throw new Error("No Issue found from issue query - cannot test issue.creator query");
    }
  });

  /** Test the issue.cycle query for D.Cycle */
  it("issue.cycle", async () => {
    if (_issue) {
      const issue_cycle = await _issue.cycle;
      logger.trace(issue_cycle);
    } else {
      throw new Error("No Issue found from issue query - cannot test issue.cycle query");
    }
  });

  /** Test the issue.parent query for D.Issue */
  it("issue.parent", async () => {
    if (_issue) {
      const issue_parent = await _issue.parent;
      logger.trace(issue_parent);
    } else {
      throw new Error("No Issue found from issue query - cannot test issue.parent query");
    }
  });

  /** Test the issue.project query for D.Project */
  it("issue.project", async () => {
    if (_issue) {
      const issue_project = await _issue.project;
      logger.trace(issue_project);
    } else {
      throw new Error("No Issue found from issue query - cannot test issue.project query");
    }
  });

  /** Test the issue.state query for D.WorkflowState */
  it("issue.state", async () => {
    if (_issue) {
      const issue_state = await _issue.state;
      logger.trace(issue_state);
    } else {
      throw new Error("No Issue found from issue query - cannot test issue.state query");
    }
  });

  /** Test the issue.team query for D.Team */
  it("issue.team", async () => {
    if (_issue) {
      const issue_team = await _issue.team;
      logger.trace(issue_team);
    } else {
      throw new Error("No Issue found from issue query - cannot test issue.team query");
    }
  });

  /** Test the issue.children connection query for D.IssueConnection */
  it("issue.children", async () => {
    if (_issue) {
      const issue_children = await _issue.children();
      logger.trace(issue_children);
    } else {
      throw new Error("No Issue found from issue query - cannot test issue.children connection query");
    }
  });

  /** Test the issue.comments connection query for D.CommentConnection */
  it("issue.comments", async () => {
    if (_issue) {
      const issue_comments = await _issue.comments();
      logger.trace(issue_comments);
    } else {
      throw new Error("No Issue found from issue query - cannot test issue.comments connection query");
    }
  });

  /** Test the issue.history connection query for D.IssueHistoryConnection */
  it("issue.history", async () => {
    if (_issue) {
      const issue_history = await _issue.history();
      logger.trace(issue_history);
    } else {
      throw new Error("No Issue found from issue query - cannot test issue.history connection query");
    }
  });

  /** Test the issue.integrationResources connection query for D.IntegrationResourceConnection */
  it("issue.integrationResources", async () => {
    if (_issue) {
      const issue_integrationResources = await _issue.integrationResources();
      logger.trace(issue_integrationResources);
    } else {
      throw new Error("No Issue found from issue query - cannot test issue.integrationResources connection query");
    }
  });

  /** Test the issue.inverseRelations connection query for D.IssueRelationConnection */
  it("issue.inverseRelations", async () => {
    if (_issue) {
      const issue_inverseRelations = await _issue.inverseRelations();
      logger.trace(issue_inverseRelations);
    } else {
      throw new Error("No Issue found from issue query - cannot test issue.inverseRelations connection query");
    }
  });

  /** Test the issue.labels connection query for D.IssueLabelConnection */
  it("issue.labels", async () => {
    if (_issue) {
      const issue_labels = await _issue.labels();
      logger.trace(issue_labels);
    } else {
      throw new Error("No Issue found from issue query - cannot test issue.labels connection query");
    }
  });

  /** Test the issue.relations connection query for D.IssueRelationConnection */
  it("issue.relations", async () => {
    if (_issue) {
      const issue_relations = await _issue.relations();
      logger.trace(issue_relations);
    } else {
      throw new Error("No Issue found from issue query - cannot test issue.relations connection query");
    }
  });

  /** Test the issue.subscribers connection query for D.UserConnection */
  it("issue.subscribers", async () => {
    if (_issue) {
      const issue_subscribers = await _issue.subscribers();
      logger.trace(issue_subscribers);
    } else {
      throw new Error("No Issue found from issue query - cannot test issue.subscribers connection query");
    }
  });
});

/** Test all Milestone queries */
describe("Milestones", () => {
  let _milestone: D.Milestone | undefined;
  let _milestone_id: string | undefined;

  /** Test the root query for the Milestone connection */
  it("milestones", async () => {
    const milestones = await client.milestones();
    const milestone = milestones?.nodes?.[0];
    _milestone_id = milestone?.id;
    logger.trace(milestones);
  });

  /** Test the root query for a single Milestone */
  it("milestone", async () => {
    if (_milestone_id) {
      const milestone = await client.milestone(_milestone_id);
      _milestone = milestone;
      logger.trace(milestone);
    } else {
      throw new Error("No first Milestone found from milestones connection query - cannot test milestone query");
    }
  });

  /** Test the milestone.organization query for D.Organization */
  it("milestone.organization", async () => {
    if (_milestone) {
      const milestone_organization = await _milestone.organization;
      logger.trace(milestone_organization);
    } else {
      throw new Error("No Milestone found from milestone query - cannot test milestone.organization query");
    }
  });

  /** Test the milestone.projects connection query for D.ProjectConnection */
  it("milestone.projects", async () => {
    if (_milestone) {
      const milestone_projects = await _milestone.projects();
      logger.trace(milestone_projects);
    } else {
      throw new Error("No Milestone found from milestone query - cannot test milestone.projects connection query");
    }
  });
});

/** Test all NotificationSubscription queries */
describe("NotificationSubscriptions", () => {
  let _notificationSubscription: D.NotificationSubscription | undefined;
  let _notificationSubscription_id: string | undefined;

  /** Test the root query for the NotificationSubscription connection */
  it("notificationSubscriptions", async () => {
    const notificationSubscriptions = await client.notificationSubscriptions();
    const notificationSubscription = notificationSubscriptions?.nodes?.[0];
    _notificationSubscription_id = notificationSubscription?.id;
    logger.trace(notificationSubscriptions);
  });

  /** Test the root query for a single NotificationSubscription */
  it("notificationSubscription", async () => {
    if (_notificationSubscription_id) {
      const notificationSubscription = await client.notificationSubscription(_notificationSubscription_id);
      _notificationSubscription = notificationSubscription;
      logger.trace(notificationSubscription);
    } else {
      throw new Error(
        "No first NotificationSubscription found from notificationSubscriptions connection query - cannot test notificationSubscription query"
      );
    }
  });

  /** Test the notificationSubscription.project query for D.Project */
  it("notificationSubscription.project", async () => {
    if (_notificationSubscription) {
      const notificationSubscription_project = await _notificationSubscription.project;
      logger.trace(notificationSubscription_project);
    } else {
      throw new Error(
        "No NotificationSubscription found from notificationSubscription query - cannot test notificationSubscription.project query"
      );
    }
  });

  /** Test the notificationSubscription.team query for D.Team */
  it("notificationSubscription.team", async () => {
    if (_notificationSubscription) {
      const notificationSubscription_team = await _notificationSubscription.team;
      logger.trace(notificationSubscription_team);
    } else {
      throw new Error(
        "No NotificationSubscription found from notificationSubscription query - cannot test notificationSubscription.team query"
      );
    }
  });

  /** Test the notificationSubscription.user query for D.User */
  it("notificationSubscription.user", async () => {
    if (_notificationSubscription) {
      const notificationSubscription_user = await _notificationSubscription.user;
      logger.trace(notificationSubscription_user);
    } else {
      throw new Error(
        "No NotificationSubscription found from notificationSubscription query - cannot test notificationSubscription.user query"
      );
    }
  });
});

/** Test all Notification queries */
describe("Notifications", () => {
  let _notification: D.Notification | undefined;
  let _notification_id: string | undefined;

  /** Test the root query for the Notification connection */
  it("notifications", async () => {
    const notifications = await client.notifications();
    const notification = notifications?.nodes?.[0];
    _notification_id = notification?.id;
    logger.trace(notifications);
  });

  /** Test the root query for a single Notification */
  it("notification", async () => {
    if (_notification_id) {
      const notification = await client.notification(_notification_id);
      _notification = notification;
      logger.trace(notification);
    } else {
      throw new Error(
        "No first Notification found from notifications connection query - cannot test notification query"
      );
    }
  });

  /** Test the notification.comment query for D.Comment */
  it("notification.comment", async () => {
    if (_notification) {
      const notification_comment = await _notification.comment;
      logger.trace(notification_comment);
    } else {
      throw new Error("No Notification found from notification query - cannot test notification.comment query");
    }
  });

  /** Test the notification.issue query for D.Issue */
  it("notification.issue", async () => {
    if (_notification) {
      const notification_issue = await _notification.issue;
      logger.trace(notification_issue);
    } else {
      throw new Error("No Notification found from notification query - cannot test notification.issue query");
    }
  });

  /** Test the notification.team query for D.Team */
  it("notification.team", async () => {
    if (_notification) {
      const notification_team = await _notification.team;
      logger.trace(notification_team);
    } else {
      throw new Error("No Notification found from notification query - cannot test notification.team query");
    }
  });

  /** Test the notification.user query for D.User */
  it("notification.user", async () => {
    if (_notification) {
      const notification_user = await _notification.user;
      logger.trace(notification_user);
    } else {
      throw new Error("No Notification found from notification query - cannot test notification.user query");
    }
  });
});

/** Test Organization query */
describe("Organization", () => {
  /** Test the root query for Organization */
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
  let _projectLink: D.ProjectLink | undefined;
  let _projectLink_id: string | undefined;

  /** Test the root query for the ProjectLink connection */
  it("projectLinks", async () => {
    const projectLinks = await client.projectLinks();
    const projectLink = projectLinks?.nodes?.[0];
    _projectLink_id = projectLink?.id;
    logger.trace(projectLinks);
  });

  /** Test the root query for a single ProjectLink */
  it("projectLink", async () => {
    if (_projectLink_id) {
      const projectLink = await client.projectLink(_projectLink_id);
      _projectLink = projectLink;
      logger.trace(projectLink);
    } else {
      throw new Error("No first ProjectLink found from projectLinks connection query - cannot test projectLink query");
    }
  });

  /** Test the projectLink.creator query for D.User */
  it("projectLink.creator", async () => {
    if (_projectLink) {
      const projectLink_creator = await _projectLink.creator;
      logger.trace(projectLink_creator);
    } else {
      throw new Error("No ProjectLink found from projectLink query - cannot test projectLink.creator query");
    }
  });

  /** Test the projectLink.project query for D.Project */
  it("projectLink.project", async () => {
    if (_projectLink) {
      const projectLink_project = await _projectLink.project;
      logger.trace(projectLink_project);
    } else {
      throw new Error("No ProjectLink found from projectLink query - cannot test projectLink.project query");
    }
  });
});

/** Test all Project queries */
describe("Projects", () => {
  let _project: D.Project | undefined;
  let _project_id: string | undefined;

  /** Test the root query for the Project connection */
  it("projects", async () => {
    const projects = await client.projects();
    const project = projects?.nodes?.[0];
    _project_id = project?.id;
    logger.trace(projects);
  });

  /** Test the root query for a single Project */
  it("project", async () => {
    if (_project_id) {
      const project = await client.project(_project_id);
      _project = project;
      logger.trace(project);
    } else {
      throw new Error("No first Project found from projects connection query - cannot test project query");
    }
  });

  /** Test the project.creator query for D.User */
  it("project.creator", async () => {
    if (_project) {
      const project_creator = await _project.creator;
      logger.trace(project_creator);
    } else {
      throw new Error("No Project found from project query - cannot test project.creator query");
    }
  });

  /** Test the project.lead query for D.User */
  it("project.lead", async () => {
    if (_project) {
      const project_lead = await _project.lead;
      logger.trace(project_lead);
    } else {
      throw new Error("No Project found from project query - cannot test project.lead query");
    }
  });

  /** Test the project.milestone query for D.Milestone */
  it("project.milestone", async () => {
    if (_project) {
      const project_milestone = await _project.milestone;
      logger.trace(project_milestone);
    } else {
      throw new Error("No Project found from project query - cannot test project.milestone query");
    }
  });

  /** Test the project.issues connection query for D.IssueConnection */
  it("project.issues", async () => {
    if (_project) {
      const project_issues = await _project.issues();
      logger.trace(project_issues);
    } else {
      throw new Error("No Project found from project query - cannot test project.issues connection query");
    }
  });

  /** Test the project.links connection query for D.ProjectLinkConnection */
  it("project.links", async () => {
    if (_project) {
      const project_links = await _project.links();
      logger.trace(project_links);
    } else {
      throw new Error("No Project found from project query - cannot test project.links connection query");
    }
  });

  /** Test the project.members connection query for D.UserConnection */
  it("project.members", async () => {
    if (_project) {
      const project_members = await _project.members();
      logger.trace(project_members);
    } else {
      throw new Error("No Project found from project query - cannot test project.members connection query");
    }
  });

  /** Test the project.teams connection query for D.TeamConnection */
  it("project.teams", async () => {
    if (_project) {
      const project_teams = await _project.teams();
      logger.trace(project_teams);
    } else {
      throw new Error("No Project found from project query - cannot test project.teams connection query");
    }
  });
});

/** Test PushSubscriptionTest query */
describe("PushSubscriptionTest", () => {
  /** Test the root query for PushSubscriptionTest */
  it("pushSubscriptionTest", async () => {
    const pushSubscriptionTest = await client.pushSubscriptionTest;
    logger.trace(pushSubscriptionTest);
  });
});

/** Test all Reaction queries */
describe("Reactions", () => {
  let _reaction: D.Reaction | undefined;
  let _reaction_id: string | undefined;

  /** Test the root query for the Reaction connection */
  it("reactions", async () => {
    const reactions = await client.reactions();
    const reaction = reactions?.nodes?.[0];
    _reaction_id = reaction?.id;
    logger.trace(reactions);
  });

  /** Test the root query for a single Reaction */
  it("reaction", async () => {
    if (_reaction_id) {
      const reaction = await client.reaction(_reaction_id);
      _reaction = reaction;
      logger.trace(reaction);
    } else {
      throw new Error("No first Reaction found from reactions connection query - cannot test reaction query");
    }
  });

  /** Test the reaction.comment query for D.Comment */
  it("reaction.comment", async () => {
    if (_reaction) {
      const reaction_comment = await _reaction.comment;
      logger.trace(reaction_comment);
    } else {
      throw new Error("No Reaction found from reaction query - cannot test reaction.comment query");
    }
  });

  /** Test the reaction.user query for D.User */
  it("reaction.user", async () => {
    if (_reaction) {
      const reaction_user = await _reaction.user;
      logger.trace(reaction_user);
    } else {
      throw new Error("No Reaction found from reaction query - cannot test reaction.user query");
    }
  });
});

// SsoUrlFromEmail email: string - has required args

// SyncBootstrap databaseVersion: number, sinceSyncId: number - has required args

// SyncUpdates sinceSyncId: number - has required args

/** Test all TeamMembership queries */
describe("TeamMemberships", () => {
  let _teamMembership: D.TeamMembership | undefined;
  let _teamMembership_id: string | undefined;

  /** Test the root query for the TeamMembership connection */
  it("teamMemberships", async () => {
    const teamMemberships = await client.teamMemberships();
    const teamMembership = teamMemberships?.nodes?.[0];
    _teamMembership_id = teamMembership?.id;
    logger.trace(teamMemberships);
  });

  /** Test the root query for a single TeamMembership */
  it("teamMembership", async () => {
    if (_teamMembership_id) {
      const teamMembership = await client.teamMembership(_teamMembership_id);
      _teamMembership = teamMembership;
      logger.trace(teamMembership);
    } else {
      throw new Error(
        "No first TeamMembership found from teamMemberships connection query - cannot test teamMembership query"
      );
    }
  });

  /** Test the teamMembership.team query for D.Team */
  it("teamMembership.team", async () => {
    if (_teamMembership) {
      const teamMembership_team = await _teamMembership.team;
      logger.trace(teamMembership_team);
    } else {
      throw new Error("No TeamMembership found from teamMembership query - cannot test teamMembership.team query");
    }
  });

  /** Test the teamMembership.user query for D.User */
  it("teamMembership.user", async () => {
    if (_teamMembership) {
      const teamMembership_user = await _teamMembership.user;
      logger.trace(teamMembership_user);
    } else {
      throw new Error("No TeamMembership found from teamMembership query - cannot test teamMembership.user query");
    }
  });
});

/** Test all Team queries */
describe("Teams", () => {
  let _team: D.Team | undefined;
  let _team_id: string | undefined;

  /** Test the root query for the Team connection */
  it("teams", async () => {
    const teams = await client.teams();
    const team = teams?.nodes?.[0];
    _team_id = team?.id;
    logger.trace(teams);
  });

  /** Test the root query for a single Team */
  it("team", async () => {
    if (_team_id) {
      const team = await client.team(_team_id);
      _team = team;
      logger.trace(team);
    } else {
      throw new Error("No first Team found from teams connection query - cannot test team query");
    }
  });

  /** Test the team.activeCycle query for D.Cycle */
  it("team.activeCycle", async () => {
    if (_team) {
      const team_activeCycle = await _team.activeCycle;
      logger.trace(team_activeCycle);
    } else {
      throw new Error("No Team found from team query - cannot test team.activeCycle query");
    }
  });

  /** Test the team.draftWorkflowState query for D.WorkflowState */
  it("team.draftWorkflowState", async () => {
    if (_team) {
      const team_draftWorkflowState = await _team.draftWorkflowState;
      logger.trace(team_draftWorkflowState);
    } else {
      throw new Error("No Team found from team query - cannot test team.draftWorkflowState query");
    }
  });

  /** Test the team.markedAsDuplicateWorkflowState query for D.WorkflowState */
  it("team.markedAsDuplicateWorkflowState", async () => {
    if (_team) {
      const team_markedAsDuplicateWorkflowState = await _team.markedAsDuplicateWorkflowState;
      logger.trace(team_markedAsDuplicateWorkflowState);
    } else {
      throw new Error("No Team found from team query - cannot test team.markedAsDuplicateWorkflowState query");
    }
  });

  /** Test the team.mergeWorkflowState query for D.WorkflowState */
  it("team.mergeWorkflowState", async () => {
    if (_team) {
      const team_mergeWorkflowState = await _team.mergeWorkflowState;
      logger.trace(team_mergeWorkflowState);
    } else {
      throw new Error("No Team found from team query - cannot test team.mergeWorkflowState query");
    }
  });

  /** Test the team.organization query for D.Organization */
  it("team.organization", async () => {
    if (_team) {
      const team_organization = await _team.organization;
      logger.trace(team_organization);
    } else {
      throw new Error("No Team found from team query - cannot test team.organization query");
    }
  });

  /** Test the team.reviewWorkflowState query for D.WorkflowState */
  it("team.reviewWorkflowState", async () => {
    if (_team) {
      const team_reviewWorkflowState = await _team.reviewWorkflowState;
      logger.trace(team_reviewWorkflowState);
    } else {
      throw new Error("No Team found from team query - cannot test team.reviewWorkflowState query");
    }
  });

  /** Test the team.startWorkflowState query for D.WorkflowState */
  it("team.startWorkflowState", async () => {
    if (_team) {
      const team_startWorkflowState = await _team.startWorkflowState;
      logger.trace(team_startWorkflowState);
    } else {
      throw new Error("No Team found from team query - cannot test team.startWorkflowState query");
    }
  });

  /** Test the team.cycles connection query for D.CycleConnection */
  it("team.cycles", async () => {
    if (_team) {
      const team_cycles = await _team.cycles();
      logger.trace(team_cycles);
    } else {
      throw new Error("No Team found from team query - cannot test team.cycles connection query");
    }
  });

  /** Test the team.issues connection query for D.IssueConnection */
  it("team.issues", async () => {
    if (_team) {
      const team_issues = await _team.issues();
      logger.trace(team_issues);
    } else {
      throw new Error("No Team found from team query - cannot test team.issues connection query");
    }
  });

  /** Test the team.labels connection query for D.IssueLabelConnection */
  it("team.labels", async () => {
    if (_team) {
      const team_labels = await _team.labels();
      logger.trace(team_labels);
    } else {
      throw new Error("No Team found from team query - cannot test team.labels connection query");
    }
  });

  /** Test the team.memberships connection query for D.TeamMembershipConnection */
  it("team.memberships", async () => {
    if (_team) {
      const team_memberships = await _team.memberships();
      logger.trace(team_memberships);
    } else {
      throw new Error("No Team found from team query - cannot test team.memberships connection query");
    }
  });

  /** Test the team.projects connection query for D.ProjectConnection */
  it("team.projects", async () => {
    if (_team) {
      const team_projects = await _team.projects();
      logger.trace(team_projects);
    } else {
      throw new Error("No Team found from team query - cannot test team.projects connection query");
    }
  });

  /** Test the team.states connection query for D.WorkflowStateConnection */
  it("team.states", async () => {
    if (_team) {
      const team_states = await _team.states();
      logger.trace(team_states);
    } else {
      throw new Error("No Team found from team query - cannot test team.states connection query");
    }
  });

  /** Test the team.templates connection query for D.TemplateConnection */
  it("team.templates", async () => {
    if (_team) {
      const team_templates = await _team.templates();
      logger.trace(team_templates);
    } else {
      throw new Error("No Team found from team query - cannot test team.templates connection query");
    }
  });

  /** Test the team.webhooks connection query for D.WebhookConnection */
  it("team.webhooks", async () => {
    if (_team) {
      const team_webhooks = await _team.webhooks();
      logger.trace(team_webhooks);
    } else {
      throw new Error("No Team found from team query - cannot test team.webhooks connection query");
    }
  });
});

// Template id: string - has required args

// Templates - no model for query

/** Test UserSettings query */
describe("UserSettings", () => {
  /** Test the root query for UserSettings */
  it("userSettings", async () => {
    const userSettings = await client.userSettings;
    logger.trace(userSettings);
  });
});

/** Test all User queries */
describe("Users", () => {
  let _user: D.User | undefined;
  let _user_id: string | undefined;

  /** Test the root query for the User connection */
  it("users", async () => {
    const users = await client.users();
    const user = users?.nodes?.[0];
    _user_id = user?.id;
    logger.trace(users);
  });

  /** Test the root query for a single User */
  it("user", async () => {
    if (_user_id) {
      const user = await client.user(_user_id);
      _user = user;
      logger.trace(user);
    } else {
      throw new Error("No first User found from users connection query - cannot test user query");
    }
  });

  /** Test the user.organization query for D.Organization */
  it("user.organization", async () => {
    if (_user) {
      const user_organization = await _user.organization;
      logger.trace(user_organization);
    } else {
      throw new Error("No User found from user query - cannot test user.organization query");
    }
  });

  /** Test the user.assignedIssues connection query for D.IssueConnection */
  it("user.assignedIssues", async () => {
    if (_user) {
      const user_assignedIssues = await _user.assignedIssues();
      logger.trace(user_assignedIssues);
    } else {
      throw new Error("No User found from user query - cannot test user.assignedIssues connection query");
    }
  });

  /** Test the user.createdIssues connection query for D.IssueConnection */
  it("user.createdIssues", async () => {
    if (_user) {
      const user_createdIssues = await _user.createdIssues();
      logger.trace(user_createdIssues);
    } else {
      throw new Error("No User found from user query - cannot test user.createdIssues connection query");
    }
  });

  /** Test the user.teamMemberships connection query for D.TeamMembershipConnection */
  it("user.teamMemberships", async () => {
    if (_user) {
      const user_teamMemberships = await _user.teamMemberships();
      logger.trace(user_teamMemberships);
    } else {
      throw new Error("No User found from user query - cannot test user.teamMemberships connection query");
    }
  });
});

/** Test Viewer query */
describe("Viewer", () => {
  /** Test the root query for Viewer */
  it("viewer", async () => {
    const viewer = await client.viewer;
    logger.trace(viewer);
  });
});

/** Test all Webhook queries */
describe("Webhooks", () => {
  let _webhook: D.Webhook | undefined;
  let _webhook_id: string | undefined;

  /** Test the root query for the Webhook connection */
  it("webhooks", async () => {
    const webhooks = await client.webhooks();
    const webhook = webhooks?.nodes?.[0];
    _webhook_id = webhook?.id;
    logger.trace(webhooks);
  });

  /** Test the root query for a single Webhook */
  it("webhook", async () => {
    if (_webhook_id) {
      const webhook = await client.webhook(_webhook_id);
      _webhook = webhook;
      logger.trace(webhook);
    } else {
      throw new Error("No first Webhook found from webhooks connection query - cannot test webhook query");
    }
  });

  /** Test the webhook.creator query for D.User */
  it("webhook.creator", async () => {
    if (_webhook) {
      const webhook_creator = await _webhook.creator;
      logger.trace(webhook_creator);
    } else {
      throw new Error("No Webhook found from webhook query - cannot test webhook.creator query");
    }
  });

  /** Test the webhook.team query for D.Team */
  it("webhook.team", async () => {
    if (_webhook) {
      const webhook_team = await _webhook.team;
      logger.trace(webhook_team);
    } else {
      throw new Error("No Webhook found from webhook query - cannot test webhook.team query");
    }
  });
});

/** Test all WorkflowState queries */
describe("WorkflowStates", () => {
  let _workflowState: D.WorkflowState | undefined;
  let _workflowState_id: string | undefined;

  /** Test the root query for the WorkflowState connection */
  it("workflowStates", async () => {
    const workflowStates = await client.workflowStates();
    const workflowState = workflowStates?.nodes?.[0];
    _workflowState_id = workflowState?.id;
    logger.trace(workflowStates);
  });

  /** Test the root query for a single WorkflowState */
  it("workflowState", async () => {
    if (_workflowState_id) {
      const workflowState = await client.workflowState(_workflowState_id);
      _workflowState = workflowState;
      logger.trace(workflowState);
    } else {
      throw new Error(
        "No first WorkflowState found from workflowStates connection query - cannot test workflowState query"
      );
    }
  });

  /** Test the workflowState.team query for D.Team */
  it("workflowState.team", async () => {
    if (_workflowState) {
      const workflowState_team = await _workflowState.team;
      logger.trace(workflowState_team);
    } else {
      throw new Error("No WorkflowState found from workflowState query - cannot test workflowState.team query");
    }
  });

  /** Test the workflowState.issues connection query for D.IssueConnection */
  it("workflowState.issues", async () => {
    if (_workflowState) {
      const workflowState_issues = await _workflowState.issues();
      logger.trace(workflowState_issues);
    } else {
      throw new Error(
        "No WorkflowState found from workflowState query - cannot test workflowState.issues connection query"
      );
    }
  });
});
