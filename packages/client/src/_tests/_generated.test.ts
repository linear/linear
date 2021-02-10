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

  const log = "codegen-test:print-hooks:";
  beforeAll(async () => {
    /** Determine whether to use production or a mock server */
    if (Boolean(process.env.E2E)) {
      logger.info(log, "Using Linear API production endpoint for end-to-end test");

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
        logger.info(log, `Using mock server on http://localhost:${port}/graphql`);
        mockServer = execa("npx", ["graphql-faker", "packages/sdk/src/schema.graphql", `-p ${port}`]);
      } catch (error) {
        logger.fatal(log, error);
        throw new Error(`${log} Failed to start the mock server`);
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
      logger.fatal(log, error);
      throw new Error(`${log} Failed to kill the mock server`);
    }
  });

  /** Test all ApiKey queries */
  describe("ApiKeys", () => {
    /** Test the root connection query for the ApiKey */
    it("apiKeys", async () => {
      const apiKeys = await client.apiKeys();
      expect(apiKeys instanceof L.ApiKeyConnection);
    });
  });

  /** Test ApplicationWithAuthorization query */
  describe("ApplicationWithAuthorization", () => {
    /** Test the root model query for ApplicationWithAuthorization */
    it("applicationWithAuthorization", async () => {
      const applicationWithAuthorization = await client.applicationWithAuthorization("mock-clientId", ["mock-scope"]);
      expect(applicationWithAuthorization instanceof L.UserAuthorizedApplication);
    });
  });

  /** Test ArchivedModelSync query */
  describe("ArchivedModelSync", () => {
    /** Test the root model query for ArchivedModelSync */
    it("archivedModelSync", async () => {
      const archivedModelSync = await client.archivedModelSync("mock-identifier", "mock-modelClass");
      expect(archivedModelSync instanceof L.ArchiveResponse);
    });
  });

  /** Test ArchivedModelsSync query */
  describe("ArchivedModelsSync", () => {
    /** Test the root model query for ArchivedModelsSync */
    it("archivedModelsSync", async () => {
      const archivedModelsSync = await client.archivedModelsSync("mock-modelClass", "mock-teamId");
      expect(archivedModelsSync instanceof L.ArchiveResponse);
    });
  });

  // AuthorizedApplications - no model for query

  /** Test AvailableUsers query */
  describe("AvailableUsers", () => {
    /** Test the root model query for AvailableUsers */
    it("availableUsers", async () => {
      const availableUsers = await client.availableUsers;
      expect(availableUsers instanceof L.AuthResolverResponse);
    });
  });

  /** Test BillingDetails query */
  describe("BillingDetails", () => {
    let _billingDetails: L.BillingDetailsPayload | undefined;

    /** Test the root model query for BillingDetails */
    it("billingDetails", async () => {
      const billingDetails = await client.billingDetails;
      _billingDetails = billingDetails;
      expect(billingDetails instanceof L.BillingDetailsPayload);
    });

    /** Test the billingDetails model query for BillingDetails_PaymentMethod */
    it("billingDetails.paymentMethod", async () => {
      if (_billingDetails) {
        const paymentMethod = _billingDetails.paymentMethod;
        expect(paymentMethod instanceof L.Card);
      } else {
        throw new Error("codegen-doc:print: No billingDetails found - cannot test _billingDetails.paymentMethod query");
      }
    });
  });

  /** Test CollaborativeDocumentJoin query */
  describe("CollaborativeDocumentJoin", () => {
    let _collaborativeDocumentJoin: L.CollaborationDocumentUpdatePayload | undefined;

    /** Test the root model query for CollaborativeDocumentJoin */
    it("collaborativeDocumentJoin", async () => {
      const collaborativeDocumentJoin = await client.collaborativeDocumentJoin("mock-clientId", "mock-issueId", 123);
      _collaborativeDocumentJoin = collaborativeDocumentJoin;
      expect(collaborativeDocumentJoin instanceof L.CollaborationDocumentUpdatePayload);
    });

    /** Test the collaborativeDocumentJoin model query for CollaborativeDocumentJoin_Steps */
    it("collaborativeDocumentJoin.steps", async () => {
      if (_collaborativeDocumentJoin) {
        const steps = _collaborativeDocumentJoin.steps;
        expect(steps instanceof L.StepsResponse);
      } else {
        throw new Error(
          "codegen-doc:print: No collaborativeDocumentJoin found - cannot test _collaborativeDocumentJoin.steps query"
        );
      }
    });
  });

  /** Test all Comment queries */
  describe("Comments", () => {
    let _comment: L.Comment | undefined;
    let _comment_id: string | undefined;

    /** Test the root connection query for the Comment */
    it("comments", async () => {
      const comments = await client.comments();
      const comment = comments?.nodes?.[0];
      _comment_id = comment?.id;
      expect(comments instanceof L.CommentConnection);
    });

    /** Test the root query for a single Comment */
    it("comment", async () => {
      if (_comment_id) {
        const comment = await client.comment(_comment_id);
        _comment = comment;
        expect(comment instanceof L.Comment);
      } else {
        throw new Error("codegen-doc:print: No first Comment found in connection - cannot test comment query");
      }
    });

    /** Test the comment.issue query for L.Issue */
    it("comment.issue", async () => {
      if (_comment) {
        const comment_issue = await _comment.issue;
        expect(comment_issue instanceof L.Issue);
      } else {
        throw new Error("codegen-doc:print: No Comment found - cannot test comment.issue query");
      }
    });

    /** Test the comment.user query for L.User */
    it("comment.user", async () => {
      if (_comment) {
        const comment_user = await _comment.user;
        expect(comment_user instanceof L.User);
      } else {
        throw new Error("codegen-doc:print: No Comment found - cannot test comment.user query");
      }
    });
  });

  /** Test all CustomView queries */
  describe("CustomViews", () => {
    let _customView: L.CustomView | undefined;
    let _customView_id: string | undefined;

    /** Test the root connection query for the CustomView */
    it("customViews", async () => {
      const customViews = await client.customViews();
      const customView = customViews?.nodes?.[0];
      _customView_id = customView?.id;
      expect(customViews instanceof L.CustomViewConnection);
    });

    /** Test the root query for a single CustomView */
    it("customView", async () => {
      if (_customView_id) {
        const customView = await client.customView(_customView_id);
        _customView = customView;
        expect(customView instanceof L.CustomView);
      } else {
        throw new Error("codegen-doc:print: No first CustomView found in connection - cannot test customView query");
      }
    });

    /** Test the customView.creator query for L.User */
    it("customView.creator", async () => {
      if (_customView) {
        const customView_creator = await _customView.creator;
        expect(customView_creator instanceof L.User);
      } else {
        throw new Error("codegen-doc:print: No CustomView found - cannot test customView.creator query");
      }
    });

    /** Test the customView.organization query for L.Organization */
    it("customView.organization", async () => {
      if (_customView) {
        const customView_organization = await _customView.organization;
        expect(customView_organization instanceof L.Organization);
      } else {
        throw new Error("codegen-doc:print: No CustomView found - cannot test customView.organization query");
      }
    });

    /** Test the customView.team query for L.Team */
    it("customView.team", async () => {
      if (_customView) {
        const customView_team = await _customView.team;
        expect(customView_team instanceof L.Team);
      } else {
        throw new Error("codegen-doc:print: No CustomView found - cannot test customView.team query");
      }
    });
  });

  /** Test all Cycle queries */
  describe("Cycles", () => {
    let _cycle: L.Cycle | undefined;
    let _cycle_id: string | undefined;

    /** Test the root connection query for the Cycle */
    it("cycles", async () => {
      const cycles = await client.cycles();
      const cycle = cycles?.nodes?.[0];
      _cycle_id = cycle?.id;
      expect(cycles instanceof L.CycleConnection);
    });

    /** Test the root query for a single Cycle */
    it("cycle", async () => {
      if (_cycle_id) {
        const cycle = await client.cycle(_cycle_id);
        _cycle = cycle;
        expect(cycle instanceof L.Cycle);
      } else {
        throw new Error("codegen-doc:print: No first Cycle found in connection - cannot test cycle query");
      }
    });

    /** Test the cycle connection query for the Issue */
    it("cycle.issues", async () => {
      if (_cycle) {
        const issues = await _cycle.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        throw new Error("codegen-doc:print: No cycle found - cannot test _cycle.issues query");
      }
    });

    /** Test the cycle connection query for the Issue */
    it("cycle.uncompletedIssuesUponClose", async () => {
      if (_cycle) {
        const uncompletedIssuesUponClose = await _cycle.uncompletedIssuesUponClose();
        expect(uncompletedIssuesUponClose instanceof L.IssueConnection);
      } else {
        throw new Error("codegen-doc:print: No cycle found - cannot test _cycle.uncompletedIssuesUponClose query");
      }
    });

    /** Test the cycle.team query for L.Team */
    it("cycle.team", async () => {
      if (_cycle) {
        const cycle_team = await _cycle.team;
        expect(cycle_team instanceof L.Team);
      } else {
        throw new Error("codegen-doc:print: No Cycle found - cannot test cycle.team query");
      }
    });
  });

  /** Test all Emoji queries */
  describe("Emojis", () => {
    let _emoji: L.Emoji | undefined;
    let _emoji_id: string | undefined;

    /** Test the root connection query for the Emoji */
    it("emojis", async () => {
      const emojis = await client.emojis();
      const emoji = emojis?.nodes?.[0];
      _emoji_id = emoji?.id;
      expect(emojis instanceof L.EmojiConnection);
    });

    /** Test the root query for a single Emoji */
    it("emoji", async () => {
      if (_emoji_id) {
        const emoji = await client.emoji(_emoji_id);
        _emoji = emoji;
        expect(emoji instanceof L.Emoji);
      } else {
        throw new Error("codegen-doc:print: No first Emoji found in connection - cannot test emoji query");
      }
    });

    /** Test the emoji.creator query for L.User */
    it("emoji.creator", async () => {
      if (_emoji) {
        const emoji_creator = await _emoji.creator;
        expect(emoji_creator instanceof L.User);
      } else {
        throw new Error("codegen-doc:print: No Emoji found - cannot test emoji.creator query");
      }
    });

    /** Test the emoji.organization query for L.Organization */
    it("emoji.organization", async () => {
      if (_emoji) {
        const emoji_organization = await _emoji.organization;
        expect(emoji_organization instanceof L.Organization);
      } else {
        throw new Error("codegen-doc:print: No Emoji found - cannot test emoji.organization query");
      }
    });
  });

  /** Test all Favorite queries */
  describe("Favorites", () => {
    let _favorite: L.Favorite | undefined;
    let _favorite_id: string | undefined;

    /** Test the root connection query for the Favorite */
    it("favorites", async () => {
      const favorites = await client.favorites();
      const favorite = favorites?.nodes?.[0];
      _favorite_id = favorite?.id;
      expect(favorites instanceof L.FavoriteConnection);
    });

    /** Test the root query for a single Favorite */
    it("favorite", async () => {
      if (_favorite_id) {
        const favorite = await client.favorite(_favorite_id);
        _favorite = favorite;
        expect(favorite instanceof L.Favorite);
      } else {
        throw new Error("codegen-doc:print: No first Favorite found in connection - cannot test favorite query");
      }
    });

    /** Test the favorite.cycle query for L.Cycle */
    it("favorite.cycle", async () => {
      if (_favorite) {
        const favorite_cycle = await _favorite.cycle;
        expect(favorite_cycle instanceof L.Cycle);
      } else {
        throw new Error("codegen-doc:print: No Favorite found - cannot test favorite.cycle query");
      }
    });

    /** Test the favorite.issue query for L.Issue */
    it("favorite.issue", async () => {
      if (_favorite) {
        const favorite_issue = await _favorite.issue;
        expect(favorite_issue instanceof L.Issue);
      } else {
        throw new Error("codegen-doc:print: No Favorite found - cannot test favorite.issue query");
      }
    });

    /** Test the favorite.label query for L.IssueLabel */
    it("favorite.label", async () => {
      if (_favorite) {
        const favorite_label = await _favorite.label;
        expect(favorite_label instanceof L.IssueLabel);
      } else {
        throw new Error("codegen-doc:print: No Favorite found - cannot test favorite.label query");
      }
    });

    /** Test the favorite.project query for L.Project */
    it("favorite.project", async () => {
      if (_favorite) {
        const favorite_project = await _favorite.project;
        expect(favorite_project instanceof L.Project);
      } else {
        throw new Error("codegen-doc:print: No Favorite found - cannot test favorite.project query");
      }
    });

    /** Test the favorite.projectTeam query for L.Project */
    it("favorite.projectTeam", async () => {
      if (_favorite) {
        const favorite_projectTeam = await _favorite.projectTeam;
        expect(favorite_projectTeam instanceof L.Project);
      } else {
        throw new Error("codegen-doc:print: No Favorite found - cannot test favorite.projectTeam query");
      }
    });

    /** Test the favorite.user query for L.User */
    it("favorite.user", async () => {
      if (_favorite) {
        const favorite_user = await _favorite.user;
        expect(favorite_user instanceof L.User);
      } else {
        throw new Error("codegen-doc:print: No Favorite found - cannot test favorite.user query");
      }
    });
  });

  /** Test FigmaEmbedInfo query */
  describe("FigmaEmbedInfo", () => {
    let _figmaEmbedInfo: L.FigmaEmbedPayload | undefined;

    /** Test the root model query for FigmaEmbedInfo */
    it("figmaEmbedInfo", async () => {
      const figmaEmbedInfo = await client.figmaEmbedInfo("mock-fileId");
      _figmaEmbedInfo = figmaEmbedInfo;
      expect(figmaEmbedInfo instanceof L.FigmaEmbedPayload);
    });

    /** Test the figmaEmbedInfo model query for FigmaEmbedInfo_FigmaEmbed */
    it("figmaEmbedInfo.figmaEmbed", async () => {
      if (_figmaEmbedInfo) {
        const figmaEmbed = _figmaEmbedInfo.figmaEmbed;
        expect(figmaEmbed instanceof L.FigmaEmbed);
      } else {
        throw new Error("codegen-doc:print: No figmaEmbedInfo found - cannot test _figmaEmbedInfo.figmaEmbed query");
      }
    });
  });

  /** Test all Integration queries */
  describe("Integrations", () => {
    let _integration: L.Integration | undefined;
    let _integration_id: string | undefined;

    /** Test the root connection query for the Integration */
    it("integrations", async () => {
      const integrations = await client.integrations();
      const integration = integrations?.nodes?.[0];
      _integration_id = integration?.id;
      expect(integrations instanceof L.IntegrationConnection);
    });

    /** Test the root query for a single Integration */
    it("integration", async () => {
      if (_integration_id) {
        const integration = await client.integration(_integration_id);
        _integration = integration;
        expect(integration instanceof L.Integration);
      } else {
        throw new Error("codegen-doc:print: No first Integration found in connection - cannot test integration query");
      }
    });

    /** Test the integration.creator query for L.User */
    it("integration.creator", async () => {
      if (_integration) {
        const integration_creator = await _integration.creator;
        expect(integration_creator instanceof L.User);
      } else {
        throw new Error("codegen-doc:print: No Integration found - cannot test integration.creator query");
      }
    });

    /** Test the integration.organization query for L.Organization */
    it("integration.organization", async () => {
      if (_integration) {
        const integration_organization = await _integration.organization;
        expect(integration_organization instanceof L.Organization);
      } else {
        throw new Error("codegen-doc:print: No Integration found - cannot test integration.organization query");
      }
    });

    /** Test the integration.team query for L.Team */
    it("integration.team", async () => {
      if (_integration) {
        const integration_team = await _integration.team;
        expect(integration_team instanceof L.Team);
      } else {
        throw new Error("codegen-doc:print: No Integration found - cannot test integration.team query");
      }
    });
  });

  /** Test InviteInfo query */
  describe("InviteInfo", () => {
    let _inviteInfo: L.InvitePagePayload | undefined;

    /** Test the root model query for InviteInfo */
    it("inviteInfo", async () => {
      const inviteInfo = await client.inviteInfo("mock-userHash");
      _inviteInfo = inviteInfo;
      expect(inviteInfo instanceof L.InvitePagePayload);
    });

    /** Test the inviteInfo model query for InviteInfo_InviteData */
    it("inviteInfo.inviteData", async () => {
      if (_inviteInfo) {
        const inviteData = _inviteInfo.inviteData;
        expect(inviteData instanceof L.InviteData);
      } else {
        throw new Error("codegen-doc:print: No inviteInfo found - cannot test _inviteInfo.inviteData query");
      }
    });
  });

  /** Test all IssueLabel queries */
  describe("IssueLabels", () => {
    let _issueLabel: L.IssueLabel | undefined;
    let _issueLabel_id: string | undefined;

    /** Test the root connection query for the IssueLabel */
    it("issueLabels", async () => {
      const issueLabels = await client.issueLabels();
      const issueLabel = issueLabels?.nodes?.[0];
      _issueLabel_id = issueLabel?.id;
      expect(issueLabels instanceof L.IssueLabelConnection);
    });

    /** Test the root query for a single IssueLabel */
    it("issueLabel", async () => {
      if (_issueLabel_id) {
        const issueLabel = await client.issueLabel(_issueLabel_id);
        _issueLabel = issueLabel;
        expect(issueLabel instanceof L.IssueLabel);
      } else {
        throw new Error("codegen-doc:print: No first IssueLabel found in connection - cannot test issueLabel query");
      }
    });

    /** Test the issueLabel connection query for the Issue */
    it("issueLabel.issues", async () => {
      if (_issueLabel) {
        const issues = await _issueLabel.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        throw new Error("codegen-doc:print: No issueLabel found - cannot test _issueLabel.issues query");
      }
    });

    /** Test the issueLabel.creator query for L.User */
    it("issueLabel.creator", async () => {
      if (_issueLabel) {
        const issueLabel_creator = await _issueLabel.creator;
        expect(issueLabel_creator instanceof L.User);
      } else {
        throw new Error("codegen-doc:print: No IssueLabel found - cannot test issueLabel.creator query");
      }
    });

    /** Test the issueLabel.team query for L.Team */
    it("issueLabel.team", async () => {
      if (_issueLabel) {
        const issueLabel_team = await _issueLabel.team;
        expect(issueLabel_team instanceof L.Team);
      } else {
        throw new Error("codegen-doc:print: No IssueLabel found - cannot test issueLabel.team query");
      }
    });
  });

  /** Test all IssueRelation queries */
  describe("IssueRelations", () => {
    let _issueRelation: L.IssueRelation | undefined;
    let _issueRelation_id: string | undefined;

    /** Test the root connection query for the IssueRelation */
    it("issueRelations", async () => {
      const issueRelations = await client.issueRelations();
      const issueRelation = issueRelations?.nodes?.[0];
      _issueRelation_id = issueRelation?.id;
      expect(issueRelations instanceof L.IssueRelationConnection);
    });

    /** Test the root query for a single IssueRelation */
    it("issueRelation", async () => {
      if (_issueRelation_id) {
        const issueRelation = await client.issueRelation(_issueRelation_id);
        _issueRelation = issueRelation;
        expect(issueRelation instanceof L.IssueRelation);
      } else {
        throw new Error(
          "codegen-doc:print: No first IssueRelation found in connection - cannot test issueRelation query"
        );
      }
    });

    /** Test the issueRelation.issue query for L.Issue */
    it("issueRelation.issue", async () => {
      if (_issueRelation) {
        const issueRelation_issue = await _issueRelation.issue;
        expect(issueRelation_issue instanceof L.Issue);
      } else {
        throw new Error("codegen-doc:print: No IssueRelation found - cannot test issueRelation.issue query");
      }
    });

    /** Test the issueRelation.relatedIssue query for L.Issue */
    it("issueRelation.relatedIssue", async () => {
      if (_issueRelation) {
        const issueRelation_relatedIssue = await _issueRelation.relatedIssue;
        expect(issueRelation_relatedIssue instanceof L.Issue);
      } else {
        throw new Error("codegen-doc:print: No IssueRelation found - cannot test issueRelation.relatedIssue query");
      }
    });
  });

  /** Test all Issue queries */
  describe("IssueSearch", () => {
    let _issue: L.Issue | undefined;
    let _issue_id: string | undefined;

    /** Test the root connection query for the Issue */
    it("issueSearch", async () => {
      const issueSearch = await client.issueSearch("mock-query");
      const issue = issueSearch?.nodes?.[0];
      _issue_id = issue?.id;
      expect(issueSearch instanceof L.IssueConnection);
    });

    /** Test the root query for a single Issue */
    it("issue", async () => {
      if (_issue_id) {
        const issue = await client.issue(_issue_id);
        _issue = issue;
        expect(issue instanceof L.Issue);
      } else {
        throw new Error("codegen-doc:print: No first Issue found in connection - cannot test issue query");
      }
    });

    /** Test the issue connection query for the Issue */
    it("issue.children", async () => {
      if (_issue) {
        const children = await _issue.children();
        expect(children instanceof L.IssueConnection);
      } else {
        throw new Error("codegen-doc:print: No issue found - cannot test _issue.children query");
      }
    });

    /** Test the issue connection query for the Comment */
    it("issue.comments", async () => {
      if (_issue) {
        const comments = await _issue.comments();
        expect(comments instanceof L.CommentConnection);
      } else {
        throw new Error("codegen-doc:print: No issue found - cannot test _issue.comments query");
      }
    });

    /** Test the issue connection query for the IssueHistory */
    it("issue.history", async () => {
      if (_issue) {
        const history = await _issue.history();
        expect(history instanceof L.IssueHistoryConnection);
      } else {
        throw new Error("codegen-doc:print: No issue found - cannot test _issue.history query");
      }
    });

    /** Test the issue connection query for the IssueRelation */
    it("issue.inverseRelations", async () => {
      if (_issue) {
        const inverseRelations = await _issue.inverseRelations();
        expect(inverseRelations instanceof L.IssueRelationConnection);
      } else {
        throw new Error("codegen-doc:print: No issue found - cannot test _issue.inverseRelations query");
      }
    });

    /** Test the issue connection query for the IssueLabel */
    it("issue.labels", async () => {
      if (_issue) {
        const labels = await _issue.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        throw new Error("codegen-doc:print: No issue found - cannot test _issue.labels query");
      }
    });

    /** Test the issue connection query for the IssueRelation */
    it("issue.relations", async () => {
      if (_issue) {
        const relations = await _issue.relations();
        expect(relations instanceof L.IssueRelationConnection);
      } else {
        throw new Error("codegen-doc:print: No issue found - cannot test _issue.relations query");
      }
    });

    /** Test the issue connection query for the User */
    it("issue.subscribers", async () => {
      if (_issue) {
        const subscribers = await _issue.subscribers();
        expect(subscribers instanceof L.UserConnection);
      } else {
        throw new Error("codegen-doc:print: No issue found - cannot test _issue.subscribers query");
      }
    });

    /** Test the issue.assignee query for L.User */
    it("issue.assignee", async () => {
      if (_issue) {
        const issue_assignee = await _issue.assignee;
        expect(issue_assignee instanceof L.User);
      } else {
        throw new Error("codegen-doc:print: No Issue found - cannot test issue.assignee query");
      }
    });

    /** Test the issue.creator query for L.User */
    it("issue.creator", async () => {
      if (_issue) {
        const issue_creator = await _issue.creator;
        expect(issue_creator instanceof L.User);
      } else {
        throw new Error("codegen-doc:print: No Issue found - cannot test issue.creator query");
      }
    });

    /** Test the issue.cycle query for L.Cycle */
    it("issue.cycle", async () => {
      if (_issue) {
        const issue_cycle = await _issue.cycle;
        expect(issue_cycle instanceof L.Cycle);
      } else {
        throw new Error("codegen-doc:print: No Issue found - cannot test issue.cycle query");
      }
    });

    /** Test the issue.parent query for L.Issue */
    it("issue.parent", async () => {
      if (_issue) {
        const issue_parent = await _issue.parent;
        expect(issue_parent instanceof L.Issue);
      } else {
        throw new Error("codegen-doc:print: No Issue found - cannot test issue.parent query");
      }
    });

    /** Test the issue.project query for L.Project */
    it("issue.project", async () => {
      if (_issue) {
        const issue_project = await _issue.project;
        expect(issue_project instanceof L.Project);
      } else {
        throw new Error("codegen-doc:print: No Issue found - cannot test issue.project query");
      }
    });

    /** Test the issue.state query for L.WorkflowState */
    it("issue.state", async () => {
      if (_issue) {
        const issue_state = await _issue.state;
        expect(issue_state instanceof L.WorkflowState);
      } else {
        throw new Error("codegen-doc:print: No Issue found - cannot test issue.state query");
      }
    });

    /** Test the issue.team query for L.Team */
    it("issue.team", async () => {
      if (_issue) {
        const issue_team = await _issue.team;
        expect(issue_team instanceof L.Team);
      } else {
        throw new Error("codegen-doc:print: No Issue found - cannot test issue.team query");
      }
    });
  });

  /** Test all Issue queries */
  describe("Issues", () => {
    let _issue: L.Issue | undefined;
    let _issue_id: string | undefined;

    /** Test the root connection query for the Issue */
    it("issues", async () => {
      const issues = await client.issues();
      const issue = issues?.nodes?.[0];
      _issue_id = issue?.id;
      expect(issues instanceof L.IssueConnection);
    });

    /** Test the root query for a single Issue */
    it("issue", async () => {
      if (_issue_id) {
        const issue = await client.issue(_issue_id);
        _issue = issue;
        expect(issue instanceof L.Issue);
      } else {
        throw new Error("codegen-doc:print: No first Issue found in connection - cannot test issue query");
      }
    });

    /** Test the issue connection query for the Issue */
    it("issue.children", async () => {
      if (_issue) {
        const children = await _issue.children();
        expect(children instanceof L.IssueConnection);
      } else {
        throw new Error("codegen-doc:print: No issue found - cannot test _issue.children query");
      }
    });

    /** Test the issue connection query for the Comment */
    it("issue.comments", async () => {
      if (_issue) {
        const comments = await _issue.comments();
        expect(comments instanceof L.CommentConnection);
      } else {
        throw new Error("codegen-doc:print: No issue found - cannot test _issue.comments query");
      }
    });

    /** Test the issue connection query for the IssueHistory */
    it("issue.history", async () => {
      if (_issue) {
        const history = await _issue.history();
        expect(history instanceof L.IssueHistoryConnection);
      } else {
        throw new Error("codegen-doc:print: No issue found - cannot test _issue.history query");
      }
    });

    /** Test the issue connection query for the IssueRelation */
    it("issue.inverseRelations", async () => {
      if (_issue) {
        const inverseRelations = await _issue.inverseRelations();
        expect(inverseRelations instanceof L.IssueRelationConnection);
      } else {
        throw new Error("codegen-doc:print: No issue found - cannot test _issue.inverseRelations query");
      }
    });

    /** Test the issue connection query for the IssueLabel */
    it("issue.labels", async () => {
      if (_issue) {
        const labels = await _issue.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        throw new Error("codegen-doc:print: No issue found - cannot test _issue.labels query");
      }
    });

    /** Test the issue connection query for the IssueRelation */
    it("issue.relations", async () => {
      if (_issue) {
        const relations = await _issue.relations();
        expect(relations instanceof L.IssueRelationConnection);
      } else {
        throw new Error("codegen-doc:print: No issue found - cannot test _issue.relations query");
      }
    });

    /** Test the issue connection query for the User */
    it("issue.subscribers", async () => {
      if (_issue) {
        const subscribers = await _issue.subscribers();
        expect(subscribers instanceof L.UserConnection);
      } else {
        throw new Error("codegen-doc:print: No issue found - cannot test _issue.subscribers query");
      }
    });

    /** Test the issue.assignee query for L.User */
    it("issue.assignee", async () => {
      if (_issue) {
        const issue_assignee = await _issue.assignee;
        expect(issue_assignee instanceof L.User);
      } else {
        throw new Error("codegen-doc:print: No Issue found - cannot test issue.assignee query");
      }
    });

    /** Test the issue.creator query for L.User */
    it("issue.creator", async () => {
      if (_issue) {
        const issue_creator = await _issue.creator;
        expect(issue_creator instanceof L.User);
      } else {
        throw new Error("codegen-doc:print: No Issue found - cannot test issue.creator query");
      }
    });

    /** Test the issue.cycle query for L.Cycle */
    it("issue.cycle", async () => {
      if (_issue) {
        const issue_cycle = await _issue.cycle;
        expect(issue_cycle instanceof L.Cycle);
      } else {
        throw new Error("codegen-doc:print: No Issue found - cannot test issue.cycle query");
      }
    });

    /** Test the issue.parent query for L.Issue */
    it("issue.parent", async () => {
      if (_issue) {
        const issue_parent = await _issue.parent;
        expect(issue_parent instanceof L.Issue);
      } else {
        throw new Error("codegen-doc:print: No Issue found - cannot test issue.parent query");
      }
    });

    /** Test the issue.project query for L.Project */
    it("issue.project", async () => {
      if (_issue) {
        const issue_project = await _issue.project;
        expect(issue_project instanceof L.Project);
      } else {
        throw new Error("codegen-doc:print: No Issue found - cannot test issue.project query");
      }
    });

    /** Test the issue.state query for L.WorkflowState */
    it("issue.state", async () => {
      if (_issue) {
        const issue_state = await _issue.state;
        expect(issue_state instanceof L.WorkflowState);
      } else {
        throw new Error("codegen-doc:print: No Issue found - cannot test issue.state query");
      }
    });

    /** Test the issue.team query for L.Team */
    it("issue.team", async () => {
      if (_issue) {
        const issue_team = await _issue.team;
        expect(issue_team instanceof L.Team);
      } else {
        throw new Error("codegen-doc:print: No Issue found - cannot test issue.team query");
      }
    });
  });

  /** Test all Milestone queries */
  describe("Milestones", () => {
    let _milestone: L.Milestone | undefined;
    let _milestone_id: string | undefined;

    /** Test the root connection query for the Milestone */
    it("milestones", async () => {
      const milestones = await client.milestones();
      const milestone = milestones?.nodes?.[0];
      _milestone_id = milestone?.id;
      expect(milestones instanceof L.MilestoneConnection);
    });

    /** Test the root query for a single Milestone */
    it("milestone", async () => {
      if (_milestone_id) {
        const milestone = await client.milestone(_milestone_id);
        _milestone = milestone;
        expect(milestone instanceof L.Milestone);
      } else {
        throw new Error("codegen-doc:print: No first Milestone found in connection - cannot test milestone query");
      }
    });

    /** Test the milestone connection query for the Project */
    it("milestone.projects", async () => {
      if (_milestone) {
        const projects = await _milestone.projects();
        expect(projects instanceof L.ProjectConnection);
      } else {
        throw new Error("codegen-doc:print: No milestone found - cannot test _milestone.projects query");
      }
    });

    /** Test the milestone.organization query for L.Organization */
    it("milestone.organization", async () => {
      if (_milestone) {
        const milestone_organization = await _milestone.organization;
        expect(milestone_organization instanceof L.Organization);
      } else {
        throw new Error("codegen-doc:print: No Milestone found - cannot test milestone.organization query");
      }
    });
  });

  /** Test all NotificationSubscription queries */
  describe("NotificationSubscriptions", () => {
    let _notificationSubscription: L.NotificationSubscription | undefined;
    let _notificationSubscription_id: string | undefined;

    /** Test the root connection query for the NotificationSubscription */
    it("notificationSubscriptions", async () => {
      const notificationSubscriptions = await client.notificationSubscriptions();
      const notificationSubscription = notificationSubscriptions?.nodes?.[0];
      _notificationSubscription_id = notificationSubscription?.id;
      expect(notificationSubscriptions instanceof L.NotificationSubscriptionConnection);
    });

    /** Test the root query for a single NotificationSubscription */
    it("notificationSubscription", async () => {
      if (_notificationSubscription_id) {
        const notificationSubscription = await client.notificationSubscription(_notificationSubscription_id);
        _notificationSubscription = notificationSubscription;
        expect(notificationSubscription instanceof L.NotificationSubscription);
      } else {
        throw new Error(
          "codegen-doc:print: No first NotificationSubscription found in connection - cannot test notificationSubscription query"
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
          "codegen-doc:print: No NotificationSubscription found - cannot test notificationSubscription.project query"
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
          "codegen-doc:print: No NotificationSubscription found - cannot test notificationSubscription.team query"
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
          "codegen-doc:print: No NotificationSubscription found - cannot test notificationSubscription.user query"
        );
      }
    });
  });

  /** Test all Notification queries */
  describe("Notifications", () => {
    let _notification: L.Notification | undefined;
    let _notification_id: string | undefined;

    /** Test the root connection query for the Notification */
    it("notifications", async () => {
      const notifications = await client.notifications();
      const notification = notifications?.nodes?.[0];
      _notification_id = notification?.id;
      expect(notifications instanceof L.NotificationConnection);
    });

    /** Test the root query for a single Notification */
    it("notification", async () => {
      if (_notification_id) {
        const notification = await client.notification(_notification_id);
        _notification = notification;
        expect(notification instanceof L.Notification);
      } else {
        throw new Error(
          "codegen-doc:print: No first Notification found in connection - cannot test notification query"
        );
      }
    });

    /** Test the notification.comment query for L.Comment */
    it("notification.comment", async () => {
      if (_notification) {
        const notification_comment = await _notification.comment;
        expect(notification_comment instanceof L.Comment);
      } else {
        throw new Error("codegen-doc:print: No Notification found - cannot test notification.comment query");
      }
    });

    /** Test the notification.issue query for L.Issue */
    it("notification.issue", async () => {
      if (_notification) {
        const notification_issue = await _notification.issue;
        expect(notification_issue instanceof L.Issue);
      } else {
        throw new Error("codegen-doc:print: No Notification found - cannot test notification.issue query");
      }
    });

    /** Test the notification.team query for L.Team */
    it("notification.team", async () => {
      if (_notification) {
        const notification_team = await _notification.team;
        expect(notification_team instanceof L.Team);
      } else {
        throw new Error("codegen-doc:print: No Notification found - cannot test notification.team query");
      }
    });

    /** Test the notification.user query for L.User */
    it("notification.user", async () => {
      if (_notification) {
        const notification_user = await _notification.user;
        expect(notification_user instanceof L.User);
      } else {
        throw new Error("codegen-doc:print: No Notification found - cannot test notification.user query");
      }
    });
  });

  /** Test Organization query */
  describe("Organization", () => {
    let _organization: L.Organization | undefined;

    /** Test the root model query for Organization */
    it("organization", async () => {
      const organization = await client.organization;
      _organization = organization;
      expect(organization instanceof L.Organization);
    });

    /** Test the organization connection query for the Integration */
    it("organization.integrations", async () => {
      if (_organization) {
        const integrations = await _organization.integrations();
        expect(integrations instanceof L.IntegrationConnection);
      } else {
        throw new Error("codegen-doc:print: No organization found - cannot test _organization.integrations query");
      }
    });

    /** Test the organization connection query for the Milestone */
    it("organization.milestones", async () => {
      if (_organization) {
        const milestones = await _organization.milestones();
        expect(milestones instanceof L.MilestoneConnection);
      } else {
        throw new Error("codegen-doc:print: No organization found - cannot test _organization.milestones query");
      }
    });

    /** Test the organization connection query for the Team */
    it("organization.teams", async () => {
      if (_organization) {
        const teams = await _organization.teams();
        expect(teams instanceof L.TeamConnection);
      } else {
        throw new Error("codegen-doc:print: No organization found - cannot test _organization.teams query");
      }
    });

    /** Test the organization connection query for the User */
    it("organization.users", async () => {
      if (_organization) {
        const users = await _organization.users();
        expect(users instanceof L.UserConnection);
      } else {
        throw new Error("codegen-doc:print: No organization found - cannot test _organization.users query");
      }
    });
  });

  /** Test OrganizationExists query */
  describe("OrganizationExists", () => {
    /** Test the root model query for OrganizationExists */
    it("organizationExists", async () => {
      const organizationExists = await client.organizationExists("mock-urlKey");
      expect(organizationExists instanceof L.OrganizationExistsPayload);
    });
  });

  /** Test all OrganizationInvite queries */
  describe("OrganizationInvites", () => {
    /** Test the root connection query for the OrganizationInvite */
    it("organizationInvites", async () => {
      const organizationInvites = await client.organizationInvites();
      expect(organizationInvites instanceof L.OrganizationInviteConnection);
    });
  });

  /** Test all ProjectLink queries */
  describe("ProjectLinks", () => {
    let _projectLink: L.ProjectLink | undefined;
    let _projectLink_id: string | undefined;

    /** Test the root connection query for the ProjectLink */
    it("projectLinks", async () => {
      const projectLinks = await client.projectLinks();
      const projectLink = projectLinks?.nodes?.[0];
      _projectLink_id = projectLink?.id;
      expect(projectLinks instanceof L.ProjectLinkConnection);
    });

    /** Test the root query for a single ProjectLink */
    it("projectLink", async () => {
      if (_projectLink_id) {
        const projectLink = await client.projectLink(_projectLink_id);
        _projectLink = projectLink;
        expect(projectLink instanceof L.ProjectLink);
      } else {
        throw new Error("codegen-doc:print: No first ProjectLink found in connection - cannot test projectLink query");
      }
    });

    /** Test the projectLink.creator query for L.User */
    it("projectLink.creator", async () => {
      if (_projectLink) {
        const projectLink_creator = await _projectLink.creator;
        expect(projectLink_creator instanceof L.User);
      } else {
        throw new Error("codegen-doc:print: No ProjectLink found - cannot test projectLink.creator query");
      }
    });

    /** Test the projectLink.project query for L.Project */
    it("projectLink.project", async () => {
      if (_projectLink) {
        const projectLink_project = await _projectLink.project;
        expect(projectLink_project instanceof L.Project);
      } else {
        throw new Error("codegen-doc:print: No ProjectLink found - cannot test projectLink.project query");
      }
    });
  });

  /** Test all Project queries */
  describe("Projects", () => {
    let _project: L.Project | undefined;
    let _project_id: string | undefined;

    /** Test the root connection query for the Project */
    it("projects", async () => {
      const projects = await client.projects();
      const project = projects?.nodes?.[0];
      _project_id = project?.id;
      expect(projects instanceof L.ProjectConnection);
    });

    /** Test the root query for a single Project */
    it("project", async () => {
      if (_project_id) {
        const project = await client.project(_project_id);
        _project = project;
        expect(project instanceof L.Project);
      } else {
        throw new Error("codegen-doc:print: No first Project found in connection - cannot test project query");
      }
    });

    /** Test the project connection query for the Issue */
    it("project.issues", async () => {
      if (_project) {
        const issues = await _project.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        throw new Error("codegen-doc:print: No project found - cannot test _project.issues query");
      }
    });

    /** Test the project connection query for the ProjectLink */
    it("project.links", async () => {
      if (_project) {
        const links = await _project.links();
        expect(links instanceof L.ProjectLinkConnection);
      } else {
        throw new Error("codegen-doc:print: No project found - cannot test _project.links query");
      }
    });

    /** Test the project connection query for the User */
    it("project.members", async () => {
      if (_project) {
        const members = await _project.members();
        expect(members instanceof L.UserConnection);
      } else {
        throw new Error("codegen-doc:print: No project found - cannot test _project.members query");
      }
    });

    /** Test the project connection query for the Team */
    it("project.teams", async () => {
      if (_project) {
        const teams = await _project.teams();
        expect(teams instanceof L.TeamConnection);
      } else {
        throw new Error("codegen-doc:print: No project found - cannot test _project.teams query");
      }
    });

    /** Test the project.creator query for L.User */
    it("project.creator", async () => {
      if (_project) {
        const project_creator = await _project.creator;
        expect(project_creator instanceof L.User);
      } else {
        throw new Error("codegen-doc:print: No Project found - cannot test project.creator query");
      }
    });

    /** Test the project.lead query for L.User */
    it("project.lead", async () => {
      if (_project) {
        const project_lead = await _project.lead;
        expect(project_lead instanceof L.User);
      } else {
        throw new Error("codegen-doc:print: No Project found - cannot test project.lead query");
      }
    });

    /** Test the project.milestone query for L.Milestone */
    it("project.milestone", async () => {
      if (_project) {
        const project_milestone = await _project.milestone;
        expect(project_milestone instanceof L.Milestone);
      } else {
        throw new Error("codegen-doc:print: No Project found - cannot test project.milestone query");
      }
    });
  });

  /** Test PushSubscriptionTest query */
  describe("PushSubscriptionTest", () => {
    /** Test the root model query for PushSubscriptionTest */
    it("pushSubscriptionTest", async () => {
      const pushSubscriptionTest = await client.pushSubscriptionTest;
      expect(pushSubscriptionTest instanceof L.PushSubscriptionPayload);
    });
  });

  /** Test all Reaction queries */
  describe("Reactions", () => {
    let _reaction: L.Reaction | undefined;
    let _reaction_id: string | undefined;

    /** Test the root connection query for the Reaction */
    it("reactions", async () => {
      const reactions = await client.reactions();
      const reaction = reactions?.nodes?.[0];
      _reaction_id = reaction?.id;
      expect(reactions instanceof L.ReactionConnection);
    });

    /** Test the root query for a single Reaction */
    it("reaction", async () => {
      if (_reaction_id) {
        const reaction = await client.reaction(_reaction_id);
        _reaction = reaction;
        expect(reaction instanceof L.Reaction);
      } else {
        throw new Error("codegen-doc:print: No first Reaction found in connection - cannot test reaction query");
      }
    });

    /** Test the reaction.comment query for L.Comment */
    it("reaction.comment", async () => {
      if (_reaction) {
        const reaction_comment = await _reaction.comment;
        expect(reaction_comment instanceof L.Comment);
      } else {
        throw new Error("codegen-doc:print: No Reaction found - cannot test reaction.comment query");
      }
    });

    /** Test the reaction.user query for L.User */
    it("reaction.user", async () => {
      if (_reaction) {
        const reaction_user = await _reaction.user;
        expect(reaction_user instanceof L.User);
      } else {
        throw new Error("codegen-doc:print: No Reaction found - cannot test reaction.user query");
      }
    });
  });

  /** Test SsoUrlFromEmail query */
  describe("SsoUrlFromEmail", () => {
    /** Test the root model query for SsoUrlFromEmail */
    it("ssoUrlFromEmail", async () => {
      const ssoUrlFromEmail = await client.ssoUrlFromEmail("mock-email");
      expect(ssoUrlFromEmail instanceof L.SsoUrlFromEmailResponse);
    });
  });

  /** Test SyncBootstrap query */
  describe("SyncBootstrap", () => {
    /** Test the root model query for SyncBootstrap */
    it("syncBootstrap", async () => {
      const syncBootstrap = await client.syncBootstrap();
      expect(syncBootstrap instanceof L.SyncResponse);
    });
  });

  /** Test all TeamMembership queries */
  describe("TeamMemberships", () => {
    let _teamMembership: L.TeamMembership | undefined;
    let _teamMembership_id: string | undefined;

    /** Test the root connection query for the TeamMembership */
    it("teamMemberships", async () => {
      const teamMemberships = await client.teamMemberships();
      const teamMembership = teamMemberships?.nodes?.[0];
      _teamMembership_id = teamMembership?.id;
      expect(teamMemberships instanceof L.TeamMembershipConnection);
    });

    /** Test the root query for a single TeamMembership */
    it("teamMembership", async () => {
      if (_teamMembership_id) {
        const teamMembership = await client.teamMembership(_teamMembership_id);
        _teamMembership = teamMembership;
        expect(teamMembership instanceof L.TeamMembership);
      } else {
        throw new Error(
          "codegen-doc:print: No first TeamMembership found in connection - cannot test teamMembership query"
        );
      }
    });

    /** Test the teamMembership.team query for L.Team */
    it("teamMembership.team", async () => {
      if (_teamMembership) {
        const teamMembership_team = await _teamMembership.team;
        expect(teamMembership_team instanceof L.Team);
      } else {
        throw new Error("codegen-doc:print: No TeamMembership found - cannot test teamMembership.team query");
      }
    });

    /** Test the teamMembership.user query for L.User */
    it("teamMembership.user", async () => {
      if (_teamMembership) {
        const teamMembership_user = await _teamMembership.user;
        expect(teamMembership_user instanceof L.User);
      } else {
        throw new Error("codegen-doc:print: No TeamMembership found - cannot test teamMembership.user query");
      }
    });
  });

  /** Test all Team queries */
  describe("Teams", () => {
    let _team: L.Team | undefined;
    let _team_id: string | undefined;

    /** Test the root connection query for the Team */
    it("teams", async () => {
      const teams = await client.teams();
      const team = teams?.nodes?.[0];
      _team_id = team?.id;
      expect(teams instanceof L.TeamConnection);
    });

    /** Test the root query for a single Team */
    it("team", async () => {
      if (_team_id) {
        const team = await client.team(_team_id);
        _team = team;
        expect(team instanceof L.Team);
      } else {
        throw new Error("codegen-doc:print: No first Team found in connection - cannot test team query");
      }
    });

    /** Test the team connection query for the Cycle */
    it("team.cycles", async () => {
      if (_team) {
        const cycles = await _team.cycles();
        expect(cycles instanceof L.CycleConnection);
      } else {
        throw new Error("codegen-doc:print: No team found - cannot test _team.cycles query");
      }
    });

    /** Test the team connection query for the Issue */
    it("team.issues", async () => {
      if (_team) {
        const issues = await _team.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        throw new Error("codegen-doc:print: No team found - cannot test _team.issues query");
      }
    });

    /** Test the team connection query for the IssueLabel */
    it("team.labels", async () => {
      if (_team) {
        const labels = await _team.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        throw new Error("codegen-doc:print: No team found - cannot test _team.labels query");
      }
    });

    /** Test the team connection query for the User */
    it("team.members", async () => {
      if (_team) {
        const members = await _team.members();
        expect(members instanceof L.UserConnection);
      } else {
        throw new Error("codegen-doc:print: No team found - cannot test _team.members query");
      }
    });

    /** Test the team connection query for the TeamMembership */
    it("team.memberships", async () => {
      if (_team) {
        const memberships = await _team.memberships();
        expect(memberships instanceof L.TeamMembershipConnection);
      } else {
        throw new Error("codegen-doc:print: No team found - cannot test _team.memberships query");
      }
    });

    /** Test the team connection query for the Project */
    it("team.projects", async () => {
      if (_team) {
        const projects = await _team.projects();
        expect(projects instanceof L.ProjectConnection);
      } else {
        throw new Error("codegen-doc:print: No team found - cannot test _team.projects query");
      }
    });

    /** Test the team connection query for the WorkflowState */
    it("team.states", async () => {
      if (_team) {
        const states = await _team.states();
        expect(states instanceof L.WorkflowStateConnection);
      } else {
        throw new Error("codegen-doc:print: No team found - cannot test _team.states query");
      }
    });

    /** Test the team model query for Team_Templates */
    it("team.templates", async () => {
      if (_team) {
        const templates = await _team.templates();
        expect(templates instanceof L.TemplateConnection);
      } else {
        throw new Error("codegen-doc:print: No team found - cannot test _team.templates query");
      }
    });

    /** Test the team connection query for the Webhook */
    it("team.webhooks", async () => {
      if (_team) {
        const webhooks = await _team.webhooks();
        expect(webhooks instanceof L.WebhookConnection);
      } else {
        throw new Error("codegen-doc:print: No team found - cannot test _team.webhooks query");
      }
    });

    /** Test the team.activeCycle query for L.Cycle */
    it("team.activeCycle", async () => {
      if (_team) {
        const team_activeCycle = await _team.activeCycle;
        expect(team_activeCycle instanceof L.Cycle);
      } else {
        throw new Error("codegen-doc:print: No Team found - cannot test team.activeCycle query");
      }
    });

    /** Test the team.draftWorkflowState query for L.WorkflowState */
    it("team.draftWorkflowState", async () => {
      if (_team) {
        const team_draftWorkflowState = await _team.draftWorkflowState;
        expect(team_draftWorkflowState instanceof L.WorkflowState);
      } else {
        throw new Error("codegen-doc:print: No Team found - cannot test team.draftWorkflowState query");
      }
    });

    /** Test the team.markedAsDuplicateWorkflowState query for L.WorkflowState */
    it("team.markedAsDuplicateWorkflowState", async () => {
      if (_team) {
        const team_markedAsDuplicateWorkflowState = await _team.markedAsDuplicateWorkflowState;
        expect(team_markedAsDuplicateWorkflowState instanceof L.WorkflowState);
      } else {
        throw new Error("codegen-doc:print: No Team found - cannot test team.markedAsDuplicateWorkflowState query");
      }
    });

    /** Test the team.mergeWorkflowState query for L.WorkflowState */
    it("team.mergeWorkflowState", async () => {
      if (_team) {
        const team_mergeWorkflowState = await _team.mergeWorkflowState;
        expect(team_mergeWorkflowState instanceof L.WorkflowState);
      } else {
        throw new Error("codegen-doc:print: No Team found - cannot test team.mergeWorkflowState query");
      }
    });

    /** Test the team.organization query for L.Organization */
    it("team.organization", async () => {
      if (_team) {
        const team_organization = await _team.organization;
        expect(team_organization instanceof L.Organization);
      } else {
        throw new Error("codegen-doc:print: No Team found - cannot test team.organization query");
      }
    });

    /** Test the team.reviewWorkflowState query for L.WorkflowState */
    it("team.reviewWorkflowState", async () => {
      if (_team) {
        const team_reviewWorkflowState = await _team.reviewWorkflowState;
        expect(team_reviewWorkflowState instanceof L.WorkflowState);
      } else {
        throw new Error("codegen-doc:print: No Team found - cannot test team.reviewWorkflowState query");
      }
    });

    /** Test the team.startWorkflowState query for L.WorkflowState */
    it("team.startWorkflowState", async () => {
      if (_team) {
        const team_startWorkflowState = await _team.startWorkflowState;
        expect(team_startWorkflowState instanceof L.WorkflowState);
      } else {
        throw new Error("codegen-doc:print: No Team found - cannot test team.startWorkflowState query");
      }
    });
  });

  /** Test Template query */
  describe("Template", () => {
    /** Test the root model query for Template */
    it("template", async () => {
      const template = await client.template("mock-id");
      expect(template instanceof L.Template);
    });
  });

  // Templates - no model for query

  /** Test UserSettings query */
  describe("UserSettings", () => {
    /** Test the root model query for UserSettings */
    it("userSettings", async () => {
      const userSettings = await client.userSettings;
      expect(userSettings instanceof L.UserSettings);
    });
  });

  /** Test all User queries */
  describe("Users", () => {
    let _user: L.User | undefined;
    let _user_id: string | undefined;

    /** Test the root connection query for the User */
    it("users", async () => {
      const users = await client.users();
      const user = users?.nodes?.[0];
      _user_id = user?.id;
      expect(users instanceof L.UserConnection);
    });

    /** Test the root query for a single User */
    it("user", async () => {
      if (_user_id) {
        const user = await client.user(_user_id);
        _user = user;
        expect(user instanceof L.User);
      } else {
        throw new Error("codegen-doc:print: No first User found in connection - cannot test user query");
      }
    });

    /** Test the user connection query for the Issue */
    it("user.assignedIssues", async () => {
      if (_user) {
        const assignedIssues = await _user.assignedIssues();
        expect(assignedIssues instanceof L.IssueConnection);
      } else {
        throw new Error("codegen-doc:print: No user found - cannot test _user.assignedIssues query");
      }
    });

    /** Test the user connection query for the Issue */
    it("user.createdIssues", async () => {
      if (_user) {
        const createdIssues = await _user.createdIssues();
        expect(createdIssues instanceof L.IssueConnection);
      } else {
        throw new Error("codegen-doc:print: No user found - cannot test _user.createdIssues query");
      }
    });

    /** Test the user connection query for the TeamMembership */
    it("user.teamMemberships", async () => {
      if (_user) {
        const teamMemberships = await _user.teamMemberships();
        expect(teamMemberships instanceof L.TeamMembershipConnection);
      } else {
        throw new Error("codegen-doc:print: No user found - cannot test _user.teamMemberships query");
      }
    });

    /** Test the user connection query for the Team */
    it("user.teams", async () => {
      if (_user) {
        const teams = await _user.teams();
        expect(teams instanceof L.TeamConnection);
      } else {
        throw new Error("codegen-doc:print: No user found - cannot test _user.teams query");
      }
    });

    /** Test the user.organization query for L.Organization */
    it("user.organization", async () => {
      if (_user) {
        const user_organization = await _user.organization;
        expect(user_organization instanceof L.Organization);
      } else {
        throw new Error("codegen-doc:print: No User found - cannot test user.organization query");
      }
    });
  });

  /** Test Viewer query */
  describe("Viewer", () => {
    let _viewer: L.User | undefined;

    /** Test the root model query for Viewer */
    it("viewer", async () => {
      const viewer = await client.viewer;
      _viewer = viewer;
      expect(viewer instanceof L.User);
    });

    /** Test the viewer connection query for the Issue */
    it("viewer.assignedIssues", async () => {
      if (_viewer) {
        const assignedIssues = await _viewer.assignedIssues();
        expect(assignedIssues instanceof L.IssueConnection);
      } else {
        throw new Error("codegen-doc:print: No viewer found - cannot test _viewer.assignedIssues query");
      }
    });

    /** Test the viewer connection query for the Issue */
    it("viewer.createdIssues", async () => {
      if (_viewer) {
        const createdIssues = await _viewer.createdIssues();
        expect(createdIssues instanceof L.IssueConnection);
      } else {
        throw new Error("codegen-doc:print: No viewer found - cannot test _viewer.createdIssues query");
      }
    });

    /** Test the viewer connection query for the TeamMembership */
    it("viewer.teamMemberships", async () => {
      if (_viewer) {
        const teamMemberships = await _viewer.teamMemberships();
        expect(teamMemberships instanceof L.TeamMembershipConnection);
      } else {
        throw new Error("codegen-doc:print: No viewer found - cannot test _viewer.teamMemberships query");
      }
    });

    /** Test the viewer connection query for the Team */
    it("viewer.teams", async () => {
      if (_viewer) {
        const teams = await _viewer.teams();
        expect(teams instanceof L.TeamConnection);
      } else {
        throw new Error("codegen-doc:print: No viewer found - cannot test _viewer.teams query");
      }
    });
  });

  /** Test all Webhook queries */
  describe("Webhooks", () => {
    let _webhook: L.Webhook | undefined;
    let _webhook_id: string | undefined;

    /** Test the root connection query for the Webhook */
    it("webhooks", async () => {
      const webhooks = await client.webhooks();
      const webhook = webhooks?.nodes?.[0];
      _webhook_id = webhook?.id;
      expect(webhooks instanceof L.WebhookConnection);
    });

    /** Test the root query for a single Webhook */
    it("webhook", async () => {
      if (_webhook_id) {
        const webhook = await client.webhook(_webhook_id);
        _webhook = webhook;
        expect(webhook instanceof L.Webhook);
      } else {
        throw new Error("codegen-doc:print: No first Webhook found in connection - cannot test webhook query");
      }
    });

    /** Test the webhook.creator query for L.User */
    it("webhook.creator", async () => {
      if (_webhook) {
        const webhook_creator = await _webhook.creator;
        expect(webhook_creator instanceof L.User);
      } else {
        throw new Error("codegen-doc:print: No Webhook found - cannot test webhook.creator query");
      }
    });

    /** Test the webhook.team query for L.Team */
    it("webhook.team", async () => {
      if (_webhook) {
        const webhook_team = await _webhook.team;
        expect(webhook_team instanceof L.Team);
      } else {
        throw new Error("codegen-doc:print: No Webhook found - cannot test webhook.team query");
      }
    });
  });

  /** Test all WorkflowState queries */
  describe("WorkflowStates", () => {
    let _workflowState: L.WorkflowState | undefined;
    let _workflowState_id: string | undefined;

    /** Test the root connection query for the WorkflowState */
    it("workflowStates", async () => {
      const workflowStates = await client.workflowStates();
      const workflowState = workflowStates?.nodes?.[0];
      _workflowState_id = workflowState?.id;
      expect(workflowStates instanceof L.WorkflowStateConnection);
    });

    /** Test the root query for a single WorkflowState */
    it("workflowState", async () => {
      if (_workflowState_id) {
        const workflowState = await client.workflowState(_workflowState_id);
        _workflowState = workflowState;
        expect(workflowState instanceof L.WorkflowState);
      } else {
        throw new Error(
          "codegen-doc:print: No first WorkflowState found in connection - cannot test workflowState query"
        );
      }
    });

    /** Test the workflowState connection query for the Issue */
    it("workflowState.issues", async () => {
      if (_workflowState) {
        const issues = await _workflowState.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        throw new Error("codegen-doc:print: No workflowState found - cannot test _workflowState.issues query");
      }
    });

    /** Test the workflowState.team query for L.Team */
    it("workflowState.team", async () => {
      if (_workflowState) {
        const workflowState_team = await _workflowState.team;
        expect(workflowState_team instanceof L.Team);
      } else {
        throw new Error("codegen-doc:print: No WorkflowState found - cannot test workflowState.team query");
      }
    });
  });
});
