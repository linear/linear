/* eslint-disable no-console */
import * as L from "../index";
import { startClient, stopClient } from "./test-client";

/** Auto generated API tests */
describe("generated", () => {
  /** Initialize Linear client variable */
  let client: L.LinearClient;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  beforeAll(async () => {
    client = await startClient();
  });

  afterAll(() => {
    stopClient();
  });

  /** Test all ProjectMilestone queries */
  describe("ProjectMilestones", () => {
    let _ProjectMilestone: L.ProjectMilestone | undefined;
    let _ProjectMilestone_id: string | undefined;

    /** Test the root connection query for the ProjectMilestone */
    it("ProjectMilestones", async () => {
      const ProjectMilestones: L.ProjectMilestoneConnection | undefined = await client.ProjectMilestones();
      const ProjectMilestone = ProjectMilestones?.nodes?.[0];
      _ProjectMilestone_id = ProjectMilestone?.id;
      expect(ProjectMilestones instanceof L.ProjectMilestoneConnection);
    });

    /** Test the root query for a single ProjectMilestone */
    it("ProjectMilestone", async () => {
      if (_ProjectMilestone_id) {
        const ProjectMilestone: L.ProjectMilestone | undefined = await client.ProjectMilestone(_ProjectMilestone_id);
        _ProjectMilestone = ProjectMilestone;
        expect(ProjectMilestone instanceof L.ProjectMilestone);
      } else {
        console.warn(
          "codegen-doc:print: No first ProjectMilestone found in connection - cannot test ProjectMilestone query"
        );
      }
    });

    /** Test the ProjectMilestone.project query for L.Project */
    it("ProjectMilestone.project", async () => {
      if (_ProjectMilestone) {
        const ProjectMilestone_project: L.Project | undefined = await _ProjectMilestone.project;
        expect(ProjectMilestone_project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No ProjectMilestone found - cannot test ProjectMilestone.project query");
      }
    });
  });

  /** Test all Team queries */
  describe("AdministrableTeams", () => {
    let _team: L.Team | undefined;
    let _team_id: string | undefined;

    /** Test the root connection query for the Team */
    it("administrableTeams", async () => {
      const administrableTeams: L.TeamConnection | undefined = await client.administrableTeams();
      const team = administrableTeams?.nodes?.[0];
      _team_id = team?.id;
      expect(administrableTeams instanceof L.TeamConnection);
    });

    /** Test the root query for a single Team */
    it("team", async () => {
      if (_team_id) {
        const team: L.Team | undefined = await client.team(_team_id);
        _team = team;
        expect(team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No first Team found in connection - cannot test team query");
      }
    });

    /** Test the team connection query for the Cycle */
    it("team.cycles", async () => {
      if (_team) {
        const cycles: L.CycleConnection | undefined = await _team.cycles();
        expect(cycles instanceof L.CycleConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.cycles query");
      }
    });

    /** Test the team connection query for the Issue */
    it("team.issues", async () => {
      if (_team) {
        const issues: L.IssueConnection | undefined = await _team.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.issues query");
      }
    });

    /** Test the team connection query for the IssueLabel */
    it("team.labels", async () => {
      if (_team) {
        const labels: L.IssueLabelConnection | undefined = await _team.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.labels query");
      }
    });

    /** Test the team connection query for the User */
    it("team.members", async () => {
      if (_team) {
        const members: L.UserConnection | undefined = await _team.members();
        expect(members instanceof L.UserConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.members query");
      }
    });

    /** Test the team connection query for the TeamMembership */
    it("team.memberships", async () => {
      if (_team) {
        const memberships: L.TeamMembershipConnection | undefined = await _team.memberships();
        expect(memberships instanceof L.TeamMembershipConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.memberships query");
      }
    });

    /** Test the team connection query for the Project */
    it("team.projects", async () => {
      if (_team) {
        const projects: L.ProjectConnection | undefined = await _team.projects();
        expect(projects instanceof L.ProjectConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.projects query");
      }
    });

    /** Test the team connection query for the WorkflowState */
    it("team.states", async () => {
      if (_team) {
        const states: L.WorkflowStateConnection | undefined = await _team.states();
        expect(states instanceof L.WorkflowStateConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.states query");
      }
    });

    /** Test the team model query for Team_Templates */
    it("team.templates", async () => {
      if (_team) {
        const templates: L.TemplateConnection | undefined = await _team.templates();
        expect(templates instanceof L.TemplateConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.templates query");
      }
    });

    /** Test the team connection query for the Webhook */
    it("team.webhooks", async () => {
      if (_team) {
        const webhooks: L.WebhookConnection | undefined = await _team.webhooks();
        expect(webhooks instanceof L.WebhookConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.webhooks query");
      }
    });

    /** Test the team.activeCycle query for L.Cycle */
    it("team.activeCycle", async () => {
      if (_team) {
        const team_activeCycle: L.Cycle | undefined = await _team.activeCycle;
        expect(team_activeCycle instanceof L.Cycle);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.activeCycle query");
      }
    });

    /** Test the team.defaultIssueState query for L.WorkflowState */
    it("team.defaultIssueState", async () => {
      if (_team) {
        const team_defaultIssueState: L.WorkflowState | undefined = await _team.defaultIssueState;
        expect(team_defaultIssueState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.defaultIssueState query");
      }
    });

    /** Test the team.defaultTemplateForMembers query for L.Template */
    it("team.defaultTemplateForMembers", async () => {
      if (_team) {
        const team_defaultTemplateForMembers: L.Template | undefined = await _team.defaultTemplateForMembers;
        expect(team_defaultTemplateForMembers instanceof L.Template);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.defaultTemplateForMembers query");
      }
    });

    /** Test the team.defaultTemplateForNonMembers query for L.Template */
    it("team.defaultTemplateForNonMembers", async () => {
      if (_team) {
        const team_defaultTemplateForNonMembers: L.Template | undefined = await _team.defaultTemplateForNonMembers;
        expect(team_defaultTemplateForNonMembers instanceof L.Template);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.defaultTemplateForNonMembers query");
      }
    });

    /** Test the team.draftWorkflowState query for L.WorkflowState */
    it("team.draftWorkflowState", async () => {
      if (_team) {
        const team_draftWorkflowState: L.WorkflowState | undefined = await _team.draftWorkflowState;
        expect(team_draftWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.draftWorkflowState query");
      }
    });

    /** Test the team.integrationsSettings query for L.IntegrationsSettings */
    it("team.integrationsSettings", async () => {
      if (_team) {
        const team_integrationsSettings: L.IntegrationsSettings | undefined = await _team.integrationsSettings;
        expect(team_integrationsSettings instanceof L.IntegrationsSettings);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.integrationsSettings query");
      }
    });

    /** Test the team.markedAsDuplicateWorkflowState query for L.WorkflowState */
    it("team.markedAsDuplicateWorkflowState", async () => {
      if (_team) {
        const team_markedAsDuplicateWorkflowState: L.WorkflowState | undefined =
          await _team.markedAsDuplicateWorkflowState;
        expect(team_markedAsDuplicateWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.markedAsDuplicateWorkflowState query");
      }
    });

    /** Test the team.mergeWorkflowState query for L.WorkflowState */
    it("team.mergeWorkflowState", async () => {
      if (_team) {
        const team_mergeWorkflowState: L.WorkflowState | undefined = await _team.mergeWorkflowState;
        expect(team_mergeWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.mergeWorkflowState query");
      }
    });

    /** Test the team.organization query for L.Organization */
    it("team.organization", async () => {
      if (_team) {
        const team_organization: L.Organization | undefined = await _team.organization;
        expect(team_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.organization query");
      }
    });

    /** Test the team.reviewWorkflowState query for L.WorkflowState */
    it("team.reviewWorkflowState", async () => {
      if (_team) {
        const team_reviewWorkflowState: L.WorkflowState | undefined = await _team.reviewWorkflowState;
        expect(team_reviewWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.reviewWorkflowState query");
      }
    });

    /** Test the team.startWorkflowState query for L.WorkflowState */
    it("team.startWorkflowState", async () => {
      if (_team) {
        const team_startWorkflowState: L.WorkflowState | undefined = await _team.startWorkflowState;
        expect(team_startWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.startWorkflowState query");
      }
    });

    /** Test the team.triageIssueState query for L.WorkflowState */
    it("team.triageIssueState", async () => {
      if (_team) {
        const team_triageIssueState: L.WorkflowState | undefined = await _team.triageIssueState;
        expect(team_triageIssueState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.triageIssueState query");
      }
    });
  });

  /** Test all ApiKey queries */
  describe("ApiKeys", () => {
    /** Test the root connection query for the ApiKey */
    it("apiKeys", async () => {
      const apiKeys: L.ApiKeyConnection | undefined = await client.apiKeys();
      expect(apiKeys instanceof L.ApiKeyConnection);
    });
  });

  /** Test ApplicationInfo query */
  describe("ApplicationInfo", () => {
    /** Test the root model query for ApplicationInfo */
    it("applicationInfo", async () => {
      const applicationInfo: L.Application | undefined = await client.applicationInfo("mock-clientId");
      expect(applicationInfo instanceof L.Application);
    });
  });

  /** Test ApplicationWithAuthorization query */
  describe("ApplicationWithAuthorization", () => {
    /** Test the root model query for ApplicationWithAuthorization */
    it("applicationWithAuthorization", async () => {
      const applicationWithAuthorization: L.UserAuthorizedApplication | undefined =
        await client.applicationWithAuthorization("mock-clientId", ["mock-scope"]);
      expect(applicationWithAuthorization instanceof L.UserAuthorizedApplication);
    });
  });

  /** Test AttachmentIssue query */
  describe("AttachmentIssue", () => {
    let _attachmentIssue: L.Issue | undefined;

    /** Test the root model query for AttachmentIssue */
    it("attachmentIssue", async () => {
      const attachmentIssue: L.Issue | undefined = await client.attachmentIssue("mock-id");
      _attachmentIssue = attachmentIssue;
      expect(attachmentIssue instanceof L.Issue);
    });

    /** Test the attachmentIssue connection query for the Attachment */
    it("attachmentIssue.attachments", async () => {
      if (_attachmentIssue) {
        const attachments: L.AttachmentConnection | undefined = await _attachmentIssue.attachments();
        expect(attachments instanceof L.AttachmentConnection);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.attachments query");
      }
    });

    /** Test the attachmentIssue connection query for the Issue */
    it("attachmentIssue.children", async () => {
      if (_attachmentIssue) {
        const children: L.IssueConnection | undefined = await _attachmentIssue.children();
        expect(children instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.children query");
      }
    });

    /** Test the attachmentIssue connection query for the Comment */
    it("attachmentIssue.comments", async () => {
      if (_attachmentIssue) {
        const comments: L.CommentConnection | undefined = await _attachmentIssue.comments();
        expect(comments instanceof L.CommentConnection);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.comments query");
      }
    });

    /** Test the attachmentIssue connection query for the IssueHistory */
    it("attachmentIssue.history", async () => {
      if (_attachmentIssue) {
        const history: L.IssueHistoryConnection | undefined = await _attachmentIssue.history();
        expect(history instanceof L.IssueHistoryConnection);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.history query");
      }
    });

    /** Test the attachmentIssue connection query for the IssueRelation */
    it("attachmentIssue.inverseRelations", async () => {
      if (_attachmentIssue) {
        const inverseRelations: L.IssueRelationConnection | undefined = await _attachmentIssue.inverseRelations();
        expect(inverseRelations instanceof L.IssueRelationConnection);
      } else {
        console.warn(
          "codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.inverseRelations query"
        );
      }
    });

    /** Test the attachmentIssue connection query for the IssueLabel */
    it("attachmentIssue.labels", async () => {
      if (_attachmentIssue) {
        const labels: L.IssueLabelConnection | undefined = await _attachmentIssue.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.labels query");
      }
    });

    /** Test the attachmentIssue connection query for the IssueRelation */
    it("attachmentIssue.relations", async () => {
      if (_attachmentIssue) {
        const relations: L.IssueRelationConnection | undefined = await _attachmentIssue.relations();
        expect(relations instanceof L.IssueRelationConnection);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.relations query");
      }
    });

    /** Test the attachmentIssue connection query for the User */
    it("attachmentIssue.subscribers", async () => {
      if (_attachmentIssue) {
        const subscribers: L.UserConnection | undefined = await _attachmentIssue.subscribers();
        expect(subscribers instanceof L.UserConnection);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.subscribers query");
      }
    });
  });

  /** Test all Attachment queries */
  describe("Attachments", () => {
    let _attachment: L.Attachment | undefined;
    let _attachment_id: string | undefined;

    /** Test the root connection query for the Attachment */
    it("attachments", async () => {
      const attachments: L.AttachmentConnection | undefined = await client.attachments();
      const attachment = attachments?.nodes?.[0];
      _attachment_id = attachment?.id;
      expect(attachments instanceof L.AttachmentConnection);
    });

    /** Test the root query for a single Attachment */
    it("attachment", async () => {
      if (_attachment_id) {
        const attachment: L.Attachment | undefined = await client.attachment(_attachment_id);
        _attachment = attachment;
        expect(attachment instanceof L.Attachment);
      } else {
        console.warn("codegen-doc:print: No first Attachment found in connection - cannot test attachment query");
      }
    });

    /** Test the attachment.creator query for L.User */
    it("attachment.creator", async () => {
      if (_attachment) {
        const attachment_creator: L.User | undefined = await _attachment.creator;
        expect(attachment_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Attachment found - cannot test attachment.creator query");
      }
    });

    /** Test the attachment.issue query for L.Issue */
    it("attachment.issue", async () => {
      if (_attachment) {
        const attachment_issue: L.Issue | undefined = await _attachment.issue;
        expect(attachment_issue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No Attachment found - cannot test attachment.issue query");
      }
    });
  });

  /** Test all Attachment queries */
  describe("AttachmentsForUrl", () => {
    let _attachment: L.Attachment | undefined;
    let _attachment_id: string | undefined;

    /** Test the root connection query for the Attachment */
    it("attachmentsForURL", async () => {
      const attachmentsForURL: L.AttachmentConnection | undefined = await client.attachmentsForURL("mock-url");
      const attachment = attachmentsForURL?.nodes?.[0];
      _attachment_id = attachment?.id;
      expect(attachmentsForURL instanceof L.AttachmentConnection);
    });

    /** Test the root query for a single Attachment */
    it("attachment", async () => {
      if (_attachment_id) {
        const attachment: L.Attachment | undefined = await client.attachment(_attachment_id);
        _attachment = attachment;
        expect(attachment instanceof L.Attachment);
      } else {
        console.warn("codegen-doc:print: No first Attachment found in connection - cannot test attachment query");
      }
    });

    /** Test the attachment.creator query for L.User */
    it("attachment.creator", async () => {
      if (_attachment) {
        const attachment_creator: L.User | undefined = await _attachment.creator;
        expect(attachment_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Attachment found - cannot test attachment.creator query");
      }
    });

    /** Test the attachment.issue query for L.Issue */
    it("attachment.issue", async () => {
      if (_attachment) {
        const attachment_issue: L.Issue | undefined = await _attachment.issue;
        expect(attachment_issue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No Attachment found - cannot test attachment.issue query");
      }
    });
  });

  /** Test all AuditEntry queries */
  describe("AuditEntries", () => {
    /** Test the root connection query for the AuditEntry */
    it("auditEntries", async () => {
      const auditEntries: L.AuditEntryConnection | undefined = await client.auditEntries();
      expect(auditEntries instanceof L.AuditEntryConnection);
    });
  });

  /** Test AuditEntryTypes query */
  describe("AuditEntryTypes", () => {
    /** Test the root model query for AuditEntryTypes */
    it("auditEntryTypes", async () => {
      const auditEntryTypes: L.AuditEntryType[] | undefined = await client.auditEntryTypes;
      auditEntryTypes?.map(node => expect(node instanceof L.AuditEntryType));
    });
  });

  /** Test AvailableUsers query */
  describe("AvailableUsers", () => {
    /** Test the root model query for AvailableUsers */
    it("availableUsers", async () => {
      const availableUsers: L.AuthResolverResponse | undefined = await client.availableUsers;
      expect(availableUsers instanceof L.AuthResolverResponse);
    });
  });

  /** Test all Comment queries */
  describe("Comments", () => {
    let _comment: L.Comment | undefined;
    let _comment_id: string | undefined;

    /** Test the root connection query for the Comment */
    it("comments", async () => {
      const comments: L.CommentConnection | undefined = await client.comments();
      const comment = comments?.nodes?.[0];
      _comment_id = comment?.id;
      expect(comments instanceof L.CommentConnection);
    });

    /** Test the root query for a single Comment */
    it("comment", async () => {
      if (_comment_id) {
        const comment: L.Comment | undefined = await client.comment(_comment_id);
        _comment = comment;
        expect(comment instanceof L.Comment);
      } else {
        console.warn("codegen-doc:print: No first Comment found in connection - cannot test comment query");
      }
    });

    /** Test the comment connection query for the Comment */
    it("comment.children", async () => {
      if (_comment) {
        const children: L.CommentConnection | undefined = await _comment.children();
        expect(children instanceof L.CommentConnection);
      } else {
        console.warn("codegen-doc:print: No comment found - cannot test _comment.children query");
      }
    });

    /** Test the comment.issue query for L.Issue */
    it("comment.issue", async () => {
      if (_comment) {
        const comment_issue: L.Issue | undefined = await _comment.issue;
        expect(comment_issue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No Comment found - cannot test comment.issue query");
      }
    });

    /** Test the comment.parent query for L.Comment */
    it("comment.parent", async () => {
      if (_comment) {
        const comment_parent: L.Comment | undefined = await _comment.parent;
        expect(comment_parent instanceof L.Comment);
      } else {
        console.warn("codegen-doc:print: No Comment found - cannot test comment.parent query");
      }
    });

    /** Test the comment.user query for L.User */
    it("comment.user", async () => {
      if (_comment) {
        const comment_user: L.User | undefined = await _comment.user;
        expect(comment_user instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Comment found - cannot test comment.user query");
      }
    });
  });

  /** Test all CustomView queries */
  describe("CustomViews", () => {
    let _customView: L.CustomView | undefined;
    let _customView_id: string | undefined;

    /** Test the root connection query for the CustomView */
    it("customViews", async () => {
      const customViews: L.CustomViewConnection | undefined = await client.customViews();
      const customView = customViews?.nodes?.[0];
      _customView_id = customView?.id;
      expect(customViews instanceof L.CustomViewConnection);
    });

    /** Test the root query for a single CustomView */
    it("customView", async () => {
      if (_customView_id) {
        const customView: L.CustomView | undefined = await client.customView(_customView_id);
        _customView = customView;
        expect(customView instanceof L.CustomView);
      } else {
        console.warn("codegen-doc:print: No first CustomView found in connection - cannot test customView query");
      }
    });

    /** Test the customView.creator query for L.User */
    it("customView.creator", async () => {
      if (_customView) {
        const customView_creator: L.User | undefined = await _customView.creator;
        expect(customView_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No CustomView found - cannot test customView.creator query");
      }
    });

    /** Test the customView.organization query for L.Organization */
    it("customView.organization", async () => {
      if (_customView) {
        const customView_organization: L.Organization | undefined = await _customView.organization;
        expect(customView_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No CustomView found - cannot test customView.organization query");
      }
    });

    /** Test the customView.team query for L.Team */
    it("customView.team", async () => {
      if (_customView) {
        const customView_team: L.Team | undefined = await _customView.team;
        expect(customView_team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No CustomView found - cannot test customView.team query");
      }
    });
  });

  /** Test all Cycle queries */
  describe("Cycles", () => {
    let _cycle: L.Cycle | undefined;
    let _cycle_id: string | undefined;

    /** Test the root connection query for the Cycle */
    it("cycles", async () => {
      const cycles: L.CycleConnection | undefined = await client.cycles();
      const cycle = cycles?.nodes?.[0];
      _cycle_id = cycle?.id;
      expect(cycles instanceof L.CycleConnection);
    });

    /** Test the root query for a single Cycle */
    it("cycle", async () => {
      if (_cycle_id) {
        const cycle: L.Cycle | undefined = await client.cycle(_cycle_id);
        _cycle = cycle;
        expect(cycle instanceof L.Cycle);
      } else {
        console.warn("codegen-doc:print: No first Cycle found in connection - cannot test cycle query");
      }
    });

    /** Test the cycle connection query for the Issue */
    it("cycle.issues", async () => {
      if (_cycle) {
        const issues: L.IssueConnection | undefined = await _cycle.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No cycle found - cannot test _cycle.issues query");
      }
    });

    /** Test the cycle connection query for the Issue */
    it("cycle.uncompletedIssuesUponClose", async () => {
      if (_cycle) {
        const uncompletedIssuesUponClose: L.IssueConnection | undefined = await _cycle.uncompletedIssuesUponClose();
        expect(uncompletedIssuesUponClose instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No cycle found - cannot test _cycle.uncompletedIssuesUponClose query");
      }
    });

    /** Test the cycle.team query for L.Team */
    it("cycle.team", async () => {
      if (_cycle) {
        const cycle_team: L.Team | undefined = await _cycle.team;
        expect(cycle_team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No Cycle found - cannot test cycle.team query");
      }
    });
  });

  /** Test all Document queries */
  describe("Documents", () => {
    let _document: L.Document | undefined;
    let _document_id: string | undefined;

    /** Test the root connection query for the Document */
    it("documents", async () => {
      const documents: L.DocumentConnection | undefined = await client.documents();
      const document = documents?.nodes?.[0];
      _document_id = document?.id;
      expect(documents instanceof L.DocumentConnection);
    });

    /** Test the root query for a single Document */
    it("document", async () => {
      if (_document_id) {
        const document: L.Document | undefined = await client.document(_document_id);
        _document = document;
        expect(document instanceof L.Document);
      } else {
        console.warn("codegen-doc:print: No first Document found in connection - cannot test document query");
      }
    });

    /** Test the document.creator query for L.User */
    it("document.creator", async () => {
      if (_document) {
        const document_creator: L.User | undefined = await _document.creator;
        expect(document_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Document found - cannot test document.creator query");
      }
    });

    /** Test the document.project query for L.Project */
    it("document.project", async () => {
      if (_document) {
        const document_project: L.Project | undefined = await _document.project;
        expect(document_project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No Document found - cannot test document.project query");
      }
    });

    /** Test the document.updatedBy query for L.User */
    it("document.updatedBy", async () => {
      if (_document) {
        const document_updatedBy: L.User | undefined = await _document.updatedBy;
        expect(document_updatedBy instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Document found - cannot test document.updatedBy query");
      }
    });
  });

  /** Test all Emoji queries */
  describe("Emojis", () => {
    let _emoji: L.Emoji | undefined;
    let _emoji_id: string | undefined;

    /** Test the root connection query for the Emoji */
    it("emojis", async () => {
      const emojis: L.EmojiConnection | undefined = await client.emojis();
      const emoji = emojis?.nodes?.[0];
      _emoji_id = emoji?.id;
      expect(emojis instanceof L.EmojiConnection);
    });

    /** Test the root query for a single Emoji */
    it("emoji", async () => {
      if (_emoji_id) {
        const emoji: L.Emoji | undefined = await client.emoji(_emoji_id);
        _emoji = emoji;
        expect(emoji instanceof L.Emoji);
      } else {
        console.warn("codegen-doc:print: No first Emoji found in connection - cannot test emoji query");
      }
    });

    /** Test the emoji.creator query for L.User */
    it("emoji.creator", async () => {
      if (_emoji) {
        const emoji_creator: L.User | undefined = await _emoji.creator;
        expect(emoji_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Emoji found - cannot test emoji.creator query");
      }
    });

    /** Test the emoji.organization query for L.Organization */
    it("emoji.organization", async () => {
      if (_emoji) {
        const emoji_organization: L.Organization | undefined = await _emoji.organization;
        expect(emoji_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No Emoji found - cannot test emoji.organization query");
      }
    });
  });

  /** Test all Favorite queries */
  describe("Favorites", () => {
    let _favorite: L.Favorite | undefined;
    let _favorite_id: string | undefined;

    /** Test the root connection query for the Favorite */
    it("favorites", async () => {
      const favorites: L.FavoriteConnection | undefined = await client.favorites();
      const favorite = favorites?.nodes?.[0];
      _favorite_id = favorite?.id;
      expect(favorites instanceof L.FavoriteConnection);
    });

    /** Test the root query for a single Favorite */
    it("favorite", async () => {
      if (_favorite_id) {
        const favorite: L.Favorite | undefined = await client.favorite(_favorite_id);
        _favorite = favorite;
        expect(favorite instanceof L.Favorite);
      } else {
        console.warn("codegen-doc:print: No first Favorite found in connection - cannot test favorite query");
      }
    });

    /** Test the favorite connection query for the Favorite */
    it("favorite.children", async () => {
      if (_favorite) {
        const children: L.FavoriteConnection | undefined = await _favorite.children();
        expect(children instanceof L.FavoriteConnection);
      } else {
        console.warn("codegen-doc:print: No favorite found - cannot test _favorite.children query");
      }
    });

    /** Test the favorite.customView query for L.CustomView */
    it("favorite.customView", async () => {
      if (_favorite) {
        const favorite_customView: L.CustomView | undefined = await _favorite.customView;
        expect(favorite_customView instanceof L.CustomView);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.customView query");
      }
    });

    /** Test the favorite.cycle query for L.Cycle */
    it("favorite.cycle", async () => {
      if (_favorite) {
        const favorite_cycle: L.Cycle | undefined = await _favorite.cycle;
        expect(favorite_cycle instanceof L.Cycle);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.cycle query");
      }
    });

    /** Test the favorite.document query for L.Document */
    it("favorite.document", async () => {
      if (_favorite) {
        const favorite_document: L.Document | undefined = await _favorite.document;
        expect(favorite_document instanceof L.Document);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.document query");
      }
    });

    /** Test the favorite.issue query for L.Issue */
    it("favorite.issue", async () => {
      if (_favorite) {
        const favorite_issue: L.Issue | undefined = await _favorite.issue;
        expect(favorite_issue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.issue query");
      }
    });

    /** Test the favorite.label query for L.IssueLabel */
    it("favorite.label", async () => {
      if (_favorite) {
        const favorite_label: L.IssueLabel | undefined = await _favorite.label;
        expect(favorite_label instanceof L.IssueLabel);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.label query");
      }
    });

    /** Test the favorite.parent query for L.Favorite */
    it("favorite.parent", async () => {
      if (_favorite) {
        const favorite_parent: L.Favorite | undefined = await _favorite.parent;
        expect(favorite_parent instanceof L.Favorite);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.parent query");
      }
    });

    /** Test the favorite.predefinedViewTeam query for L.Team */
    it("favorite.predefinedViewTeam", async () => {
      if (_favorite) {
        const favorite_predefinedViewTeam: L.Team | undefined = await _favorite.predefinedViewTeam;
        expect(favorite_predefinedViewTeam instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.predefinedViewTeam query");
      }
    });

    /** Test the favorite.project query for L.Project */
    it("favorite.project", async () => {
      if (_favorite) {
        const favorite_project: L.Project | undefined = await _favorite.project;
        expect(favorite_project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.project query");
      }
    });

    /** Test the favorite.projectTeam query for L.Team */
    it("favorite.projectTeam", async () => {
      if (_favorite) {
        const favorite_projectTeam: L.Team | undefined = await _favorite.projectTeam;
        expect(favorite_projectTeam instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.projectTeam query");
      }
    });

    /** Test the favorite.roadmap query for L.Roadmap */
    it("favorite.roadmap", async () => {
      if (_favorite) {
        const favorite_roadmap: L.Roadmap | undefined = await _favorite.roadmap;
        expect(favorite_roadmap instanceof L.Roadmap);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.roadmap query");
      }
    });

    /** Test the favorite.user query for L.User */
    it("favorite.user", async () => {
      if (_favorite) {
        const favorite_user: L.User | undefined = await _favorite.user;
        expect(favorite_user instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.user query");
      }
    });
  });

  /** Test FigmaEmbedInfo query */
  describe("FigmaEmbedInfo", () => {
    let _figmaEmbedInfo: L.FigmaEmbedPayload | undefined;

    /** Test the root model query for FigmaEmbedInfo */
    it("figmaEmbedInfo", async () => {
      const figmaEmbedInfo: L.FigmaEmbedPayload | undefined = await client.figmaEmbedInfo("mock-fileId");
      _figmaEmbedInfo = figmaEmbedInfo;
      expect(figmaEmbedInfo instanceof L.FigmaEmbedPayload);
    });

    /** Test the figmaEmbedInfo model query for FigmaEmbedInfo_FigmaEmbed */
    it("figmaEmbedInfo.figmaEmbed", async () => {
      if (_figmaEmbedInfo) {
        const figmaEmbed: L.FigmaEmbed | undefined = _figmaEmbedInfo.figmaEmbed;
        expect(figmaEmbed instanceof L.FigmaEmbed);
      } else {
        console.warn("codegen-doc:print: No figmaEmbedInfo found - cannot test _figmaEmbedInfo.figmaEmbed query");
      }
    });
  });

  /** Test all IntegrationTemplate queries */
  describe("IntegrationTemplates", () => {
    let _integrationTemplate: L.IntegrationTemplate | undefined;
    let _integrationTemplate_id: string | undefined;

    /** Test the root connection query for the IntegrationTemplate */
    it("integrationTemplates", async () => {
      const integrationTemplates: L.IntegrationTemplateConnection | undefined = await client.integrationTemplates();
      const integrationTemplate = integrationTemplates?.nodes?.[0];
      _integrationTemplate_id = integrationTemplate?.id;
      expect(integrationTemplates instanceof L.IntegrationTemplateConnection);
    });

    /** Test the root query for a single IntegrationTemplate */
    it("integrationTemplate", async () => {
      if (_integrationTemplate_id) {
        const integrationTemplate: L.IntegrationTemplate | undefined = await client.integrationTemplate(
          _integrationTemplate_id
        );
        _integrationTemplate = integrationTemplate;
        expect(integrationTemplate instanceof L.IntegrationTemplate);
      } else {
        console.warn(
          "codegen-doc:print: No first IntegrationTemplate found in connection - cannot test integrationTemplate query"
        );
      }
    });

    /** Test the integrationTemplate.integration query for L.Integration */
    it("integrationTemplate.integration", async () => {
      if (_integrationTemplate) {
        const integrationTemplate_integration: L.Integration | undefined = await _integrationTemplate.integration;
        expect(integrationTemplate_integration instanceof L.Integration);
      } else {
        console.warn(
          "codegen-doc:print: No IntegrationTemplate found - cannot test integrationTemplate.integration query"
        );
      }
    });

    /** Test the integrationTemplate.template query for L.Template */
    it("integrationTemplate.template", async () => {
      if (_integrationTemplate) {
        const integrationTemplate_template: L.Template | undefined = await _integrationTemplate.template;
        expect(integrationTemplate_template instanceof L.Template);
      } else {
        console.warn(
          "codegen-doc:print: No IntegrationTemplate found - cannot test integrationTemplate.template query"
        );
      }
    });
  });

  /** Test all Integration queries */
  describe("Integrations", () => {
    let _integration: L.Integration | undefined;
    let _integration_id: string | undefined;

    /** Test the root connection query for the Integration */
    it("integrations", async () => {
      const integrations: L.IntegrationConnection | undefined = await client.integrations();
      const integration = integrations?.nodes?.[0];
      _integration_id = integration?.id;
      expect(integrations instanceof L.IntegrationConnection);
    });

    /** Test the root query for a single Integration */
    it("integration", async () => {
      if (_integration_id) {
        const integration: L.Integration | undefined = await client.integration(_integration_id);
        _integration = integration;
        expect(integration instanceof L.Integration);
      } else {
        console.warn("codegen-doc:print: No first Integration found in connection - cannot test integration query");
      }
    });

    /** Test the integration.creator query for L.User */
    it("integration.creator", async () => {
      if (_integration) {
        const integration_creator: L.User | undefined = await _integration.creator;
        expect(integration_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Integration found - cannot test integration.creator query");
      }
    });

    /** Test the integration.organization query for L.Organization */
    it("integration.organization", async () => {
      if (_integration) {
        const integration_organization: L.Organization | undefined = await _integration.organization;
        expect(integration_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No Integration found - cannot test integration.organization query");
      }
    });

    /** Test the integration.team query for L.Team */
    it("integration.team", async () => {
      if (_integration) {
        const integration_team: L.Team | undefined = await _integration.team;
        expect(integration_team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No Integration found - cannot test integration.team query");
      }
    });
  });

  /** Test IntegrationsSettings query */
  describe("IntegrationsSettings", () => {
    /** Test the root model query for IntegrationsSettings */
    it("integrationsSettings", async () => {
      const integrationsSettings: L.IntegrationsSettings | undefined = await client.integrationsSettings("mock-id");
      expect(integrationsSettings instanceof L.IntegrationsSettings);
    });
  });

  /** Test IssueImportFinishGithubOAuth query */
  describe("IssueImportFinishGithubOAuth", () => {
    /** Test the root model query for IssueImportFinishGithubOAuth */
    it("issueImportFinishGithubOAuth", async () => {
      const issueImportFinishGithubOAuth: L.GithubOAuthTokenPayload | undefined =
        await client.issueImportFinishGithubOAuth("mock-code");
      expect(issueImportFinishGithubOAuth instanceof L.GithubOAuthTokenPayload);
    });
  });

  /** Test all IssueLabel queries */
  describe("IssueLabels", () => {
    let _issueLabel: L.IssueLabel | undefined;
    let _issueLabel_id: string | undefined;

    /** Test the root connection query for the IssueLabel */
    it("issueLabels", async () => {
      const issueLabels: L.IssueLabelConnection | undefined = await client.issueLabels();
      const issueLabel = issueLabels?.nodes?.[0];
      _issueLabel_id = issueLabel?.id;
      expect(issueLabels instanceof L.IssueLabelConnection);
    });

    /** Test the root query for a single IssueLabel */
    it("issueLabel", async () => {
      if (_issueLabel_id) {
        const issueLabel: L.IssueLabel | undefined = await client.issueLabel(_issueLabel_id);
        _issueLabel = issueLabel;
        expect(issueLabel instanceof L.IssueLabel);
      } else {
        console.warn("codegen-doc:print: No first IssueLabel found in connection - cannot test issueLabel query");
      }
    });

    /** Test the issueLabel connection query for the IssueLabel */
    it("issueLabel.children", async () => {
      if (_issueLabel) {
        const children: L.IssueLabelConnection | undefined = await _issueLabel.children();
        expect(children instanceof L.IssueLabelConnection);
      } else {
        console.warn("codegen-doc:print: No issueLabel found - cannot test _issueLabel.children query");
      }
    });

    /** Test the issueLabel connection query for the Issue */
    it("issueLabel.issues", async () => {
      if (_issueLabel) {
        const issues: L.IssueConnection | undefined = await _issueLabel.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No issueLabel found - cannot test _issueLabel.issues query");
      }
    });

    /** Test the issueLabel.creator query for L.User */
    it("issueLabel.creator", async () => {
      if (_issueLabel) {
        const issueLabel_creator: L.User | undefined = await _issueLabel.creator;
        expect(issueLabel_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No IssueLabel found - cannot test issueLabel.creator query");
      }
    });

    /** Test the issueLabel.organization query for L.Organization */
    it("issueLabel.organization", async () => {
      if (_issueLabel) {
        const issueLabel_organization: L.Organization | undefined = await _issueLabel.organization;
        expect(issueLabel_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No IssueLabel found - cannot test issueLabel.organization query");
      }
    });

    /** Test the issueLabel.parent query for L.IssueLabel */
    it("issueLabel.parent", async () => {
      if (_issueLabel) {
        const issueLabel_parent: L.IssueLabel | undefined = await _issueLabel.parent;
        expect(issueLabel_parent instanceof L.IssueLabel);
      } else {
        console.warn("codegen-doc:print: No IssueLabel found - cannot test issueLabel.parent query");
      }
    });

    /** Test the issueLabel.team query for L.Team */
    it("issueLabel.team", async () => {
      if (_issueLabel) {
        const issueLabel_team: L.Team | undefined = await _issueLabel.team;
        expect(issueLabel_team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No IssueLabel found - cannot test issueLabel.team query");
      }
    });
  });

  /** Test IssuePriorityValues query */
  describe("IssuePriorityValues", () => {
    /** Test the root model query for IssuePriorityValues */
    it("issuePriorityValues", async () => {
      const issuePriorityValues: L.IssuePriorityValue[] | undefined = await client.issuePriorityValues;
      issuePriorityValues?.map(node => expect(node instanceof L.IssuePriorityValue));
    });
  });

  /** Test all IssueRelation queries */
  describe("IssueRelations", () => {
    let _issueRelation: L.IssueRelation | undefined;
    let _issueRelation_id: string | undefined;

    /** Test the root connection query for the IssueRelation */
    it("issueRelations", async () => {
      const issueRelations: L.IssueRelationConnection | undefined = await client.issueRelations();
      const issueRelation = issueRelations?.nodes?.[0];
      _issueRelation_id = issueRelation?.id;
      expect(issueRelations instanceof L.IssueRelationConnection);
    });

    /** Test the root query for a single IssueRelation */
    it("issueRelation", async () => {
      if (_issueRelation_id) {
        const issueRelation: L.IssueRelation | undefined = await client.issueRelation(_issueRelation_id);
        _issueRelation = issueRelation;
        expect(issueRelation instanceof L.IssueRelation);
      } else {
        console.warn("codegen-doc:print: No first IssueRelation found in connection - cannot test issueRelation query");
      }
    });

    /** Test the issueRelation.issue query for L.Issue */
    it("issueRelation.issue", async () => {
      if (_issueRelation) {
        const issueRelation_issue: L.Issue | undefined = await _issueRelation.issue;
        expect(issueRelation_issue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No IssueRelation found - cannot test issueRelation.issue query");
      }
    });

    /** Test the issueRelation.relatedIssue query for L.Issue */
    it("issueRelation.relatedIssue", async () => {
      if (_issueRelation) {
        const issueRelation_relatedIssue: L.Issue | undefined = await _issueRelation.relatedIssue;
        expect(issueRelation_relatedIssue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No IssueRelation found - cannot test issueRelation.relatedIssue query");
      }
    });
  });

  /** Test IssueVcsBranchSearch query */
  describe("IssueVcsBranchSearch", () => {
    let _issueVcsBranchSearch: L.Issue | undefined;

    /** Test the root model query for IssueVcsBranchSearch */
    it("issueVcsBranchSearch", async () => {
      const issueVcsBranchSearch: L.Issue | undefined = await client.issueVcsBranchSearch("mock-branchName");
      _issueVcsBranchSearch = issueVcsBranchSearch;
      expect(issueVcsBranchSearch instanceof L.Issue);
    });

    /** Test the issueVcsBranchSearch connection query for the Attachment */
    it("issueVcsBranchSearch.attachments", async () => {
      if (_issueVcsBranchSearch) {
        const attachments: L.AttachmentConnection | undefined = await _issueVcsBranchSearch.attachments();
        expect(attachments instanceof L.AttachmentConnection);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.attachments query"
        );
      }
    });

    /** Test the issueVcsBranchSearch connection query for the Issue */
    it("issueVcsBranchSearch.children", async () => {
      if (_issueVcsBranchSearch) {
        const children: L.IssueConnection | undefined = await _issueVcsBranchSearch.children();
        expect(children instanceof L.IssueConnection);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.children query"
        );
      }
    });

    /** Test the issueVcsBranchSearch connection query for the Comment */
    it("issueVcsBranchSearch.comments", async () => {
      if (_issueVcsBranchSearch) {
        const comments: L.CommentConnection | undefined = await _issueVcsBranchSearch.comments();
        expect(comments instanceof L.CommentConnection);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.comments query"
        );
      }
    });

    /** Test the issueVcsBranchSearch connection query for the IssueHistory */
    it("issueVcsBranchSearch.history", async () => {
      if (_issueVcsBranchSearch) {
        const history: L.IssueHistoryConnection | undefined = await _issueVcsBranchSearch.history();
        expect(history instanceof L.IssueHistoryConnection);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.history query"
        );
      }
    });

    /** Test the issueVcsBranchSearch connection query for the IssueRelation */
    it("issueVcsBranchSearch.inverseRelations", async () => {
      if (_issueVcsBranchSearch) {
        const inverseRelations: L.IssueRelationConnection | undefined = await _issueVcsBranchSearch.inverseRelations();
        expect(inverseRelations instanceof L.IssueRelationConnection);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.inverseRelations query"
        );
      }
    });

    /** Test the issueVcsBranchSearch connection query for the IssueLabel */
    it("issueVcsBranchSearch.labels", async () => {
      if (_issueVcsBranchSearch) {
        const labels: L.IssueLabelConnection | undefined = await _issueVcsBranchSearch.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.labels query"
        );
      }
    });

    /** Test the issueVcsBranchSearch connection query for the IssueRelation */
    it("issueVcsBranchSearch.relations", async () => {
      if (_issueVcsBranchSearch) {
        const relations: L.IssueRelationConnection | undefined = await _issueVcsBranchSearch.relations();
        expect(relations instanceof L.IssueRelationConnection);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.relations query"
        );
      }
    });

    /** Test the issueVcsBranchSearch connection query for the User */
    it("issueVcsBranchSearch.subscribers", async () => {
      if (_issueVcsBranchSearch) {
        const subscribers: L.UserConnection | undefined = await _issueVcsBranchSearch.subscribers();
        expect(subscribers instanceof L.UserConnection);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.subscribers query"
        );
      }
    });
  });

  /** Test all Issue queries */
  describe("Issues", () => {
    let _issue: L.Issue | undefined;
    let _issue_id: string | undefined;

    /** Test the root connection query for the Issue */
    it("issues", async () => {
      const issues: L.IssueConnection | undefined = await client.issues();
      const issue = issues?.nodes?.[0];
      _issue_id = issue?.id;
      expect(issues instanceof L.IssueConnection);
    });

    /** Test the root query for a single Issue */
    it("issue", async () => {
      if (_issue_id) {
        const issue: L.Issue | undefined = await client.issue(_issue_id);
        _issue = issue;
        expect(issue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No first Issue found in connection - cannot test issue query");
      }
    });

    /** Test the issue connection query for the Attachment */
    it("issue.attachments", async () => {
      if (_issue) {
        const attachments: L.AttachmentConnection | undefined = await _issue.attachments();
        expect(attachments instanceof L.AttachmentConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.attachments query");
      }
    });

    /** Test the issue connection query for the Issue */
    it("issue.children", async () => {
      if (_issue) {
        const children: L.IssueConnection | undefined = await _issue.children();
        expect(children instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.children query");
      }
    });

    /** Test the issue connection query for the Comment */
    it("issue.comments", async () => {
      if (_issue) {
        const comments: L.CommentConnection | undefined = await _issue.comments();
        expect(comments instanceof L.CommentConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.comments query");
      }
    });

    /** Test the issue connection query for the IssueHistory */
    it("issue.history", async () => {
      if (_issue) {
        const history: L.IssueHistoryConnection | undefined = await _issue.history();
        expect(history instanceof L.IssueHistoryConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.history query");
      }
    });

    /** Test the issue connection query for the IssueRelation */
    it("issue.inverseRelations", async () => {
      if (_issue) {
        const inverseRelations: L.IssueRelationConnection | undefined = await _issue.inverseRelations();
        expect(inverseRelations instanceof L.IssueRelationConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.inverseRelations query");
      }
    });

    /** Test the issue connection query for the IssueLabel */
    it("issue.labels", async () => {
      if (_issue) {
        const labels: L.IssueLabelConnection | undefined = await _issue.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.labels query");
      }
    });

    /** Test the issue connection query for the IssueRelation */
    it("issue.relations", async () => {
      if (_issue) {
        const relations: L.IssueRelationConnection | undefined = await _issue.relations();
        expect(relations instanceof L.IssueRelationConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.relations query");
      }
    });

    /** Test the issue connection query for the User */
    it("issue.subscribers", async () => {
      if (_issue) {
        const subscribers: L.UserConnection | undefined = await _issue.subscribers();
        expect(subscribers instanceof L.UserConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.subscribers query");
      }
    });

    /** Test the issue.assignee query for L.User */
    it("issue.assignee", async () => {
      if (_issue) {
        const issue_assignee: L.User | undefined = await _issue.assignee;
        expect(issue_assignee instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.assignee query");
      }
    });

    /** Test the issue.creator query for L.User */
    it("issue.creator", async () => {
      if (_issue) {
        const issue_creator: L.User | undefined = await _issue.creator;
        expect(issue_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.creator query");
      }
    });

    /** Test the issue.cycle query for L.Cycle */
    it("issue.cycle", async () => {
      if (_issue) {
        const issue_cycle: L.Cycle | undefined = await _issue.cycle;
        expect(issue_cycle instanceof L.Cycle);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.cycle query");
      }
    });

    /** Test the issue.parent query for L.Issue */
    it("issue.parent", async () => {
      if (_issue) {
        const issue_parent: L.Issue | undefined = await _issue.parent;
        expect(issue_parent instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.parent query");
      }
    });

    /** Test the issue.project query for L.Project */
    it("issue.project", async () => {
      if (_issue) {
        const issue_project: L.Project | undefined = await _issue.project;
        expect(issue_project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.project query");
      }
    });

    /** Test the issue.snoozedBy query for L.User */
    it("issue.snoozedBy", async () => {
      if (_issue) {
        const issue_snoozedBy: L.User | undefined = await _issue.snoozedBy;
        expect(issue_snoozedBy instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.snoozedBy query");
      }
    });

    /** Test the issue.state query for L.WorkflowState */
    it("issue.state", async () => {
      if (_issue) {
        const issue_state: L.WorkflowState | undefined = await _issue.state;
        expect(issue_state instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.state query");
      }
    });

    /** Test the issue.team query for L.Team */
    it("issue.team", async () => {
      if (_issue) {
        const issue_team: L.Team | undefined = await _issue.team;
        expect(issue_team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.team query");
      }
    });
  });

  /** Test all NotificationSubscription queries */
  describe("NotificationSubscriptions", () => {
    let _notificationSubscription:
      | L.NotificationSubscription
      | L.ProjectNotificationSubscription
      | L.TeamNotificationSubscription
      | undefined;
    let _notificationSubscription_id: string | undefined;

    /** Test the root connection query for the NotificationSubscription */
    it("notificationSubscriptions", async () => {
      const notificationSubscriptions: L.NotificationSubscriptionConnection | undefined =
        await client.notificationSubscriptions();
      const notificationSubscription = notificationSubscriptions?.nodes?.[0];
      _notificationSubscription_id = notificationSubscription?.id;
      expect(notificationSubscriptions instanceof L.NotificationSubscriptionConnection);
    });

    /** Test the root query for a single NotificationSubscription */
    it("notificationSubscription", async () => {
      if (_notificationSubscription_id) {
        const notificationSubscription:
          | L.NotificationSubscription
          | L.ProjectNotificationSubscription
          | L.TeamNotificationSubscription
          | undefined = await client.notificationSubscription(_notificationSubscription_id);
        _notificationSubscription = notificationSubscription;
        expect(notificationSubscription instanceof L.NotificationSubscription);
      } else {
        console.warn(
          "codegen-doc:print: No first NotificationSubscription found in connection - cannot test notificationSubscription query"
        );
      }
    });

    /** Test the notificationSubscription.project query for L.Project */
    it("notificationSubscription.project", async () => {
      if (_notificationSubscription) {
        const notificationSubscription_project: L.Project | undefined = await _notificationSubscription.project;
        expect(notificationSubscription_project instanceof L.Project);
      } else {
        console.warn(
          "codegen-doc:print: No NotificationSubscription found - cannot test notificationSubscription.project query"
        );
      }
    });

    /** Test the notificationSubscription.team query for L.Team */
    it("notificationSubscription.team", async () => {
      if (_notificationSubscription) {
        const notificationSubscription_team: L.Team | undefined = await _notificationSubscription.team;
        expect(notificationSubscription_team instanceof L.Team);
      } else {
        console.warn(
          "codegen-doc:print: No NotificationSubscription found - cannot test notificationSubscription.team query"
        );
      }
    });

    /** Test the notificationSubscription.user query for L.User */
    it("notificationSubscription.user", async () => {
      if (_notificationSubscription) {
        const notificationSubscription_user: L.User | undefined = await _notificationSubscription.user;
        expect(notificationSubscription_user instanceof L.User);
      } else {
        console.warn(
          "codegen-doc:print: No NotificationSubscription found - cannot test notificationSubscription.user query"
        );
      }
    });
  });

  /** Test all Notification queries */
  describe("Notifications", () => {
    let _notification:
      | L.Notification
      | L.IssueNotification
      | L.OauthClientApprovalNotification
      | L.ProjectNotification
      | undefined;
    let _notification_id: string | undefined;

    /** Test the root connection query for the Notification */
    it("notifications", async () => {
      const notifications: L.NotificationConnection | undefined = await client.notifications();
      const notification = notifications?.nodes?.[0];
      _notification_id = notification?.id;
      expect(notifications instanceof L.NotificationConnection);
    });

    /** Test the root query for a single Notification */
    it("notification", async () => {
      if (_notification_id) {
        const notification:
          | L.Notification
          | L.IssueNotification
          | L.OauthClientApprovalNotification
          | L.ProjectNotification
          | undefined = await client.notification(_notification_id);
        _notification = notification;
        expect(notification instanceof L.Notification);
      } else {
        console.warn("codegen-doc:print: No first Notification found in connection - cannot test notification query");
      }
    });

    /** Test the notification.actor query for L.User */
    it("notification.actor", async () => {
      if (_notification) {
        const notification_actor: L.User | undefined = await _notification.actor;
        expect(notification_actor instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Notification found - cannot test notification.actor query");
      }
    });

    /** Test the notification.user query for L.User */
    it("notification.user", async () => {
      if (_notification) {
        const notification_user: L.User | undefined = await _notification.user;
        expect(notification_user instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Notification found - cannot test notification.user query");
      }
    });
  });

  /** Test Organization query */
  describe("Organization", () => {
    let _organization: L.Organization | undefined;

    /** Test the root model query for Organization */
    it("organization", async () => {
      const organization: L.Organization | undefined = await client.organization;
      _organization = organization;
      expect(organization instanceof L.Organization);
    });

    /** Test the organization connection query for the Integration */
    it("organization.integrations", async () => {
      if (_organization) {
        const integrations: L.IntegrationConnection | undefined = await _organization.integrations();
        expect(integrations instanceof L.IntegrationConnection);
      } else {
        console.warn("codegen-doc:print: No organization found - cannot test _organization.integrations query");
      }
    });

    /** Test the organization connection query for the IssueLabel */
    it("organization.labels", async () => {
      if (_organization) {
        const labels: L.IssueLabelConnection | undefined = await _organization.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        console.warn("codegen-doc:print: No organization found - cannot test _organization.labels query");
      }
    });

    /** Test the organization model query for Organization_Subscription */
    it("organization.subscription", async () => {
      if (_organization) {
        const subscription: L.PaidSubscription | undefined = _organization.subscription;
        expect(subscription instanceof L.PaidSubscription);
      } else {
        console.warn("codegen-doc:print: No organization found - cannot test _organization.subscription query");
      }
    });

    /** Test the organization connection query for the Team */
    it("organization.teams", async () => {
      if (_organization) {
        const teams: L.TeamConnection | undefined = await _organization.teams();
        expect(teams instanceof L.TeamConnection);
      } else {
        console.warn("codegen-doc:print: No organization found - cannot test _organization.teams query");
      }
    });

    /** Test the organization model query for Organization_Templates */
    it("organization.templates", async () => {
      if (_organization) {
        const templates: L.TemplateConnection | undefined = await _organization.templates();
        expect(templates instanceof L.TemplateConnection);
      } else {
        console.warn("codegen-doc:print: No organization found - cannot test _organization.templates query");
      }
    });

    /** Test the organization connection query for the User */
    it("organization.users", async () => {
      if (_organization) {
        const users: L.UserConnection | undefined = await _organization.users();
        expect(users instanceof L.UserConnection);
      } else {
        console.warn("codegen-doc:print: No organization found - cannot test _organization.users query");
      }
    });
  });

  /** Test OrganizationExists query */
  describe("OrganizationExists", () => {
    /** Test the root model query for OrganizationExists */
    it("organizationExists", async () => {
      const organizationExists: L.OrganizationExistsPayload | undefined = await client.organizationExists(
        "mock-urlKey"
      );
      expect(organizationExists instanceof L.OrganizationExistsPayload);
    });
  });

  /** Test OrganizationInviteDetails query */
  describe("OrganizationInviteDetails", () => {
    /** Test the root model query for OrganizationInviteDetails */
    it("organizationInviteDetails", async () => {
      const organizationInviteDetails: L.OrganizationInviteDetailsPayload | undefined =
        await client.organizationInviteDetails("mock-id");
      expect(organizationInviteDetails instanceof L.OrganizationInviteDetailsPayload);
    });
  });

  /** Test all OrganizationInvite queries */
  describe("OrganizationInvites", () => {
    let _organizationInvite: L.OrganizationInvite | undefined;
    let _organizationInvite_id: string | undefined;

    /** Test the root connection query for the OrganizationInvite */
    it("organizationInvites", async () => {
      const organizationInvites: L.OrganizationInviteConnection | undefined = await client.organizationInvites();
      const organizationInvite = organizationInvites?.nodes?.[0];
      _organizationInvite_id = organizationInvite?.id;
      expect(organizationInvites instanceof L.OrganizationInviteConnection);
    });

    /** Test the root query for a single OrganizationInvite */
    it("organizationInvite", async () => {
      if (_organizationInvite_id) {
        const organizationInvite: L.OrganizationInvite | undefined = await client.organizationInvite(
          _organizationInvite_id
        );
        _organizationInvite = organizationInvite;
        expect(organizationInvite instanceof L.OrganizationInvite);
      } else {
        console.warn(
          "codegen-doc:print: No first OrganizationInvite found in connection - cannot test organizationInvite query"
        );
      }
    });

    /** Test the organizationInvite.invitee query for L.User */
    it("organizationInvite.invitee", async () => {
      if (_organizationInvite) {
        const organizationInvite_invitee: L.User | undefined = await _organizationInvite.invitee;
        expect(organizationInvite_invitee instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No OrganizationInvite found - cannot test organizationInvite.invitee query");
      }
    });

    /** Test the organizationInvite.inviter query for L.User */
    it("organizationInvite.inviter", async () => {
      if (_organizationInvite) {
        const organizationInvite_inviter: L.User | undefined = await _organizationInvite.inviter;
        expect(organizationInvite_inviter instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No OrganizationInvite found - cannot test organizationInvite.inviter query");
      }
    });

    /** Test the organizationInvite.organization query for L.Organization */
    it("organizationInvite.organization", async () => {
      if (_organizationInvite) {
        const organizationInvite_organization: L.Organization | undefined = await _organizationInvite.organization;
        expect(organizationInvite_organization instanceof L.Organization);
      } else {
        console.warn(
          "codegen-doc:print: No OrganizationInvite found - cannot test organizationInvite.organization query"
        );
      }
    });
  });

  /** Test all ProjectLink queries */
  describe("ProjectLinks", () => {
    let _projectLink: L.ProjectLink | undefined;
    let _projectLink_id: string | undefined;

    /** Test the root connection query for the ProjectLink */
    it("projectLinks", async () => {
      const projectLinks: L.ProjectLinkConnection | undefined = await client.projectLinks();
      const projectLink = projectLinks?.nodes?.[0];
      _projectLink_id = projectLink?.id;
      expect(projectLinks instanceof L.ProjectLinkConnection);
    });

    /** Test the root query for a single ProjectLink */
    it("projectLink", async () => {
      if (_projectLink_id) {
        const projectLink: L.ProjectLink | undefined = await client.projectLink(_projectLink_id);
        _projectLink = projectLink;
        expect(projectLink instanceof L.ProjectLink);
      } else {
        console.warn("codegen-doc:print: No first ProjectLink found in connection - cannot test projectLink query");
      }
    });

    /** Test the projectLink.creator query for L.User */
    it("projectLink.creator", async () => {
      if (_projectLink) {
        const projectLink_creator: L.User | undefined = await _projectLink.creator;
        expect(projectLink_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No ProjectLink found - cannot test projectLink.creator query");
      }
    });

    /** Test the projectLink.project query for L.Project */
    it("projectLink.project", async () => {
      if (_projectLink) {
        const projectLink_project: L.Project | undefined = await _projectLink.project;
        expect(projectLink_project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No ProjectLink found - cannot test projectLink.project query");
      }
    });
  });

  /** Test all ProjectUpdateInteraction queries */
  describe("ProjectUpdateInteractions", () => {
    let _projectUpdateInteraction: L.ProjectUpdateInteraction | undefined;
    let _projectUpdateInteraction_id: string | undefined;

    /** Test the root connection query for the ProjectUpdateInteraction */
    it("projectUpdateInteractions", async () => {
      const projectUpdateInteractions: L.ProjectUpdateInteractionConnection | undefined =
        await client.projectUpdateInteractions();
      const projectUpdateInteraction = projectUpdateInteractions?.nodes?.[0];
      _projectUpdateInteraction_id = projectUpdateInteraction?.id;
      expect(projectUpdateInteractions instanceof L.ProjectUpdateInteractionConnection);
    });

    /** Test the root query for a single ProjectUpdateInteraction */
    it("projectUpdateInteraction", async () => {
      if (_projectUpdateInteraction_id) {
        const projectUpdateInteraction: L.ProjectUpdateInteraction | undefined = await client.projectUpdateInteraction(
          _projectUpdateInteraction_id
        );
        _projectUpdateInteraction = projectUpdateInteraction;
        expect(projectUpdateInteraction instanceof L.ProjectUpdateInteraction);
      } else {
        console.warn(
          "codegen-doc:print: No first ProjectUpdateInteraction found in connection - cannot test projectUpdateInteraction query"
        );
      }
    });

    /** Test the projectUpdateInteraction.projectUpdate query for L.ProjectUpdate */
    it("projectUpdateInteraction.projectUpdate", async () => {
      if (_projectUpdateInteraction) {
        const projectUpdateInteraction_projectUpdate: L.ProjectUpdate | undefined =
          await _projectUpdateInteraction.projectUpdate;
        expect(projectUpdateInteraction_projectUpdate instanceof L.ProjectUpdate);
      } else {
        console.warn(
          "codegen-doc:print: No ProjectUpdateInteraction found - cannot test projectUpdateInteraction.projectUpdate query"
        );
      }
    });

    /** Test the projectUpdateInteraction.user query for L.User */
    it("projectUpdateInteraction.user", async () => {
      if (_projectUpdateInteraction) {
        const projectUpdateInteraction_user: L.User | undefined = await _projectUpdateInteraction.user;
        expect(projectUpdateInteraction_user instanceof L.User);
      } else {
        console.warn(
          "codegen-doc:print: No ProjectUpdateInteraction found - cannot test projectUpdateInteraction.user query"
        );
      }
    });
  });

  /** Test all ProjectUpdate queries */
  describe("ProjectUpdates", () => {
    let _projectUpdate: L.ProjectUpdate | undefined;
    let _projectUpdate_id: string | undefined;

    /** Test the root connection query for the ProjectUpdate */
    it("projectUpdates", async () => {
      const projectUpdates: L.ProjectUpdateConnection | undefined = await client.projectUpdates();
      const projectUpdate = projectUpdates?.nodes?.[0];
      _projectUpdate_id = projectUpdate?.id;
      expect(projectUpdates instanceof L.ProjectUpdateConnection);
    });

    /** Test the root query for a single ProjectUpdate */
    it("projectUpdate", async () => {
      if (_projectUpdate_id) {
        const projectUpdate: L.ProjectUpdate | undefined = await client.projectUpdate(_projectUpdate_id);
        _projectUpdate = projectUpdate;
        expect(projectUpdate instanceof L.ProjectUpdate);
      } else {
        console.warn("codegen-doc:print: No first ProjectUpdate found in connection - cannot test projectUpdate query");
      }
    });

    /** Test the projectUpdate.project query for L.Project */
    it("projectUpdate.project", async () => {
      if (_projectUpdate) {
        const projectUpdate_project: L.Project | undefined = await _projectUpdate.project;
        expect(projectUpdate_project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No ProjectUpdate found - cannot test projectUpdate.project query");
      }
    });

    /** Test the projectUpdate.user query for L.User */
    it("projectUpdate.user", async () => {
      if (_projectUpdate) {
        const projectUpdate_user: L.User | undefined = await _projectUpdate.user;
        expect(projectUpdate_user instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No ProjectUpdate found - cannot test projectUpdate.user query");
      }
    });
  });

  /** Test all Project queries */
  describe("Projects", () => {
    let _project: L.Project | undefined;
    let _project_id: string | undefined;

    /** Test the root connection query for the Project */
    it("projects", async () => {
      const projects: L.ProjectConnection | undefined = await client.projects();
      const project = projects?.nodes?.[0];
      _project_id = project?.id;
      expect(projects instanceof L.ProjectConnection);
    });

    /** Test the root query for a single Project */
    it("project", async () => {
      if (_project_id) {
        const project: L.Project | undefined = await client.project(_project_id);
        _project = project;
        expect(project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No first Project found in connection - cannot test project query");
      }
    });

    /** Test the project connection query for the Document */
    it("project.documents", async () => {
      if (_project) {
        const documents: L.DocumentConnection | undefined = await _project.documents();
        expect(documents instanceof L.DocumentConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.documents query");
      }
    });

    /** Test the project connection query for the Issue */
    it("project.issues", async () => {
      if (_project) {
        const issues: L.IssueConnection | undefined = await _project.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.issues query");
      }
    });

    /** Test the project connection query for the ProjectLink */
    it("project.links", async () => {
      if (_project) {
        const links: L.ProjectLinkConnection | undefined = await _project.links();
        expect(links instanceof L.ProjectLinkConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.links query");
      }
    });

    /** Test the project connection query for the User */
    it("project.members", async () => {
      if (_project) {
        const members: L.UserConnection | undefined = await _project.members();
        expect(members instanceof L.UserConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.members query");
      }
    });

    /** Test the project connection query for the ProjectUpdate */
    it("project.projectUpdates", async () => {
      if (_project) {
        const projectUpdates: L.ProjectUpdateConnection | undefined = await _project.projectUpdates();
        expect(projectUpdates instanceof L.ProjectUpdateConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.projectUpdates query");
      }
    });

    /** Test the project connection query for the Team */
    it("project.teams", async () => {
      if (_project) {
        const teams: L.TeamConnection | undefined = await _project.teams();
        expect(teams instanceof L.TeamConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.teams query");
      }
    });

    /** Test the project.convertedFromIssue query for L.Issue */
    it("project.convertedFromIssue", async () => {
      if (_project) {
        const project_convertedFromIssue: L.Issue | undefined = await _project.convertedFromIssue;
        expect(project_convertedFromIssue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No Project found - cannot test project.convertedFromIssue query");
      }
    });

    /** Test the project.creator query for L.User */
    it("project.creator", async () => {
      if (_project) {
        const project_creator: L.User | undefined = await _project.creator;
        expect(project_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Project found - cannot test project.creator query");
      }
    });

    /** Test the project.integrationsSettings query for L.IntegrationsSettings */
    it("project.integrationsSettings", async () => {
      if (_project) {
        const project_integrationsSettings: L.IntegrationsSettings | undefined = await _project.integrationsSettings;
        expect(project_integrationsSettings instanceof L.IntegrationsSettings);
      } else {
        console.warn("codegen-doc:print: No Project found - cannot test project.integrationsSettings query");
      }
    });

    /** Test the project.lead query for L.User */
    it("project.lead", async () => {
      if (_project) {
        const project_lead: L.User | undefined = await _project.lead;
        expect(project_lead instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Project found - cannot test project.lead query");
      }
    });
  });

  /** Test PushSubscriptionTest query */
  describe("PushSubscriptionTest", () => {
    /** Test the root model query for PushSubscriptionTest */
    it("pushSubscriptionTest", async () => {
      const pushSubscriptionTest: L.PushSubscriptionTestPayload | undefined = await client.pushSubscriptionTest;
      expect(pushSubscriptionTest instanceof L.PushSubscriptionTestPayload);
    });
  });

  /** Test RateLimitStatus query */
  describe("RateLimitStatus", () => {
    /** Test the root model query for RateLimitStatus */
    it("rateLimitStatus", async () => {
      const rateLimitStatus: L.RateLimitPayload | undefined = await client.rateLimitStatus;
      expect(rateLimitStatus instanceof L.RateLimitPayload);
    });
  });

  /** Test all RoadmapToProject queries */
  describe("RoadmapToProjects", () => {
    let _roadmapToProject: L.RoadmapToProject | undefined;
    let _roadmapToProject_id: string | undefined;

    /** Test the root connection query for the RoadmapToProject */
    it("roadmapToProjects", async () => {
      const roadmapToProjects: L.RoadmapToProjectConnection | undefined = await client.roadmapToProjects();
      const roadmapToProject = roadmapToProjects?.nodes?.[0];
      _roadmapToProject_id = roadmapToProject?.id;
      expect(roadmapToProjects instanceof L.RoadmapToProjectConnection);
    });

    /** Test the root query for a single RoadmapToProject */
    it("roadmapToProject", async () => {
      if (_roadmapToProject_id) {
        const roadmapToProject: L.RoadmapToProject | undefined = await client.roadmapToProject(_roadmapToProject_id);
        _roadmapToProject = roadmapToProject;
        expect(roadmapToProject instanceof L.RoadmapToProject);
      } else {
        console.warn(
          "codegen-doc:print: No first RoadmapToProject found in connection - cannot test roadmapToProject query"
        );
      }
    });

    /** Test the roadmapToProject.project query for L.Project */
    it("roadmapToProject.project", async () => {
      if (_roadmapToProject) {
        const roadmapToProject_project: L.Project | undefined = await _roadmapToProject.project;
        expect(roadmapToProject_project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No RoadmapToProject found - cannot test roadmapToProject.project query");
      }
    });

    /** Test the roadmapToProject.roadmap query for L.Roadmap */
    it("roadmapToProject.roadmap", async () => {
      if (_roadmapToProject) {
        const roadmapToProject_roadmap: L.Roadmap | undefined = await _roadmapToProject.roadmap;
        expect(roadmapToProject_roadmap instanceof L.Roadmap);
      } else {
        console.warn("codegen-doc:print: No RoadmapToProject found - cannot test roadmapToProject.roadmap query");
      }
    });
  });

  /** Test all Roadmap queries */
  describe("Roadmaps", () => {
    let _roadmap: L.Roadmap | undefined;
    let _roadmap_id: string | undefined;

    /** Test the root connection query for the Roadmap */
    it("roadmaps", async () => {
      const roadmaps: L.RoadmapConnection | undefined = await client.roadmaps();
      const roadmap = roadmaps?.nodes?.[0];
      _roadmap_id = roadmap?.id;
      expect(roadmaps instanceof L.RoadmapConnection);
    });

    /** Test the root query for a single Roadmap */
    it("roadmap", async () => {
      if (_roadmap_id) {
        const roadmap: L.Roadmap | undefined = await client.roadmap(_roadmap_id);
        _roadmap = roadmap;
        expect(roadmap instanceof L.Roadmap);
      } else {
        console.warn("codegen-doc:print: No first Roadmap found in connection - cannot test roadmap query");
      }
    });

    /** Test the roadmap connection query for the Project */
    it("roadmap.projects", async () => {
      if (_roadmap) {
        const projects: L.ProjectConnection | undefined = await _roadmap.projects();
        expect(projects instanceof L.ProjectConnection);
      } else {
        console.warn("codegen-doc:print: No roadmap found - cannot test _roadmap.projects query");
      }
    });

    /** Test the roadmap.creator query for L.User */
    it("roadmap.creator", async () => {
      if (_roadmap) {
        const roadmap_creator: L.User | undefined = await _roadmap.creator;
        expect(roadmap_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Roadmap found - cannot test roadmap.creator query");
      }
    });

    /** Test the roadmap.organization query for L.Organization */
    it("roadmap.organization", async () => {
      if (_roadmap) {
        const roadmap_organization: L.Organization | undefined = await _roadmap.organization;
        expect(roadmap_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No Roadmap found - cannot test roadmap.organization query");
      }
    });

    /** Test the roadmap.owner query for L.User */
    it("roadmap.owner", async () => {
      if (_roadmap) {
        const roadmap_owner: L.User | undefined = await _roadmap.owner;
        expect(roadmap_owner instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Roadmap found - cannot test roadmap.owner query");
      }
    });
  });

  /** Test SsoUrlFromEmail query */
  describe("SsoUrlFromEmail", () => {
    /** Test the root model query for SsoUrlFromEmail */
    it("ssoUrlFromEmail", async () => {
      const ssoUrlFromEmail: L.SsoUrlFromEmailResponse | undefined = await client.ssoUrlFromEmail("mock-email");
      expect(ssoUrlFromEmail instanceof L.SsoUrlFromEmailResponse);
    });
  });

  /** Test all TeamMembership queries */
  describe("TeamMemberships", () => {
    let _teamMembership: L.TeamMembership | undefined;
    let _teamMembership_id: string | undefined;

    /** Test the root connection query for the TeamMembership */
    it("teamMemberships", async () => {
      const teamMemberships: L.TeamMembershipConnection | undefined = await client.teamMemberships();
      const teamMembership = teamMemberships?.nodes?.[0];
      _teamMembership_id = teamMembership?.id;
      expect(teamMemberships instanceof L.TeamMembershipConnection);
    });

    /** Test the root query for a single TeamMembership */
    it("teamMembership", async () => {
      if (_teamMembership_id) {
        const teamMembership: L.TeamMembership | undefined = await client.teamMembership(_teamMembership_id);
        _teamMembership = teamMembership;
        expect(teamMembership instanceof L.TeamMembership);
      } else {
        console.warn(
          "codegen-doc:print: No first TeamMembership found in connection - cannot test teamMembership query"
        );
      }
    });

    /** Test the teamMembership.team query for L.Team */
    it("teamMembership.team", async () => {
      if (_teamMembership) {
        const teamMembership_team: L.Team | undefined = await _teamMembership.team;
        expect(teamMembership_team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No TeamMembership found - cannot test teamMembership.team query");
      }
    });

    /** Test the teamMembership.user query for L.User */
    it("teamMembership.user", async () => {
      if (_teamMembership) {
        const teamMembership_user: L.User | undefined = await _teamMembership.user;
        expect(teamMembership_user instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No TeamMembership found - cannot test teamMembership.user query");
      }
    });
  });

  /** Test all Team queries */
  describe("Teams", () => {
    let _team: L.Team | undefined;
    let _team_id: string | undefined;

    /** Test the root connection query for the Team */
    it("teams", async () => {
      const teams: L.TeamConnection | undefined = await client.teams();
      const team = teams?.nodes?.[0];
      _team_id = team?.id;
      expect(teams instanceof L.TeamConnection);
    });

    /** Test the root query for a single Team */
    it("team", async () => {
      if (_team_id) {
        const team: L.Team | undefined = await client.team(_team_id);
        _team = team;
        expect(team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No first Team found in connection - cannot test team query");
      }
    });

    /** Test the team connection query for the Cycle */
    it("team.cycles", async () => {
      if (_team) {
        const cycles: L.CycleConnection | undefined = await _team.cycles();
        expect(cycles instanceof L.CycleConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.cycles query");
      }
    });

    /** Test the team connection query for the Issue */
    it("team.issues", async () => {
      if (_team) {
        const issues: L.IssueConnection | undefined = await _team.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.issues query");
      }
    });

    /** Test the team connection query for the IssueLabel */
    it("team.labels", async () => {
      if (_team) {
        const labels: L.IssueLabelConnection | undefined = await _team.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.labels query");
      }
    });

    /** Test the team connection query for the User */
    it("team.members", async () => {
      if (_team) {
        const members: L.UserConnection | undefined = await _team.members();
        expect(members instanceof L.UserConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.members query");
      }
    });

    /** Test the team connection query for the TeamMembership */
    it("team.memberships", async () => {
      if (_team) {
        const memberships: L.TeamMembershipConnection | undefined = await _team.memberships();
        expect(memberships instanceof L.TeamMembershipConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.memberships query");
      }
    });

    /** Test the team connection query for the Project */
    it("team.projects", async () => {
      if (_team) {
        const projects: L.ProjectConnection | undefined = await _team.projects();
        expect(projects instanceof L.ProjectConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.projects query");
      }
    });

    /** Test the team connection query for the WorkflowState */
    it("team.states", async () => {
      if (_team) {
        const states: L.WorkflowStateConnection | undefined = await _team.states();
        expect(states instanceof L.WorkflowStateConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.states query");
      }
    });

    /** Test the team model query for Team_Templates */
    it("team.templates", async () => {
      if (_team) {
        const templates: L.TemplateConnection | undefined = await _team.templates();
        expect(templates instanceof L.TemplateConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.templates query");
      }
    });

    /** Test the team connection query for the Webhook */
    it("team.webhooks", async () => {
      if (_team) {
        const webhooks: L.WebhookConnection | undefined = await _team.webhooks();
        expect(webhooks instanceof L.WebhookConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.webhooks query");
      }
    });

    /** Test the team.activeCycle query for L.Cycle */
    it("team.activeCycle", async () => {
      if (_team) {
        const team_activeCycle: L.Cycle | undefined = await _team.activeCycle;
        expect(team_activeCycle instanceof L.Cycle);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.activeCycle query");
      }
    });

    /** Test the team.defaultIssueState query for L.WorkflowState */
    it("team.defaultIssueState", async () => {
      if (_team) {
        const team_defaultIssueState: L.WorkflowState | undefined = await _team.defaultIssueState;
        expect(team_defaultIssueState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.defaultIssueState query");
      }
    });

    /** Test the team.defaultTemplateForMembers query for L.Template */
    it("team.defaultTemplateForMembers", async () => {
      if (_team) {
        const team_defaultTemplateForMembers: L.Template | undefined = await _team.defaultTemplateForMembers;
        expect(team_defaultTemplateForMembers instanceof L.Template);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.defaultTemplateForMembers query");
      }
    });

    /** Test the team.defaultTemplateForNonMembers query for L.Template */
    it("team.defaultTemplateForNonMembers", async () => {
      if (_team) {
        const team_defaultTemplateForNonMembers: L.Template | undefined = await _team.defaultTemplateForNonMembers;
        expect(team_defaultTemplateForNonMembers instanceof L.Template);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.defaultTemplateForNonMembers query");
      }
    });

    /** Test the team.draftWorkflowState query for L.WorkflowState */
    it("team.draftWorkflowState", async () => {
      if (_team) {
        const team_draftWorkflowState: L.WorkflowState | undefined = await _team.draftWorkflowState;
        expect(team_draftWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.draftWorkflowState query");
      }
    });

    /** Test the team.integrationsSettings query for L.IntegrationsSettings */
    it("team.integrationsSettings", async () => {
      if (_team) {
        const team_integrationsSettings: L.IntegrationsSettings | undefined = await _team.integrationsSettings;
        expect(team_integrationsSettings instanceof L.IntegrationsSettings);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.integrationsSettings query");
      }
    });

    /** Test the team.markedAsDuplicateWorkflowState query for L.WorkflowState */
    it("team.markedAsDuplicateWorkflowState", async () => {
      if (_team) {
        const team_markedAsDuplicateWorkflowState: L.WorkflowState | undefined =
          await _team.markedAsDuplicateWorkflowState;
        expect(team_markedAsDuplicateWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.markedAsDuplicateWorkflowState query");
      }
    });

    /** Test the team.mergeWorkflowState query for L.WorkflowState */
    it("team.mergeWorkflowState", async () => {
      if (_team) {
        const team_mergeWorkflowState: L.WorkflowState | undefined = await _team.mergeWorkflowState;
        expect(team_mergeWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.mergeWorkflowState query");
      }
    });

    /** Test the team.organization query for L.Organization */
    it("team.organization", async () => {
      if (_team) {
        const team_organization: L.Organization | undefined = await _team.organization;
        expect(team_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.organization query");
      }
    });

    /** Test the team.reviewWorkflowState query for L.WorkflowState */
    it("team.reviewWorkflowState", async () => {
      if (_team) {
        const team_reviewWorkflowState: L.WorkflowState | undefined = await _team.reviewWorkflowState;
        expect(team_reviewWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.reviewWorkflowState query");
      }
    });

    /** Test the team.startWorkflowState query for L.WorkflowState */
    it("team.startWorkflowState", async () => {
      if (_team) {
        const team_startWorkflowState: L.WorkflowState | undefined = await _team.startWorkflowState;
        expect(team_startWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.startWorkflowState query");
      }
    });

    /** Test the team.triageIssueState query for L.WorkflowState */
    it("team.triageIssueState", async () => {
      if (_team) {
        const team_triageIssueState: L.WorkflowState | undefined = await _team.triageIssueState;
        expect(team_triageIssueState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.triageIssueState query");
      }
    });
  });

  /** Test Template query */
  describe("Template", () => {
    /** Test the root model query for Template */
    it("template", async () => {
      const template: L.Template | undefined = await client.template("mock-id");
      expect(template instanceof L.Template);
    });
  });

  /** Test Templates query */
  describe("Templates", () => {
    /** Test the root model query for Templates */
    it("templates", async () => {
      const templates: L.Template[] | undefined = await client.templates;
      templates?.map(node => expect(node instanceof L.Template));
    });
  });

  /** Test UserSettings query */
  describe("UserSettings", () => {
    /** Test the root model query for UserSettings */
    it("userSettings", async () => {
      const userSettings: L.UserSettings | undefined = await client.userSettings;
      expect(userSettings instanceof L.UserSettings);
    });
  });

  /** Test all User queries */
  describe("Users", () => {
    let _user: L.User | undefined;
    let _user_id: string | undefined;

    /** Test the root connection query for the User */
    it("users", async () => {
      const users: L.UserConnection | undefined = await client.users();
      const user = users?.nodes?.[0];
      _user_id = user?.id;
      expect(users instanceof L.UserConnection);
    });

    /** Test the root query for a single User */
    it("user", async () => {
      if (_user_id) {
        const user: L.User | undefined = await client.user(_user_id);
        _user = user;
        expect(user instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No first User found in connection - cannot test user query");
      }
    });

    /** Test the user connection query for the Issue */
    it("user.assignedIssues", async () => {
      if (_user) {
        const assignedIssues: L.IssueConnection | undefined = await _user.assignedIssues();
        expect(assignedIssues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No user found - cannot test _user.assignedIssues query");
      }
    });

    /** Test the user connection query for the Issue */
    it("user.createdIssues", async () => {
      if (_user) {
        const createdIssues: L.IssueConnection | undefined = await _user.createdIssues();
        expect(createdIssues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No user found - cannot test _user.createdIssues query");
      }
    });

    /** Test the user connection query for the TeamMembership */
    it("user.teamMemberships", async () => {
      if (_user) {
        const teamMemberships: L.TeamMembershipConnection | undefined = await _user.teamMemberships();
        expect(teamMemberships instanceof L.TeamMembershipConnection);
      } else {
        console.warn("codegen-doc:print: No user found - cannot test _user.teamMemberships query");
      }
    });

    /** Test the user connection query for the Team */
    it("user.teams", async () => {
      if (_user) {
        const teams: L.TeamConnection | undefined = await _user.teams();
        expect(teams instanceof L.TeamConnection);
      } else {
        console.warn("codegen-doc:print: No user found - cannot test _user.teams query");
      }
    });

    /** Test the user.organization query for L.Organization */
    it("user.organization", async () => {
      if (_user) {
        const user_organization: L.Organization | undefined = await _user.organization;
        expect(user_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No User found - cannot test user.organization query");
      }
    });
  });

  /** Test Viewer query */
  describe("Viewer", () => {
    let _viewer: L.User | undefined;

    /** Test the root model query for Viewer */
    it("viewer", async () => {
      const viewer: L.User | undefined = await client.viewer;
      _viewer = viewer;
      expect(viewer instanceof L.User);
    });

    /** Test the viewer connection query for the Issue */
    it("viewer.assignedIssues", async () => {
      if (_viewer) {
        const assignedIssues: L.IssueConnection | undefined = await _viewer.assignedIssues();
        expect(assignedIssues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No viewer found - cannot test _viewer.assignedIssues query");
      }
    });

    /** Test the viewer connection query for the Issue */
    it("viewer.createdIssues", async () => {
      if (_viewer) {
        const createdIssues: L.IssueConnection | undefined = await _viewer.createdIssues();
        expect(createdIssues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No viewer found - cannot test _viewer.createdIssues query");
      }
    });

    /** Test the viewer connection query for the TeamMembership */
    it("viewer.teamMemberships", async () => {
      if (_viewer) {
        const teamMemberships: L.TeamMembershipConnection | undefined = await _viewer.teamMemberships();
        expect(teamMemberships instanceof L.TeamMembershipConnection);
      } else {
        console.warn("codegen-doc:print: No viewer found - cannot test _viewer.teamMemberships query");
      }
    });

    /** Test the viewer connection query for the Team */
    it("viewer.teams", async () => {
      if (_viewer) {
        const teams: L.TeamConnection | undefined = await _viewer.teams();
        expect(teams instanceof L.TeamConnection);
      } else {
        console.warn("codegen-doc:print: No viewer found - cannot test _viewer.teams query");
      }
    });
  });

  /** Test all Webhook queries */
  describe("Webhooks", () => {
    let _webhook: L.Webhook | undefined;
    let _webhook_id: string | undefined;

    /** Test the root connection query for the Webhook */
    it("webhooks", async () => {
      const webhooks: L.WebhookConnection | undefined = await client.webhooks();
      const webhook = webhooks?.nodes?.[0];
      _webhook_id = webhook?.id;
      expect(webhooks instanceof L.WebhookConnection);
    });

    /** Test the root query for a single Webhook */
    it("webhook", async () => {
      if (_webhook_id) {
        const webhook: L.Webhook | undefined = await client.webhook(_webhook_id);
        _webhook = webhook;
        expect(webhook instanceof L.Webhook);
      } else {
        console.warn("codegen-doc:print: No first Webhook found in connection - cannot test webhook query");
      }
    });

    /** Test the webhook.creator query for L.User */
    it("webhook.creator", async () => {
      if (_webhook) {
        const webhook_creator: L.User | undefined = await _webhook.creator;
        expect(webhook_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Webhook found - cannot test webhook.creator query");
      }
    });

    /** Test the webhook.team query for L.Team */
    it("webhook.team", async () => {
      if (_webhook) {
        const webhook_team: L.Team | undefined = await _webhook.team;
        expect(webhook_team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No Webhook found - cannot test webhook.team query");
      }
    });
  });

  /** Test all WorkflowState queries */
  describe("WorkflowStates", () => {
    let _workflowState: L.WorkflowState | undefined;
    let _workflowState_id: string | undefined;

    /** Test the root connection query for the WorkflowState */
    it("workflowStates", async () => {
      const workflowStates: L.WorkflowStateConnection | undefined = await client.workflowStates();
      const workflowState = workflowStates?.nodes?.[0];
      _workflowState_id = workflowState?.id;
      expect(workflowStates instanceof L.WorkflowStateConnection);
    });

    /** Test the root query for a single WorkflowState */
    it("workflowState", async () => {
      if (_workflowState_id) {
        const workflowState: L.WorkflowState | undefined = await client.workflowState(_workflowState_id);
        _workflowState = workflowState;
        expect(workflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No first WorkflowState found in connection - cannot test workflowState query");
      }
    });

    /** Test the workflowState connection query for the Issue */
    it("workflowState.issues", async () => {
      if (_workflowState) {
        const issues: L.IssueConnection | undefined = await _workflowState.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No workflowState found - cannot test _workflowState.issues query");
      }
    });

    /** Test the workflowState.team query for L.Team */
    it("workflowState.team", async () => {
      if (_workflowState) {
        const workflowState_team: L.Team | undefined = await _workflowState.team;
        expect(workflowState_team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No WorkflowState found - cannot test workflowState.team query");
      }
    });
  });
});
