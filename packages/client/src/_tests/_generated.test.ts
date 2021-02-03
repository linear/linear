import { logger } from "@linear/common";
import dotenv from "dotenv";
import execa, { ExecaChildProcess } from "execa";
import getPort from "get-port";
import { promisify } from "util";
import * as L from "../index";

/** Load environment variables */
dotenv.config();

/** Auto generated API tests */
describe("generated", () => {
  /** Initialize mock server variable */
  let mockServer: ExecaChildProcess;

  /** Initialize Linear client variable */
  let client: L.LinearClient;

  beforeAll(async () => {
    /** Determine whether to use production or a mock server */
    if (Boolean(process.env.E2E)) {
      logger.info("Using Linear API production endpoint for end-to-end test");

      /** Create Linear client with production server endpoint */
      client = new L.LinearClient({
        apiKey: process.env.E2E_API_KEY,
      });
    } else {
      /** Create sleep function */
      const sleep = promisify(setTimeout);

      /** Get a port for the mock server */
      const port = await getPort();

      /** Start the mock server */
      try {
        logger.info(`Using mock server on http://localhost:${port}/graphql`);
        mockServer = execa("npx", ["graphql-faker", "packages/sdk/src/schema.graphql", `-p ${port}`]);
      } catch (error) {
        logger.fatal(error);
        throw new Error("Failed to start the mock server");
      }

      /** Wait for mock server to start */
      await sleep(1000);

      /** Create Linear client with mock server endpoint */
      client = new L.LinearClient({
        apiKey: "test",
        apiUrl: `http://localhost:${port}/graphql`,
      });
    }
  });

  afterAll(() => {
    /** Kill the mock server */
    try {
      if (mockServer) {
        mockServer.kill("SIGTERM", {
          forceKillAfterTimeout: 2000,
        });
      }
    } catch (error) {
      logger.fatal(error);
      throw new Error("Failed to kill the mock server");
    }
  });

  /** Test all ApiKey queries */
  describe("ApiKeys", () => {
    /** Test the root query for the ApiKey connection */
    it("apiKeys", async () => {
      if (client) {
        const apiKeys = await client.apiKeys();
        expect(apiKeys instanceof L.ApiKeyConnection);
      } else {
        throw new Error("No undefined found from apiKeys query - cannot test client.apiKeys query");
      }
    });
  });

  /** Test the root query for ApplicationWithAuthorization */
  it("applicationWithAuthorization", async () => {
    if (client) {
      const applicationWithAuthorization = await client.applicationWithAuthorization("mock-clientId", ["mock-scope"]);
      expect(applicationWithAuthorization instanceof L.UserAuthorizedApplication);
    } else {
      throw new Error(
        "No undefined found from applicationWithAuthorization query - cannot test client.applicationWithAuthorization query"
      );
    }
  });

  /** Test the root query for ArchivedModelSync */
  it("archivedModelSync", async () => {
    if (client) {
      const archivedModelSync = await client.archivedModelSync("mock-identifier", "mock-modelClass");
      expect(archivedModelSync instanceof L.ArchiveResponse);
    } else {
      throw new Error("No undefined found from archivedModelSync query - cannot test client.archivedModelSync query");
    }
  });

  /** Test the root query for ArchivedModelsSync */
  it("archivedModelsSync", async () => {
    if (client) {
      const archivedModelsSync = await client.archivedModelsSync("mock-modelClass", "mock-teamId");
      expect(archivedModelsSync instanceof L.ArchiveResponse);
    } else {
      throw new Error("No undefined found from archivedModelsSync query - cannot test client.archivedModelsSync query");
    }
  });

  // AuthorizedApplications - no model for query

  /** Test the root query for AvailableUsers */
  it("availableUsers", async () => {
    if (client) {
      const availableUsers = await client.availableUsers;
      expect(availableUsers instanceof L.AuthResolverResponse);
    } else {
      throw new Error("No undefined found from availableUsers query - cannot test client.availableUsers query");
    }
  });

  let _billingDetails: L.BillingDetailsPayload;

  /** Test the root query for BillingDetails */
  it("billingDetails", async () => {
    if (client) {
      const billingDetails = await client.billingDetails;
      _billingDetails = billingDetails;
      expect(billingDetails instanceof L.BillingDetailsPayload);
    } else {
      throw new Error("No undefined found from billingDetails query - cannot test client.billingDetails query");
    }
  });

  /** Test the billingDetails query for BillingDetails_PaymentMethod */
  it("paymentMethod", async () => {
    const paymentMethod = await _billingDetails.paymentMethod;
    expect(paymentMethod instanceof L.Card);
  });

  let _collaborativeDocumentJoin: L.CollaborationDocumentUpdatePayload;

  /** Test the root query for CollaborativeDocumentJoin */
  it("collaborativeDocumentJoin", async () => {
    if (client) {
      const collaborativeDocumentJoin = await client.collaborativeDocumentJoin("mock-clientId", "mock-issueId", 123);
      _collaborativeDocumentJoin = collaborativeDocumentJoin;
      expect(collaborativeDocumentJoin instanceof L.CollaborationDocumentUpdatePayload);
    } else {
      throw new Error(
        "No undefined found from collaborativeDocumentJoin query - cannot test client.collaborativeDocumentJoin query"
      );
    }
  });

  /** Test the collaborativeDocumentJoin query for CollaborativeDocumentJoin_Steps */
  it("steps", async () => {
    const steps = await _collaborativeDocumentJoin.steps;
    expect(steps instanceof L.StepsResponse);
  });

  /** Test all Comment queries */
  describe("Comments", () => {
    let _comment: L.Comment | undefined;
    let _comment_id: string | undefined;

    /** Test the root query for the Comment connection */
    it("comments", async () => {
      if (client) {
        const comments = await client.comments();
        const comment = comments?.nodes?.[0];
        _comment_id = comment?.id;
        expect(comments instanceof L.CommentConnection);
      } else {
        throw new Error("No undefined found from comments query - cannot test client.comments query");
      }
    });

    /** Test the root query for a single Comment */
    it("comment", async () => {
      if (_comment_id) {
        const comment = await client.comment(_comment_id);
        _comment = comment;
        expect(comment instanceof L.Comment);
      } else {
        throw new Error("No first Comment found from comments connection query - cannot test comment query");
      }
    });

    /** Test the comment.issue query for L.Issue */
    it("comment.issue", async () => {
      if (_comment) {
        const comment_issue = await _comment.issue;
        expect(comment_issue instanceof L.Issue);
      } else {
        throw new Error("No Comment found from comment query - cannot test comment.issue query");
      }
    });

    /** Test the comment.user query for L.User */
    it("comment.user", async () => {
      if (_comment) {
        const comment_user = await _comment.user;
        expect(comment_user instanceof L.User);
      } else {
        throw new Error("No Comment found from comment query - cannot test comment.user query");
      }
    });
  });

  /** Test all CustomView queries */
  describe("CustomViews", () => {
    let _customView: L.CustomView | undefined;
    let _customView_id: string | undefined;

    /** Test the root query for the CustomView connection */
    it("customViews", async () => {
      if (client) {
        const customViews = await client.customViews();
        const customView = customViews?.nodes?.[0];
        _customView_id = customView?.id;
        expect(customViews instanceof L.CustomViewConnection);
      } else {
        throw new Error("No undefined found from customViews query - cannot test client.customViews query");
      }
    });

    /** Test the root query for a single CustomView */
    it("customView", async () => {
      if (_customView_id) {
        const customView = await client.customView(_customView_id);
        _customView = customView;
        expect(customView instanceof L.CustomView);
      } else {
        throw new Error("No first CustomView found from customViews connection query - cannot test customView query");
      }
    });

    /** Test the customView.creator query for L.User */
    it("customView.creator", async () => {
      if (_customView) {
        const customView_creator = await _customView.creator;
        expect(customView_creator instanceof L.User);
      } else {
        throw new Error("No CustomView found from customView query - cannot test customView.creator query");
      }
    });

    /** Test the customView.organization query for L.Organization */
    it("customView.organization", async () => {
      if (_customView) {
        const customView_organization = await _customView.organization;
        expect(customView_organization instanceof L.Organization);
      } else {
        throw new Error("No CustomView found from customView query - cannot test customView.organization query");
      }
    });

    /** Test the customView.team query for L.Team */
    it("customView.team", async () => {
      if (_customView) {
        const customView_team = await _customView.team;
        expect(customView_team instanceof L.Team);
      } else {
        throw new Error("No CustomView found from customView query - cannot test customView.team query");
      }
    });
  });

  /** Test all Cycle queries */
  describe("Cycles", () => {
    let _cycle: L.Cycle | undefined;
    let _cycle_id: string | undefined;

    /** Test the root query for the Cycle connection */
    it("cycles", async () => {
      if (client) {
        const cycles = await client.cycles();
        const cycle = cycles?.nodes?.[0];
        _cycle_id = cycle?.id;
        expect(cycles instanceof L.CycleConnection);
      } else {
        throw new Error("No undefined found from cycles query - cannot test client.cycles query");
      }
    });

    /** Test the root query for a single Cycle */
    it("cycle", async () => {
      if (_cycle_id) {
        const cycle = await client.cycle(_cycle_id);
        _cycle = cycle;
        expect(cycle instanceof L.Cycle);
      } else {
        throw new Error("No first Cycle found from cycles connection query - cannot test cycle query");
      }
    });

    /** Test the cycle query for the Issue connection */
    it("cycle.issues", async () => {
      if (_cycle) {
        const issues = await _cycle.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        throw new Error("No cycle found from issues query - cannot test _cycle.issues query");
      }
    });

    /** Test the cycle query for the Issue connection */
    it("cycle.uncompletedIssuesUponClose", async () => {
      if (_cycle) {
        const uncompletedIssuesUponClose = await _cycle.uncompletedIssuesUponClose();
        expect(uncompletedIssuesUponClose instanceof L.IssueConnection);
      } else {
        throw new Error(
          "No cycle found from uncompletedIssuesUponClose query - cannot test _cycle.uncompletedIssuesUponClose query"
        );
      }
    });

    /** Test the cycle.team query for L.Team */
    it("cycle.team", async () => {
      if (_cycle) {
        const cycle_team = await _cycle.team;
        expect(cycle_team instanceof L.Team);
      } else {
        throw new Error("No Cycle found from cycle query - cannot test cycle.team query");
      }
    });
  });

  /** Test all Emoji queries */
  describe("Emojis", () => {
    let _emoji: L.Emoji | undefined;
    let _emoji_id: string | undefined;

    /** Test the root query for the Emoji connection */
    it("emojis", async () => {
      if (client) {
        const emojis = await client.emojis();
        const emoji = emojis?.nodes?.[0];
        _emoji_id = emoji?.id;
        expect(emojis instanceof L.EmojiConnection);
      } else {
        throw new Error("No undefined found from emojis query - cannot test client.emojis query");
      }
    });

    /** Test the root query for a single Emoji */
    it("emoji", async () => {
      if (_emoji_id) {
        const emoji = await client.emoji(_emoji_id);
        _emoji = emoji;
        expect(emoji instanceof L.Emoji);
      } else {
        throw new Error("No first Emoji found from emojis connection query - cannot test emoji query");
      }
    });

    /** Test the emoji.creator query for L.User */
    it("emoji.creator", async () => {
      if (_emoji) {
        const emoji_creator = await _emoji.creator;
        expect(emoji_creator instanceof L.User);
      } else {
        throw new Error("No Emoji found from emoji query - cannot test emoji.creator query");
      }
    });

    /** Test the emoji.organization query for L.Organization */
    it("emoji.organization", async () => {
      if (_emoji) {
        const emoji_organization = await _emoji.organization;
        expect(emoji_organization instanceof L.Organization);
      } else {
        throw new Error("No Emoji found from emoji query - cannot test emoji.organization query");
      }
    });
  });

  /** Test all Favorite queries */
  describe("Favorites", () => {
    let _favorite: L.Favorite | undefined;
    let _favorite_id: string | undefined;

    /** Test the root query for the Favorite connection */
    it("favorites", async () => {
      if (client) {
        const favorites = await client.favorites();
        const favorite = favorites?.nodes?.[0];
        _favorite_id = favorite?.id;
        expect(favorites instanceof L.FavoriteConnection);
      } else {
        throw new Error("No undefined found from favorites query - cannot test client.favorites query");
      }
    });

    /** Test the root query for a single Favorite */
    it("favorite", async () => {
      if (_favorite_id) {
        const favorite = await client.favorite(_favorite_id);
        _favorite = favorite;
        expect(favorite instanceof L.Favorite);
      } else {
        throw new Error("No first Favorite found from favorites connection query - cannot test favorite query");
      }
    });

    /** Test the favorite.cycle query for L.Cycle */
    it("favorite.cycle", async () => {
      if (_favorite) {
        const favorite_cycle = await _favorite.cycle;
        expect(favorite_cycle instanceof L.Cycle);
      } else {
        throw new Error("No Favorite found from favorite query - cannot test favorite.cycle query");
      }
    });

    /** Test the favorite.issue query for L.Issue */
    it("favorite.issue", async () => {
      if (_favorite) {
        const favorite_issue = await _favorite.issue;
        expect(favorite_issue instanceof L.Issue);
      } else {
        throw new Error("No Favorite found from favorite query - cannot test favorite.issue query");
      }
    });

    /** Test the favorite.label query for L.IssueLabel */
    it("favorite.label", async () => {
      if (_favorite) {
        const favorite_label = await _favorite.label;
        expect(favorite_label instanceof L.IssueLabel);
      } else {
        throw new Error("No Favorite found from favorite query - cannot test favorite.label query");
      }
    });

    /** Test the favorite.project query for L.Project */
    it("favorite.project", async () => {
      if (_favorite) {
        const favorite_project = await _favorite.project;
        expect(favorite_project instanceof L.Project);
      } else {
        throw new Error("No Favorite found from favorite query - cannot test favorite.project query");
      }
    });

    /** Test the favorite.projectTeam query for L.Project */
    it("favorite.projectTeam", async () => {
      if (_favorite) {
        const favorite_projectTeam = await _favorite.projectTeam;
        expect(favorite_projectTeam instanceof L.Project);
      } else {
        throw new Error("No Favorite found from favorite query - cannot test favorite.projectTeam query");
      }
    });

    /** Test the favorite.user query for L.User */
    it("favorite.user", async () => {
      if (_favorite) {
        const favorite_user = await _favorite.user;
        expect(favorite_user instanceof L.User);
      } else {
        throw new Error("No Favorite found from favorite query - cannot test favorite.user query");
      }
    });
  });

  let _figmaEmbedInfo: L.FigmaEmbedPayload;

  /** Test the root query for FigmaEmbedInfo */
  it("figmaEmbedInfo", async () => {
    if (client) {
      const figmaEmbedInfo = await client.figmaEmbedInfo("mock-fileId");
      _figmaEmbedInfo = figmaEmbedInfo;
      expect(figmaEmbedInfo instanceof L.FigmaEmbedPayload);
    } else {
      throw new Error("No undefined found from figmaEmbedInfo query - cannot test client.figmaEmbedInfo query");
    }
  });

  /** Test the figmaEmbedInfo query for FigmaEmbedInfo_FigmaEmbed */
  it("figmaEmbed", async () => {
    const figmaEmbed = await _figmaEmbedInfo.figmaEmbed();
    expect(figmaEmbed instanceof L.FigmaEmbed);
  });

  /** Test all IntegrationResource queries */
  describe("IntegrationResources", () => {
    let _integrationResource: L.IntegrationResource | undefined;
    let _integrationResource_id: string | undefined;

    /** Test the root query for the IntegrationResource connection */
    it("integrationResources", async () => {
      if (client) {
        const integrationResources = await client.integrationResources();
        const integrationResource = integrationResources?.nodes?.[0];
        _integrationResource_id = integrationResource?.id;
        expect(integrationResources instanceof L.IntegrationResourceConnection);
      } else {
        throw new Error(
          "No undefined found from integrationResources query - cannot test client.integrationResources query"
        );
      }
    });

    /** Test the root query for a single IntegrationResource */
    it("integrationResource", async () => {
      if (_integrationResource_id) {
        const integrationResource = await client.integrationResource(_integrationResource_id);
        _integrationResource = integrationResource;
        expect(integrationResource instanceof L.IntegrationResource);
      } else {
        throw new Error(
          "No first IntegrationResource found from integrationResources connection query - cannot test integrationResource query"
        );
      }
    });

    let _data: L.IntegrationResourceData;

    /** Test the integrationResource query for IntegrationResource_Data */
    it("data", async () => {
      const data = await _integrationResource.data;
      _data = data;
      expect(data instanceof L.IntegrationResourceData);
    });

    /** Test the integrationResource_data query for IntegrationResource_Data_GithubCommit */
    it("githubCommit", async () => {
      const githubCommit = await _data.githubCommit;
      expect(githubCommit instanceof L.CommitPayload);
    });

    /** Test the integrationResource_data query for IntegrationResource_Data_GithubPullRequest */
    it("githubPullRequest", async () => {
      const githubPullRequest = await _data.githubPullRequest;
      expect(githubPullRequest instanceof L.PullRequestPayload);
    });

    /** Test the integrationResource_data query for IntegrationResource_Data_GitlabMergeRequest */
    it("gitlabMergeRequest", async () => {
      const gitlabMergeRequest = await _data.gitlabMergeRequest;
      expect(gitlabMergeRequest instanceof L.PullRequestPayload);
    });

    /** Test the integrationResource_data query for IntegrationResource_Data_SentryIssue */
    it("sentryIssue", async () => {
      const sentryIssue = await _data.sentryIssue;
      expect(sentryIssue instanceof L.SentryIssuePayload);
    });

    /** Test the integrationResource query for IntegrationResource_PullRequest */
    it("pullRequest", async () => {
      const pullRequest = await _integrationResource.pullRequest;
      expect(pullRequest instanceof L.PullRequestPayload);
    });

    /** Test the integrationResource.integration query for L.Integration */
    it("integrationResource.integration", async () => {
      if (_integrationResource) {
        const integrationResource_integration = await _integrationResource.integration;
        expect(integrationResource_integration instanceof L.Integration);
      } else {
        throw new Error(
          "No IntegrationResource found from integrationResource query - cannot test integrationResource.integration query"
        );
      }
    });

    /** Test the integrationResource.issue query for L.Issue */
    it("integrationResource.issue", async () => {
      if (_integrationResource) {
        const integrationResource_issue = await _integrationResource.issue;
        expect(integrationResource_issue instanceof L.Issue);
      } else {
        throw new Error(
          "No IntegrationResource found from integrationResource query - cannot test integrationResource.issue query"
        );
      }
    });
  });

  /** Test all Integration queries */
  describe("Integrations", () => {
    let _integration: L.Integration | undefined;
    let _integration_id: string | undefined;

    /** Test the root query for the Integration connection */
    it("integrations", async () => {
      if (client) {
        const integrations = await client.integrations();
        const integration = integrations?.nodes?.[0];
        _integration_id = integration?.id;
        expect(integrations instanceof L.IntegrationConnection);
      } else {
        throw new Error("No undefined found from integrations query - cannot test client.integrations query");
      }
    });

    /** Test the root query for a single Integration */
    it("integration", async () => {
      if (_integration_id) {
        const integration = await client.integration(_integration_id);
        _integration = integration;
        expect(integration instanceof L.Integration);
      } else {
        throw new Error(
          "No first Integration found from integrations connection query - cannot test integration query"
        );
      }
    });

    /** Test the integration.creator query for L.User */
    it("integration.creator", async () => {
      if (_integration) {
        const integration_creator = await _integration.creator;
        expect(integration_creator instanceof L.User);
      } else {
        throw new Error("No Integration found from integration query - cannot test integration.creator query");
      }
    });

    /** Test the integration.organization query for L.Organization */
    it("integration.organization", async () => {
      if (_integration) {
        const integration_organization = await _integration.organization;
        expect(integration_organization instanceof L.Organization);
      } else {
        throw new Error("No Integration found from integration query - cannot test integration.organization query");
      }
    });

    /** Test the integration.team query for L.Team */
    it("integration.team", async () => {
      if (_integration) {
        const integration_team = await _integration.team;
        expect(integration_team instanceof L.Team);
      } else {
        throw new Error("No Integration found from integration query - cannot test integration.team query");
      }
    });
  });

  let _inviteInfo: L.InvitePagePayload;

  /** Test the root query for InviteInfo */
  it("inviteInfo", async () => {
    if (client) {
      const inviteInfo = await client.inviteInfo("mock-userHash");
      _inviteInfo = inviteInfo;
      expect(inviteInfo instanceof L.InvitePagePayload);
    } else {
      throw new Error("No undefined found from inviteInfo query - cannot test client.inviteInfo query");
    }
  });

  /** Test the inviteInfo query for InviteInfo_InviteData */
  it("inviteData", async () => {
    const inviteData = await _inviteInfo.inviteData();
    expect(inviteData instanceof L.InviteData);
  });

  /** Test all IssueLabel queries */
  describe("IssueLabels", () => {
    let _issueLabel: L.IssueLabel | undefined;
    let _issueLabel_id: string | undefined;

    /** Test the root query for the IssueLabel connection */
    it("issueLabels", async () => {
      if (client) {
        const issueLabels = await client.issueLabels();
        const issueLabel = issueLabels?.nodes?.[0];
        _issueLabel_id = issueLabel?.id;
        expect(issueLabels instanceof L.IssueLabelConnection);
      } else {
        throw new Error("No undefined found from issueLabels query - cannot test client.issueLabels query");
      }
    });

    /** Test the root query for a single IssueLabel */
    it("issueLabel", async () => {
      if (_issueLabel_id) {
        const issueLabel = await client.issueLabel(_issueLabel_id);
        _issueLabel = issueLabel;
        expect(issueLabel instanceof L.IssueLabel);
      } else {
        throw new Error("No first IssueLabel found from issueLabels connection query - cannot test issueLabel query");
      }
    });

    /** Test the issueLabel query for the Issue connection */
    it("issueLabel.issues", async () => {
      if (_issueLabel) {
        const issues = await _issueLabel.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        throw new Error("No issueLabel found from issues query - cannot test _issueLabel.issues query");
      }
    });

    /** Test the issueLabel.creator query for L.User */
    it("issueLabel.creator", async () => {
      if (_issueLabel) {
        const issueLabel_creator = await _issueLabel.creator;
        expect(issueLabel_creator instanceof L.User);
      } else {
        throw new Error("No IssueLabel found from issueLabel query - cannot test issueLabel.creator query");
      }
    });

    /** Test the issueLabel.team query for L.Team */
    it("issueLabel.team", async () => {
      if (_issueLabel) {
        const issueLabel_team = await _issueLabel.team;
        expect(issueLabel_team instanceof L.Team);
      } else {
        throw new Error("No IssueLabel found from issueLabel query - cannot test issueLabel.team query");
      }
    });
  });

  /** Test all IssueRelation queries */
  describe("IssueRelations", () => {
    let _issueRelation: L.IssueRelation | undefined;
    let _issueRelation_id: string | undefined;

    /** Test the root query for the IssueRelation connection */
    it("issueRelations", async () => {
      if (client) {
        const issueRelations = await client.issueRelations();
        const issueRelation = issueRelations?.nodes?.[0];
        _issueRelation_id = issueRelation?.id;
        expect(issueRelations instanceof L.IssueRelationConnection);
      } else {
        throw new Error("No undefined found from issueRelations query - cannot test client.issueRelations query");
      }
    });

    /** Test the root query for a single IssueRelation */
    it("issueRelation", async () => {
      if (_issueRelation_id) {
        const issueRelation = await client.issueRelation(_issueRelation_id);
        _issueRelation = issueRelation;
        expect(issueRelation instanceof L.IssueRelation);
      } else {
        throw new Error(
          "No first IssueRelation found from issueRelations connection query - cannot test issueRelation query"
        );
      }
    });

    /** Test the issueRelation.issue query for L.Issue */
    it("issueRelation.issue", async () => {
      if (_issueRelation) {
        const issueRelation_issue = await _issueRelation.issue;
        expect(issueRelation_issue instanceof L.Issue);
      } else {
        throw new Error("No IssueRelation found from issueRelation query - cannot test issueRelation.issue query");
      }
    });

    /** Test the issueRelation.relatedIssue query for L.Issue */
    it("issueRelation.relatedIssue", async () => {
      if (_issueRelation) {
        const issueRelation_relatedIssue = await _issueRelation.relatedIssue;
        expect(issueRelation_relatedIssue instanceof L.Issue);
      } else {
        throw new Error(
          "No IssueRelation found from issueRelation query - cannot test issueRelation.relatedIssue query"
        );
      }
    });
  });

  /** Test all Issue queries */
  describe("IssueSearch", () => {
    let _issue: L.Issue | undefined;
    let _issue_id: string | undefined;

    /** Test the root query for the Issue connection */
    it("issueSearch", async () => {
      if (client) {
        const issueSearch = await client.issueSearch("mock-query");
        const issue = issueSearch?.nodes?.[0];
        _issue_id = issue?.id;
        expect(issueSearch instanceof L.IssueConnection);
      } else {
        throw new Error("No undefined found from issueSearch query - cannot test client.issueSearch query");
      }
    });

    /** Test the root query for a single Issue */
    it("issue", async () => {
      if (_issue_id) {
        const issue = await client.issue(_issue_id);
        _issue = issue;
        expect(issue instanceof L.Issue);
      } else {
        throw new Error("No first Issue found from issueSearch connection query - cannot test issue query");
      }
    });

    /** Test the issue query for the Issue connection */
    it("issue.children", async () => {
      if (_issue) {
        const children = await _issue.children();
        expect(children instanceof L.IssueConnection);
      } else {
        throw new Error("No issue found from children query - cannot test _issue.children query");
      }
    });

    /** Test the issue query for the Comment connection */
    it("issue.comments", async () => {
      if (_issue) {
        const comments = await _issue.comments();
        expect(comments instanceof L.CommentConnection);
      } else {
        throw new Error("No issue found from comments query - cannot test _issue.comments query");
      }
    });

    /** Test the issue query for the IssueHistory connection */
    it("issue.history", async () => {
      if (_issue) {
        const history = await _issue.history();
        expect(history instanceof L.IssueHistoryConnection);
      } else {
        throw new Error("No issue found from history query - cannot test _issue.history query");
      }
    });

    /** Test the issue query for the IntegrationResource connection */
    it("issue.integrationResources", async () => {
      if (_issue) {
        const integrationResources = await _issue.integrationResources();
        expect(integrationResources instanceof L.IntegrationResourceConnection);
      } else {
        throw new Error(
          "No issue found from integrationResources query - cannot test _issue.integrationResources query"
        );
      }
    });

    /** Test the issue query for the IssueRelation connection */
    it("issue.inverseRelations", async () => {
      if (_issue) {
        const inverseRelations = await _issue.inverseRelations();
        expect(inverseRelations instanceof L.IssueRelationConnection);
      } else {
        throw new Error("No issue found from inverseRelations query - cannot test _issue.inverseRelations query");
      }
    });

    /** Test the issue query for the IssueLabel connection */
    it("issue.labels", async () => {
      if (_issue) {
        const labels = await _issue.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        throw new Error("No issue found from labels query - cannot test _issue.labels query");
      }
    });

    /** Test the issue query for the IssueRelation connection */
    it("issue.relations", async () => {
      if (_issue) {
        const relations = await _issue.relations();
        expect(relations instanceof L.IssueRelationConnection);
      } else {
        throw new Error("No issue found from relations query - cannot test _issue.relations query");
      }
    });

    /** Test the issue query for the User connection */
    it("issue.subscribers", async () => {
      if (_issue) {
        const subscribers = await _issue.subscribers();
        expect(subscribers instanceof L.UserConnection);
      } else {
        throw new Error("No issue found from subscribers query - cannot test _issue.subscribers query");
      }
    });

    /** Test the issue.assignee query for L.User */
    it("issue.assignee", async () => {
      if (_issue) {
        const issue_assignee = await _issue.assignee;
        expect(issue_assignee instanceof L.User);
      } else {
        throw new Error("No Issue found from issue query - cannot test issue.assignee query");
      }
    });

    /** Test the issue.creator query for L.User */
    it("issue.creator", async () => {
      if (_issue) {
        const issue_creator = await _issue.creator;
        expect(issue_creator instanceof L.User);
      } else {
        throw new Error("No Issue found from issue query - cannot test issue.creator query");
      }
    });

    /** Test the issue.cycle query for L.Cycle */
    it("issue.cycle", async () => {
      if (_issue) {
        const issue_cycle = await _issue.cycle;
        expect(issue_cycle instanceof L.Cycle);
      } else {
        throw new Error("No Issue found from issue query - cannot test issue.cycle query");
      }
    });

    /** Test the issue.parent query for L.Issue */
    it("issue.parent", async () => {
      if (_issue) {
        const issue_parent = await _issue.parent;
        expect(issue_parent instanceof L.Issue);
      } else {
        throw new Error("No Issue found from issue query - cannot test issue.parent query");
      }
    });

    /** Test the issue.project query for L.Project */
    it("issue.project", async () => {
      if (_issue) {
        const issue_project = await _issue.project;
        expect(issue_project instanceof L.Project);
      } else {
        throw new Error("No Issue found from issue query - cannot test issue.project query");
      }
    });

    /** Test the issue.state query for L.WorkflowState */
    it("issue.state", async () => {
      if (_issue) {
        const issue_state = await _issue.state;
        expect(issue_state instanceof L.WorkflowState);
      } else {
        throw new Error("No Issue found from issue query - cannot test issue.state query");
      }
    });

    /** Test the issue.team query for L.Team */
    it("issue.team", async () => {
      if (_issue) {
        const issue_team = await _issue.team;
        expect(issue_team instanceof L.Team);
      } else {
        throw new Error("No Issue found from issue query - cannot test issue.team query");
      }
    });
  });

  /** Test all Issue queries */
  describe("Issues", () => {
    let _issue: L.Issue | undefined;
    let _issue_id: string | undefined;

    /** Test the root query for the Issue connection */
    it("issues", async () => {
      if (client) {
        const issues = await client.issues();
        const issue = issues?.nodes?.[0];
        _issue_id = issue?.id;
        expect(issues instanceof L.IssueConnection);
      } else {
        throw new Error("No undefined found from issues query - cannot test client.issues query");
      }
    });

    /** Test the root query for a single Issue */
    it("issue", async () => {
      if (_issue_id) {
        const issue = await client.issue(_issue_id);
        _issue = issue;
        expect(issue instanceof L.Issue);
      } else {
        throw new Error("No first Issue found from issues connection query - cannot test issue query");
      }
    });

    /** Test the issue query for the Issue connection */
    it("issue.children", async () => {
      if (_issue) {
        const children = await _issue.children();
        expect(children instanceof L.IssueConnection);
      } else {
        throw new Error("No issue found from children query - cannot test _issue.children query");
      }
    });

    /** Test the issue query for the Comment connection */
    it("issue.comments", async () => {
      if (_issue) {
        const comments = await _issue.comments();
        expect(comments instanceof L.CommentConnection);
      } else {
        throw new Error("No issue found from comments query - cannot test _issue.comments query");
      }
    });

    /** Test the issue query for the IssueHistory connection */
    it("issue.history", async () => {
      if (_issue) {
        const history = await _issue.history();
        expect(history instanceof L.IssueHistoryConnection);
      } else {
        throw new Error("No issue found from history query - cannot test _issue.history query");
      }
    });

    /** Test the issue query for the IntegrationResource connection */
    it("issue.integrationResources", async () => {
      if (_issue) {
        const integrationResources = await _issue.integrationResources();
        expect(integrationResources instanceof L.IntegrationResourceConnection);
      } else {
        throw new Error(
          "No issue found from integrationResources query - cannot test _issue.integrationResources query"
        );
      }
    });

    /** Test the issue query for the IssueRelation connection */
    it("issue.inverseRelations", async () => {
      if (_issue) {
        const inverseRelations = await _issue.inverseRelations();
        expect(inverseRelations instanceof L.IssueRelationConnection);
      } else {
        throw new Error("No issue found from inverseRelations query - cannot test _issue.inverseRelations query");
      }
    });

    /** Test the issue query for the IssueLabel connection */
    it("issue.labels", async () => {
      if (_issue) {
        const labels = await _issue.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        throw new Error("No issue found from labels query - cannot test _issue.labels query");
      }
    });

    /** Test the issue query for the IssueRelation connection */
    it("issue.relations", async () => {
      if (_issue) {
        const relations = await _issue.relations();
        expect(relations instanceof L.IssueRelationConnection);
      } else {
        throw new Error("No issue found from relations query - cannot test _issue.relations query");
      }
    });

    /** Test the issue query for the User connection */
    it("issue.subscribers", async () => {
      if (_issue) {
        const subscribers = await _issue.subscribers();
        expect(subscribers instanceof L.UserConnection);
      } else {
        throw new Error("No issue found from subscribers query - cannot test _issue.subscribers query");
      }
    });

    /** Test the issue.assignee query for L.User */
    it("issue.assignee", async () => {
      if (_issue) {
        const issue_assignee = await _issue.assignee;
        expect(issue_assignee instanceof L.User);
      } else {
        throw new Error("No Issue found from issue query - cannot test issue.assignee query");
      }
    });

    /** Test the issue.creator query for L.User */
    it("issue.creator", async () => {
      if (_issue) {
        const issue_creator = await _issue.creator;
        expect(issue_creator instanceof L.User);
      } else {
        throw new Error("No Issue found from issue query - cannot test issue.creator query");
      }
    });

    /** Test the issue.cycle query for L.Cycle */
    it("issue.cycle", async () => {
      if (_issue) {
        const issue_cycle = await _issue.cycle;
        expect(issue_cycle instanceof L.Cycle);
      } else {
        throw new Error("No Issue found from issue query - cannot test issue.cycle query");
      }
    });

    /** Test the issue.parent query for L.Issue */
    it("issue.parent", async () => {
      if (_issue) {
        const issue_parent = await _issue.parent;
        expect(issue_parent instanceof L.Issue);
      } else {
        throw new Error("No Issue found from issue query - cannot test issue.parent query");
      }
    });

    /** Test the issue.project query for L.Project */
    it("issue.project", async () => {
      if (_issue) {
        const issue_project = await _issue.project;
        expect(issue_project instanceof L.Project);
      } else {
        throw new Error("No Issue found from issue query - cannot test issue.project query");
      }
    });

    /** Test the issue.state query for L.WorkflowState */
    it("issue.state", async () => {
      if (_issue) {
        const issue_state = await _issue.state;
        expect(issue_state instanceof L.WorkflowState);
      } else {
        throw new Error("No Issue found from issue query - cannot test issue.state query");
      }
    });

    /** Test the issue.team query for L.Team */
    it("issue.team", async () => {
      if (_issue) {
        const issue_team = await _issue.team;
        expect(issue_team instanceof L.Team);
      } else {
        throw new Error("No Issue found from issue query - cannot test issue.team query");
      }
    });
  });

  /** Test all Milestone queries */
  describe("Milestones", () => {
    let _milestone: L.Milestone | undefined;
    let _milestone_id: string | undefined;

    /** Test the root query for the Milestone connection */
    it("milestones", async () => {
      if (client) {
        const milestones = await client.milestones();
        const milestone = milestones?.nodes?.[0];
        _milestone_id = milestone?.id;
        expect(milestones instanceof L.MilestoneConnection);
      } else {
        throw new Error("No undefined found from milestones query - cannot test client.milestones query");
      }
    });

    /** Test the root query for a single Milestone */
    it("milestone", async () => {
      if (_milestone_id) {
        const milestone = await client.milestone(_milestone_id);
        _milestone = milestone;
        expect(milestone instanceof L.Milestone);
      } else {
        throw new Error("No first Milestone found from milestones connection query - cannot test milestone query");
      }
    });

    /** Test the milestone query for the Project connection */
    it("milestone.projects", async () => {
      if (_milestone) {
        const projects = await _milestone.projects();
        expect(projects instanceof L.ProjectConnection);
      } else {
        throw new Error("No milestone found from projects query - cannot test _milestone.projects query");
      }
    });

    /** Test the milestone.organization query for L.Organization */
    it("milestone.organization", async () => {
      if (_milestone) {
        const milestone_organization = await _milestone.organization;
        expect(milestone_organization instanceof L.Organization);
      } else {
        throw new Error("No Milestone found from milestone query - cannot test milestone.organization query");
      }
    });
  });

  /** Test all NotificationSubscription queries */
  describe("NotificationSubscriptions", () => {
    let _notificationSubscription: L.NotificationSubscription | undefined;
    let _notificationSubscription_id: string | undefined;

    /** Test the root query for the NotificationSubscription connection */
    it("notificationSubscriptions", async () => {
      if (client) {
        const notificationSubscriptions = await client.notificationSubscriptions();
        const notificationSubscription = notificationSubscriptions?.nodes?.[0];
        _notificationSubscription_id = notificationSubscription?.id;
        expect(notificationSubscriptions instanceof L.NotificationSubscriptionConnection);
      } else {
        throw new Error(
          "No undefined found from notificationSubscriptions query - cannot test client.notificationSubscriptions query"
        );
      }
    });

    /** Test the root query for a single NotificationSubscription */
    it("notificationSubscription", async () => {
      if (_notificationSubscription_id) {
        const notificationSubscription = await client.notificationSubscription(_notificationSubscription_id);
        _notificationSubscription = notificationSubscription;
        expect(notificationSubscription instanceof L.NotificationSubscription);
      } else {
        throw new Error(
          "No first NotificationSubscription found from notificationSubscriptions connection query - cannot test notificationSubscription query"
        );
      }
    });

    /** Test the notificationSubscription.project query for L.Project */
    it("notificationSubscription.project", async () => {
      if (_notificationSubscription) {
        const notificationSubscription_project = await _notificationSubscription.project;
        expect(notificationSubscription_project instanceof L.Project);
      } else {
        throw new Error(
          "No NotificationSubscription found from notificationSubscription query - cannot test notificationSubscription.project query"
        );
      }
    });

    /** Test the notificationSubscription.team query for L.Team */
    it("notificationSubscription.team", async () => {
      if (_notificationSubscription) {
        const notificationSubscription_team = await _notificationSubscription.team;
        expect(notificationSubscription_team instanceof L.Team);
      } else {
        throw new Error(
          "No NotificationSubscription found from notificationSubscription query - cannot test notificationSubscription.team query"
        );
      }
    });

    /** Test the notificationSubscription.user query for L.User */
    it("notificationSubscription.user", async () => {
      if (_notificationSubscription) {
        const notificationSubscription_user = await _notificationSubscription.user;
        expect(notificationSubscription_user instanceof L.User);
      } else {
        throw new Error(
          "No NotificationSubscription found from notificationSubscription query - cannot test notificationSubscription.user query"
        );
      }
    });
  });

  /** Test all Notification queries */
  describe("Notifications", () => {
    let _notification: L.Notification | undefined;
    let _notification_id: string | undefined;

    /** Test the root query for the Notification connection */
    it("notifications", async () => {
      if (client) {
        const notifications = await client.notifications();
        const notification = notifications?.nodes?.[0];
        _notification_id = notification?.id;
        expect(notifications instanceof L.NotificationConnection);
      } else {
        throw new Error("No undefined found from notifications query - cannot test client.notifications query");
      }
    });

    /** Test the root query for a single Notification */
    it("notification", async () => {
      if (_notification_id) {
        const notification = await client.notification(_notification_id);
        _notification = notification;
        expect(notification instanceof L.Notification);
      } else {
        throw new Error(
          "No first Notification found from notifications connection query - cannot test notification query"
        );
      }
    });

    /** Test the notification.comment query for L.Comment */
    it("notification.comment", async () => {
      if (_notification) {
        const notification_comment = await _notification.comment;
        expect(notification_comment instanceof L.Comment);
      } else {
        throw new Error("No Notification found from notification query - cannot test notification.comment query");
      }
    });

    /** Test the notification.issue query for L.Issue */
    it("notification.issue", async () => {
      if (_notification) {
        const notification_issue = await _notification.issue;
        expect(notification_issue instanceof L.Issue);
      } else {
        throw new Error("No Notification found from notification query - cannot test notification.issue query");
      }
    });

    /** Test the notification.team query for L.Team */
    it("notification.team", async () => {
      if (_notification) {
        const notification_team = await _notification.team;
        expect(notification_team instanceof L.Team);
      } else {
        throw new Error("No Notification found from notification query - cannot test notification.team query");
      }
    });

    /** Test the notification.user query for L.User */
    it("notification.user", async () => {
      if (_notification) {
        const notification_user = await _notification.user;
        expect(notification_user instanceof L.User);
      } else {
        throw new Error("No Notification found from notification query - cannot test notification.user query");
      }
    });
  });

  let _organization: L.Organization;

  /** Test the root query for Organization */
  it("organization", async () => {
    if (client) {
      const organization = await client.organization;
      _organization = organization;
      expect(organization instanceof L.Organization);
    } else {
      throw new Error("No undefined found from organization query - cannot test client.organization query");
    }
  });

  /** Test the organization query for the Integration connection */
  it("organization.integrations", async () => {
    if (_organization) {
      const integrations = await _organization.integrations();
      expect(integrations instanceof L.IntegrationConnection);
    } else {
      throw new Error("No organization found from integrations query - cannot test _organization.integrations query");
    }
  });

  /** Test the organization query for the Milestone connection */
  it("organization.milestones", async () => {
    if (_organization) {
      const milestones = await _organization.milestones();
      expect(milestones instanceof L.MilestoneConnection);
    } else {
      throw new Error("No organization found from milestones query - cannot test _organization.milestones query");
    }
  });

  /** Test the organization query for the Team connection */
  it("organization.teams", async () => {
    if (_organization) {
      const teams = await _organization.teams();
      expect(teams instanceof L.TeamConnection);
    } else {
      throw new Error("No organization found from teams query - cannot test _organization.teams query");
    }
  });

  /** Test the organization query for the User connection */
  it("organization.users", async () => {
    if (_organization) {
      const users = await _organization.users();
      expect(users instanceof L.UserConnection);
    } else {
      throw new Error("No organization found from users query - cannot test _organization.users query");
    }
  });

  /** Test the root query for OrganizationExists */
  it("organizationExists", async () => {
    if (client) {
      const organizationExists = await client.organizationExists("mock-urlKey");
      expect(organizationExists instanceof L.OrganizationExistsPayload);
    } else {
      throw new Error("No undefined found from organizationExists query - cannot test client.organizationExists query");
    }
  });

  /** Test all OrganizationInvite queries */
  describe("OrganizationInvites", () => {
    /** Test the root query for the OrganizationInvite connection */
    it("organizationInvites", async () => {
      if (client) {
        const organizationInvites = await client.organizationInvites();
        expect(organizationInvites instanceof L.OrganizationInviteConnection);
      } else {
        throw new Error(
          "No undefined found from organizationInvites query - cannot test client.organizationInvites query"
        );
      }
    });
  });

  /** Test all ProjectLink queries */
  describe("ProjectLinks", () => {
    let _projectLink: L.ProjectLink | undefined;
    let _projectLink_id: string | undefined;

    /** Test the root query for the ProjectLink connection */
    it("projectLinks", async () => {
      if (client) {
        const projectLinks = await client.projectLinks();
        const projectLink = projectLinks?.nodes?.[0];
        _projectLink_id = projectLink?.id;
        expect(projectLinks instanceof L.ProjectLinkConnection);
      } else {
        throw new Error("No undefined found from projectLinks query - cannot test client.projectLinks query");
      }
    });

    /** Test the root query for a single ProjectLink */
    it("projectLink", async () => {
      if (_projectLink_id) {
        const projectLink = await client.projectLink(_projectLink_id);
        _projectLink = projectLink;
        expect(projectLink instanceof L.ProjectLink);
      } else {
        throw new Error(
          "No first ProjectLink found from projectLinks connection query - cannot test projectLink query"
        );
      }
    });

    /** Test the projectLink.creator query for L.User */
    it("projectLink.creator", async () => {
      if (_projectLink) {
        const projectLink_creator = await _projectLink.creator;
        expect(projectLink_creator instanceof L.User);
      } else {
        throw new Error("No ProjectLink found from projectLink query - cannot test projectLink.creator query");
      }
    });

    /** Test the projectLink.project query for L.Project */
    it("projectLink.project", async () => {
      if (_projectLink) {
        const projectLink_project = await _projectLink.project;
        expect(projectLink_project instanceof L.Project);
      } else {
        throw new Error("No ProjectLink found from projectLink query - cannot test projectLink.project query");
      }
    });
  });

  /** Test all Project queries */
  describe("Projects", () => {
    let _project: L.Project | undefined;
    let _project_id: string | undefined;

    /** Test the root query for the Project connection */
    it("projects", async () => {
      if (client) {
        const projects = await client.projects();
        const project = projects?.nodes?.[0];
        _project_id = project?.id;
        expect(projects instanceof L.ProjectConnection);
      } else {
        throw new Error("No undefined found from projects query - cannot test client.projects query");
      }
    });

    /** Test the root query for a single Project */
    it("project", async () => {
      if (_project_id) {
        const project = await client.project(_project_id);
        _project = project;
        expect(project instanceof L.Project);
      } else {
        throw new Error("No first Project found from projects connection query - cannot test project query");
      }
    });

    /** Test the project query for the Issue connection */
    it("project.issues", async () => {
      if (_project) {
        const issues = await _project.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        throw new Error("No project found from issues query - cannot test _project.issues query");
      }
    });

    /** Test the project query for the ProjectLink connection */
    it("project.links", async () => {
      if (_project) {
        const links = await _project.links();
        expect(links instanceof L.ProjectLinkConnection);
      } else {
        throw new Error("No project found from links query - cannot test _project.links query");
      }
    });

    /** Test the project query for the User connection */
    it("project.members", async () => {
      if (_project) {
        const members = await _project.members();
        expect(members instanceof L.UserConnection);
      } else {
        throw new Error("No project found from members query - cannot test _project.members query");
      }
    });

    /** Test the project query for the Team connection */
    it("project.teams", async () => {
      if (_project) {
        const teams = await _project.teams();
        expect(teams instanceof L.TeamConnection);
      } else {
        throw new Error("No project found from teams query - cannot test _project.teams query");
      }
    });

    /** Test the project.creator query for L.User */
    it("project.creator", async () => {
      if (_project) {
        const project_creator = await _project.creator;
        expect(project_creator instanceof L.User);
      } else {
        throw new Error("No Project found from project query - cannot test project.creator query");
      }
    });

    /** Test the project.lead query for L.User */
    it("project.lead", async () => {
      if (_project) {
        const project_lead = await _project.lead;
        expect(project_lead instanceof L.User);
      } else {
        throw new Error("No Project found from project query - cannot test project.lead query");
      }
    });

    /** Test the project.milestone query for L.Milestone */
    it("project.milestone", async () => {
      if (_project) {
        const project_milestone = await _project.milestone;
        expect(project_milestone instanceof L.Milestone);
      } else {
        throw new Error("No Project found from project query - cannot test project.milestone query");
      }
    });
  });

  /** Test the root query for PushSubscriptionTest */
  it("pushSubscriptionTest", async () => {
    if (client) {
      const pushSubscriptionTest = await client.pushSubscriptionTest;
      expect(pushSubscriptionTest instanceof L.PushSubscriptionPayload);
    } else {
      throw new Error(
        "No undefined found from pushSubscriptionTest query - cannot test client.pushSubscriptionTest query"
      );
    }
  });

  /** Test all Reaction queries */
  describe("Reactions", () => {
    let _reaction: L.Reaction | undefined;
    let _reaction_id: string | undefined;

    /** Test the root query for the Reaction connection */
    it("reactions", async () => {
      if (client) {
        const reactions = await client.reactions();
        const reaction = reactions?.nodes?.[0];
        _reaction_id = reaction?.id;
        expect(reactions instanceof L.ReactionConnection);
      } else {
        throw new Error("No undefined found from reactions query - cannot test client.reactions query");
      }
    });

    /** Test the root query for a single Reaction */
    it("reaction", async () => {
      if (_reaction_id) {
        const reaction = await client.reaction(_reaction_id);
        _reaction = reaction;
        expect(reaction instanceof L.Reaction);
      } else {
        throw new Error("No first Reaction found from reactions connection query - cannot test reaction query");
      }
    });

    /** Test the reaction.comment query for L.Comment */
    it("reaction.comment", async () => {
      if (_reaction) {
        const reaction_comment = await _reaction.comment;
        expect(reaction_comment instanceof L.Comment);
      } else {
        throw new Error("No Reaction found from reaction query - cannot test reaction.comment query");
      }
    });

    /** Test the reaction.user query for L.User */
    it("reaction.user", async () => {
      if (_reaction) {
        const reaction_user = await _reaction.user;
        expect(reaction_user instanceof L.User);
      } else {
        throw new Error("No Reaction found from reaction query - cannot test reaction.user query");
      }
    });
  });

  /** Test the root query for SsoUrlFromEmail */
  it("ssoUrlFromEmail", async () => {
    if (client) {
      const ssoUrlFromEmail = await client.ssoUrlFromEmail("mock-email");
      expect(ssoUrlFromEmail instanceof L.SsoUrlFromEmailResponse);
    } else {
      throw new Error("No undefined found from ssoUrlFromEmail query - cannot test client.ssoUrlFromEmail query");
    }
  });

  /** Test the root query for SyncBootstrap */
  it("syncBootstrap", async () => {
    if (client) {
      const syncBootstrap = await client.syncBootstrap(123, 123);
      expect(syncBootstrap instanceof L.SyncResponse);
    } else {
      throw new Error("No undefined found from syncBootstrap query - cannot test client.syncBootstrap query");
    }
  });

  /** Test the root query for SyncUpdates */
  it("syncUpdates", async () => {
    if (client) {
      const syncUpdates = await client.syncUpdates(123);
      expect(syncUpdates instanceof L.SyncResponse);
    } else {
      throw new Error("No undefined found from syncUpdates query - cannot test client.syncUpdates query");
    }
  });

  /** Test all TeamMembership queries */
  describe("TeamMemberships", () => {
    let _teamMembership: L.TeamMembership | undefined;
    let _teamMembership_id: string | undefined;

    /** Test the root query for the TeamMembership connection */
    it("teamMemberships", async () => {
      if (client) {
        const teamMemberships = await client.teamMemberships();
        const teamMembership = teamMemberships?.nodes?.[0];
        _teamMembership_id = teamMembership?.id;
        expect(teamMemberships instanceof L.TeamMembershipConnection);
      } else {
        throw new Error("No undefined found from teamMemberships query - cannot test client.teamMemberships query");
      }
    });

    /** Test the root query for a single TeamMembership */
    it("teamMembership", async () => {
      if (_teamMembership_id) {
        const teamMembership = await client.teamMembership(_teamMembership_id);
        _teamMembership = teamMembership;
        expect(teamMembership instanceof L.TeamMembership);
      } else {
        throw new Error(
          "No first TeamMembership found from teamMemberships connection query - cannot test teamMembership query"
        );
      }
    });

    /** Test the teamMembership.team query for L.Team */
    it("teamMembership.team", async () => {
      if (_teamMembership) {
        const teamMembership_team = await _teamMembership.team;
        expect(teamMembership_team instanceof L.Team);
      } else {
        throw new Error("No TeamMembership found from teamMembership query - cannot test teamMembership.team query");
      }
    });

    /** Test the teamMembership.user query for L.User */
    it("teamMembership.user", async () => {
      if (_teamMembership) {
        const teamMembership_user = await _teamMembership.user;
        expect(teamMembership_user instanceof L.User);
      } else {
        throw new Error("No TeamMembership found from teamMembership query - cannot test teamMembership.user query");
      }
    });
  });

  /** Test all Team queries */
  describe("Teams", () => {
    let _team: L.Team | undefined;
    let _team_id: string | undefined;

    /** Test the root query for the Team connection */
    it("teams", async () => {
      if (client) {
        const teams = await client.teams();
        const team = teams?.nodes?.[0];
        _team_id = team?.id;
        expect(teams instanceof L.TeamConnection);
      } else {
        throw new Error("No undefined found from teams query - cannot test client.teams query");
      }
    });

    /** Test the root query for a single Team */
    it("team", async () => {
      if (_team_id) {
        const team = await client.team(_team_id);
        _team = team;
        expect(team instanceof L.Team);
      } else {
        throw new Error("No first Team found from teams connection query - cannot test team query");
      }
    });

    /** Test the team query for the Cycle connection */
    it("team.cycles", async () => {
      if (_team) {
        const cycles = await _team.cycles();
        expect(cycles instanceof L.CycleConnection);
      } else {
        throw new Error("No team found from cycles query - cannot test _team.cycles query");
      }
    });

    /** Test the team query for the Issue connection */
    it("team.issues", async () => {
      if (_team) {
        const issues = await _team.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        throw new Error("No team found from issues query - cannot test _team.issues query");
      }
    });

    /** Test the team query for the IssueLabel connection */
    it("team.labels", async () => {
      if (_team) {
        const labels = await _team.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        throw new Error("No team found from labels query - cannot test _team.labels query");
      }
    });

    /** Test the team query for the User connection */
    it("team.members", async () => {
      if (_team) {
        const members = await _team.members();
        expect(members instanceof L.UserConnection);
      } else {
        throw new Error("No team found from members query - cannot test _team.members query");
      }
    });

    /** Test the team query for the TeamMembership connection */
    it("team.memberships", async () => {
      if (_team) {
        const memberships = await _team.memberships();
        expect(memberships instanceof L.TeamMembershipConnection);
      } else {
        throw new Error("No team found from memberships query - cannot test _team.memberships query");
      }
    });

    /** Test the team query for the Project connection */
    it("team.projects", async () => {
      if (_team) {
        const projects = await _team.projects();
        expect(projects instanceof L.ProjectConnection);
      } else {
        throw new Error("No team found from projects query - cannot test _team.projects query");
      }
    });

    /** Test the team query for the WorkflowState connection */
    it("team.states", async () => {
      if (_team) {
        const states = await _team.states();
        expect(states instanceof L.WorkflowStateConnection);
      } else {
        throw new Error("No team found from states query - cannot test _team.states query");
      }
    });

    /** Test the team query for Team_Templates */
    it("templates", async () => {
      const templates = await _team.templates();
      expect(templates instanceof L.TemplateConnection);
    });

    /** Test the team query for the Webhook connection */
    it("team.webhooks", async () => {
      if (_team) {
        const webhooks = await _team.webhooks();
        expect(webhooks instanceof L.WebhookConnection);
      } else {
        throw new Error("No team found from webhooks query - cannot test _team.webhooks query");
      }
    });

    /** Test the team.activeCycle query for L.Cycle */
    it("team.activeCycle", async () => {
      if (_team) {
        const team_activeCycle = await _team.activeCycle;
        expect(team_activeCycle instanceof L.Cycle);
      } else {
        throw new Error("No Team found from team query - cannot test team.activeCycle query");
      }
    });

    /** Test the team.draftWorkflowState query for L.WorkflowState */
    it("team.draftWorkflowState", async () => {
      if (_team) {
        const team_draftWorkflowState = await _team.draftWorkflowState;
        expect(team_draftWorkflowState instanceof L.WorkflowState);
      } else {
        throw new Error("No Team found from team query - cannot test team.draftWorkflowState query");
      }
    });

    /** Test the team.markedAsDuplicateWorkflowState query for L.WorkflowState */
    it("team.markedAsDuplicateWorkflowState", async () => {
      if (_team) {
        const team_markedAsDuplicateWorkflowState = await _team.markedAsDuplicateWorkflowState;
        expect(team_markedAsDuplicateWorkflowState instanceof L.WorkflowState);
      } else {
        throw new Error("No Team found from team query - cannot test team.markedAsDuplicateWorkflowState query");
      }
    });

    /** Test the team.mergeWorkflowState query for L.WorkflowState */
    it("team.mergeWorkflowState", async () => {
      if (_team) {
        const team_mergeWorkflowState = await _team.mergeWorkflowState;
        expect(team_mergeWorkflowState instanceof L.WorkflowState);
      } else {
        throw new Error("No Team found from team query - cannot test team.mergeWorkflowState query");
      }
    });

    /** Test the team.organization query for L.Organization */
    it("team.organization", async () => {
      if (_team) {
        const team_organization = await _team.organization;
        expect(team_organization instanceof L.Organization);
      } else {
        throw new Error("No Team found from team query - cannot test team.organization query");
      }
    });

    /** Test the team.reviewWorkflowState query for L.WorkflowState */
    it("team.reviewWorkflowState", async () => {
      if (_team) {
        const team_reviewWorkflowState = await _team.reviewWorkflowState;
        expect(team_reviewWorkflowState instanceof L.WorkflowState);
      } else {
        throw new Error("No Team found from team query - cannot test team.reviewWorkflowState query");
      }
    });

    /** Test the team.startWorkflowState query for L.WorkflowState */
    it("team.startWorkflowState", async () => {
      if (_team) {
        const team_startWorkflowState = await _team.startWorkflowState;
        expect(team_startWorkflowState instanceof L.WorkflowState);
      } else {
        throw new Error("No Team found from team query - cannot test team.startWorkflowState query");
      }
    });
  });

  /** Test the root query for Template */
  it("template", async () => {
    if (client) {
      const template = await client.template("mock-id");
      expect(template instanceof L.Template);
    } else {
      throw new Error("No undefined found from template query - cannot test client.template query");
    }
  });

  // Templates - no model for query

  /** Test the root query for UserSettings */
  it("userSettings", async () => {
    if (client) {
      const userSettings = await client.userSettings;
      expect(userSettings instanceof L.UserSettings);
    } else {
      throw new Error("No undefined found from userSettings query - cannot test client.userSettings query");
    }
  });

  /** Test all User queries */
  describe("Users", () => {
    let _user: L.User | undefined;
    let _user_id: string | undefined;

    /** Test the root query for the User connection */
    it("users", async () => {
      if (client) {
        const users = await client.users();
        const user = users?.nodes?.[0];
        _user_id = user?.id;
        expect(users instanceof L.UserConnection);
      } else {
        throw new Error("No undefined found from users query - cannot test client.users query");
      }
    });

    /** Test the root query for a single User */
    it("user", async () => {
      if (_user_id) {
        const user = await client.user(_user_id);
        _user = user;
        expect(user instanceof L.User);
      } else {
        throw new Error("No first User found from users connection query - cannot test user query");
      }
    });

    /** Test the user query for the Issue connection */
    it("user.assignedIssues", async () => {
      if (_user) {
        const assignedIssues = await _user.assignedIssues();
        expect(assignedIssues instanceof L.IssueConnection);
      } else {
        throw new Error("No user found from assignedIssues query - cannot test _user.assignedIssues query");
      }
    });

    /** Test the user query for the Issue connection */
    it("user.createdIssues", async () => {
      if (_user) {
        const createdIssues = await _user.createdIssues();
        expect(createdIssues instanceof L.IssueConnection);
      } else {
        throw new Error("No user found from createdIssues query - cannot test _user.createdIssues query");
      }
    });

    /** Test the user query for the TeamMembership connection */
    it("user.teamMemberships", async () => {
      if (_user) {
        const teamMemberships = await _user.teamMemberships();
        expect(teamMemberships instanceof L.TeamMembershipConnection);
      } else {
        throw new Error("No user found from teamMemberships query - cannot test _user.teamMemberships query");
      }
    });

    /** Test the user query for the Team connection */
    it("user.teams", async () => {
      if (_user) {
        const teams = await _user.teams();
        expect(teams instanceof L.TeamConnection);
      } else {
        throw new Error("No user found from teams query - cannot test _user.teams query");
      }
    });

    /** Test the user.organization query for L.Organization */
    it("user.organization", async () => {
      if (_user) {
        const user_organization = await _user.organization;
        expect(user_organization instanceof L.Organization);
      } else {
        throw new Error("No User found from user query - cannot test user.organization query");
      }
    });
  });

  let _viewer: L.User;

  /** Test the root query for Viewer */
  it("viewer", async () => {
    if (client) {
      const viewer = await client.viewer;
      _viewer = viewer;
      expect(viewer instanceof L.User);
    } else {
      throw new Error("No undefined found from viewer query - cannot test client.viewer query");
    }
  });

  /** Test the viewer query for the Issue connection */
  it("viewer.assignedIssues", async () => {
    if (_viewer) {
      const assignedIssues = await _viewer.assignedIssues();
      expect(assignedIssues instanceof L.IssueConnection);
    } else {
      throw new Error("No viewer found from assignedIssues query - cannot test _viewer.assignedIssues query");
    }
  });

  /** Test the viewer query for the Issue connection */
  it("viewer.createdIssues", async () => {
    if (_viewer) {
      const createdIssues = await _viewer.createdIssues();
      expect(createdIssues instanceof L.IssueConnection);
    } else {
      throw new Error("No viewer found from createdIssues query - cannot test _viewer.createdIssues query");
    }
  });

  /** Test the viewer query for the TeamMembership connection */
  it("viewer.teamMemberships", async () => {
    if (_viewer) {
      const teamMemberships = await _viewer.teamMemberships();
      expect(teamMemberships instanceof L.TeamMembershipConnection);
    } else {
      throw new Error("No viewer found from teamMemberships query - cannot test _viewer.teamMemberships query");
    }
  });

  /** Test the viewer query for the Team connection */
  it("viewer.teams", async () => {
    if (_viewer) {
      const teams = await _viewer.teams();
      expect(teams instanceof L.TeamConnection);
    } else {
      throw new Error("No viewer found from teams query - cannot test _viewer.teams query");
    }
  });

  /** Test all Webhook queries */
  describe("Webhooks", () => {
    let _webhook: L.Webhook | undefined;
    let _webhook_id: string | undefined;

    /** Test the root query for the Webhook connection */
    it("webhooks", async () => {
      if (client) {
        const webhooks = await client.webhooks();
        const webhook = webhooks?.nodes?.[0];
        _webhook_id = webhook?.id;
        expect(webhooks instanceof L.WebhookConnection);
      } else {
        throw new Error("No undefined found from webhooks query - cannot test client.webhooks query");
      }
    });

    /** Test the root query for a single Webhook */
    it("webhook", async () => {
      if (_webhook_id) {
        const webhook = await client.webhook(_webhook_id);
        _webhook = webhook;
        expect(webhook instanceof L.Webhook);
      } else {
        throw new Error("No first Webhook found from webhooks connection query - cannot test webhook query");
      }
    });

    /** Test the webhook.creator query for L.User */
    it("webhook.creator", async () => {
      if (_webhook) {
        const webhook_creator = await _webhook.creator;
        expect(webhook_creator instanceof L.User);
      } else {
        throw new Error("No Webhook found from webhook query - cannot test webhook.creator query");
      }
    });

    /** Test the webhook.team query for L.Team */
    it("webhook.team", async () => {
      if (_webhook) {
        const webhook_team = await _webhook.team;
        expect(webhook_team instanceof L.Team);
      } else {
        throw new Error("No Webhook found from webhook query - cannot test webhook.team query");
      }
    });
  });

  /** Test all WorkflowState queries */
  describe("WorkflowStates", () => {
    let _workflowState: L.WorkflowState | undefined;
    let _workflowState_id: string | undefined;

    /** Test the root query for the WorkflowState connection */
    it("workflowStates", async () => {
      if (client) {
        const workflowStates = await client.workflowStates();
        const workflowState = workflowStates?.nodes?.[0];
        _workflowState_id = workflowState?.id;
        expect(workflowStates instanceof L.WorkflowStateConnection);
      } else {
        throw new Error("No undefined found from workflowStates query - cannot test client.workflowStates query");
      }
    });

    /** Test the root query for a single WorkflowState */
    it("workflowState", async () => {
      if (_workflowState_id) {
        const workflowState = await client.workflowState(_workflowState_id);
        _workflowState = workflowState;
        expect(workflowState instanceof L.WorkflowState);
      } else {
        throw new Error(
          "No first WorkflowState found from workflowStates connection query - cannot test workflowState query"
        );
      }
    });

    /** Test the workflowState query for the Issue connection */
    it("workflowState.issues", async () => {
      if (_workflowState) {
        const issues = await _workflowState.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        throw new Error("No workflowState found from issues query - cannot test _workflowState.issues query");
      }
    });

    /** Test the workflowState.team query for L.Team */
    it("workflowState.team", async () => {
      if (_workflowState) {
        const workflowState_team = await _workflowState.team;
        expect(workflowState_team instanceof L.Team);
      } else {
        throw new Error("No WorkflowState found from workflowState query - cannot test workflowState.team query");
      }
    });
  });
});
