/* eslint-disable no-console */
import { vi, describe, beforeEach, beforeAll, afterAll, it, expect } from "vitest";
import * as L from "../index.js";
import { startClient, stopClient } from "./test-client.js";

/** Auto generated API tests */
describe("generated", () => {
  /** Initialize Linear client variable */
  let client: L.LinearClient;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  beforeAll(async () => {
    client = await startClient();
  });

  afterAll(() => {
    stopClient();
  });

  /** Test all Team queries */
  describe("AdministrableTeams", () => {
    let _team: L.Team | undefined | null;
    let _team_id: string | undefined | null;

    /** Test the root connection query for the Team */
    it("administrableTeams", async () => {
      const administrableTeams: L.TeamConnection | undefined | null = await client.administrableTeams();
      const team = administrableTeams?.nodes?.[0];
      _team_id = team?.id;
      expect(administrableTeams instanceof L.TeamConnection);
    });

    /** Test the root query for a single Team */
    it("team", async () => {
      if (_team_id) {
        const team: L.Team | undefined | null = await client.team(_team_id);
        _team = team;
        expect(team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No first Team found in connection - cannot test team query");
      }
    });

    /** Test the team connection query for the Cycle */
    it("team.cycles", async () => {
      if (_team) {
        const cycles: L.CycleConnection | undefined | null = await _team.cycles();
        expect(cycles instanceof L.CycleConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.cycles query");
      }
    });

    /** Test the team connection query for the GitAutomationState */
    it("team.gitAutomationStates", async () => {
      if (_team) {
        const gitAutomationStates: L.GitAutomationStateConnection | undefined | null =
          await _team.gitAutomationStates();
        expect(gitAutomationStates instanceof L.GitAutomationStateConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.gitAutomationStates query");
      }
    });

    /** Test the team connection query for the Issue */
    it("team.issues", async () => {
      if (_team) {
        const issues: L.IssueConnection | undefined | null = await _team.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.issues query");
      }
    });

    /** Test the team connection query for the IssueLabel */
    it("team.labels", async () => {
      if (_team) {
        const labels: L.IssueLabelConnection | undefined | null = await _team.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.labels query");
      }
    });

    /** Test the team connection query for the User */
    it("team.members", async () => {
      if (_team) {
        const members: L.UserConnection | undefined | null = await _team.members();
        expect(members instanceof L.UserConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.members query");
      }
    });

    /** Test the team connection query for the TeamMembership */
    it("team.memberships", async () => {
      if (_team) {
        const memberships: L.TeamMembershipConnection | undefined | null = await _team.memberships();
        expect(memberships instanceof L.TeamMembershipConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.memberships query");
      }
    });

    /** Test the team connection query for the Project */
    it("team.projects", async () => {
      if (_team) {
        const projects: L.ProjectConnection | undefined | null = await _team.projects();
        expect(projects instanceof L.ProjectConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.projects query");
      }
    });

    /** Test the team connection query for the WorkflowState */
    it("team.states", async () => {
      if (_team) {
        const states: L.WorkflowStateConnection | undefined | null = await _team.states();
        expect(states instanceof L.WorkflowStateConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.states query");
      }
    });

    /** Test the team connection query for the Template */
    it("team.templates", async () => {
      if (_team) {
        const templates: L.TemplateConnection | undefined | null = await _team.templates();
        expect(templates instanceof L.TemplateConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.templates query");
      }
    });

    /** Test the team connection query for the Webhook */
    it("team.webhooks", async () => {
      if (_team) {
        const webhooks: L.WebhookConnection | undefined | null = await _team.webhooks();
        expect(webhooks instanceof L.WebhookConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.webhooks query");
      }
    });

    /** Test the team.activeCycle query for L.Cycle */
    it("team.activeCycle", async () => {
      if (_team) {
        const team_activeCycle: L.Cycle | undefined | null = await _team.activeCycle;
        expect(team_activeCycle instanceof L.Cycle);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.activeCycle query");
      }
    });

    /** Test the team.defaultIssueState query for L.WorkflowState */
    it("team.defaultIssueState", async () => {
      if (_team) {
        const team_defaultIssueState: L.WorkflowState | undefined | null = await _team.defaultIssueState;
        expect(team_defaultIssueState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.defaultIssueState query");
      }
    });

    /** Test the team.defaultProjectTemplate query for L.Template */
    it("team.defaultProjectTemplate", async () => {
      if (_team) {
        const team_defaultProjectTemplate: L.Template | undefined | null = await _team.defaultProjectTemplate;
        expect(team_defaultProjectTemplate instanceof L.Template);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.defaultProjectTemplate query");
      }
    });

    /** Test the team.defaultTemplateForMembers query for L.Template */
    it("team.defaultTemplateForMembers", async () => {
      if (_team) {
        const team_defaultTemplateForMembers: L.Template | undefined | null = await _team.defaultTemplateForMembers;
        expect(team_defaultTemplateForMembers instanceof L.Template);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.defaultTemplateForMembers query");
      }
    });

    /** Test the team.defaultTemplateForNonMembers query for L.Template */
    it("team.defaultTemplateForNonMembers", async () => {
      if (_team) {
        const team_defaultTemplateForNonMembers: L.Template | undefined | null =
          await _team.defaultTemplateForNonMembers;
        expect(team_defaultTemplateForNonMembers instanceof L.Template);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.defaultTemplateForNonMembers query");
      }
    });

    /** Test the team.draftWorkflowState query for L.WorkflowState */
    it("team.draftWorkflowState", async () => {
      if (_team) {
        const team_draftWorkflowState: L.WorkflowState | undefined | null = await _team.draftWorkflowState;
        expect(team_draftWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.draftWorkflowState query");
      }
    });

    /** Test the team.integrationsSettings query for L.IntegrationsSettings */
    it("team.integrationsSettings", async () => {
      if (_team) {
        const team_integrationsSettings: L.IntegrationsSettings | undefined | null = await _team.integrationsSettings;
        expect(team_integrationsSettings instanceof L.IntegrationsSettings);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.integrationsSettings query");
      }
    });

    /** Test the team.markedAsDuplicateWorkflowState query for L.WorkflowState */
    it("team.markedAsDuplicateWorkflowState", async () => {
      if (_team) {
        const team_markedAsDuplicateWorkflowState: L.WorkflowState | undefined | null =
          await _team.markedAsDuplicateWorkflowState;
        expect(team_markedAsDuplicateWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.markedAsDuplicateWorkflowState query");
      }
    });

    /** Test the team.mergeWorkflowState query for L.WorkflowState */
    it("team.mergeWorkflowState", async () => {
      if (_team) {
        const team_mergeWorkflowState: L.WorkflowState | undefined | null = await _team.mergeWorkflowState;
        expect(team_mergeWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.mergeWorkflowState query");
      }
    });

    /** Test the team.mergeableWorkflowState query for L.WorkflowState */
    it("team.mergeableWorkflowState", async () => {
      if (_team) {
        const team_mergeableWorkflowState: L.WorkflowState | undefined | null = await _team.mergeableWorkflowState;
        expect(team_mergeableWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.mergeableWorkflowState query");
      }
    });

    /** Test the team.organization query for L.Organization */
    it("team.organization", async () => {
      if (_team) {
        const team_organization: L.Organization | undefined | null = await _team.organization;
        expect(team_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.organization query");
      }
    });

    /** Test the team.reviewWorkflowState query for L.WorkflowState */
    it("team.reviewWorkflowState", async () => {
      if (_team) {
        const team_reviewWorkflowState: L.WorkflowState | undefined | null = await _team.reviewWorkflowState;
        expect(team_reviewWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.reviewWorkflowState query");
      }
    });

    /** Test the team.startWorkflowState query for L.WorkflowState */
    it("team.startWorkflowState", async () => {
      if (_team) {
        const team_startWorkflowState: L.WorkflowState | undefined | null = await _team.startWorkflowState;
        expect(team_startWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.startWorkflowState query");
      }
    });

    /** Test the team.triageIssueState query for L.WorkflowState */
    it("team.triageIssueState", async () => {
      if (_team) {
        const team_triageIssueState: L.WorkflowState | undefined | null = await _team.triageIssueState;
        expect(team_triageIssueState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.triageIssueState query");
      }
    });

    /** Test the team.triageResponsibility query for L.TriageResponsibility */
    it("team.triageResponsibility", async () => {
      if (_team) {
        const team_triageResponsibility: L.TriageResponsibility | undefined | null = await _team.triageResponsibility;
        expect(team_triageResponsibility instanceof L.TriageResponsibility);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.triageResponsibility query");
      }
    });
  });

  /** Test all AgentActivity queries */
  describe("AgentActivities", () => {
    let _agentActivity: L.AgentActivity | undefined | null;
    let _agentActivity_id: string | undefined | null;

    /** Test the root connection query for the AgentActivity */
    it("agentActivities", async () => {
      const agentActivities: L.AgentActivityConnection | undefined | null = await client.agentActivities();
      const agentActivity = agentActivities?.nodes?.[0];
      _agentActivity_id = agentActivity?.id;
      expect(agentActivities instanceof L.AgentActivityConnection);
    });

    /** Test the root query for a single AgentActivity */
    it("agentActivity", async () => {
      if (_agentActivity_id) {
        const agentActivity: L.AgentActivity | undefined | null = await client.agentActivity(_agentActivity_id);
        _agentActivity = agentActivity;
        expect(agentActivity instanceof L.AgentActivity);
      } else {
        console.warn("codegen-doc:print: No first AgentActivity found in connection - cannot test agentActivity query");
      }
    });

    /** Test the agentActivity.agentSession query for L.AgentSession */
    it("agentActivity.agentSession", async () => {
      if (_agentActivity) {
        const agentActivity_agentSession: L.AgentSession | undefined | null = await _agentActivity.agentSession;
        expect(agentActivity_agentSession instanceof L.AgentSession);
      } else {
        console.warn("codegen-doc:print: No AgentActivity found - cannot test agentActivity.agentSession query");
      }
    });

    /** Test the agentActivity.sourceComment query for L.Comment */
    it("agentActivity.sourceComment", async () => {
      if (_agentActivity) {
        const agentActivity_sourceComment: L.Comment | undefined | null = await _agentActivity.sourceComment;
        expect(agentActivity_sourceComment instanceof L.Comment);
      } else {
        console.warn("codegen-doc:print: No AgentActivity found - cannot test agentActivity.sourceComment query");
      }
    });

    /** Test the agentActivity.user query for L.User */
    it("agentActivity.user", async () => {
      if (_agentActivity) {
        const agentActivity_user: L.User | undefined | null = await _agentActivity.user;
        expect(agentActivity_user instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No AgentActivity found - cannot test agentActivity.user query");
      }
    });
  });

  /** Test all AgentSession queries */
  describe("AgentSessions", () => {
    let _agentSession: L.AgentSession | undefined | null;
    let _agentSession_id: string | undefined | null;

    /** Test the root connection query for the AgentSession */
    it("agentSessions", async () => {
      const agentSessions: L.AgentSessionConnection | undefined | null = await client.agentSessions();
      const agentSession = agentSessions?.nodes?.[0];
      _agentSession_id = agentSession?.id;
      expect(agentSessions instanceof L.AgentSessionConnection);
    });

    /** Test the root query for a single AgentSession */
    it("agentSession", async () => {
      if (_agentSession_id) {
        const agentSession: L.AgentSession | undefined | null = await client.agentSession(_agentSession_id);
        _agentSession = agentSession;
        expect(agentSession instanceof L.AgentSession);
      } else {
        console.warn("codegen-doc:print: No first AgentSession found in connection - cannot test agentSession query");
      }
    });

    /** Test the agentSession connection query for the AgentActivity */
    it("agentSession.activities", async () => {
      if (_agentSession) {
        const activities: L.AgentActivityConnection | undefined | null = await _agentSession.activities();
        expect(activities instanceof L.AgentActivityConnection);
      } else {
        console.warn("codegen-doc:print: No agentSession found - cannot test _agentSession.activities query");
      }
    });

    /** Test the agentSession.appUser query for L.User */
    it("agentSession.appUser", async () => {
      if (_agentSession) {
        const agentSession_appUser: L.User | undefined | null = await _agentSession.appUser;
        expect(agentSession_appUser instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No AgentSession found - cannot test agentSession.appUser query");
      }
    });

    /** Test the agentSession.comment query for L.Comment */
    it("agentSession.comment", async () => {
      if (_agentSession) {
        const agentSession_comment: L.Comment | undefined | null = await _agentSession.comment;
        expect(agentSession_comment instanceof L.Comment);
      } else {
        console.warn("codegen-doc:print: No AgentSession found - cannot test agentSession.comment query");
      }
    });

    /** Test the agentSession.creator query for L.User */
    it("agentSession.creator", async () => {
      if (_agentSession) {
        const agentSession_creator: L.User | undefined | null = await _agentSession.creator;
        expect(agentSession_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No AgentSession found - cannot test agentSession.creator query");
      }
    });

    /** Test the agentSession.dismissedBy query for L.User */
    it("agentSession.dismissedBy", async () => {
      if (_agentSession) {
        const agentSession_dismissedBy: L.User | undefined | null = await _agentSession.dismissedBy;
        expect(agentSession_dismissedBy instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No AgentSession found - cannot test agentSession.dismissedBy query");
      }
    });

    /** Test the agentSession.issue query for L.Issue */
    it("agentSession.issue", async () => {
      if (_agentSession) {
        const agentSession_issue: L.Issue | undefined | null = await _agentSession.issue;
        expect(agentSession_issue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No AgentSession found - cannot test agentSession.issue query");
      }
    });

    /** Test the agentSession.sourceComment query for L.Comment */
    it("agentSession.sourceComment", async () => {
      if (_agentSession) {
        const agentSession_sourceComment: L.Comment | undefined | null = await _agentSession.sourceComment;
        expect(agentSession_sourceComment instanceof L.Comment);
      } else {
        console.warn("codegen-doc:print: No AgentSession found - cannot test agentSession.sourceComment query");
      }
    });
  });

  /** Test ApplicationInfo query */
  describe("ApplicationInfo", () => {
    /** Test the root model query for ApplicationInfo */
    it("applicationInfo", async () => {
      const applicationInfo: L.Application | undefined | null = await client.applicationInfo("mock-clientId");
      expect(applicationInfo instanceof L.Application);
    });
  });

  /** Test AttachmentIssue query */
  describe("AttachmentIssue", () => {
    let _attachmentIssue: L.Issue | undefined | null;

    /** Test the root model query for AttachmentIssue */
    it("attachmentIssue", async () => {
      const attachmentIssue: L.Issue | undefined | null = await client.attachmentIssue("mock-id");
      _attachmentIssue = attachmentIssue;
      expect(attachmentIssue instanceof L.Issue);
    });

    /** Test the attachmentIssue connection query for the Attachment */
    it("attachmentIssue.attachments", async () => {
      if (_attachmentIssue) {
        const attachments: L.AttachmentConnection | undefined | null = await _attachmentIssue.attachments();
        expect(attachments instanceof L.AttachmentConnection);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.attachments query");
      }
    });

    /** Test the attachmentIssue model query for AttachmentIssue_BotActor */
    it("attachmentIssue.botActor", async () => {
      if (_attachmentIssue) {
        const botActor: L.ActorBot | undefined | null = _attachmentIssue.botActor;
        expect(botActor instanceof L.ActorBot);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.botActor query");
      }
    });

    /** Test the attachmentIssue connection query for the Issue */
    it("attachmentIssue.children", async () => {
      if (_attachmentIssue) {
        const children: L.IssueConnection | undefined | null = await _attachmentIssue.children();
        expect(children instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.children query");
      }
    });

    /** Test the attachmentIssue connection query for the Comment */
    it("attachmentIssue.comments", async () => {
      if (_attachmentIssue) {
        const comments: L.CommentConnection | undefined | null = await _attachmentIssue.comments();
        expect(comments instanceof L.CommentConnection);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.comments query");
      }
    });

    /** Test the attachmentIssue connection query for the Document */
    it("attachmentIssue.documents", async () => {
      if (_attachmentIssue) {
        const documents: L.DocumentConnection | undefined | null = await _attachmentIssue.documents();
        expect(documents instanceof L.DocumentConnection);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.documents query");
      }
    });

    /** Test the attachmentIssue connection query for the Attachment */
    it("attachmentIssue.formerAttachments", async () => {
      if (_attachmentIssue) {
        const formerAttachments: L.AttachmentConnection | undefined | null = await _attachmentIssue.formerAttachments();
        expect(formerAttachments instanceof L.AttachmentConnection);
      } else {
        console.warn(
          "codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.formerAttachments query"
        );
      }
    });

    /** Test the attachmentIssue connection query for the CustomerNeed */
    it("attachmentIssue.formerNeeds", async () => {
      if (_attachmentIssue) {
        const formerNeeds: L.CustomerNeedConnection | undefined | null = await _attachmentIssue.formerNeeds();
        expect(formerNeeds instanceof L.CustomerNeedConnection);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.formerNeeds query");
      }
    });

    /** Test the attachmentIssue connection query for the IssueHistory */
    it("attachmentIssue.history", async () => {
      if (_attachmentIssue) {
        const history: L.IssueHistoryConnection | undefined | null = await _attachmentIssue.history();
        expect(history instanceof L.IssueHistoryConnection);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.history query");
      }
    });

    /** Test the attachmentIssue connection query for the IssueRelation */
    it("attachmentIssue.inverseRelations", async () => {
      if (_attachmentIssue) {
        const inverseRelations: L.IssueRelationConnection | undefined | null =
          await _attachmentIssue.inverseRelations();
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
        const labels: L.IssueLabelConnection | undefined | null = await _attachmentIssue.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.labels query");
      }
    });

    /** Test the attachmentIssue connection query for the CustomerNeed */
    it("attachmentIssue.needs", async () => {
      if (_attachmentIssue) {
        const needs: L.CustomerNeedConnection | undefined | null = await _attachmentIssue.needs();
        expect(needs instanceof L.CustomerNeedConnection);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.needs query");
      }
    });

    /** Test the attachmentIssue connection query for the IssueRelation */
    it("attachmentIssue.relations", async () => {
      if (_attachmentIssue) {
        const relations: L.IssueRelationConnection | undefined | null = await _attachmentIssue.relations();
        expect(relations instanceof L.IssueRelationConnection);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.relations query");
      }
    });

    /** Test the attachmentIssue model query for AttachmentIssue_SharedAccess */
    it("attachmentIssue.sharedAccess", async () => {
      if (_attachmentIssue) {
        const sharedAccess: L.IssueSharedAccess | undefined | null = _attachmentIssue.sharedAccess;
        expect(sharedAccess instanceof L.IssueSharedAccess);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.sharedAccess query");
      }
    });

    /** Test the attachmentIssue connection query for the IssueStateSpan */
    it("attachmentIssue.stateHistory", async () => {
      if (_attachmentIssue) {
        const stateHistory: L.IssueStateSpanConnection | undefined | null = await _attachmentIssue.stateHistory();
        expect(stateHistory instanceof L.IssueStateSpanConnection);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.stateHistory query");
      }
    });

    /** Test the attachmentIssue connection query for the User */
    it("attachmentIssue.subscribers", async () => {
      if (_attachmentIssue) {
        const subscribers: L.UserConnection | undefined | null = await _attachmentIssue.subscribers();
        expect(subscribers instanceof L.UserConnection);
      } else {
        console.warn("codegen-doc:print: No attachmentIssue found - cannot test _attachmentIssue.subscribers query");
      }
    });
  });

  /** Test all Attachment queries */
  describe("Attachments", () => {
    let _attachment: L.Attachment | undefined | null;
    let _attachment_id: string | undefined | null;

    /** Test the root connection query for the Attachment */
    it("attachments", async () => {
      const attachments: L.AttachmentConnection | undefined | null = await client.attachments();
      const attachment = attachments?.nodes?.[0];
      _attachment_id = attachment?.id;
      expect(attachments instanceof L.AttachmentConnection);
    });

    /** Test the root query for a single Attachment */
    it("attachment", async () => {
      if (_attachment_id) {
        const attachment: L.Attachment | undefined | null = await client.attachment(_attachment_id);
        _attachment = attachment;
        expect(attachment instanceof L.Attachment);
      } else {
        console.warn("codegen-doc:print: No first Attachment found in connection - cannot test attachment query");
      }
    });

    /** Test the attachment.creator query for L.User */
    it("attachment.creator", async () => {
      if (_attachment) {
        const attachment_creator: L.User | undefined | null = await _attachment.creator;
        expect(attachment_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Attachment found - cannot test attachment.creator query");
      }
    });

    /** Test the attachment.externalUserCreator query for L.ExternalUser */
    it("attachment.externalUserCreator", async () => {
      if (_attachment) {
        const attachment_externalUserCreator: L.ExternalUser | undefined | null = await _attachment.externalUserCreator;
        expect(attachment_externalUserCreator instanceof L.ExternalUser);
      } else {
        console.warn("codegen-doc:print: No Attachment found - cannot test attachment.externalUserCreator query");
      }
    });

    /** Test the attachment.issue query for L.Issue */
    it("attachment.issue", async () => {
      if (_attachment) {
        const attachment_issue: L.Issue | undefined | null = await _attachment.issue;
        expect(attachment_issue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No Attachment found - cannot test attachment.issue query");
      }
    });

    /** Test the attachment.originalIssue query for L.Issue */
    it("attachment.originalIssue", async () => {
      if (_attachment) {
        const attachment_originalIssue: L.Issue | undefined | null = await _attachment.originalIssue;
        expect(attachment_originalIssue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No Attachment found - cannot test attachment.originalIssue query");
      }
    });
  });

  /** Test all Attachment queries */
  describe("AttachmentsForUrl", () => {
    let _attachment: L.Attachment | undefined | null;
    let _attachment_id: string | undefined | null;

    /** Test the root connection query for the Attachment */
    it("attachmentsForURL", async () => {
      const attachmentsForURL: L.AttachmentConnection | undefined | null = await client.attachmentsForURL("mock-url");
      const attachment = attachmentsForURL?.nodes?.[0];
      _attachment_id = attachment?.id;
      expect(attachmentsForURL instanceof L.AttachmentConnection);
    });

    /** Test the root query for a single Attachment */
    it("attachment", async () => {
      if (_attachment_id) {
        const attachment: L.Attachment | undefined | null = await client.attachment(_attachment_id);
        _attachment = attachment;
        expect(attachment instanceof L.Attachment);
      } else {
        console.warn("codegen-doc:print: No first Attachment found in connection - cannot test attachment query");
      }
    });

    /** Test the attachment.creator query for L.User */
    it("attachment.creator", async () => {
      if (_attachment) {
        const attachment_creator: L.User | undefined | null = await _attachment.creator;
        expect(attachment_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Attachment found - cannot test attachment.creator query");
      }
    });

    /** Test the attachment.externalUserCreator query for L.ExternalUser */
    it("attachment.externalUserCreator", async () => {
      if (_attachment) {
        const attachment_externalUserCreator: L.ExternalUser | undefined | null = await _attachment.externalUserCreator;
        expect(attachment_externalUserCreator instanceof L.ExternalUser);
      } else {
        console.warn("codegen-doc:print: No Attachment found - cannot test attachment.externalUserCreator query");
      }
    });

    /** Test the attachment.issue query for L.Issue */
    it("attachment.issue", async () => {
      if (_attachment) {
        const attachment_issue: L.Issue | undefined | null = await _attachment.issue;
        expect(attachment_issue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No Attachment found - cannot test attachment.issue query");
      }
    });

    /** Test the attachment.originalIssue query for L.Issue */
    it("attachment.originalIssue", async () => {
      if (_attachment) {
        const attachment_originalIssue: L.Issue | undefined | null = await _attachment.originalIssue;
        expect(attachment_originalIssue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No Attachment found - cannot test attachment.originalIssue query");
      }
    });
  });

  /** Test all AuditEntry queries */
  describe("AuditEntries", () => {
    /** Test the root connection query for the AuditEntry */
    it("auditEntries", async () => {
      const auditEntries: L.AuditEntryConnection | undefined | null = await client.auditEntries();
      expect(auditEntries instanceof L.AuditEntryConnection);
    });
  });

  /** Test AuditEntryTypes query */
  describe("AuditEntryTypes", () => {
    /** Test the root model query for AuditEntryTypes */
    it("auditEntryTypes", async () => {
      const auditEntryTypes: L.AuditEntryType[] | undefined | null = await client.auditEntryTypes;
      auditEntryTypes?.map(node => expect(node instanceof L.AuditEntryType));
    });
  });

  /** Test AuthenticationSessions query */
  describe("AuthenticationSessions", () => {
    /** Test the root model query for AuthenticationSessions */
    it("authenticationSessions", async () => {
      const authenticationSessions: L.AuthenticationSessionResponse[] | undefined | null =
        await client.authenticationSessions;
      authenticationSessions?.map(node => expect(node instanceof L.AuthenticationSessionResponse));
    });
  });

  /** Test AvailableUsers query */
  describe("AvailableUsers", () => {
    /** Test the root model query for AvailableUsers */
    it("availableUsers", async () => {
      const availableUsers: L.AuthResolverResponse | undefined | null = await client.availableUsers;
      expect(availableUsers instanceof L.AuthResolverResponse);
    });
  });

  /** Test all Comment queries */
  describe("Comments", () => {
    let _comment: L.Comment | undefined | null;
    let _comment_id: string | undefined | null;

    /** Test the root connection query for the Comment */
    it("comments", async () => {
      const comments: L.CommentConnection | undefined | null = await client.comments();
      const comment = comments?.nodes?.[0];
      _comment_id = comment?.id;
      expect(comments instanceof L.CommentConnection);
    });

    /** Test the root query for a single Comment */
    it("comment", async () => {
      if (_comment_id) {
        const comment: L.Comment | undefined | null = await client.comment({ id: _comment_id });
        _comment = comment;
        expect(comment instanceof L.Comment);
      } else {
        console.warn("codegen-doc:print: No first Comment found in connection - cannot test comment query");
      }
    });

    /** Test the comment model query for Comment_BotActor */
    it("comment.botActor", async () => {
      if (_comment) {
        const botActor: L.ActorBot | undefined | null = _comment.botActor;
        expect(botActor instanceof L.ActorBot);
      } else {
        console.warn("codegen-doc:print: No comment found - cannot test _comment.botActor query");
      }
    });

    /** Test the comment connection query for the Comment */
    it("comment.children", async () => {
      if (_comment) {
        const children: L.CommentConnection | undefined | null = await _comment.children();
        expect(children instanceof L.CommentConnection);
      } else {
        console.warn("codegen-doc:print: No comment found - cannot test _comment.children query");
      }
    });

    /** Test the comment connection query for the Issue */
    it("comment.createdIssues", async () => {
      if (_comment) {
        const createdIssues: L.IssueConnection | undefined | null = await _comment.createdIssues();
        expect(createdIssues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No comment found - cannot test _comment.createdIssues query");
      }
    });

    let _documentContent: L.DocumentContent | undefined | null;

    /** Test the comment model query for Comment_DocumentContent */
    it("comment.documentContent", async () => {
      if (_comment) {
        const documentContent: L.DocumentContent | undefined | null = _comment.documentContent;
        _documentContent = documentContent;
        expect(documentContent instanceof L.DocumentContent);
      } else {
        console.warn("codegen-doc:print: No comment found - cannot test _comment.documentContent query");
      }
    });

    /** Test the comment_documentContent model query for Comment_DocumentContent_AiPromptRules */
    it("comment_documentContent.aiPromptRules", async () => {
      if (_documentContent) {
        const aiPromptRules: L.AiPromptRules | undefined | null = _documentContent.aiPromptRules;
        expect(aiPromptRules instanceof L.AiPromptRules);
      } else {
        console.warn("codegen-doc:print: No documentContent found - cannot test _documentContent.aiPromptRules query");
      }
    });

    /** Test the comment_documentContent model query for Comment_DocumentContent_WelcomeMessage */
    it("comment_documentContent.welcomeMessage", async () => {
      if (_documentContent) {
        const welcomeMessage: L.WelcomeMessage | undefined | null = _documentContent.welcomeMessage;
        expect(welcomeMessage instanceof L.WelcomeMessage);
      } else {
        console.warn("codegen-doc:print: No documentContent found - cannot test _documentContent.welcomeMessage query");
      }
    });

    /** Test the comment model query for Comment_ExternalThread */
    it("comment.externalThread", async () => {
      if (_comment) {
        const externalThread: L.SyncedExternalThread | undefined | null = _comment.externalThread;
        expect(externalThread instanceof L.SyncedExternalThread);
      } else {
        console.warn("codegen-doc:print: No comment found - cannot test _comment.externalThread query");
      }
    });

    /** Test the comment.agentSession query for L.AgentSession */
    it("comment.agentSession", async () => {
      if (_comment) {
        const comment_agentSession: L.AgentSession | undefined | null = await _comment.agentSession;
        expect(comment_agentSession instanceof L.AgentSession);
      } else {
        console.warn("codegen-doc:print: No Comment found - cannot test comment.agentSession query");
      }
    });

    /** Test the comment.externalUser query for L.ExternalUser */
    it("comment.externalUser", async () => {
      if (_comment) {
        const comment_externalUser: L.ExternalUser | undefined | null = await _comment.externalUser;
        expect(comment_externalUser instanceof L.ExternalUser);
      } else {
        console.warn("codegen-doc:print: No Comment found - cannot test comment.externalUser query");
      }
    });

    /** Test the comment.initiativeUpdate query for L.InitiativeUpdate */
    it("comment.initiativeUpdate", async () => {
      if (_comment) {
        const comment_initiativeUpdate: L.InitiativeUpdate | undefined | null = await _comment.initiativeUpdate;
        expect(comment_initiativeUpdate instanceof L.InitiativeUpdate);
      } else {
        console.warn("codegen-doc:print: No Comment found - cannot test comment.initiativeUpdate query");
      }
    });

    /** Test the comment.issue query for L.Issue */
    it("comment.issue", async () => {
      if (_comment) {
        const comment_issue: L.Issue | undefined | null = await _comment.issue;
        expect(comment_issue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No Comment found - cannot test comment.issue query");
      }
    });

    /** Test the comment.parent query for L.Comment */
    it("comment.parent", async () => {
      if (_comment) {
        const comment_parent: L.Comment | undefined | null = await _comment.parent;
        expect(comment_parent instanceof L.Comment);
      } else {
        console.warn("codegen-doc:print: No Comment found - cannot test comment.parent query");
      }
    });

    /** Test the comment.projectUpdate query for L.ProjectUpdate */
    it("comment.projectUpdate", async () => {
      if (_comment) {
        const comment_projectUpdate: L.ProjectUpdate | undefined | null = await _comment.projectUpdate;
        expect(comment_projectUpdate instanceof L.ProjectUpdate);
      } else {
        console.warn("codegen-doc:print: No Comment found - cannot test comment.projectUpdate query");
      }
    });

    /** Test the comment.resolvingComment query for L.Comment */
    it("comment.resolvingComment", async () => {
      if (_comment) {
        const comment_resolvingComment: L.Comment | undefined | null = await _comment.resolvingComment;
        expect(comment_resolvingComment instanceof L.Comment);
      } else {
        console.warn("codegen-doc:print: No Comment found - cannot test comment.resolvingComment query");
      }
    });

    /** Test the comment.resolvingUser query for L.User */
    it("comment.resolvingUser", async () => {
      if (_comment) {
        const comment_resolvingUser: L.User | undefined | null = await _comment.resolvingUser;
        expect(comment_resolvingUser instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Comment found - cannot test comment.resolvingUser query");
      }
    });

    /** Test the comment.user query for L.User */
    it("comment.user", async () => {
      if (_comment) {
        const comment_user: L.User | undefined | null = await _comment.user;
        expect(comment_user instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Comment found - cannot test comment.user query");
      }
    });
  });

  /** Test CustomViewHasSubscribers query */
  describe("CustomViewHasSubscribers", () => {
    /** Test the root model query for CustomViewHasSubscribers */
    it("customViewHasSubscribers", async () => {
      const customViewHasSubscribers: L.CustomViewHasSubscribersPayload | undefined | null =
        await client.customViewHasSubscribers("mock-id");
      expect(customViewHasSubscribers instanceof L.CustomViewHasSubscribersPayload);
    });
  });

  /** Test all CustomView queries */
  describe("CustomViews", () => {
    let _customView: L.CustomView | undefined | null;
    let _customView_id: string | undefined | null;

    /** Test the root connection query for the CustomView */
    it("customViews", async () => {
      const customViews: L.CustomViewConnection | undefined | null = await client.customViews();
      const customView = customViews?.nodes?.[0];
      _customView_id = customView?.id;
      expect(customViews instanceof L.CustomViewConnection);
    });

    /** Test the root query for a single CustomView */
    it("customView", async () => {
      if (_customView_id) {
        const customView: L.CustomView | undefined | null = await client.customView(_customView_id);
        _customView = customView;
        expect(customView instanceof L.CustomView);
      } else {
        console.warn("codegen-doc:print: No first CustomView found in connection - cannot test customView query");
      }
    });

    /** Test the customView connection query for the Initiative */
    it("customView.initiatives", async () => {
      if (_customView) {
        const initiatives: L.InitiativeConnection | undefined | null = await _customView.initiatives();
        expect(initiatives instanceof L.InitiativeConnection);
      } else {
        console.warn("codegen-doc:print: No customView found - cannot test _customView.initiatives query");
      }
    });

    /** Test the customView connection query for the Issue */
    it("customView.issues", async () => {
      if (_customView) {
        const issues: L.IssueConnection | undefined | null = await _customView.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No customView found - cannot test _customView.issues query");
      }
    });

    let _organizationViewPreferences: L.ViewPreferences | undefined | null;

    /** Test the customView model query for CustomView_OrganizationViewPreferences */
    it("customView.organizationViewPreferences", async () => {
      if (_customView) {
        const organizationViewPreferences: L.ViewPreferences | undefined | null =
          _customView.organizationViewPreferences;
        _organizationViewPreferences = organizationViewPreferences;
        expect(organizationViewPreferences instanceof L.ViewPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No customView found - cannot test _customView.organizationViewPreferences query"
        );
      }
    });

    /** Test the customView_organizationViewPreferences model query for CustomView_OrganizationViewPreferences_Preferences */
    it("customView_organizationViewPreferences.preferences", async () => {
      if (_organizationViewPreferences) {
        const preferences: L.ViewPreferencesValues | undefined | null = _organizationViewPreferences.preferences;
        expect(preferences instanceof L.ViewPreferencesValues);
      } else {
        console.warn(
          "codegen-doc:print: No organizationViewPreferences found - cannot test _organizationViewPreferences.preferences query"
        );
      }
    });

    /** Test the customView connection query for the Project */
    it("customView.projects", async () => {
      if (_customView) {
        const projects: L.ProjectConnection | undefined | null = await _customView.projects();
        expect(projects instanceof L.ProjectConnection);
      } else {
        console.warn("codegen-doc:print: No customView found - cannot test _customView.projects query");
      }
    });

    let _userViewPreferences: L.ViewPreferences | undefined | null;

    /** Test the customView model query for CustomView_UserViewPreferences */
    it("customView.userViewPreferences", async () => {
      if (_customView) {
        const userViewPreferences: L.ViewPreferences | undefined | null = _customView.userViewPreferences;
        _userViewPreferences = userViewPreferences;
        expect(userViewPreferences instanceof L.ViewPreferences);
      } else {
        console.warn("codegen-doc:print: No customView found - cannot test _customView.userViewPreferences query");
      }
    });

    /** Test the customView_userViewPreferences model query for CustomView_UserViewPreferences_Preferences */
    it("customView_userViewPreferences.preferences", async () => {
      if (_userViewPreferences) {
        const preferences: L.ViewPreferencesValues | undefined | null = _userViewPreferences.preferences;
        expect(preferences instanceof L.ViewPreferencesValues);
      } else {
        console.warn(
          "codegen-doc:print: No userViewPreferences found - cannot test _userViewPreferences.preferences query"
        );
      }
    });

    /** Test the customView model query for CustomView_ViewPreferencesValues */
    it("customView.viewPreferencesValues", async () => {
      if (_customView) {
        const viewPreferencesValues: L.ViewPreferencesValues | undefined | null = _customView.viewPreferencesValues;
        expect(viewPreferencesValues instanceof L.ViewPreferencesValues);
      } else {
        console.warn("codegen-doc:print: No customView found - cannot test _customView.viewPreferencesValues query");
      }
    });

    /** Test the customView.creator query for L.User */
    it("customView.creator", async () => {
      if (_customView) {
        const customView_creator: L.User | undefined | null = await _customView.creator;
        expect(customView_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No CustomView found - cannot test customView.creator query");
      }
    });

    /** Test the customView.organization query for L.Organization */
    it("customView.organization", async () => {
      if (_customView) {
        const customView_organization: L.Organization | undefined | null = await _customView.organization;
        expect(customView_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No CustomView found - cannot test customView.organization query");
      }
    });

    /** Test the customView.owner query for L.User */
    it("customView.owner", async () => {
      if (_customView) {
        const customView_owner: L.User | undefined | null = await _customView.owner;
        expect(customView_owner instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No CustomView found - cannot test customView.owner query");
      }
    });

    /** Test the customView.team query for L.Team */
    it("customView.team", async () => {
      if (_customView) {
        const customView_team: L.Team | undefined | null = await _customView.team;
        expect(customView_team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No CustomView found - cannot test customView.team query");
      }
    });

    /** Test the customView.updatedBy query for L.User */
    it("customView.updatedBy", async () => {
      if (_customView) {
        const customView_updatedBy: L.User | undefined | null = await _customView.updatedBy;
        expect(customView_updatedBy instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No CustomView found - cannot test customView.updatedBy query");
      }
    });
  });

  /** Test all CustomerNeed queries */
  describe("CustomerNeeds", () => {
    let _customerNeed: L.CustomerNeed | undefined | null;
    let _customerNeed_id: string | undefined | null;

    /** Test the root connection query for the CustomerNeed */
    it("customerNeeds", async () => {
      const customerNeeds: L.CustomerNeedConnection | undefined | null = await client.customerNeeds();
      const customerNeed = customerNeeds?.nodes?.[0];
      _customerNeed_id = customerNeed?.id;
      expect(customerNeeds instanceof L.CustomerNeedConnection);
    });

    /** Test the root query for a single CustomerNeed */
    it("customerNeed", async () => {
      if (_customerNeed_id) {
        const customerNeed: L.CustomerNeed | undefined | null = await client.customerNeed({ id: _customerNeed_id });
        _customerNeed = customerNeed;
        expect(customerNeed instanceof L.CustomerNeed);
      } else {
        console.warn("codegen-doc:print: No first CustomerNeed found in connection - cannot test customerNeed query");
      }
    });

    /** Test the customerNeed model query for CustomerNeed_ProjectAttachment */
    it("customerNeed.projectAttachment", async () => {
      if (_customerNeed) {
        const projectAttachment: L.ProjectAttachment | undefined | null = _customerNeed.projectAttachment;
        expect(projectAttachment instanceof L.ProjectAttachment);
      } else {
        console.warn("codegen-doc:print: No customerNeed found - cannot test _customerNeed.projectAttachment query");
      }
    });

    /** Test the customerNeed.attachment query for L.Attachment */
    it("customerNeed.attachment", async () => {
      if (_customerNeed) {
        const customerNeed_attachment: L.Attachment | undefined | null = await _customerNeed.attachment;
        expect(customerNeed_attachment instanceof L.Attachment);
      } else {
        console.warn("codegen-doc:print: No CustomerNeed found - cannot test customerNeed.attachment query");
      }
    });

    /** Test the customerNeed.comment query for L.Comment */
    it("customerNeed.comment", async () => {
      if (_customerNeed) {
        const customerNeed_comment: L.Comment | undefined | null = await _customerNeed.comment;
        expect(customerNeed_comment instanceof L.Comment);
      } else {
        console.warn("codegen-doc:print: No CustomerNeed found - cannot test customerNeed.comment query");
      }
    });

    /** Test the customerNeed.creator query for L.User */
    it("customerNeed.creator", async () => {
      if (_customerNeed) {
        const customerNeed_creator: L.User | undefined | null = await _customerNeed.creator;
        expect(customerNeed_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No CustomerNeed found - cannot test customerNeed.creator query");
      }
    });

    /** Test the customerNeed.customer query for L.Customer */
    it("customerNeed.customer", async () => {
      if (_customerNeed) {
        const customerNeed_customer: L.Customer | undefined | null = await _customerNeed.customer;
        expect(customerNeed_customer instanceof L.Customer);
      } else {
        console.warn("codegen-doc:print: No CustomerNeed found - cannot test customerNeed.customer query");
      }
    });

    /** Test the customerNeed.issue query for L.Issue */
    it("customerNeed.issue", async () => {
      if (_customerNeed) {
        const customerNeed_issue: L.Issue | undefined | null = await _customerNeed.issue;
        expect(customerNeed_issue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No CustomerNeed found - cannot test customerNeed.issue query");
      }
    });

    /** Test the customerNeed.originalIssue query for L.Issue */
    it("customerNeed.originalIssue", async () => {
      if (_customerNeed) {
        const customerNeed_originalIssue: L.Issue | undefined | null = await _customerNeed.originalIssue;
        expect(customerNeed_originalIssue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No CustomerNeed found - cannot test customerNeed.originalIssue query");
      }
    });

    /** Test the customerNeed.project query for L.Project */
    it("customerNeed.project", async () => {
      if (_customerNeed) {
        const customerNeed_project: L.Project | undefined | null = await _customerNeed.project;
        expect(customerNeed_project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No CustomerNeed found - cannot test customerNeed.project query");
      }
    });
  });

  /** Test all CustomerStatus queries */
  describe("CustomerStatuses", () => {
    let _customerStatus: L.CustomerStatus | undefined | null;
    let _customerStatus_id: string | undefined | null;

    /** Test the root connection query for the CustomerStatus */
    it("customerStatuses", async () => {
      const customerStatuses: L.CustomerStatusConnection | undefined | null = await client.customerStatuses();
      const customerStatus = customerStatuses?.nodes?.[0];
      _customerStatus_id = customerStatus?.id;
      expect(customerStatuses instanceof L.CustomerStatusConnection);
    });

    /** Test the root query for a single CustomerStatus */
    it("customerStatus", async () => {
      if (_customerStatus_id) {
        const customerStatus: L.CustomerStatus | undefined | null = await client.customerStatus(_customerStatus_id);
        expect(customerStatus instanceof L.CustomerStatus);
      } else {
        console.warn(
          "codegen-doc:print: No first CustomerStatus found in connection - cannot test customerStatus query"
        );
      }
    });
  });

  /** Test all CustomerTier queries */
  describe("CustomerTiers", () => {
    let _customerTier: L.CustomerTier | undefined | null;
    let _customerTier_id: string | undefined | null;

    /** Test the root connection query for the CustomerTier */
    it("customerTiers", async () => {
      const customerTiers: L.CustomerTierConnection | undefined | null = await client.customerTiers();
      const customerTier = customerTiers?.nodes?.[0];
      _customerTier_id = customerTier?.id;
      expect(customerTiers instanceof L.CustomerTierConnection);
    });

    /** Test the root query for a single CustomerTier */
    it("customerTier", async () => {
      if (_customerTier_id) {
        const customerTier: L.CustomerTier | undefined | null = await client.customerTier(_customerTier_id);
        expect(customerTier instanceof L.CustomerTier);
      } else {
        console.warn("codegen-doc:print: No first CustomerTier found in connection - cannot test customerTier query");
      }
    });
  });

  /** Test all Customer queries */
  describe("Customers", () => {
    let _customer: L.Customer | undefined | null;
    let _customer_id: string | undefined | null;

    /** Test the root connection query for the Customer */
    it("customers", async () => {
      const customers: L.CustomerConnection | undefined | null = await client.customers();
      const customer = customers?.nodes?.[0];
      _customer_id = customer?.id;
      expect(customers instanceof L.CustomerConnection);
    });

    /** Test the root query for a single Customer */
    it("customer", async () => {
      if (_customer_id) {
        const customer: L.Customer | undefined | null = await client.customer(_customer_id);
        _customer = customer;
        expect(customer instanceof L.Customer);
      } else {
        console.warn("codegen-doc:print: No first Customer found in connection - cannot test customer query");
      }
    });

    /** Test the customer.integration query for L.Integration */
    it("customer.integration", async () => {
      if (_customer) {
        const customer_integration: L.Integration | undefined | null = await _customer.integration;
        expect(customer_integration instanceof L.Integration);
      } else {
        console.warn("codegen-doc:print: No Customer found - cannot test customer.integration query");
      }
    });

    /** Test the customer.owner query for L.User */
    it("customer.owner", async () => {
      if (_customer) {
        const customer_owner: L.User | undefined | null = await _customer.owner;
        expect(customer_owner instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Customer found - cannot test customer.owner query");
      }
    });

    /** Test the customer.status query for L.CustomerStatus */
    it("customer.status", async () => {
      if (_customer) {
        const customer_status: L.CustomerStatus | undefined | null = await _customer.status;
        expect(customer_status instanceof L.CustomerStatus);
      } else {
        console.warn("codegen-doc:print: No Customer found - cannot test customer.status query");
      }
    });

    /** Test the customer.tier query for L.CustomerTier */
    it("customer.tier", async () => {
      if (_customer) {
        const customer_tier: L.CustomerTier | undefined | null = await _customer.tier;
        expect(customer_tier instanceof L.CustomerTier);
      } else {
        console.warn("codegen-doc:print: No Customer found - cannot test customer.tier query");
      }
    });
  });

  /** Test all Cycle queries */
  describe("Cycles", () => {
    let _cycle: L.Cycle | undefined | null;
    let _cycle_id: string | undefined | null;

    /** Test the root connection query for the Cycle */
    it("cycles", async () => {
      const cycles: L.CycleConnection | undefined | null = await client.cycles();
      const cycle = cycles?.nodes?.[0];
      _cycle_id = cycle?.id;
      expect(cycles instanceof L.CycleConnection);
    });

    /** Test the root query for a single Cycle */
    it("cycle", async () => {
      if (_cycle_id) {
        const cycle: L.Cycle | undefined | null = await client.cycle(_cycle_id);
        _cycle = cycle;
        expect(cycle instanceof L.Cycle);
      } else {
        console.warn("codegen-doc:print: No first Cycle found in connection - cannot test cycle query");
      }
    });

    /** Test the cycle connection query for the Issue */
    it("cycle.issues", async () => {
      if (_cycle) {
        const issues: L.IssueConnection | undefined | null = await _cycle.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No cycle found - cannot test _cycle.issues query");
      }
    });

    /** Test the cycle connection query for the Issue */
    it("cycle.uncompletedIssuesUponClose", async () => {
      if (_cycle) {
        const uncompletedIssuesUponClose: L.IssueConnection | undefined | null =
          await _cycle.uncompletedIssuesUponClose();
        expect(uncompletedIssuesUponClose instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No cycle found - cannot test _cycle.uncompletedIssuesUponClose query");
      }
    });

    /** Test the cycle.inheritedFrom query for L.Cycle */
    it("cycle.inheritedFrom", async () => {
      if (_cycle) {
        const cycle_inheritedFrom: L.Cycle | undefined | null = await _cycle.inheritedFrom;
        expect(cycle_inheritedFrom instanceof L.Cycle);
      } else {
        console.warn("codegen-doc:print: No Cycle found - cannot test cycle.inheritedFrom query");
      }
    });

    /** Test the cycle.team query for L.Team */
    it("cycle.team", async () => {
      if (_cycle) {
        const cycle_team: L.Team | undefined | null = await _cycle.team;
        expect(cycle_team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No Cycle found - cannot test cycle.team query");
      }
    });
  });

  /** Test DocumentContentHistory query */
  describe("DocumentContentHistory", () => {
    /** Test the root model query for DocumentContentHistory */
    it("documentContentHistory", async () => {
      const documentContentHistory: L.DocumentContentHistoryPayload | undefined | null =
        await client.documentContentHistory("mock-id");
      expect(documentContentHistory instanceof L.DocumentContentHistoryPayload);
    });
  });

  /** Test all Document queries */
  describe("Documents", () => {
    let _document: L.Document | undefined | null;
    let _document_id: string | undefined | null;

    /** Test the root connection query for the Document */
    it("documents", async () => {
      const documents: L.DocumentConnection | undefined | null = await client.documents();
      const document = documents?.nodes?.[0];
      _document_id = document?.id;
      expect(documents instanceof L.DocumentConnection);
    });

    /** Test the root query for a single Document */
    it("document", async () => {
      if (_document_id) {
        const document: L.Document | undefined | null = await client.document(_document_id);
        _document = document;
        expect(document instanceof L.Document);
      } else {
        console.warn("codegen-doc:print: No first Document found in connection - cannot test document query");
      }
    });

    /** Test the document connection query for the Comment */
    it("document.comments", async () => {
      if (_document) {
        const comments: L.CommentConnection | undefined | null = await _document.comments();
        expect(comments instanceof L.CommentConnection);
      } else {
        console.warn("codegen-doc:print: No document found - cannot test _document.comments query");
      }
    });

    /** Test the document.creator query for L.User */
    it("document.creator", async () => {
      if (_document) {
        const document_creator: L.User | undefined | null = await _document.creator;
        expect(document_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Document found - cannot test document.creator query");
      }
    });

    /** Test the document.initiative query for L.Initiative */
    it("document.initiative", async () => {
      if (_document) {
        const document_initiative: L.Initiative | undefined | null = await _document.initiative;
        expect(document_initiative instanceof L.Initiative);
      } else {
        console.warn("codegen-doc:print: No Document found - cannot test document.initiative query");
      }
    });

    /** Test the document.issue query for L.Issue */
    it("document.issue", async () => {
      if (_document) {
        const document_issue: L.Issue | undefined | null = await _document.issue;
        expect(document_issue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No Document found - cannot test document.issue query");
      }
    });

    /** Test the document.lastAppliedTemplate query for L.Template */
    it("document.lastAppliedTemplate", async () => {
      if (_document) {
        const document_lastAppliedTemplate: L.Template | undefined | null = await _document.lastAppliedTemplate;
        expect(document_lastAppliedTemplate instanceof L.Template);
      } else {
        console.warn("codegen-doc:print: No Document found - cannot test document.lastAppliedTemplate query");
      }
    });

    /** Test the document.project query for L.Project */
    it("document.project", async () => {
      if (_document) {
        const document_project: L.Project | undefined | null = await _document.project;
        expect(document_project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No Document found - cannot test document.project query");
      }
    });

    /** Test the document.updatedBy query for L.User */
    it("document.updatedBy", async () => {
      if (_document) {
        const document_updatedBy: L.User | undefined | null = await _document.updatedBy;
        expect(document_updatedBy instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Document found - cannot test document.updatedBy query");
      }
    });
  });

  /** Test EmailIntakeAddress query */
  describe("EmailIntakeAddress", () => {
    let _emailIntakeAddress: L.EmailIntakeAddress | undefined | null;

    /** Test the root model query for EmailIntakeAddress */
    it("emailIntakeAddress", async () => {
      const emailIntakeAddress: L.EmailIntakeAddress | undefined | null = await client.emailIntakeAddress("mock-id");
      _emailIntakeAddress = emailIntakeAddress;
      expect(emailIntakeAddress instanceof L.EmailIntakeAddress);
    });

    /** Test the emailIntakeAddress model query for EmailIntakeAddress_SesDomainIdentity */
    it("emailIntakeAddress.sesDomainIdentity", async () => {
      if (_emailIntakeAddress) {
        const sesDomainIdentity: L.SesDomainIdentity | undefined | null = _emailIntakeAddress.sesDomainIdentity;
        expect(sesDomainIdentity instanceof L.SesDomainIdentity);
      } else {
        console.warn(
          "codegen-doc:print: No emailIntakeAddress found - cannot test _emailIntakeAddress.sesDomainIdentity query"
        );
      }
    });
  });

  /** Test all Emoji queries */
  describe("Emojis", () => {
    let _emoji: L.Emoji | undefined | null;
    let _emoji_id: string | undefined | null;

    /** Test the root connection query for the Emoji */
    it("emojis", async () => {
      const emojis: L.EmojiConnection | undefined | null = await client.emojis();
      const emoji = emojis?.nodes?.[0];
      _emoji_id = emoji?.id;
      expect(emojis instanceof L.EmojiConnection);
    });

    /** Test the root query for a single Emoji */
    it("emoji", async () => {
      if (_emoji_id) {
        const emoji: L.Emoji | undefined | null = await client.emoji(_emoji_id);
        _emoji = emoji;
        expect(emoji instanceof L.Emoji);
      } else {
        console.warn("codegen-doc:print: No first Emoji found in connection - cannot test emoji query");
      }
    });

    /** Test the emoji.creator query for L.User */
    it("emoji.creator", async () => {
      if (_emoji) {
        const emoji_creator: L.User | undefined | null = await _emoji.creator;
        expect(emoji_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Emoji found - cannot test emoji.creator query");
      }
    });

    /** Test the emoji.organization query for L.Organization */
    it("emoji.organization", async () => {
      if (_emoji) {
        const emoji_organization: L.Organization | undefined | null = await _emoji.organization;
        expect(emoji_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No Emoji found - cannot test emoji.organization query");
      }
    });
  });

  /** Test EntityExternalLink query */
  describe("EntityExternalLink", () => {
    /** Test the root model query for EntityExternalLink */
    it("entityExternalLink", async () => {
      const entityExternalLink: L.EntityExternalLink | undefined | null = await client.entityExternalLink("mock-id");
      expect(entityExternalLink instanceof L.EntityExternalLink);
    });
  });

  /** Test all ExternalUser queries */
  describe("ExternalUsers", () => {
    let _externalUser: L.ExternalUser | undefined | null;
    let _externalUser_id: string | undefined | null;

    /** Test the root connection query for the ExternalUser */
    it("externalUsers", async () => {
      const externalUsers: L.ExternalUserConnection | undefined | null = await client.externalUsers();
      const externalUser = externalUsers?.nodes?.[0];
      _externalUser_id = externalUser?.id;
      expect(externalUsers instanceof L.ExternalUserConnection);
    });

    /** Test the root query for a single ExternalUser */
    it("externalUser", async () => {
      if (_externalUser_id) {
        const externalUser: L.ExternalUser | undefined | null = await client.externalUser(_externalUser_id);
        _externalUser = externalUser;
        expect(externalUser instanceof L.ExternalUser);
      } else {
        console.warn("codegen-doc:print: No first ExternalUser found in connection - cannot test externalUser query");
      }
    });

    /** Test the externalUser.organization query for L.Organization */
    it("externalUser.organization", async () => {
      if (_externalUser) {
        const externalUser_organization: L.Organization | undefined | null = await _externalUser.organization;
        expect(externalUser_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No ExternalUser found - cannot test externalUser.organization query");
      }
    });
  });

  /** Test all Favorite queries */
  describe("Favorites", () => {
    let _favorite: L.Favorite | undefined | null;
    let _favorite_id: string | undefined | null;

    /** Test the root connection query for the Favorite */
    it("favorites", async () => {
      const favorites: L.FavoriteConnection | undefined | null = await client.favorites();
      const favorite = favorites?.nodes?.[0];
      _favorite_id = favorite?.id;
      expect(favorites instanceof L.FavoriteConnection);
    });

    /** Test the root query for a single Favorite */
    it("favorite", async () => {
      if (_favorite_id) {
        const favorite: L.Favorite | undefined | null = await client.favorite(_favorite_id);
        _favorite = favorite;
        expect(favorite instanceof L.Favorite);
      } else {
        console.warn("codegen-doc:print: No first Favorite found in connection - cannot test favorite query");
      }
    });

    /** Test the favorite connection query for the Favorite */
    it("favorite.children", async () => {
      if (_favorite) {
        const children: L.FavoriteConnection | undefined | null = await _favorite.children();
        expect(children instanceof L.FavoriteConnection);
      } else {
        console.warn("codegen-doc:print: No favorite found - cannot test _favorite.children query");
      }
    });

    /** Test the favorite.customView query for L.CustomView */
    it("favorite.customView", async () => {
      if (_favorite) {
        const favorite_customView: L.CustomView | undefined | null = await _favorite.customView;
        expect(favorite_customView instanceof L.CustomView);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.customView query");
      }
    });

    /** Test the favorite.customer query for L.Customer */
    it("favorite.customer", async () => {
      if (_favorite) {
        const favorite_customer: L.Customer | undefined | null = await _favorite.customer;
        expect(favorite_customer instanceof L.Customer);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.customer query");
      }
    });

    /** Test the favorite.cycle query for L.Cycle */
    it("favorite.cycle", async () => {
      if (_favorite) {
        const favorite_cycle: L.Cycle | undefined | null = await _favorite.cycle;
        expect(favorite_cycle instanceof L.Cycle);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.cycle query");
      }
    });

    /** Test the favorite.document query for L.Document */
    it("favorite.document", async () => {
      if (_favorite) {
        const favorite_document: L.Document | undefined | null = await _favorite.document;
        expect(favorite_document instanceof L.Document);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.document query");
      }
    });

    /** Test the favorite.initiative query for L.Initiative */
    it("favorite.initiative", async () => {
      if (_favorite) {
        const favorite_initiative: L.Initiative | undefined | null = await _favorite.initiative;
        expect(favorite_initiative instanceof L.Initiative);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.initiative query");
      }
    });

    /** Test the favorite.issue query for L.Issue */
    it("favorite.issue", async () => {
      if (_favorite) {
        const favorite_issue: L.Issue | undefined | null = await _favorite.issue;
        expect(favorite_issue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.issue query");
      }
    });

    /** Test the favorite.label query for L.IssueLabel */
    it("favorite.label", async () => {
      if (_favorite) {
        const favorite_label: L.IssueLabel | undefined | null = await _favorite.label;
        expect(favorite_label instanceof L.IssueLabel);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.label query");
      }
    });

    /** Test the favorite.owner query for L.User */
    it("favorite.owner", async () => {
      if (_favorite) {
        const favorite_owner: L.User | undefined | null = await _favorite.owner;
        expect(favorite_owner instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.owner query");
      }
    });

    /** Test the favorite.parent query for L.Favorite */
    it("favorite.parent", async () => {
      if (_favorite) {
        const favorite_parent: L.Favorite | undefined | null = await _favorite.parent;
        expect(favorite_parent instanceof L.Favorite);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.parent query");
      }
    });

    /** Test the favorite.predefinedViewTeam query for L.Team */
    it("favorite.predefinedViewTeam", async () => {
      if (_favorite) {
        const favorite_predefinedViewTeam: L.Team | undefined | null = await _favorite.predefinedViewTeam;
        expect(favorite_predefinedViewTeam instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.predefinedViewTeam query");
      }
    });

    /** Test the favorite.project query for L.Project */
    it("favorite.project", async () => {
      if (_favorite) {
        const favorite_project: L.Project | undefined | null = await _favorite.project;
        expect(favorite_project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.project query");
      }
    });

    /** Test the favorite.projectLabel query for L.ProjectLabel */
    it("favorite.projectLabel", async () => {
      if (_favorite) {
        const favorite_projectLabel: L.ProjectLabel | undefined | null = await _favorite.projectLabel;
        expect(favorite_projectLabel instanceof L.ProjectLabel);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.projectLabel query");
      }
    });

    /** Test the favorite.projectTeam query for L.Team */
    it("favorite.projectTeam", async () => {
      if (_favorite) {
        const favorite_projectTeam: L.Team | undefined | null = await _favorite.projectTeam;
        expect(favorite_projectTeam instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.projectTeam query");
      }
    });

    /** Test the favorite.user query for L.User */
    it("favorite.user", async () => {
      if (_favorite) {
        const favorite_user: L.User | undefined | null = await _favorite.user;
        expect(favorite_user instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Favorite found - cannot test favorite.user query");
      }
    });
  });

  /** Test all InitiativeRelation queries */
  describe("InitiativeRelations", () => {
    /** Test the root connection query for the InitiativeRelation */
    it("initiativeRelations", async () => {
      const initiativeRelations: L.InitiativeRelationConnection | undefined | null = await client.initiativeRelations();
      expect(initiativeRelations instanceof L.InitiativeRelationConnection);
    });
  });

  /** Test all InitiativeToProject queries */
  describe("InitiativeToProjects", () => {
    let _initiativeToProject: L.InitiativeToProject | undefined | null;
    let _initiativeToProject_id: string | undefined | null;

    /** Test the root connection query for the InitiativeToProject */
    it("initiativeToProjects", async () => {
      const initiativeToProjects: L.InitiativeToProjectConnection | undefined | null =
        await client.initiativeToProjects();
      const initiativeToProject = initiativeToProjects?.nodes?.[0];
      _initiativeToProject_id = initiativeToProject?.id;
      expect(initiativeToProjects instanceof L.InitiativeToProjectConnection);
    });

    /** Test the root query for a single InitiativeToProject */
    it("initiativeToProject", async () => {
      if (_initiativeToProject_id) {
        const initiativeToProject: L.InitiativeToProject | undefined | null =
          await client.initiativeToProject(_initiativeToProject_id);
        _initiativeToProject = initiativeToProject;
        expect(initiativeToProject instanceof L.InitiativeToProject);
      } else {
        console.warn(
          "codegen-doc:print: No first InitiativeToProject found in connection - cannot test initiativeToProject query"
        );
      }
    });

    /** Test the initiativeToProject.initiative query for L.Initiative */
    it("initiativeToProject.initiative", async () => {
      if (_initiativeToProject) {
        const initiativeToProject_initiative: L.Initiative | undefined | null = await _initiativeToProject.initiative;
        expect(initiativeToProject_initiative instanceof L.Initiative);
      } else {
        console.warn(
          "codegen-doc:print: No InitiativeToProject found - cannot test initiativeToProject.initiative query"
        );
      }
    });

    /** Test the initiativeToProject.project query for L.Project */
    it("initiativeToProject.project", async () => {
      if (_initiativeToProject) {
        const initiativeToProject_project: L.Project | undefined | null = await _initiativeToProject.project;
        expect(initiativeToProject_project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No InitiativeToProject found - cannot test initiativeToProject.project query");
      }
    });
  });

  /** Test all InitiativeUpdate queries */
  describe("InitiativeUpdates", () => {
    let _initiativeUpdate: L.InitiativeUpdate | undefined | null;
    let _initiativeUpdate_id: string | undefined | null;

    /** Test the root connection query for the InitiativeUpdate */
    it("initiativeUpdates", async () => {
      const initiativeUpdates: L.InitiativeUpdateConnection | undefined | null = await client.initiativeUpdates();
      const initiativeUpdate = initiativeUpdates?.nodes?.[0];
      _initiativeUpdate_id = initiativeUpdate?.id;
      expect(initiativeUpdates instanceof L.InitiativeUpdateConnection);
    });

    /** Test the root query for a single InitiativeUpdate */
    it("initiativeUpdate", async () => {
      if (_initiativeUpdate_id) {
        const initiativeUpdate: L.InitiativeUpdate | undefined | null =
          await client.initiativeUpdate(_initiativeUpdate_id);
        _initiativeUpdate = initiativeUpdate;
        expect(initiativeUpdate instanceof L.InitiativeUpdate);
      } else {
        console.warn(
          "codegen-doc:print: No first InitiativeUpdate found in connection - cannot test initiativeUpdate query"
        );
      }
    });

    /** Test the initiativeUpdate connection query for the Comment */
    it("initiativeUpdate.comments", async () => {
      if (_initiativeUpdate) {
        const comments: L.CommentConnection | undefined | null = await _initiativeUpdate.comments();
        expect(comments instanceof L.CommentConnection);
      } else {
        console.warn("codegen-doc:print: No initiativeUpdate found - cannot test _initiativeUpdate.comments query");
      }
    });

    /** Test the initiativeUpdate.initiative query for L.Initiative */
    it("initiativeUpdate.initiative", async () => {
      if (_initiativeUpdate) {
        const initiativeUpdate_initiative: L.Initiative | undefined | null = await _initiativeUpdate.initiative;
        expect(initiativeUpdate_initiative instanceof L.Initiative);
      } else {
        console.warn("codegen-doc:print: No InitiativeUpdate found - cannot test initiativeUpdate.initiative query");
      }
    });

    /** Test the initiativeUpdate.user query for L.User */
    it("initiativeUpdate.user", async () => {
      if (_initiativeUpdate) {
        const initiativeUpdate_user: L.User | undefined | null = await _initiativeUpdate.user;
        expect(initiativeUpdate_user instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No InitiativeUpdate found - cannot test initiativeUpdate.user query");
      }
    });
  });

  /** Test all Initiative queries */
  describe("Initiatives", () => {
    let _initiative: L.Initiative | undefined | null;
    let _initiative_id: string | undefined | null;

    /** Test the root connection query for the Initiative */
    it("initiatives", async () => {
      const initiatives: L.InitiativeConnection | undefined | null = await client.initiatives();
      const initiative = initiatives?.nodes?.[0];
      _initiative_id = initiative?.id;
      expect(initiatives instanceof L.InitiativeConnection);
    });

    /** Test the root query for a single Initiative */
    it("initiative", async () => {
      if (_initiative_id) {
        const initiative: L.Initiative | undefined | null = await client.initiative(_initiative_id);
        _initiative = initiative;
        expect(initiative instanceof L.Initiative);
      } else {
        console.warn("codegen-doc:print: No first Initiative found in connection - cannot test initiative query");
      }
    });

    let _documentContent: L.DocumentContent | undefined | null;

    /** Test the initiative model query for Initiative_DocumentContent */
    it("initiative.documentContent", async () => {
      if (_initiative) {
        const documentContent: L.DocumentContent | undefined | null = _initiative.documentContent;
        _documentContent = documentContent;
        expect(documentContent instanceof L.DocumentContent);
      } else {
        console.warn("codegen-doc:print: No initiative found - cannot test _initiative.documentContent query");
      }
    });

    /** Test the initiative_documentContent model query for Initiative_DocumentContent_AiPromptRules */
    it("initiative_documentContent.aiPromptRules", async () => {
      if (_documentContent) {
        const aiPromptRules: L.AiPromptRules | undefined | null = _documentContent.aiPromptRules;
        expect(aiPromptRules instanceof L.AiPromptRules);
      } else {
        console.warn("codegen-doc:print: No documentContent found - cannot test _documentContent.aiPromptRules query");
      }
    });

    /** Test the initiative_documentContent model query for Initiative_DocumentContent_WelcomeMessage */
    it("initiative_documentContent.welcomeMessage", async () => {
      if (_documentContent) {
        const welcomeMessage: L.WelcomeMessage | undefined | null = _documentContent.welcomeMessage;
        expect(welcomeMessage instanceof L.WelcomeMessage);
      } else {
        console.warn("codegen-doc:print: No documentContent found - cannot test _documentContent.welcomeMessage query");
      }
    });

    /** Test the initiative connection query for the Document */
    it("initiative.documents", async () => {
      if (_initiative) {
        const documents: L.DocumentConnection | undefined | null = await _initiative.documents();
        expect(documents instanceof L.DocumentConnection);
      } else {
        console.warn("codegen-doc:print: No initiative found - cannot test _initiative.documents query");
      }
    });

    /** Test the initiative connection query for the InitiativeHistory */
    it("initiative.history", async () => {
      if (_initiative) {
        const history: L.InitiativeHistoryConnection | undefined | null = await _initiative.history();
        expect(history instanceof L.InitiativeHistoryConnection);
      } else {
        console.warn("codegen-doc:print: No initiative found - cannot test _initiative.history query");
      }
    });

    /** Test the initiative connection query for the InitiativeUpdate */
    it("initiative.initiativeUpdates", async () => {
      if (_initiative) {
        const initiativeUpdates: L.InitiativeUpdateConnection | undefined | null =
          await _initiative.initiativeUpdates();
        expect(initiativeUpdates instanceof L.InitiativeUpdateConnection);
      } else {
        console.warn("codegen-doc:print: No initiative found - cannot test _initiative.initiativeUpdates query");
      }
    });

    /** Test the initiative connection query for the EntityExternalLink */
    it("initiative.links", async () => {
      if (_initiative) {
        const links: L.EntityExternalLinkConnection | undefined | null = await _initiative.links();
        expect(links instanceof L.EntityExternalLinkConnection);
      } else {
        console.warn("codegen-doc:print: No initiative found - cannot test _initiative.links query");
      }
    });

    /** Test the initiative connection query for the Project */
    it("initiative.projects", async () => {
      if (_initiative) {
        const projects: L.ProjectConnection | undefined | null = await _initiative.projects();
        expect(projects instanceof L.ProjectConnection);
      } else {
        console.warn("codegen-doc:print: No initiative found - cannot test _initiative.projects query");
      }
    });

    /** Test the initiative connection query for the Initiative */
    it("initiative.subInitiatives", async () => {
      if (_initiative) {
        const subInitiatives: L.InitiativeConnection | undefined | null = await _initiative.subInitiatives();
        expect(subInitiatives instanceof L.InitiativeConnection);
      } else {
        console.warn("codegen-doc:print: No initiative found - cannot test _initiative.subInitiatives query");
      }
    });

    /** Test the initiative.creator query for L.User */
    it("initiative.creator", async () => {
      if (_initiative) {
        const initiative_creator: L.User | undefined | null = await _initiative.creator;
        expect(initiative_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Initiative found - cannot test initiative.creator query");
      }
    });

    /** Test the initiative.integrationsSettings query for L.IntegrationsSettings */
    it("initiative.integrationsSettings", async () => {
      if (_initiative) {
        const initiative_integrationsSettings: L.IntegrationsSettings | undefined | null =
          await _initiative.integrationsSettings;
        expect(initiative_integrationsSettings instanceof L.IntegrationsSettings);
      } else {
        console.warn("codegen-doc:print: No Initiative found - cannot test initiative.integrationsSettings query");
      }
    });

    /** Test the initiative.lastUpdate query for L.InitiativeUpdate */
    it("initiative.lastUpdate", async () => {
      if (_initiative) {
        const initiative_lastUpdate: L.InitiativeUpdate | undefined | null = await _initiative.lastUpdate;
        expect(initiative_lastUpdate instanceof L.InitiativeUpdate);
      } else {
        console.warn("codegen-doc:print: No Initiative found - cannot test initiative.lastUpdate query");
      }
    });

    /** Test the initiative.organization query for L.Organization */
    it("initiative.organization", async () => {
      if (_initiative) {
        const initiative_organization: L.Organization | undefined | null = await _initiative.organization;
        expect(initiative_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No Initiative found - cannot test initiative.organization query");
      }
    });

    /** Test the initiative.owner query for L.User */
    it("initiative.owner", async () => {
      if (_initiative) {
        const initiative_owner: L.User | undefined | null = await _initiative.owner;
        expect(initiative_owner instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Initiative found - cannot test initiative.owner query");
      }
    });

    /** Test the initiative.parentInitiative query for L.Initiative */
    it("initiative.parentInitiative", async () => {
      if (_initiative) {
        const initiative_parentInitiative: L.Initiative | undefined | null = await _initiative.parentInitiative;
        expect(initiative_parentInitiative instanceof L.Initiative);
      } else {
        console.warn("codegen-doc:print: No Initiative found - cannot test initiative.parentInitiative query");
      }
    });
  });

  /** Test IntegrationHasScopes query */
  describe("IntegrationHasScopes", () => {
    /** Test the root model query for IntegrationHasScopes */
    it("integrationHasScopes", async () => {
      const integrationHasScopes: L.IntegrationHasScopesPayload | undefined | null = await client.integrationHasScopes(
        "mock-integrationId",
        ["mock-scopes"]
      );
      expect(integrationHasScopes instanceof L.IntegrationHasScopesPayload);
    });
  });

  /** Test all IntegrationTemplate queries */
  describe("IntegrationTemplates", () => {
    let _integrationTemplate: L.IntegrationTemplate | undefined | null;
    let _integrationTemplate_id: string | undefined | null;

    /** Test the root connection query for the IntegrationTemplate */
    it("integrationTemplates", async () => {
      const integrationTemplates: L.IntegrationTemplateConnection | undefined | null =
        await client.integrationTemplates();
      const integrationTemplate = integrationTemplates?.nodes?.[0];
      _integrationTemplate_id = integrationTemplate?.id;
      expect(integrationTemplates instanceof L.IntegrationTemplateConnection);
    });

    /** Test the root query for a single IntegrationTemplate */
    it("integrationTemplate", async () => {
      if (_integrationTemplate_id) {
        const integrationTemplate: L.IntegrationTemplate | undefined | null =
          await client.integrationTemplate(_integrationTemplate_id);
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
        const integrationTemplate_integration: L.Integration | undefined | null =
          await _integrationTemplate.integration;
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
        const integrationTemplate_template: L.Template | undefined | null = await _integrationTemplate.template;
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
    let _integration: L.Integration | undefined | null;
    let _integration_id: string | undefined | null;

    /** Test the root connection query for the Integration */
    it("integrations", async () => {
      const integrations: L.IntegrationConnection | undefined | null = await client.integrations();
      const integration = integrations?.nodes?.[0];
      _integration_id = integration?.id;
      expect(integrations instanceof L.IntegrationConnection);
    });

    /** Test the root query for a single Integration */
    it("integration", async () => {
      if (_integration_id) {
        const integration: L.Integration | undefined | null = await client.integration(_integration_id);
        _integration = integration;
        expect(integration instanceof L.Integration);
      } else {
        console.warn("codegen-doc:print: No first Integration found in connection - cannot test integration query");
      }
    });

    /** Test the integration.creator query for L.User */
    it("integration.creator", async () => {
      if (_integration) {
        const integration_creator: L.User | undefined | null = await _integration.creator;
        expect(integration_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Integration found - cannot test integration.creator query");
      }
    });

    /** Test the integration.organization query for L.Organization */
    it("integration.organization", async () => {
      if (_integration) {
        const integration_organization: L.Organization | undefined | null = await _integration.organization;
        expect(integration_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No Integration found - cannot test integration.organization query");
      }
    });

    /** Test the integration.team query for L.Team */
    it("integration.team", async () => {
      if (_integration) {
        const integration_team: L.Team | undefined | null = await _integration.team;
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
      const integrationsSettings: L.IntegrationsSettings | undefined | null =
        await client.integrationsSettings("mock-id");
      expect(integrationsSettings instanceof L.IntegrationsSettings);
    });
  });

  /** Test all Issue queries */
  describe("IssueFigmaFileKeySearch", () => {
    let _issue: L.Issue | undefined | null;
    let _issue_id: string | undefined | null;

    /** Test the root connection query for the Issue */
    it("issueFigmaFileKeySearch", async () => {
      const issueFigmaFileKeySearch: L.IssueConnection | undefined | null =
        await client.issueFigmaFileKeySearch("mock-fileKey");
      const issue = issueFigmaFileKeySearch?.nodes?.[0];
      _issue_id = issue?.id;
      expect(issueFigmaFileKeySearch instanceof L.IssueConnection);
    });

    /** Test the root query for a single Issue */
    it("issue", async () => {
      if (_issue_id) {
        const issue: L.Issue | undefined | null = await client.issue(_issue_id);
        _issue = issue;
        expect(issue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No first Issue found in connection - cannot test issue query");
      }
    });

    /** Test the issue connection query for the Attachment */
    it("issue.attachments", async () => {
      if (_issue) {
        const attachments: L.AttachmentConnection | undefined | null = await _issue.attachments();
        expect(attachments instanceof L.AttachmentConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.attachments query");
      }
    });

    /** Test the issue model query for Issue_BotActor */
    it("issue.botActor", async () => {
      if (_issue) {
        const botActor: L.ActorBot | undefined | null = _issue.botActor;
        expect(botActor instanceof L.ActorBot);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.botActor query");
      }
    });

    /** Test the issue connection query for the Issue */
    it("issue.children", async () => {
      if (_issue) {
        const children: L.IssueConnection | undefined | null = await _issue.children();
        expect(children instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.children query");
      }
    });

    /** Test the issue connection query for the Comment */
    it("issue.comments", async () => {
      if (_issue) {
        const comments: L.CommentConnection | undefined | null = await _issue.comments();
        expect(comments instanceof L.CommentConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.comments query");
      }
    });

    /** Test the issue connection query for the Document */
    it("issue.documents", async () => {
      if (_issue) {
        const documents: L.DocumentConnection | undefined | null = await _issue.documents();
        expect(documents instanceof L.DocumentConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.documents query");
      }
    });

    /** Test the issue connection query for the Attachment */
    it("issue.formerAttachments", async () => {
      if (_issue) {
        const formerAttachments: L.AttachmentConnection | undefined | null = await _issue.formerAttachments();
        expect(formerAttachments instanceof L.AttachmentConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.formerAttachments query");
      }
    });

    /** Test the issue connection query for the CustomerNeed */
    it("issue.formerNeeds", async () => {
      if (_issue) {
        const formerNeeds: L.CustomerNeedConnection | undefined | null = await _issue.formerNeeds();
        expect(formerNeeds instanceof L.CustomerNeedConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.formerNeeds query");
      }
    });

    /** Test the issue connection query for the IssueHistory */
    it("issue.history", async () => {
      if (_issue) {
        const history: L.IssueHistoryConnection | undefined | null = await _issue.history();
        expect(history instanceof L.IssueHistoryConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.history query");
      }
    });

    /** Test the issue connection query for the IssueRelation */
    it("issue.inverseRelations", async () => {
      if (_issue) {
        const inverseRelations: L.IssueRelationConnection | undefined | null = await _issue.inverseRelations();
        expect(inverseRelations instanceof L.IssueRelationConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.inverseRelations query");
      }
    });

    /** Test the issue connection query for the IssueLabel */
    it("issue.labels", async () => {
      if (_issue) {
        const labels: L.IssueLabelConnection | undefined | null = await _issue.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.labels query");
      }
    });

    /** Test the issue connection query for the CustomerNeed */
    it("issue.needs", async () => {
      if (_issue) {
        const needs: L.CustomerNeedConnection | undefined | null = await _issue.needs();
        expect(needs instanceof L.CustomerNeedConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.needs query");
      }
    });

    /** Test the issue connection query for the IssueRelation */
    it("issue.relations", async () => {
      if (_issue) {
        const relations: L.IssueRelationConnection | undefined | null = await _issue.relations();
        expect(relations instanceof L.IssueRelationConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.relations query");
      }
    });

    /** Test the issue model query for Issue_SharedAccess */
    it("issue.sharedAccess", async () => {
      if (_issue) {
        const sharedAccess: L.IssueSharedAccess | undefined | null = _issue.sharedAccess;
        expect(sharedAccess instanceof L.IssueSharedAccess);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.sharedAccess query");
      }
    });

    /** Test the issue connection query for the IssueStateSpan */
    it("issue.stateHistory", async () => {
      if (_issue) {
        const stateHistory: L.IssueStateSpanConnection | undefined | null = await _issue.stateHistory();
        expect(stateHistory instanceof L.IssueStateSpanConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.stateHistory query");
      }
    });

    /** Test the issue connection query for the User */
    it("issue.subscribers", async () => {
      if (_issue) {
        const subscribers: L.UserConnection | undefined | null = await _issue.subscribers();
        expect(subscribers instanceof L.UserConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.subscribers query");
      }
    });

    /** Test the issue.asksExternalUserRequester query for L.ExternalUser */
    it("issue.asksExternalUserRequester", async () => {
      if (_issue) {
        const issue_asksExternalUserRequester: L.ExternalUser | undefined | null =
          await _issue.asksExternalUserRequester;
        expect(issue_asksExternalUserRequester instanceof L.ExternalUser);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.asksExternalUserRequester query");
      }
    });

    /** Test the issue.asksRequester query for L.User */
    it("issue.asksRequester", async () => {
      if (_issue) {
        const issue_asksRequester: L.User | undefined | null = await _issue.asksRequester;
        expect(issue_asksRequester instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.asksRequester query");
      }
    });

    /** Test the issue.assignee query for L.User */
    it("issue.assignee", async () => {
      if (_issue) {
        const issue_assignee: L.User | undefined | null = await _issue.assignee;
        expect(issue_assignee instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.assignee query");
      }
    });

    /** Test the issue.creator query for L.User */
    it("issue.creator", async () => {
      if (_issue) {
        const issue_creator: L.User | undefined | null = await _issue.creator;
        expect(issue_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.creator query");
      }
    });

    /** Test the issue.cycle query for L.Cycle */
    it("issue.cycle", async () => {
      if (_issue) {
        const issue_cycle: L.Cycle | undefined | null = await _issue.cycle;
        expect(issue_cycle instanceof L.Cycle);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.cycle query");
      }
    });

    /** Test the issue.delegate query for L.User */
    it("issue.delegate", async () => {
      if (_issue) {
        const issue_delegate: L.User | undefined | null = await _issue.delegate;
        expect(issue_delegate instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.delegate query");
      }
    });

    /** Test the issue.externalUserCreator query for L.ExternalUser */
    it("issue.externalUserCreator", async () => {
      if (_issue) {
        const issue_externalUserCreator: L.ExternalUser | undefined | null = await _issue.externalUserCreator;
        expect(issue_externalUserCreator instanceof L.ExternalUser);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.externalUserCreator query");
      }
    });

    /** Test the issue.favorite query for L.Favorite */
    it("issue.favorite", async () => {
      if (_issue) {
        const issue_favorite: L.Favorite | undefined | null = await _issue.favorite;
        expect(issue_favorite instanceof L.Favorite);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.favorite query");
      }
    });

    /** Test the issue.lastAppliedTemplate query for L.Template */
    it("issue.lastAppliedTemplate", async () => {
      if (_issue) {
        const issue_lastAppliedTemplate: L.Template | undefined | null = await _issue.lastAppliedTemplate;
        expect(issue_lastAppliedTemplate instanceof L.Template);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.lastAppliedTemplate query");
      }
    });

    /** Test the issue.parent query for L.Issue */
    it("issue.parent", async () => {
      if (_issue) {
        const issue_parent: L.Issue | undefined | null = await _issue.parent;
        expect(issue_parent instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.parent query");
      }
    });

    /** Test the issue.project query for L.Project */
    it("issue.project", async () => {
      if (_issue) {
        const issue_project: L.Project | undefined | null = await _issue.project;
        expect(issue_project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.project query");
      }
    });

    /** Test the issue.projectMilestone query for L.ProjectMilestone */
    it("issue.projectMilestone", async () => {
      if (_issue) {
        const issue_projectMilestone: L.ProjectMilestone | undefined | null = await _issue.projectMilestone;
        expect(issue_projectMilestone instanceof L.ProjectMilestone);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.projectMilestone query");
      }
    });

    /** Test the issue.recurringIssueTemplate query for L.Template */
    it("issue.recurringIssueTemplate", async () => {
      if (_issue) {
        const issue_recurringIssueTemplate: L.Template | undefined | null = await _issue.recurringIssueTemplate;
        expect(issue_recurringIssueTemplate instanceof L.Template);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.recurringIssueTemplate query");
      }
    });

    /** Test the issue.snoozedBy query for L.User */
    it("issue.snoozedBy", async () => {
      if (_issue) {
        const issue_snoozedBy: L.User | undefined | null = await _issue.snoozedBy;
        expect(issue_snoozedBy instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.snoozedBy query");
      }
    });

    /** Test the issue.sourceComment query for L.Comment */
    it("issue.sourceComment", async () => {
      if (_issue) {
        const issue_sourceComment: L.Comment | undefined | null = await _issue.sourceComment;
        expect(issue_sourceComment instanceof L.Comment);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.sourceComment query");
      }
    });

    /** Test the issue.state query for L.WorkflowState */
    it("issue.state", async () => {
      if (_issue) {
        const issue_state: L.WorkflowState | undefined | null = await _issue.state;
        expect(issue_state instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.state query");
      }
    });

    /** Test the issue.team query for L.Team */
    it("issue.team", async () => {
      if (_issue) {
        const issue_team: L.Team | undefined | null = await _issue.team;
        expect(issue_team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.team query");
      }
    });
  });

  /** Test IssueFilterSuggestion query */
  describe("IssueFilterSuggestion", () => {
    /** Test the root model query for IssueFilterSuggestion */
    it("issueFilterSuggestion", async () => {
      const issueFilterSuggestion: L.IssueFilterSuggestionPayload | undefined | null =
        await client.issueFilterSuggestion("mock-prompt");
      expect(issueFilterSuggestion instanceof L.IssueFilterSuggestionPayload);
    });
  });

  /** Test IssueImportCheckCsv query */
  describe("IssueImportCheckCsv", () => {
    /** Test the root model query for IssueImportCheckCsv */
    it("issueImportCheckCSV", async () => {
      const issueImportCheckCSV: L.IssueImportCheckPayload | undefined | null = await client.issueImportCheckCSV(
        "mock-csvUrl",
        "mock-service"
      );
      expect(issueImportCheckCSV instanceof L.IssueImportCheckPayload);
    });
  });

  /** Test IssueImportCheckSync query */
  describe("IssueImportCheckSync", () => {
    /** Test the root model query for IssueImportCheckSync */
    it("issueImportCheckSync", async () => {
      const issueImportCheckSync: L.IssueImportSyncCheckPayload | undefined | null =
        await client.issueImportCheckSync("mock-issueImportId");
      expect(issueImportCheckSync instanceof L.IssueImportSyncCheckPayload);
    });
  });

  /** Test IssueImportJqlCheck query */
  describe("IssueImportJqlCheck", () => {
    /** Test the root model query for IssueImportJqlCheck */
    it("issueImportJqlCheck", async () => {
      const issueImportJqlCheck: L.IssueImportJqlCheckPayload | undefined | null = await client.issueImportJqlCheck(
        "mock-jiraEmail",
        "mock-jiraHostname",
        "mock-jiraProject",
        "mock-jiraToken",
        "mock-jql"
      );
      expect(issueImportJqlCheck instanceof L.IssueImportJqlCheckPayload);
    });
  });

  /** Test all IssueLabel queries */
  describe("IssueLabels", () => {
    let _issueLabel: L.IssueLabel | undefined | null;
    let _issueLabel_id: string | undefined | null;

    /** Test the root connection query for the IssueLabel */
    it("issueLabels", async () => {
      const issueLabels: L.IssueLabelConnection | undefined | null = await client.issueLabels();
      const issueLabel = issueLabels?.nodes?.[0];
      _issueLabel_id = issueLabel?.id;
      expect(issueLabels instanceof L.IssueLabelConnection);
    });

    /** Test the root query for a single IssueLabel */
    it("issueLabel", async () => {
      if (_issueLabel_id) {
        const issueLabel: L.IssueLabel | undefined | null = await client.issueLabel(_issueLabel_id);
        _issueLabel = issueLabel;
        expect(issueLabel instanceof L.IssueLabel);
      } else {
        console.warn("codegen-doc:print: No first IssueLabel found in connection - cannot test issueLabel query");
      }
    });

    /** Test the issueLabel connection query for the IssueLabel */
    it("issueLabel.children", async () => {
      if (_issueLabel) {
        const children: L.IssueLabelConnection | undefined | null = await _issueLabel.children();
        expect(children instanceof L.IssueLabelConnection);
      } else {
        console.warn("codegen-doc:print: No issueLabel found - cannot test _issueLabel.children query");
      }
    });

    /** Test the issueLabel connection query for the Issue */
    it("issueLabel.issues", async () => {
      if (_issueLabel) {
        const issues: L.IssueConnection | undefined | null = await _issueLabel.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No issueLabel found - cannot test _issueLabel.issues query");
      }
    });

    /** Test the issueLabel.creator query for L.User */
    it("issueLabel.creator", async () => {
      if (_issueLabel) {
        const issueLabel_creator: L.User | undefined | null = await _issueLabel.creator;
        expect(issueLabel_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No IssueLabel found - cannot test issueLabel.creator query");
      }
    });

    /** Test the issueLabel.inheritedFrom query for L.IssueLabel */
    it("issueLabel.inheritedFrom", async () => {
      if (_issueLabel) {
        const issueLabel_inheritedFrom: L.IssueLabel | undefined | null = await _issueLabel.inheritedFrom;
        expect(issueLabel_inheritedFrom instanceof L.IssueLabel);
      } else {
        console.warn("codegen-doc:print: No IssueLabel found - cannot test issueLabel.inheritedFrom query");
      }
    });

    /** Test the issueLabel.organization query for L.Organization */
    it("issueLabel.organization", async () => {
      if (_issueLabel) {
        const issueLabel_organization: L.Organization | undefined | null = await _issueLabel.organization;
        expect(issueLabel_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No IssueLabel found - cannot test issueLabel.organization query");
      }
    });

    /** Test the issueLabel.parent query for L.IssueLabel */
    it("issueLabel.parent", async () => {
      if (_issueLabel) {
        const issueLabel_parent: L.IssueLabel | undefined | null = await _issueLabel.parent;
        expect(issueLabel_parent instanceof L.IssueLabel);
      } else {
        console.warn("codegen-doc:print: No IssueLabel found - cannot test issueLabel.parent query");
      }
    });

    /** Test the issueLabel.retiredBy query for L.User */
    it("issueLabel.retiredBy", async () => {
      if (_issueLabel) {
        const issueLabel_retiredBy: L.User | undefined | null = await _issueLabel.retiredBy;
        expect(issueLabel_retiredBy instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No IssueLabel found - cannot test issueLabel.retiredBy query");
      }
    });

    /** Test the issueLabel.team query for L.Team */
    it("issueLabel.team", async () => {
      if (_issueLabel) {
        const issueLabel_team: L.Team | undefined | null = await _issueLabel.team;
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
      const issuePriorityValues: L.IssuePriorityValue[] | undefined | null = await client.issuePriorityValues;
      issuePriorityValues?.map(node => expect(node instanceof L.IssuePriorityValue));
    });
  });

  /** Test all IssueRelation queries */
  describe("IssueRelations", () => {
    let _issueRelation: L.IssueRelation | undefined | null;
    let _issueRelation_id: string | undefined | null;

    /** Test the root connection query for the IssueRelation */
    it("issueRelations", async () => {
      const issueRelations: L.IssueRelationConnection | undefined | null = await client.issueRelations();
      const issueRelation = issueRelations?.nodes?.[0];
      _issueRelation_id = issueRelation?.id;
      expect(issueRelations instanceof L.IssueRelationConnection);
    });

    /** Test the root query for a single IssueRelation */
    it("issueRelation", async () => {
      if (_issueRelation_id) {
        const issueRelation: L.IssueRelation | undefined | null = await client.issueRelation(_issueRelation_id);
        _issueRelation = issueRelation;
        expect(issueRelation instanceof L.IssueRelation);
      } else {
        console.warn("codegen-doc:print: No first IssueRelation found in connection - cannot test issueRelation query");
      }
    });

    /** Test the issueRelation.issue query for L.Issue */
    it("issueRelation.issue", async () => {
      if (_issueRelation) {
        const issueRelation_issue: L.Issue | undefined | null = await _issueRelation.issue;
        expect(issueRelation_issue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No IssueRelation found - cannot test issueRelation.issue query");
      }
    });

    /** Test the issueRelation.relatedIssue query for L.Issue */
    it("issueRelation.relatedIssue", async () => {
      if (_issueRelation) {
        const issueRelation_relatedIssue: L.Issue | undefined | null = await _issueRelation.relatedIssue;
        expect(issueRelation_relatedIssue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No IssueRelation found - cannot test issueRelation.relatedIssue query");
      }
    });
  });

  /** Test IssueRepositorySuggestions query */
  describe("IssueRepositorySuggestions", () => {
    /** Test the root model query for IssueRepositorySuggestions */
    it("issueRepositorySuggestions", async () => {
      const issueRepositorySuggestions: L.RepositorySuggestionsPayload | undefined | null =
        await client.issueRepositorySuggestions(
          [{ hostname: "mock-hostname", repositoryFullName: "mock-repositoryFullName" }],
          "mock-issueId"
        );
      expect(issueRepositorySuggestions instanceof L.RepositorySuggestionsPayload);
    });
  });

  /** Test all Issue queries */
  describe("IssueSearch", () => {
    let _issue: L.Issue | undefined | null;
    let _issue_id: string | undefined | null;

    /** Test the root connection query for the Issue */
    it("issueSearch", async () => {
      const issueSearch: L.IssueConnection | undefined | null = await client.issueSearch();
      const issue = issueSearch?.nodes?.[0];
      _issue_id = issue?.id;
      expect(issueSearch instanceof L.IssueConnection);
    });

    /** Test the root query for a single Issue */
    it("issue", async () => {
      if (_issue_id) {
        const issue: L.Issue | undefined | null = await client.issue(_issue_id);
        _issue = issue;
        expect(issue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No first Issue found in connection - cannot test issue query");
      }
    });

    /** Test the issue connection query for the Attachment */
    it("issue.attachments", async () => {
      if (_issue) {
        const attachments: L.AttachmentConnection | undefined | null = await _issue.attachments();
        expect(attachments instanceof L.AttachmentConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.attachments query");
      }
    });

    /** Test the issue model query for Issue_BotActor */
    it("issue.botActor", async () => {
      if (_issue) {
        const botActor: L.ActorBot | undefined | null = _issue.botActor;
        expect(botActor instanceof L.ActorBot);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.botActor query");
      }
    });

    /** Test the issue connection query for the Issue */
    it("issue.children", async () => {
      if (_issue) {
        const children: L.IssueConnection | undefined | null = await _issue.children();
        expect(children instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.children query");
      }
    });

    /** Test the issue connection query for the Comment */
    it("issue.comments", async () => {
      if (_issue) {
        const comments: L.CommentConnection | undefined | null = await _issue.comments();
        expect(comments instanceof L.CommentConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.comments query");
      }
    });

    /** Test the issue connection query for the Document */
    it("issue.documents", async () => {
      if (_issue) {
        const documents: L.DocumentConnection | undefined | null = await _issue.documents();
        expect(documents instanceof L.DocumentConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.documents query");
      }
    });

    /** Test the issue connection query for the Attachment */
    it("issue.formerAttachments", async () => {
      if (_issue) {
        const formerAttachments: L.AttachmentConnection | undefined | null = await _issue.formerAttachments();
        expect(formerAttachments instanceof L.AttachmentConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.formerAttachments query");
      }
    });

    /** Test the issue connection query for the CustomerNeed */
    it("issue.formerNeeds", async () => {
      if (_issue) {
        const formerNeeds: L.CustomerNeedConnection | undefined | null = await _issue.formerNeeds();
        expect(formerNeeds instanceof L.CustomerNeedConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.formerNeeds query");
      }
    });

    /** Test the issue connection query for the IssueHistory */
    it("issue.history", async () => {
      if (_issue) {
        const history: L.IssueHistoryConnection | undefined | null = await _issue.history();
        expect(history instanceof L.IssueHistoryConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.history query");
      }
    });

    /** Test the issue connection query for the IssueRelation */
    it("issue.inverseRelations", async () => {
      if (_issue) {
        const inverseRelations: L.IssueRelationConnection | undefined | null = await _issue.inverseRelations();
        expect(inverseRelations instanceof L.IssueRelationConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.inverseRelations query");
      }
    });

    /** Test the issue connection query for the IssueLabel */
    it("issue.labels", async () => {
      if (_issue) {
        const labels: L.IssueLabelConnection | undefined | null = await _issue.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.labels query");
      }
    });

    /** Test the issue connection query for the CustomerNeed */
    it("issue.needs", async () => {
      if (_issue) {
        const needs: L.CustomerNeedConnection | undefined | null = await _issue.needs();
        expect(needs instanceof L.CustomerNeedConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.needs query");
      }
    });

    /** Test the issue connection query for the IssueRelation */
    it("issue.relations", async () => {
      if (_issue) {
        const relations: L.IssueRelationConnection | undefined | null = await _issue.relations();
        expect(relations instanceof L.IssueRelationConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.relations query");
      }
    });

    /** Test the issue model query for Issue_SharedAccess */
    it("issue.sharedAccess", async () => {
      if (_issue) {
        const sharedAccess: L.IssueSharedAccess | undefined | null = _issue.sharedAccess;
        expect(sharedAccess instanceof L.IssueSharedAccess);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.sharedAccess query");
      }
    });

    /** Test the issue connection query for the IssueStateSpan */
    it("issue.stateHistory", async () => {
      if (_issue) {
        const stateHistory: L.IssueStateSpanConnection | undefined | null = await _issue.stateHistory();
        expect(stateHistory instanceof L.IssueStateSpanConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.stateHistory query");
      }
    });

    /** Test the issue connection query for the User */
    it("issue.subscribers", async () => {
      if (_issue) {
        const subscribers: L.UserConnection | undefined | null = await _issue.subscribers();
        expect(subscribers instanceof L.UserConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.subscribers query");
      }
    });

    /** Test the issue.asksExternalUserRequester query for L.ExternalUser */
    it("issue.asksExternalUserRequester", async () => {
      if (_issue) {
        const issue_asksExternalUserRequester: L.ExternalUser | undefined | null =
          await _issue.asksExternalUserRequester;
        expect(issue_asksExternalUserRequester instanceof L.ExternalUser);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.asksExternalUserRequester query");
      }
    });

    /** Test the issue.asksRequester query for L.User */
    it("issue.asksRequester", async () => {
      if (_issue) {
        const issue_asksRequester: L.User | undefined | null = await _issue.asksRequester;
        expect(issue_asksRequester instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.asksRequester query");
      }
    });

    /** Test the issue.assignee query for L.User */
    it("issue.assignee", async () => {
      if (_issue) {
        const issue_assignee: L.User | undefined | null = await _issue.assignee;
        expect(issue_assignee instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.assignee query");
      }
    });

    /** Test the issue.creator query for L.User */
    it("issue.creator", async () => {
      if (_issue) {
        const issue_creator: L.User | undefined | null = await _issue.creator;
        expect(issue_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.creator query");
      }
    });

    /** Test the issue.cycle query for L.Cycle */
    it("issue.cycle", async () => {
      if (_issue) {
        const issue_cycle: L.Cycle | undefined | null = await _issue.cycle;
        expect(issue_cycle instanceof L.Cycle);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.cycle query");
      }
    });

    /** Test the issue.delegate query for L.User */
    it("issue.delegate", async () => {
      if (_issue) {
        const issue_delegate: L.User | undefined | null = await _issue.delegate;
        expect(issue_delegate instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.delegate query");
      }
    });

    /** Test the issue.externalUserCreator query for L.ExternalUser */
    it("issue.externalUserCreator", async () => {
      if (_issue) {
        const issue_externalUserCreator: L.ExternalUser | undefined | null = await _issue.externalUserCreator;
        expect(issue_externalUserCreator instanceof L.ExternalUser);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.externalUserCreator query");
      }
    });

    /** Test the issue.favorite query for L.Favorite */
    it("issue.favorite", async () => {
      if (_issue) {
        const issue_favorite: L.Favorite | undefined | null = await _issue.favorite;
        expect(issue_favorite instanceof L.Favorite);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.favorite query");
      }
    });

    /** Test the issue.lastAppliedTemplate query for L.Template */
    it("issue.lastAppliedTemplate", async () => {
      if (_issue) {
        const issue_lastAppliedTemplate: L.Template | undefined | null = await _issue.lastAppliedTemplate;
        expect(issue_lastAppliedTemplate instanceof L.Template);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.lastAppliedTemplate query");
      }
    });

    /** Test the issue.parent query for L.Issue */
    it("issue.parent", async () => {
      if (_issue) {
        const issue_parent: L.Issue | undefined | null = await _issue.parent;
        expect(issue_parent instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.parent query");
      }
    });

    /** Test the issue.project query for L.Project */
    it("issue.project", async () => {
      if (_issue) {
        const issue_project: L.Project | undefined | null = await _issue.project;
        expect(issue_project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.project query");
      }
    });

    /** Test the issue.projectMilestone query for L.ProjectMilestone */
    it("issue.projectMilestone", async () => {
      if (_issue) {
        const issue_projectMilestone: L.ProjectMilestone | undefined | null = await _issue.projectMilestone;
        expect(issue_projectMilestone instanceof L.ProjectMilestone);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.projectMilestone query");
      }
    });

    /** Test the issue.recurringIssueTemplate query for L.Template */
    it("issue.recurringIssueTemplate", async () => {
      if (_issue) {
        const issue_recurringIssueTemplate: L.Template | undefined | null = await _issue.recurringIssueTemplate;
        expect(issue_recurringIssueTemplate instanceof L.Template);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.recurringIssueTemplate query");
      }
    });

    /** Test the issue.snoozedBy query for L.User */
    it("issue.snoozedBy", async () => {
      if (_issue) {
        const issue_snoozedBy: L.User | undefined | null = await _issue.snoozedBy;
        expect(issue_snoozedBy instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.snoozedBy query");
      }
    });

    /** Test the issue.sourceComment query for L.Comment */
    it("issue.sourceComment", async () => {
      if (_issue) {
        const issue_sourceComment: L.Comment | undefined | null = await _issue.sourceComment;
        expect(issue_sourceComment instanceof L.Comment);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.sourceComment query");
      }
    });

    /** Test the issue.state query for L.WorkflowState */
    it("issue.state", async () => {
      if (_issue) {
        const issue_state: L.WorkflowState | undefined | null = await _issue.state;
        expect(issue_state instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.state query");
      }
    });

    /** Test the issue.team query for L.Team */
    it("issue.team", async () => {
      if (_issue) {
        const issue_team: L.Team | undefined | null = await _issue.team;
        expect(issue_team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.team query");
      }
    });
  });

  /** Test IssueTitleSuggestionFromCustomerRequest query */
  describe("IssueTitleSuggestionFromCustomerRequest", () => {
    /** Test the root model query for IssueTitleSuggestionFromCustomerRequest */
    it("issueTitleSuggestionFromCustomerRequest", async () => {
      const issueTitleSuggestionFromCustomerRequest:
        | L.IssueTitleSuggestionFromCustomerRequestPayload
        | undefined
        | null = await client.issueTitleSuggestionFromCustomerRequest("mock-request");
      expect(issueTitleSuggestionFromCustomerRequest instanceof L.IssueTitleSuggestionFromCustomerRequestPayload);
    });
  });

  /** Test IssueVcsBranchSearch query */
  describe("IssueVcsBranchSearch", () => {
    let _issueVcsBranchSearch: L.Issue | undefined | null;

    /** Test the root model query for IssueVcsBranchSearch */
    it("issueVcsBranchSearch", async () => {
      const issueVcsBranchSearch: L.Issue | undefined | null = await client.issueVcsBranchSearch("mock-branchName");
      _issueVcsBranchSearch = issueVcsBranchSearch;
      expect(issueVcsBranchSearch instanceof L.Issue);
    });

    /** Test the issueVcsBranchSearch connection query for the Attachment */
    it("issueVcsBranchSearch.attachments", async () => {
      if (_issueVcsBranchSearch) {
        const attachments: L.AttachmentConnection | undefined | null = await _issueVcsBranchSearch.attachments();
        expect(attachments instanceof L.AttachmentConnection);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.attachments query"
        );
      }
    });

    /** Test the issueVcsBranchSearch model query for IssueVcsBranchSearch_BotActor */
    it("issueVcsBranchSearch.botActor", async () => {
      if (_issueVcsBranchSearch) {
        const botActor: L.ActorBot | undefined | null = _issueVcsBranchSearch.botActor;
        expect(botActor instanceof L.ActorBot);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.botActor query"
        );
      }
    });

    /** Test the issueVcsBranchSearch connection query for the Issue */
    it("issueVcsBranchSearch.children", async () => {
      if (_issueVcsBranchSearch) {
        const children: L.IssueConnection | undefined | null = await _issueVcsBranchSearch.children();
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
        const comments: L.CommentConnection | undefined | null = await _issueVcsBranchSearch.comments();
        expect(comments instanceof L.CommentConnection);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.comments query"
        );
      }
    });

    /** Test the issueVcsBranchSearch connection query for the Document */
    it("issueVcsBranchSearch.documents", async () => {
      if (_issueVcsBranchSearch) {
        const documents: L.DocumentConnection | undefined | null = await _issueVcsBranchSearch.documents();
        expect(documents instanceof L.DocumentConnection);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.documents query"
        );
      }
    });

    /** Test the issueVcsBranchSearch connection query for the Attachment */
    it("issueVcsBranchSearch.formerAttachments", async () => {
      if (_issueVcsBranchSearch) {
        const formerAttachments: L.AttachmentConnection | undefined | null =
          await _issueVcsBranchSearch.formerAttachments();
        expect(formerAttachments instanceof L.AttachmentConnection);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.formerAttachments query"
        );
      }
    });

    /** Test the issueVcsBranchSearch connection query for the CustomerNeed */
    it("issueVcsBranchSearch.formerNeeds", async () => {
      if (_issueVcsBranchSearch) {
        const formerNeeds: L.CustomerNeedConnection | undefined | null = await _issueVcsBranchSearch.formerNeeds();
        expect(formerNeeds instanceof L.CustomerNeedConnection);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.formerNeeds query"
        );
      }
    });

    /** Test the issueVcsBranchSearch connection query for the IssueHistory */
    it("issueVcsBranchSearch.history", async () => {
      if (_issueVcsBranchSearch) {
        const history: L.IssueHistoryConnection | undefined | null = await _issueVcsBranchSearch.history();
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
        const inverseRelations: L.IssueRelationConnection | undefined | null =
          await _issueVcsBranchSearch.inverseRelations();
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
        const labels: L.IssueLabelConnection | undefined | null = await _issueVcsBranchSearch.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.labels query"
        );
      }
    });

    /** Test the issueVcsBranchSearch connection query for the CustomerNeed */
    it("issueVcsBranchSearch.needs", async () => {
      if (_issueVcsBranchSearch) {
        const needs: L.CustomerNeedConnection | undefined | null = await _issueVcsBranchSearch.needs();
        expect(needs instanceof L.CustomerNeedConnection);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.needs query"
        );
      }
    });

    /** Test the issueVcsBranchSearch connection query for the IssueRelation */
    it("issueVcsBranchSearch.relations", async () => {
      if (_issueVcsBranchSearch) {
        const relations: L.IssueRelationConnection | undefined | null = await _issueVcsBranchSearch.relations();
        expect(relations instanceof L.IssueRelationConnection);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.relations query"
        );
      }
    });

    /** Test the issueVcsBranchSearch model query for IssueVcsBranchSearch_SharedAccess */
    it("issueVcsBranchSearch.sharedAccess", async () => {
      if (_issueVcsBranchSearch) {
        const sharedAccess: L.IssueSharedAccess | undefined | null = _issueVcsBranchSearch.sharedAccess;
        expect(sharedAccess instanceof L.IssueSharedAccess);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.sharedAccess query"
        );
      }
    });

    /** Test the issueVcsBranchSearch connection query for the IssueStateSpan */
    it("issueVcsBranchSearch.stateHistory", async () => {
      if (_issueVcsBranchSearch) {
        const stateHistory: L.IssueStateSpanConnection | undefined | null = await _issueVcsBranchSearch.stateHistory();
        expect(stateHistory instanceof L.IssueStateSpanConnection);
      } else {
        console.warn(
          "codegen-doc:print: No issueVcsBranchSearch found - cannot test _issueVcsBranchSearch.stateHistory query"
        );
      }
    });

    /** Test the issueVcsBranchSearch connection query for the User */
    it("issueVcsBranchSearch.subscribers", async () => {
      if (_issueVcsBranchSearch) {
        const subscribers: L.UserConnection | undefined | null = await _issueVcsBranchSearch.subscribers();
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
    let _issue: L.Issue | undefined | null;
    let _issue_id: string | undefined | null;

    /** Test the root connection query for the Issue */
    it("issues", async () => {
      const issues: L.IssueConnection | undefined | null = await client.issues();
      const issue = issues?.nodes?.[0];
      _issue_id = issue?.id;
      expect(issues instanceof L.IssueConnection);
    });

    /** Test the root query for a single Issue */
    it("issue", async () => {
      if (_issue_id) {
        const issue: L.Issue | undefined | null = await client.issue(_issue_id);
        _issue = issue;
        expect(issue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No first Issue found in connection - cannot test issue query");
      }
    });

    /** Test the issue connection query for the Attachment */
    it("issue.attachments", async () => {
      if (_issue) {
        const attachments: L.AttachmentConnection | undefined | null = await _issue.attachments();
        expect(attachments instanceof L.AttachmentConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.attachments query");
      }
    });

    /** Test the issue model query for Issue_BotActor */
    it("issue.botActor", async () => {
      if (_issue) {
        const botActor: L.ActorBot | undefined | null = _issue.botActor;
        expect(botActor instanceof L.ActorBot);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.botActor query");
      }
    });

    /** Test the issue connection query for the Issue */
    it("issue.children", async () => {
      if (_issue) {
        const children: L.IssueConnection | undefined | null = await _issue.children();
        expect(children instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.children query");
      }
    });

    /** Test the issue connection query for the Comment */
    it("issue.comments", async () => {
      if (_issue) {
        const comments: L.CommentConnection | undefined | null = await _issue.comments();
        expect(comments instanceof L.CommentConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.comments query");
      }
    });

    /** Test the issue connection query for the Document */
    it("issue.documents", async () => {
      if (_issue) {
        const documents: L.DocumentConnection | undefined | null = await _issue.documents();
        expect(documents instanceof L.DocumentConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.documents query");
      }
    });

    /** Test the issue connection query for the Attachment */
    it("issue.formerAttachments", async () => {
      if (_issue) {
        const formerAttachments: L.AttachmentConnection | undefined | null = await _issue.formerAttachments();
        expect(formerAttachments instanceof L.AttachmentConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.formerAttachments query");
      }
    });

    /** Test the issue connection query for the CustomerNeed */
    it("issue.formerNeeds", async () => {
      if (_issue) {
        const formerNeeds: L.CustomerNeedConnection | undefined | null = await _issue.formerNeeds();
        expect(formerNeeds instanceof L.CustomerNeedConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.formerNeeds query");
      }
    });

    /** Test the issue connection query for the IssueHistory */
    it("issue.history", async () => {
      if (_issue) {
        const history: L.IssueHistoryConnection | undefined | null = await _issue.history();
        expect(history instanceof L.IssueHistoryConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.history query");
      }
    });

    /** Test the issue connection query for the IssueRelation */
    it("issue.inverseRelations", async () => {
      if (_issue) {
        const inverseRelations: L.IssueRelationConnection | undefined | null = await _issue.inverseRelations();
        expect(inverseRelations instanceof L.IssueRelationConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.inverseRelations query");
      }
    });

    /** Test the issue connection query for the IssueLabel */
    it("issue.labels", async () => {
      if (_issue) {
        const labels: L.IssueLabelConnection | undefined | null = await _issue.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.labels query");
      }
    });

    /** Test the issue connection query for the CustomerNeed */
    it("issue.needs", async () => {
      if (_issue) {
        const needs: L.CustomerNeedConnection | undefined | null = await _issue.needs();
        expect(needs instanceof L.CustomerNeedConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.needs query");
      }
    });

    /** Test the issue connection query for the IssueRelation */
    it("issue.relations", async () => {
      if (_issue) {
        const relations: L.IssueRelationConnection | undefined | null = await _issue.relations();
        expect(relations instanceof L.IssueRelationConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.relations query");
      }
    });

    /** Test the issue model query for Issue_SharedAccess */
    it("issue.sharedAccess", async () => {
      if (_issue) {
        const sharedAccess: L.IssueSharedAccess | undefined | null = _issue.sharedAccess;
        expect(sharedAccess instanceof L.IssueSharedAccess);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.sharedAccess query");
      }
    });

    /** Test the issue connection query for the IssueStateSpan */
    it("issue.stateHistory", async () => {
      if (_issue) {
        const stateHistory: L.IssueStateSpanConnection | undefined | null = await _issue.stateHistory();
        expect(stateHistory instanceof L.IssueStateSpanConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.stateHistory query");
      }
    });

    /** Test the issue connection query for the User */
    it("issue.subscribers", async () => {
      if (_issue) {
        const subscribers: L.UserConnection | undefined | null = await _issue.subscribers();
        expect(subscribers instanceof L.UserConnection);
      } else {
        console.warn("codegen-doc:print: No issue found - cannot test _issue.subscribers query");
      }
    });

    /** Test the issue.asksExternalUserRequester query for L.ExternalUser */
    it("issue.asksExternalUserRequester", async () => {
      if (_issue) {
        const issue_asksExternalUserRequester: L.ExternalUser | undefined | null =
          await _issue.asksExternalUserRequester;
        expect(issue_asksExternalUserRequester instanceof L.ExternalUser);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.asksExternalUserRequester query");
      }
    });

    /** Test the issue.asksRequester query for L.User */
    it("issue.asksRequester", async () => {
      if (_issue) {
        const issue_asksRequester: L.User | undefined | null = await _issue.asksRequester;
        expect(issue_asksRequester instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.asksRequester query");
      }
    });

    /** Test the issue.assignee query for L.User */
    it("issue.assignee", async () => {
      if (_issue) {
        const issue_assignee: L.User | undefined | null = await _issue.assignee;
        expect(issue_assignee instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.assignee query");
      }
    });

    /** Test the issue.creator query for L.User */
    it("issue.creator", async () => {
      if (_issue) {
        const issue_creator: L.User | undefined | null = await _issue.creator;
        expect(issue_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.creator query");
      }
    });

    /** Test the issue.cycle query for L.Cycle */
    it("issue.cycle", async () => {
      if (_issue) {
        const issue_cycle: L.Cycle | undefined | null = await _issue.cycle;
        expect(issue_cycle instanceof L.Cycle);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.cycle query");
      }
    });

    /** Test the issue.delegate query for L.User */
    it("issue.delegate", async () => {
      if (_issue) {
        const issue_delegate: L.User | undefined | null = await _issue.delegate;
        expect(issue_delegate instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.delegate query");
      }
    });

    /** Test the issue.externalUserCreator query for L.ExternalUser */
    it("issue.externalUserCreator", async () => {
      if (_issue) {
        const issue_externalUserCreator: L.ExternalUser | undefined | null = await _issue.externalUserCreator;
        expect(issue_externalUserCreator instanceof L.ExternalUser);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.externalUserCreator query");
      }
    });

    /** Test the issue.favorite query for L.Favorite */
    it("issue.favorite", async () => {
      if (_issue) {
        const issue_favorite: L.Favorite | undefined | null = await _issue.favorite;
        expect(issue_favorite instanceof L.Favorite);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.favorite query");
      }
    });

    /** Test the issue.lastAppliedTemplate query for L.Template */
    it("issue.lastAppliedTemplate", async () => {
      if (_issue) {
        const issue_lastAppliedTemplate: L.Template | undefined | null = await _issue.lastAppliedTemplate;
        expect(issue_lastAppliedTemplate instanceof L.Template);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.lastAppliedTemplate query");
      }
    });

    /** Test the issue.parent query for L.Issue */
    it("issue.parent", async () => {
      if (_issue) {
        const issue_parent: L.Issue | undefined | null = await _issue.parent;
        expect(issue_parent instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.parent query");
      }
    });

    /** Test the issue.project query for L.Project */
    it("issue.project", async () => {
      if (_issue) {
        const issue_project: L.Project | undefined | null = await _issue.project;
        expect(issue_project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.project query");
      }
    });

    /** Test the issue.projectMilestone query for L.ProjectMilestone */
    it("issue.projectMilestone", async () => {
      if (_issue) {
        const issue_projectMilestone: L.ProjectMilestone | undefined | null = await _issue.projectMilestone;
        expect(issue_projectMilestone instanceof L.ProjectMilestone);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.projectMilestone query");
      }
    });

    /** Test the issue.recurringIssueTemplate query for L.Template */
    it("issue.recurringIssueTemplate", async () => {
      if (_issue) {
        const issue_recurringIssueTemplate: L.Template | undefined | null = await _issue.recurringIssueTemplate;
        expect(issue_recurringIssueTemplate instanceof L.Template);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.recurringIssueTemplate query");
      }
    });

    /** Test the issue.snoozedBy query for L.User */
    it("issue.snoozedBy", async () => {
      if (_issue) {
        const issue_snoozedBy: L.User | undefined | null = await _issue.snoozedBy;
        expect(issue_snoozedBy instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.snoozedBy query");
      }
    });

    /** Test the issue.sourceComment query for L.Comment */
    it("issue.sourceComment", async () => {
      if (_issue) {
        const issue_sourceComment: L.Comment | undefined | null = await _issue.sourceComment;
        expect(issue_sourceComment instanceof L.Comment);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.sourceComment query");
      }
    });

    /** Test the issue.state query for L.WorkflowState */
    it("issue.state", async () => {
      if (_issue) {
        const issue_state: L.WorkflowState | undefined | null = await _issue.state;
        expect(issue_state instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Issue found - cannot test issue.state query");
      }
    });

    /** Test the issue.team query for L.Team */
    it("issue.team", async () => {
      if (_issue) {
        const issue_team: L.Team | undefined | null = await _issue.team;
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
      | L.CustomViewNotificationSubscription
      | L.CustomerNotificationSubscription
      | L.CycleNotificationSubscription
      | L.InitiativeNotificationSubscription
      | L.LabelNotificationSubscription
      | L.ProjectNotificationSubscription
      | L.TeamNotificationSubscription
      | L.UserNotificationSubscription
      | undefined
      | null;
    let _notificationSubscription_id: string | undefined | null;

    /** Test the root connection query for the NotificationSubscription */
    it("notificationSubscriptions", async () => {
      const notificationSubscriptions: L.NotificationSubscriptionConnection | undefined | null =
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
          | L.CustomViewNotificationSubscription
          | L.CustomerNotificationSubscription
          | L.CycleNotificationSubscription
          | L.InitiativeNotificationSubscription
          | L.LabelNotificationSubscription
          | L.ProjectNotificationSubscription
          | L.TeamNotificationSubscription
          | L.UserNotificationSubscription
          | undefined
          | null = await client.notificationSubscription(_notificationSubscription_id);
        _notificationSubscription = notificationSubscription;
        expect(notificationSubscription instanceof L.NotificationSubscription);
      } else {
        console.warn(
          "codegen-doc:print: No first NotificationSubscription found in connection - cannot test notificationSubscription query"
        );
      }
    });

    /** Test the notificationSubscription.customView query for L.CustomView */
    it("notificationSubscription.customView", async () => {
      if (_notificationSubscription) {
        const notificationSubscription_customView: L.CustomView | undefined | null =
          await _notificationSubscription.customView;
        expect(notificationSubscription_customView instanceof L.CustomView);
      } else {
        console.warn(
          "codegen-doc:print: No NotificationSubscription found - cannot test notificationSubscription.customView query"
        );
      }
    });

    /** Test the notificationSubscription.customer query for L.Customer */
    it("notificationSubscription.customer", async () => {
      if (_notificationSubscription) {
        const notificationSubscription_customer: L.Customer | undefined | null =
          await _notificationSubscription.customer;
        expect(notificationSubscription_customer instanceof L.Customer);
      } else {
        console.warn(
          "codegen-doc:print: No NotificationSubscription found - cannot test notificationSubscription.customer query"
        );
      }
    });

    /** Test the notificationSubscription.cycle query for L.Cycle */
    it("notificationSubscription.cycle", async () => {
      if (_notificationSubscription) {
        const notificationSubscription_cycle: L.Cycle | undefined | null = await _notificationSubscription.cycle;
        expect(notificationSubscription_cycle instanceof L.Cycle);
      } else {
        console.warn(
          "codegen-doc:print: No NotificationSubscription found - cannot test notificationSubscription.cycle query"
        );
      }
    });

    /** Test the notificationSubscription.initiative query for L.Initiative */
    it("notificationSubscription.initiative", async () => {
      if (_notificationSubscription) {
        const notificationSubscription_initiative: L.Initiative | undefined | null =
          await _notificationSubscription.initiative;
        expect(notificationSubscription_initiative instanceof L.Initiative);
      } else {
        console.warn(
          "codegen-doc:print: No NotificationSubscription found - cannot test notificationSubscription.initiative query"
        );
      }
    });

    /** Test the notificationSubscription.label query for L.IssueLabel */
    it("notificationSubscription.label", async () => {
      if (_notificationSubscription) {
        const notificationSubscription_label: L.IssueLabel | undefined | null = await _notificationSubscription.label;
        expect(notificationSubscription_label instanceof L.IssueLabel);
      } else {
        console.warn(
          "codegen-doc:print: No NotificationSubscription found - cannot test notificationSubscription.label query"
        );
      }
    });

    /** Test the notificationSubscription.project query for L.Project */
    it("notificationSubscription.project", async () => {
      if (_notificationSubscription) {
        const notificationSubscription_project: L.Project | undefined | null = await _notificationSubscription.project;
        expect(notificationSubscription_project instanceof L.Project);
      } else {
        console.warn(
          "codegen-doc:print: No NotificationSubscription found - cannot test notificationSubscription.project query"
        );
      }
    });

    /** Test the notificationSubscription.subscriber query for L.User */
    it("notificationSubscription.subscriber", async () => {
      if (_notificationSubscription) {
        const notificationSubscription_subscriber: L.User | undefined | null =
          await _notificationSubscription.subscriber;
        expect(notificationSubscription_subscriber instanceof L.User);
      } else {
        console.warn(
          "codegen-doc:print: No NotificationSubscription found - cannot test notificationSubscription.subscriber query"
        );
      }
    });

    /** Test the notificationSubscription.team query for L.Team */
    it("notificationSubscription.team", async () => {
      if (_notificationSubscription) {
        const notificationSubscription_team: L.Team | undefined | null = await _notificationSubscription.team;
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
        const notificationSubscription_user: L.User | undefined | null = await _notificationSubscription.user;
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
      | L.CustomerNeedNotification
      | L.CustomerNotification
      | L.DocumentNotification
      | L.InitiativeNotification
      | L.IssueNotification
      | L.OauthClientApprovalNotification
      | L.PostNotification
      | L.ProjectNotification
      | L.PullRequestNotification
      | L.WelcomeMessageNotification
      | undefined
      | null;
    let _notification_id: string | undefined | null;

    /** Test the root connection query for the Notification */
    it("notifications", async () => {
      const notifications: L.NotificationConnection | undefined | null = await client.notifications();
      const notification = notifications?.nodes?.[0];
      _notification_id = notification?.id;
      expect(notifications instanceof L.NotificationConnection);
    });

    /** Test the root query for a single Notification */
    it("notification", async () => {
      if (_notification_id) {
        const notification:
          | L.Notification
          | L.CustomerNeedNotification
          | L.CustomerNotification
          | L.DocumentNotification
          | L.InitiativeNotification
          | L.IssueNotification
          | L.OauthClientApprovalNotification
          | L.PostNotification
          | L.ProjectNotification
          | L.PullRequestNotification
          | L.WelcomeMessageNotification
          | undefined
          | null = await client.notification(_notification_id);
        _notification = notification;
        expect(notification instanceof L.Notification);
      } else {
        console.warn("codegen-doc:print: No first Notification found in connection - cannot test notification query");
      }
    });

    /** Test the notification.actor query for L.User */
    it("notification.actor", async () => {
      if (_notification) {
        const notification_actor: L.User | undefined | null = await _notification.actor;
        expect(notification_actor instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Notification found - cannot test notification.actor query");
      }
    });

    /** Test the notification.externalUserActor query for L.ExternalUser */
    it("notification.externalUserActor", async () => {
      if (_notification) {
        const notification_externalUserActor: L.ExternalUser | undefined | null = await _notification.externalUserActor;
        expect(notification_externalUserActor instanceof L.ExternalUser);
      } else {
        console.warn("codegen-doc:print: No Notification found - cannot test notification.externalUserActor query");
      }
    });

    /** Test the notification.user query for L.User */
    it("notification.user", async () => {
      if (_notification) {
        const notification_user: L.User | undefined | null = await _notification.user;
        expect(notification_user instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Notification found - cannot test notification.user query");
      }
    });
  });

  /** Test Organization query */
  describe("Organization", () => {
    let _organization: L.Organization | undefined | null;

    /** Test the root model query for Organization */
    it("organization", async () => {
      const organization: L.Organization | undefined | null = await client.organization;
      _organization = organization;
      expect(organization instanceof L.Organization);
    });

    /** Test the organization connection query for the Integration */
    it("organization.integrations", async () => {
      if (_organization) {
        const integrations: L.IntegrationConnection | undefined | null = await _organization.integrations();
        expect(integrations instanceof L.IntegrationConnection);
      } else {
        console.warn("codegen-doc:print: No organization found - cannot test _organization.integrations query");
      }
    });

    /** Test the organization connection query for the IssueLabel */
    it("organization.labels", async () => {
      if (_organization) {
        const labels: L.IssueLabelConnection | undefined | null = await _organization.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        console.warn("codegen-doc:print: No organization found - cannot test _organization.labels query");
      }
    });

    /** Test the organization connection query for the ProjectLabel */
    it("organization.projectLabels", async () => {
      if (_organization) {
        const projectLabels: L.ProjectLabelConnection | undefined | null = await _organization.projectLabels();
        expect(projectLabels instanceof L.ProjectLabelConnection);
      } else {
        console.warn("codegen-doc:print: No organization found - cannot test _organization.projectLabels query");
      }
    });

    /** Test the organization model query for Organization_Subscription */
    it("organization.subscription", async () => {
      if (_organization) {
        const subscription: L.PaidSubscription | undefined | null = _organization.subscription;
        expect(subscription instanceof L.PaidSubscription);
      } else {
        console.warn("codegen-doc:print: No organization found - cannot test _organization.subscription query");
      }
    });

    /** Test the organization connection query for the Team */
    it("organization.teams", async () => {
      if (_organization) {
        const teams: L.TeamConnection | undefined | null = await _organization.teams();
        expect(teams instanceof L.TeamConnection);
      } else {
        console.warn("codegen-doc:print: No organization found - cannot test _organization.teams query");
      }
    });

    /** Test the organization connection query for the Template */
    it("organization.templates", async () => {
      if (_organization) {
        const templates: L.TemplateConnection | undefined | null = await _organization.templates();
        expect(templates instanceof L.TemplateConnection);
      } else {
        console.warn("codegen-doc:print: No organization found - cannot test _organization.templates query");
      }
    });

    /** Test the organization connection query for the User */
    it("organization.users", async () => {
      if (_organization) {
        const users: L.UserConnection | undefined | null = await _organization.users();
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
      const organizationExists: L.OrganizationExistsPayload | undefined | null =
        await client.organizationExists("mock-urlKey");
      expect(organizationExists instanceof L.OrganizationExistsPayload);
    });
  });

  /** Test all OrganizationInvite queries */
  describe("OrganizationInvites", () => {
    let _organizationInvite: L.OrganizationInvite | undefined | null;
    let _organizationInvite_id: string | undefined | null;

    /** Test the root connection query for the OrganizationInvite */
    it("organizationInvites", async () => {
      const organizationInvites: L.OrganizationInviteConnection | undefined | null = await client.organizationInvites();
      const organizationInvite = organizationInvites?.nodes?.[0];
      _organizationInvite_id = organizationInvite?.id;
      expect(organizationInvites instanceof L.OrganizationInviteConnection);
    });

    /** Test the root query for a single OrganizationInvite */
    it("organizationInvite", async () => {
      if (_organizationInvite_id) {
        const organizationInvite: L.OrganizationInvite | undefined | null =
          await client.organizationInvite(_organizationInvite_id);
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
        const organizationInvite_invitee: L.User | undefined | null = await _organizationInvite.invitee;
        expect(organizationInvite_invitee instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No OrganizationInvite found - cannot test organizationInvite.invitee query");
      }
    });

    /** Test the organizationInvite.inviter query for L.User */
    it("organizationInvite.inviter", async () => {
      if (_organizationInvite) {
        const organizationInvite_inviter: L.User | undefined | null = await _organizationInvite.inviter;
        expect(organizationInvite_inviter instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No OrganizationInvite found - cannot test organizationInvite.inviter query");
      }
    });

    /** Test the organizationInvite.organization query for L.Organization */
    it("organizationInvite.organization", async () => {
      if (_organizationInvite) {
        const organizationInvite_organization: L.Organization | undefined | null =
          await _organizationInvite.organization;
        expect(organizationInvite_organization instanceof L.Organization);
      } else {
        console.warn(
          "codegen-doc:print: No OrganizationInvite found - cannot test organizationInvite.organization query"
        );
      }
    });
  });

  /** Test ProjectFilterSuggestion query */
  describe("ProjectFilterSuggestion", () => {
    /** Test the root model query for ProjectFilterSuggestion */
    it("projectFilterSuggestion", async () => {
      const projectFilterSuggestion: L.ProjectFilterSuggestionPayload | undefined | null =
        await client.projectFilterSuggestion("mock-prompt");
      expect(projectFilterSuggestion instanceof L.ProjectFilterSuggestionPayload);
    });
  });

  /** Test all ProjectLabel queries */
  describe("ProjectLabels", () => {
    let _projectLabel: L.ProjectLabel | undefined | null;
    let _projectLabel_id: string | undefined | null;

    /** Test the root connection query for the ProjectLabel */
    it("projectLabels", async () => {
      const projectLabels: L.ProjectLabelConnection | undefined | null = await client.projectLabels();
      const projectLabel = projectLabels?.nodes?.[0];
      _projectLabel_id = projectLabel?.id;
      expect(projectLabels instanceof L.ProjectLabelConnection);
    });

    /** Test the root query for a single ProjectLabel */
    it("projectLabel", async () => {
      if (_projectLabel_id) {
        const projectLabel: L.ProjectLabel | undefined | null = await client.projectLabel(_projectLabel_id);
        _projectLabel = projectLabel;
        expect(projectLabel instanceof L.ProjectLabel);
      } else {
        console.warn("codegen-doc:print: No first ProjectLabel found in connection - cannot test projectLabel query");
      }
    });

    /** Test the projectLabel connection query for the ProjectLabel */
    it("projectLabel.children", async () => {
      if (_projectLabel) {
        const children: L.ProjectLabelConnection | undefined | null = await _projectLabel.children();
        expect(children instanceof L.ProjectLabelConnection);
      } else {
        console.warn("codegen-doc:print: No projectLabel found - cannot test _projectLabel.children query");
      }
    });

    /** Test the projectLabel connection query for the Project */
    it("projectLabel.projects", async () => {
      if (_projectLabel) {
        const projects: L.ProjectConnection | undefined | null = await _projectLabel.projects();
        expect(projects instanceof L.ProjectConnection);
      } else {
        console.warn("codegen-doc:print: No projectLabel found - cannot test _projectLabel.projects query");
      }
    });

    /** Test the projectLabel.creator query for L.User */
    it("projectLabel.creator", async () => {
      if (_projectLabel) {
        const projectLabel_creator: L.User | undefined | null = await _projectLabel.creator;
        expect(projectLabel_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No ProjectLabel found - cannot test projectLabel.creator query");
      }
    });

    /** Test the projectLabel.organization query for L.Organization */
    it("projectLabel.organization", async () => {
      if (_projectLabel) {
        const projectLabel_organization: L.Organization | undefined | null = await _projectLabel.organization;
        expect(projectLabel_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No ProjectLabel found - cannot test projectLabel.organization query");
      }
    });

    /** Test the projectLabel.parent query for L.ProjectLabel */
    it("projectLabel.parent", async () => {
      if (_projectLabel) {
        const projectLabel_parent: L.ProjectLabel | undefined | null = await _projectLabel.parent;
        expect(projectLabel_parent instanceof L.ProjectLabel);
      } else {
        console.warn("codegen-doc:print: No ProjectLabel found - cannot test projectLabel.parent query");
      }
    });

    /** Test the projectLabel.retiredBy query for L.User */
    it("projectLabel.retiredBy", async () => {
      if (_projectLabel) {
        const projectLabel_retiredBy: L.User | undefined | null = await _projectLabel.retiredBy;
        expect(projectLabel_retiredBy instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No ProjectLabel found - cannot test projectLabel.retiredBy query");
      }
    });
  });

  /** Test all ProjectMilestone queries */
  describe("ProjectMilestones", () => {
    let _projectMilestone: L.ProjectMilestone | undefined | null;
    let _projectMilestone_id: string | undefined | null;

    /** Test the root connection query for the ProjectMilestone */
    it("projectMilestones", async () => {
      const projectMilestones: L.ProjectMilestoneConnection | undefined | null = await client.projectMilestones();
      const projectMilestone = projectMilestones?.nodes?.[0];
      _projectMilestone_id = projectMilestone?.id;
      expect(projectMilestones instanceof L.ProjectMilestoneConnection);
    });

    /** Test the root query for a single ProjectMilestone */
    it("projectMilestone", async () => {
      if (_projectMilestone_id) {
        const projectMilestone: L.ProjectMilestone | undefined | null =
          await client.projectMilestone(_projectMilestone_id);
        _projectMilestone = projectMilestone;
        expect(projectMilestone instanceof L.ProjectMilestone);
      } else {
        console.warn(
          "codegen-doc:print: No first ProjectMilestone found in connection - cannot test projectMilestone query"
        );
      }
    });

    let _documentContent: L.DocumentContent | undefined | null;

    /** Test the projectMilestone model query for ProjectMilestone_DocumentContent */
    it("projectMilestone.documentContent", async () => {
      if (_projectMilestone) {
        const documentContent: L.DocumentContent | undefined | null = _projectMilestone.documentContent;
        _documentContent = documentContent;
        expect(documentContent instanceof L.DocumentContent);
      } else {
        console.warn(
          "codegen-doc:print: No projectMilestone found - cannot test _projectMilestone.documentContent query"
        );
      }
    });

    /** Test the projectMilestone_documentContent model query for ProjectMilestone_DocumentContent_AiPromptRules */
    it("projectMilestone_documentContent.aiPromptRules", async () => {
      if (_documentContent) {
        const aiPromptRules: L.AiPromptRules | undefined | null = _documentContent.aiPromptRules;
        expect(aiPromptRules instanceof L.AiPromptRules);
      } else {
        console.warn("codegen-doc:print: No documentContent found - cannot test _documentContent.aiPromptRules query");
      }
    });

    /** Test the projectMilestone_documentContent model query for ProjectMilestone_DocumentContent_WelcomeMessage */
    it("projectMilestone_documentContent.welcomeMessage", async () => {
      if (_documentContent) {
        const welcomeMessage: L.WelcomeMessage | undefined | null = _documentContent.welcomeMessage;
        expect(welcomeMessage instanceof L.WelcomeMessage);
      } else {
        console.warn("codegen-doc:print: No documentContent found - cannot test _documentContent.welcomeMessage query");
      }
    });

    /** Test the projectMilestone connection query for the Issue */
    it("projectMilestone.issues", async () => {
      if (_projectMilestone) {
        const issues: L.IssueConnection | undefined | null = await _projectMilestone.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No projectMilestone found - cannot test _projectMilestone.issues query");
      }
    });

    /** Test the projectMilestone.project query for L.Project */
    it("projectMilestone.project", async () => {
      if (_projectMilestone) {
        const projectMilestone_project: L.Project | undefined | null = await _projectMilestone.project;
        expect(projectMilestone_project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No ProjectMilestone found - cannot test projectMilestone.project query");
      }
    });
  });

  /** Test all ProjectRelation queries */
  describe("ProjectRelations", () => {
    let _projectRelation: L.ProjectRelation | undefined | null;
    let _projectRelation_id: string | undefined | null;

    /** Test the root connection query for the ProjectRelation */
    it("projectRelations", async () => {
      const projectRelations: L.ProjectRelationConnection | undefined | null = await client.projectRelations();
      const projectRelation = projectRelations?.nodes?.[0];
      _projectRelation_id = projectRelation?.id;
      expect(projectRelations instanceof L.ProjectRelationConnection);
    });

    /** Test the root query for a single ProjectRelation */
    it("projectRelation", async () => {
      if (_projectRelation_id) {
        const projectRelation: L.ProjectRelation | undefined | null = await client.projectRelation(_projectRelation_id);
        _projectRelation = projectRelation;
        expect(projectRelation instanceof L.ProjectRelation);
      } else {
        console.warn(
          "codegen-doc:print: No first ProjectRelation found in connection - cannot test projectRelation query"
        );
      }
    });

    /** Test the projectRelation.project query for L.Project */
    it("projectRelation.project", async () => {
      if (_projectRelation) {
        const projectRelation_project: L.Project | undefined | null = await _projectRelation.project;
        expect(projectRelation_project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No ProjectRelation found - cannot test projectRelation.project query");
      }
    });

    /** Test the projectRelation.projectMilestone query for L.ProjectMilestone */
    it("projectRelation.projectMilestone", async () => {
      if (_projectRelation) {
        const projectRelation_projectMilestone: L.ProjectMilestone | undefined | null =
          await _projectRelation.projectMilestone;
        expect(projectRelation_projectMilestone instanceof L.ProjectMilestone);
      } else {
        console.warn(
          "codegen-doc:print: No ProjectRelation found - cannot test projectRelation.projectMilestone query"
        );
      }
    });

    /** Test the projectRelation.relatedProject query for L.Project */
    it("projectRelation.relatedProject", async () => {
      if (_projectRelation) {
        const projectRelation_relatedProject: L.Project | undefined | null = await _projectRelation.relatedProject;
        expect(projectRelation_relatedProject instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No ProjectRelation found - cannot test projectRelation.relatedProject query");
      }
    });

    /** Test the projectRelation.relatedProjectMilestone query for L.ProjectMilestone */
    it("projectRelation.relatedProjectMilestone", async () => {
      if (_projectRelation) {
        const projectRelation_relatedProjectMilestone: L.ProjectMilestone | undefined | null =
          await _projectRelation.relatedProjectMilestone;
        expect(projectRelation_relatedProjectMilestone instanceof L.ProjectMilestone);
      } else {
        console.warn(
          "codegen-doc:print: No ProjectRelation found - cannot test projectRelation.relatedProjectMilestone query"
        );
      }
    });

    /** Test the projectRelation.user query for L.User */
    it("projectRelation.user", async () => {
      if (_projectRelation) {
        const projectRelation_user: L.User | undefined | null = await _projectRelation.user;
        expect(projectRelation_user instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No ProjectRelation found - cannot test projectRelation.user query");
      }
    });
  });

  /** Test all ProjectStatus queries */
  describe("ProjectStatuses", () => {
    let _projectStatus: L.ProjectStatus | undefined | null;
    let _projectStatus_id: string | undefined | null;

    /** Test the root connection query for the ProjectStatus */
    it("projectStatuses", async () => {
      const projectStatuses: L.ProjectStatusConnection | undefined | null = await client.projectStatuses();
      const projectStatus = projectStatuses?.nodes?.[0];
      _projectStatus_id = projectStatus?.id;
      expect(projectStatuses instanceof L.ProjectStatusConnection);
    });

    /** Test the root query for a single ProjectStatus */
    it("projectStatus", async () => {
      if (_projectStatus_id) {
        const projectStatus: L.ProjectStatus | undefined | null = await client.projectStatus(_projectStatus_id);
        expect(projectStatus instanceof L.ProjectStatus);
      } else {
        console.warn("codegen-doc:print: No first ProjectStatus found in connection - cannot test projectStatus query");
      }
    });
  });

  /** Test all ProjectUpdate queries */
  describe("ProjectUpdates", () => {
    let _projectUpdate: L.ProjectUpdate | undefined | null;
    let _projectUpdate_id: string | undefined | null;

    /** Test the root connection query for the ProjectUpdate */
    it("projectUpdates", async () => {
      const projectUpdates: L.ProjectUpdateConnection | undefined | null = await client.projectUpdates();
      const projectUpdate = projectUpdates?.nodes?.[0];
      _projectUpdate_id = projectUpdate?.id;
      expect(projectUpdates instanceof L.ProjectUpdateConnection);
    });

    /** Test the root query for a single ProjectUpdate */
    it("projectUpdate", async () => {
      if (_projectUpdate_id) {
        const projectUpdate: L.ProjectUpdate | undefined | null = await client.projectUpdate(_projectUpdate_id);
        _projectUpdate = projectUpdate;
        expect(projectUpdate instanceof L.ProjectUpdate);
      } else {
        console.warn("codegen-doc:print: No first ProjectUpdate found in connection - cannot test projectUpdate query");
      }
    });

    /** Test the projectUpdate connection query for the Comment */
    it("projectUpdate.comments", async () => {
      if (_projectUpdate) {
        const comments: L.CommentConnection | undefined | null = await _projectUpdate.comments();
        expect(comments instanceof L.CommentConnection);
      } else {
        console.warn("codegen-doc:print: No projectUpdate found - cannot test _projectUpdate.comments query");
      }
    });

    /** Test the projectUpdate.project query for L.Project */
    it("projectUpdate.project", async () => {
      if (_projectUpdate) {
        const projectUpdate_project: L.Project | undefined | null = await _projectUpdate.project;
        expect(projectUpdate_project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No ProjectUpdate found - cannot test projectUpdate.project query");
      }
    });

    /** Test the projectUpdate.user query for L.User */
    it("projectUpdate.user", async () => {
      if (_projectUpdate) {
        const projectUpdate_user: L.User | undefined | null = await _projectUpdate.user;
        expect(projectUpdate_user instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No ProjectUpdate found - cannot test projectUpdate.user query");
      }
    });
  });

  /** Test all Project queries */
  describe("Projects", () => {
    let _project: L.Project | undefined | null;
    let _project_id: string | undefined | null;

    /** Test the root connection query for the Project */
    it("projects", async () => {
      const projects: L.ProjectConnection | undefined | null = await client.projects();
      const project = projects?.nodes?.[0];
      _project_id = project?.id;
      expect(projects instanceof L.ProjectConnection);
    });

    /** Test the root query for a single Project */
    it("project", async () => {
      if (_project_id) {
        const project: L.Project | undefined | null = await client.project(_project_id);
        _project = project;
        expect(project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No first Project found in connection - cannot test project query");
      }
    });

    /** Test the project connection query for the ProjectAttachment */
    it("project.attachments", async () => {
      if (_project) {
        const attachments: L.ProjectAttachmentConnection | undefined | null = await _project.attachments();
        expect(attachments instanceof L.ProjectAttachmentConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.attachments query");
      }
    });

    /** Test the project connection query for the Comment */
    it("project.comments", async () => {
      if (_project) {
        const comments: L.CommentConnection | undefined | null = await _project.comments();
        expect(comments instanceof L.CommentConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.comments query");
      }
    });

    let _documentContent: L.DocumentContent | undefined | null;

    /** Test the project model query for Project_DocumentContent */
    it("project.documentContent", async () => {
      if (_project) {
        const documentContent: L.DocumentContent | undefined | null = _project.documentContent;
        _documentContent = documentContent;
        expect(documentContent instanceof L.DocumentContent);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.documentContent query");
      }
    });

    /** Test the project_documentContent model query for Project_DocumentContent_AiPromptRules */
    it("project_documentContent.aiPromptRules", async () => {
      if (_documentContent) {
        const aiPromptRules: L.AiPromptRules | undefined | null = _documentContent.aiPromptRules;
        expect(aiPromptRules instanceof L.AiPromptRules);
      } else {
        console.warn("codegen-doc:print: No documentContent found - cannot test _documentContent.aiPromptRules query");
      }
    });

    /** Test the project_documentContent model query for Project_DocumentContent_WelcomeMessage */
    it("project_documentContent.welcomeMessage", async () => {
      if (_documentContent) {
        const welcomeMessage: L.WelcomeMessage | undefined | null = _documentContent.welcomeMessage;
        expect(welcomeMessage instanceof L.WelcomeMessage);
      } else {
        console.warn("codegen-doc:print: No documentContent found - cannot test _documentContent.welcomeMessage query");
      }
    });

    /** Test the project connection query for the Document */
    it("project.documents", async () => {
      if (_project) {
        const documents: L.DocumentConnection | undefined | null = await _project.documents();
        expect(documents instanceof L.DocumentConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.documents query");
      }
    });

    /** Test the project connection query for the EntityExternalLink */
    it("project.externalLinks", async () => {
      if (_project) {
        const externalLinks: L.EntityExternalLinkConnection | undefined | null = await _project.externalLinks();
        expect(externalLinks instanceof L.EntityExternalLinkConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.externalLinks query");
      }
    });

    /** Test the project connection query for the ProjectHistory */
    it("project.history", async () => {
      if (_project) {
        const history: L.ProjectHistoryConnection | undefined | null = await _project.history();
        expect(history instanceof L.ProjectHistoryConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.history query");
      }
    });

    /** Test the project connection query for the InitiativeToProject */
    it("project.initiativeToProjects", async () => {
      if (_project) {
        const initiativeToProjects: L.InitiativeToProjectConnection | undefined | null =
          await _project.initiativeToProjects();
        expect(initiativeToProjects instanceof L.InitiativeToProjectConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.initiativeToProjects query");
      }
    });

    /** Test the project connection query for the Initiative */
    it("project.initiatives", async () => {
      if (_project) {
        const initiatives: L.InitiativeConnection | undefined | null = await _project.initiatives();
        expect(initiatives instanceof L.InitiativeConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.initiatives query");
      }
    });

    /** Test the project connection query for the ProjectRelation */
    it("project.inverseRelations", async () => {
      if (_project) {
        const inverseRelations: L.ProjectRelationConnection | undefined | null = await _project.inverseRelations();
        expect(inverseRelations instanceof L.ProjectRelationConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.inverseRelations query");
      }
    });

    /** Test the project connection query for the Issue */
    it("project.issues", async () => {
      if (_project) {
        const issues: L.IssueConnection | undefined | null = await _project.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.issues query");
      }
    });

    /** Test the project connection query for the ProjectLabel */
    it("project.labels", async () => {
      if (_project) {
        const labels: L.ProjectLabelConnection | undefined | null = await _project.labels();
        expect(labels instanceof L.ProjectLabelConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.labels query");
      }
    });

    /** Test the project connection query for the User */
    it("project.members", async () => {
      if (_project) {
        const members: L.UserConnection | undefined | null = await _project.members();
        expect(members instanceof L.UserConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.members query");
      }
    });

    /** Test the project connection query for the CustomerNeed */
    it("project.needs", async () => {
      if (_project) {
        const needs: L.CustomerNeedConnection | undefined | null = await _project.needs();
        expect(needs instanceof L.CustomerNeedConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.needs query");
      }
    });

    /** Test the project connection query for the ProjectMilestone */
    it("project.projectMilestones", async () => {
      if (_project) {
        const projectMilestones: L.ProjectMilestoneConnection | undefined | null = await _project.projectMilestones();
        expect(projectMilestones instanceof L.ProjectMilestoneConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.projectMilestones query");
      }
    });

    /** Test the project connection query for the ProjectUpdate */
    it("project.projectUpdates", async () => {
      if (_project) {
        const projectUpdates: L.ProjectUpdateConnection | undefined | null = await _project.projectUpdates();
        expect(projectUpdates instanceof L.ProjectUpdateConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.projectUpdates query");
      }
    });

    /** Test the project connection query for the ProjectRelation */
    it("project.relations", async () => {
      if (_project) {
        const relations: L.ProjectRelationConnection | undefined | null = await _project.relations();
        expect(relations instanceof L.ProjectRelationConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.relations query");
      }
    });

    /** Test the project connection query for the Team */
    it("project.teams", async () => {
      if (_project) {
        const teams: L.TeamConnection | undefined | null = await _project.teams();
        expect(teams instanceof L.TeamConnection);
      } else {
        console.warn("codegen-doc:print: No project found - cannot test _project.teams query");
      }
    });

    /** Test the project.convertedFromIssue query for L.Issue */
    it("project.convertedFromIssue", async () => {
      if (_project) {
        const project_convertedFromIssue: L.Issue | undefined | null = await _project.convertedFromIssue;
        expect(project_convertedFromIssue instanceof L.Issue);
      } else {
        console.warn("codegen-doc:print: No Project found - cannot test project.convertedFromIssue query");
      }
    });

    /** Test the project.creator query for L.User */
    it("project.creator", async () => {
      if (_project) {
        const project_creator: L.User | undefined | null = await _project.creator;
        expect(project_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Project found - cannot test project.creator query");
      }
    });

    /** Test the project.favorite query for L.Favorite */
    it("project.favorite", async () => {
      if (_project) {
        const project_favorite: L.Favorite | undefined | null = await _project.favorite;
        expect(project_favorite instanceof L.Favorite);
      } else {
        console.warn("codegen-doc:print: No Project found - cannot test project.favorite query");
      }
    });

    /** Test the project.integrationsSettings query for L.IntegrationsSettings */
    it("project.integrationsSettings", async () => {
      if (_project) {
        const project_integrationsSettings: L.IntegrationsSettings | undefined | null =
          await _project.integrationsSettings;
        expect(project_integrationsSettings instanceof L.IntegrationsSettings);
      } else {
        console.warn("codegen-doc:print: No Project found - cannot test project.integrationsSettings query");
      }
    });

    /** Test the project.lastAppliedTemplate query for L.Template */
    it("project.lastAppliedTemplate", async () => {
      if (_project) {
        const project_lastAppliedTemplate: L.Template | undefined | null = await _project.lastAppliedTemplate;
        expect(project_lastAppliedTemplate instanceof L.Template);
      } else {
        console.warn("codegen-doc:print: No Project found - cannot test project.lastAppliedTemplate query");
      }
    });

    /** Test the project.lastUpdate query for L.ProjectUpdate */
    it("project.lastUpdate", async () => {
      if (_project) {
        const project_lastUpdate: L.ProjectUpdate | undefined | null = await _project.lastUpdate;
        expect(project_lastUpdate instanceof L.ProjectUpdate);
      } else {
        console.warn("codegen-doc:print: No Project found - cannot test project.lastUpdate query");
      }
    });

    /** Test the project.lead query for L.User */
    it("project.lead", async () => {
      if (_project) {
        const project_lead: L.User | undefined | null = await _project.lead;
        expect(project_lead instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Project found - cannot test project.lead query");
      }
    });

    /** Test the project.status query for L.ProjectStatus */
    it("project.status", async () => {
      if (_project) {
        const project_status: L.ProjectStatus | undefined | null = await _project.status;
        expect(project_status instanceof L.ProjectStatus);
      } else {
        console.warn("codegen-doc:print: No Project found - cannot test project.status query");
      }
    });
  });

  /** Test PushSubscriptionTest query */
  describe("PushSubscriptionTest", () => {
    /** Test the root model query for PushSubscriptionTest */
    it("pushSubscriptionTest", async () => {
      const pushSubscriptionTest: L.PushSubscriptionTestPayload | undefined | null =
        await client.pushSubscriptionTest();
      expect(pushSubscriptionTest instanceof L.PushSubscriptionTestPayload);
    });
  });

  /** Test RateLimitStatus query */
  describe("RateLimitStatus", () => {
    /** Test the root model query for RateLimitStatus */
    it("rateLimitStatus", async () => {
      const rateLimitStatus: L.RateLimitPayload | undefined | null = await client.rateLimitStatus;
      expect(rateLimitStatus instanceof L.RateLimitPayload);
    });
  });

  /** Test all RoadmapToProject queries */
  describe("RoadmapToProjects", () => {
    let _roadmapToProject: L.RoadmapToProject | undefined | null;
    let _roadmapToProject_id: string | undefined | null;

    /** Test the root connection query for the RoadmapToProject */
    it("roadmapToProjects", async () => {
      const roadmapToProjects: L.RoadmapToProjectConnection | undefined | null = await client.roadmapToProjects();
      const roadmapToProject = roadmapToProjects?.nodes?.[0];
      _roadmapToProject_id = roadmapToProject?.id;
      expect(roadmapToProjects instanceof L.RoadmapToProjectConnection);
    });

    /** Test the root query for a single RoadmapToProject */
    it("roadmapToProject", async () => {
      if (_roadmapToProject_id) {
        const roadmapToProject: L.RoadmapToProject | undefined | null =
          await client.roadmapToProject(_roadmapToProject_id);
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
        const roadmapToProject_project: L.Project | undefined | null = await _roadmapToProject.project;
        expect(roadmapToProject_project instanceof L.Project);
      } else {
        console.warn("codegen-doc:print: No RoadmapToProject found - cannot test roadmapToProject.project query");
      }
    });

    /** Test the roadmapToProject.roadmap query for L.Roadmap */
    it("roadmapToProject.roadmap", async () => {
      if (_roadmapToProject) {
        const roadmapToProject_roadmap: L.Roadmap | undefined | null = await _roadmapToProject.roadmap;
        expect(roadmapToProject_roadmap instanceof L.Roadmap);
      } else {
        console.warn("codegen-doc:print: No RoadmapToProject found - cannot test roadmapToProject.roadmap query");
      }
    });
  });

  /** Test all Roadmap queries */
  describe("Roadmaps", () => {
    let _roadmap: L.Roadmap | undefined | null;
    let _roadmap_id: string | undefined | null;

    /** Test the root connection query for the Roadmap */
    it("roadmaps", async () => {
      const roadmaps: L.RoadmapConnection | undefined | null = await client.roadmaps();
      const roadmap = roadmaps?.nodes?.[0];
      _roadmap_id = roadmap?.id;
      expect(roadmaps instanceof L.RoadmapConnection);
    });

    /** Test the root query for a single Roadmap */
    it("roadmap", async () => {
      if (_roadmap_id) {
        const roadmap: L.Roadmap | undefined | null = await client.roadmap(_roadmap_id);
        _roadmap = roadmap;
        expect(roadmap instanceof L.Roadmap);
      } else {
        console.warn("codegen-doc:print: No first Roadmap found in connection - cannot test roadmap query");
      }
    });

    /** Test the roadmap connection query for the Project */
    it("roadmap.projects", async () => {
      if (_roadmap) {
        const projects: L.ProjectConnection | undefined | null = await _roadmap.projects();
        expect(projects instanceof L.ProjectConnection);
      } else {
        console.warn("codegen-doc:print: No roadmap found - cannot test _roadmap.projects query");
      }
    });

    /** Test the roadmap.creator query for L.User */
    it("roadmap.creator", async () => {
      if (_roadmap) {
        const roadmap_creator: L.User | undefined | null = await _roadmap.creator;
        expect(roadmap_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Roadmap found - cannot test roadmap.creator query");
      }
    });

    /** Test the roadmap.organization query for L.Organization */
    it("roadmap.organization", async () => {
      if (_roadmap) {
        const roadmap_organization: L.Organization | undefined | null = await _roadmap.organization;
        expect(roadmap_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No Roadmap found - cannot test roadmap.organization query");
      }
    });

    /** Test the roadmap.owner query for L.User */
    it("roadmap.owner", async () => {
      if (_roadmap) {
        const roadmap_owner: L.User | undefined | null = await _roadmap.owner;
        expect(roadmap_owner instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Roadmap found - cannot test roadmap.owner query");
      }
    });
  });

  /** Test all DocumentSearchResult queries */
  describe("SearchDocuments", () => {
    /** Test the root connection query for the DocumentSearchResult */
    it("searchDocuments", async () => {
      const searchDocuments: L.DocumentSearchPayload | undefined | null = await client.searchDocuments("mock-term");
      expect(searchDocuments instanceof L.DocumentSearchPayload);
    });
  });

  /** Test all IssueSearchResult queries */
  describe("SearchIssues", () => {
    /** Test the root connection query for the IssueSearchResult */
    it("searchIssues", async () => {
      const searchIssues: L.IssueSearchPayload | undefined | null = await client.searchIssues("mock-term");
      expect(searchIssues instanceof L.IssueSearchPayload);
    });
  });

  /** Test all ProjectSearchResult queries */
  describe("SearchProjects", () => {
    /** Test the root connection query for the ProjectSearchResult */
    it("searchProjects", async () => {
      const searchProjects: L.ProjectSearchPayload | undefined | null = await client.searchProjects("mock-term");
      expect(searchProjects instanceof L.ProjectSearchPayload);
    });
  });

  /** Test SemanticSearch query */
  describe("SemanticSearch", () => {
    /** Test the root model query for SemanticSearch */
    it("semanticSearch", async () => {
      const semanticSearch: L.SemanticSearchPayload | undefined | null = await client.semanticSearch("mock-query");
      expect(semanticSearch instanceof L.SemanticSearchPayload);
    });
  });

  /** Test SsoUrlFromEmail query */
  describe("SsoUrlFromEmail", () => {
    /** Test the root model query for SsoUrlFromEmail */
    it("ssoUrlFromEmail", async () => {
      const ssoUrlFromEmail: L.SsoUrlFromEmailResponse | undefined | null = await client.ssoUrlFromEmail(
        "mock-email",
        L.IdentityProviderType.General
      );
      expect(ssoUrlFromEmail instanceof L.SsoUrlFromEmailResponse);
    });
  });

  /** Test all TeamMembership queries */
  describe("TeamMemberships", () => {
    let _teamMembership: L.TeamMembership | undefined | null;
    let _teamMembership_id: string | undefined | null;

    /** Test the root connection query for the TeamMembership */
    it("teamMemberships", async () => {
      const teamMemberships: L.TeamMembershipConnection | undefined | null = await client.teamMemberships();
      const teamMembership = teamMemberships?.nodes?.[0];
      _teamMembership_id = teamMembership?.id;
      expect(teamMemberships instanceof L.TeamMembershipConnection);
    });

    /** Test the root query for a single TeamMembership */
    it("teamMembership", async () => {
      if (_teamMembership_id) {
        const teamMembership: L.TeamMembership | undefined | null = await client.teamMembership(_teamMembership_id);
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
        const teamMembership_team: L.Team | undefined | null = await _teamMembership.team;
        expect(teamMembership_team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No TeamMembership found - cannot test teamMembership.team query");
      }
    });

    /** Test the teamMembership.user query for L.User */
    it("teamMembership.user", async () => {
      if (_teamMembership) {
        const teamMembership_user: L.User | undefined | null = await _teamMembership.user;
        expect(teamMembership_user instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No TeamMembership found - cannot test teamMembership.user query");
      }
    });
  });

  /** Test all Team queries */
  describe("Teams", () => {
    let _team: L.Team | undefined | null;
    let _team_id: string | undefined | null;

    /** Test the root connection query for the Team */
    it("teams", async () => {
      const teams: L.TeamConnection | undefined | null = await client.teams();
      const team = teams?.nodes?.[0];
      _team_id = team?.id;
      expect(teams instanceof L.TeamConnection);
    });

    /** Test the root query for a single Team */
    it("team", async () => {
      if (_team_id) {
        const team: L.Team | undefined | null = await client.team(_team_id);
        _team = team;
        expect(team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No first Team found in connection - cannot test team query");
      }
    });

    /** Test the team connection query for the Cycle */
    it("team.cycles", async () => {
      if (_team) {
        const cycles: L.CycleConnection | undefined | null = await _team.cycles();
        expect(cycles instanceof L.CycleConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.cycles query");
      }
    });

    /** Test the team connection query for the GitAutomationState */
    it("team.gitAutomationStates", async () => {
      if (_team) {
        const gitAutomationStates: L.GitAutomationStateConnection | undefined | null =
          await _team.gitAutomationStates();
        expect(gitAutomationStates instanceof L.GitAutomationStateConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.gitAutomationStates query");
      }
    });

    /** Test the team connection query for the Issue */
    it("team.issues", async () => {
      if (_team) {
        const issues: L.IssueConnection | undefined | null = await _team.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.issues query");
      }
    });

    /** Test the team connection query for the IssueLabel */
    it("team.labels", async () => {
      if (_team) {
        const labels: L.IssueLabelConnection | undefined | null = await _team.labels();
        expect(labels instanceof L.IssueLabelConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.labels query");
      }
    });

    /** Test the team connection query for the User */
    it("team.members", async () => {
      if (_team) {
        const members: L.UserConnection | undefined | null = await _team.members();
        expect(members instanceof L.UserConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.members query");
      }
    });

    /** Test the team connection query for the TeamMembership */
    it("team.memberships", async () => {
      if (_team) {
        const memberships: L.TeamMembershipConnection | undefined | null = await _team.memberships();
        expect(memberships instanceof L.TeamMembershipConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.memberships query");
      }
    });

    /** Test the team connection query for the Project */
    it("team.projects", async () => {
      if (_team) {
        const projects: L.ProjectConnection | undefined | null = await _team.projects();
        expect(projects instanceof L.ProjectConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.projects query");
      }
    });

    /** Test the team connection query for the WorkflowState */
    it("team.states", async () => {
      if (_team) {
        const states: L.WorkflowStateConnection | undefined | null = await _team.states();
        expect(states instanceof L.WorkflowStateConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.states query");
      }
    });

    /** Test the team connection query for the Template */
    it("team.templates", async () => {
      if (_team) {
        const templates: L.TemplateConnection | undefined | null = await _team.templates();
        expect(templates instanceof L.TemplateConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.templates query");
      }
    });

    /** Test the team connection query for the Webhook */
    it("team.webhooks", async () => {
      if (_team) {
        const webhooks: L.WebhookConnection | undefined | null = await _team.webhooks();
        expect(webhooks instanceof L.WebhookConnection);
      } else {
        console.warn("codegen-doc:print: No team found - cannot test _team.webhooks query");
      }
    });

    /** Test the team.activeCycle query for L.Cycle */
    it("team.activeCycle", async () => {
      if (_team) {
        const team_activeCycle: L.Cycle | undefined | null = await _team.activeCycle;
        expect(team_activeCycle instanceof L.Cycle);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.activeCycle query");
      }
    });

    /** Test the team.defaultIssueState query for L.WorkflowState */
    it("team.defaultIssueState", async () => {
      if (_team) {
        const team_defaultIssueState: L.WorkflowState | undefined | null = await _team.defaultIssueState;
        expect(team_defaultIssueState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.defaultIssueState query");
      }
    });

    /** Test the team.defaultProjectTemplate query for L.Template */
    it("team.defaultProjectTemplate", async () => {
      if (_team) {
        const team_defaultProjectTemplate: L.Template | undefined | null = await _team.defaultProjectTemplate;
        expect(team_defaultProjectTemplate instanceof L.Template);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.defaultProjectTemplate query");
      }
    });

    /** Test the team.defaultTemplateForMembers query for L.Template */
    it("team.defaultTemplateForMembers", async () => {
      if (_team) {
        const team_defaultTemplateForMembers: L.Template | undefined | null = await _team.defaultTemplateForMembers;
        expect(team_defaultTemplateForMembers instanceof L.Template);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.defaultTemplateForMembers query");
      }
    });

    /** Test the team.defaultTemplateForNonMembers query for L.Template */
    it("team.defaultTemplateForNonMembers", async () => {
      if (_team) {
        const team_defaultTemplateForNonMembers: L.Template | undefined | null =
          await _team.defaultTemplateForNonMembers;
        expect(team_defaultTemplateForNonMembers instanceof L.Template);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.defaultTemplateForNonMembers query");
      }
    });

    /** Test the team.draftWorkflowState query for L.WorkflowState */
    it("team.draftWorkflowState", async () => {
      if (_team) {
        const team_draftWorkflowState: L.WorkflowState | undefined | null = await _team.draftWorkflowState;
        expect(team_draftWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.draftWorkflowState query");
      }
    });

    /** Test the team.integrationsSettings query for L.IntegrationsSettings */
    it("team.integrationsSettings", async () => {
      if (_team) {
        const team_integrationsSettings: L.IntegrationsSettings | undefined | null = await _team.integrationsSettings;
        expect(team_integrationsSettings instanceof L.IntegrationsSettings);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.integrationsSettings query");
      }
    });

    /** Test the team.markedAsDuplicateWorkflowState query for L.WorkflowState */
    it("team.markedAsDuplicateWorkflowState", async () => {
      if (_team) {
        const team_markedAsDuplicateWorkflowState: L.WorkflowState | undefined | null =
          await _team.markedAsDuplicateWorkflowState;
        expect(team_markedAsDuplicateWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.markedAsDuplicateWorkflowState query");
      }
    });

    /** Test the team.mergeWorkflowState query for L.WorkflowState */
    it("team.mergeWorkflowState", async () => {
      if (_team) {
        const team_mergeWorkflowState: L.WorkflowState | undefined | null = await _team.mergeWorkflowState;
        expect(team_mergeWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.mergeWorkflowState query");
      }
    });

    /** Test the team.mergeableWorkflowState query for L.WorkflowState */
    it("team.mergeableWorkflowState", async () => {
      if (_team) {
        const team_mergeableWorkflowState: L.WorkflowState | undefined | null = await _team.mergeableWorkflowState;
        expect(team_mergeableWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.mergeableWorkflowState query");
      }
    });

    /** Test the team.organization query for L.Organization */
    it("team.organization", async () => {
      if (_team) {
        const team_organization: L.Organization | undefined | null = await _team.organization;
        expect(team_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.organization query");
      }
    });

    /** Test the team.reviewWorkflowState query for L.WorkflowState */
    it("team.reviewWorkflowState", async () => {
      if (_team) {
        const team_reviewWorkflowState: L.WorkflowState | undefined | null = await _team.reviewWorkflowState;
        expect(team_reviewWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.reviewWorkflowState query");
      }
    });

    /** Test the team.startWorkflowState query for L.WorkflowState */
    it("team.startWorkflowState", async () => {
      if (_team) {
        const team_startWorkflowState: L.WorkflowState | undefined | null = await _team.startWorkflowState;
        expect(team_startWorkflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.startWorkflowState query");
      }
    });

    /** Test the team.triageIssueState query for L.WorkflowState */
    it("team.triageIssueState", async () => {
      if (_team) {
        const team_triageIssueState: L.WorkflowState | undefined | null = await _team.triageIssueState;
        expect(team_triageIssueState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.triageIssueState query");
      }
    });

    /** Test the team.triageResponsibility query for L.TriageResponsibility */
    it("team.triageResponsibility", async () => {
      if (_team) {
        const team_triageResponsibility: L.TriageResponsibility | undefined | null = await _team.triageResponsibility;
        expect(team_triageResponsibility instanceof L.TriageResponsibility);
      } else {
        console.warn("codegen-doc:print: No Team found - cannot test team.triageResponsibility query");
      }
    });
  });

  /** Test Template query */
  describe("Template", () => {
    /** Test the root model query for Template */
    it("template", async () => {
      const template: L.Template | undefined | null = await client.template("mock-id");
      expect(template instanceof L.Template);
    });
  });

  /** Test Templates query */
  describe("Templates", () => {
    /** Test the root model query for Templates */
    it("templates", async () => {
      const templates: L.Template[] | undefined | null = await client.templates;
      templates?.map(node => expect(node instanceof L.Template));
    });
  });

  /** Test TemplatesForIntegration query */
  describe("TemplatesForIntegration", () => {
    /** Test the root model query for TemplatesForIntegration */
    it("templatesForIntegration", async () => {
      const templatesForIntegration: L.Template[] | undefined | null =
        await client.templatesForIntegration("mock-integrationType");
      templatesForIntegration?.map(node => expect(node instanceof L.Template));
    });
  });

  /** Test all TimeSchedule queries */
  describe("TimeSchedules", () => {
    let _timeSchedule: L.TimeSchedule | undefined | null;
    let _timeSchedule_id: string | undefined | null;

    /** Test the root connection query for the TimeSchedule */
    it("timeSchedules", async () => {
      const timeSchedules: L.TimeScheduleConnection | undefined | null = await client.timeSchedules();
      const timeSchedule = timeSchedules?.nodes?.[0];
      _timeSchedule_id = timeSchedule?.id;
      expect(timeSchedules instanceof L.TimeScheduleConnection);
    });

    /** Test the root query for a single TimeSchedule */
    it("timeSchedule", async () => {
      if (_timeSchedule_id) {
        const timeSchedule: L.TimeSchedule | undefined | null = await client.timeSchedule(_timeSchedule_id);
        _timeSchedule = timeSchedule;
        expect(timeSchedule instanceof L.TimeSchedule);
      } else {
        console.warn("codegen-doc:print: No first TimeSchedule found in connection - cannot test timeSchedule query");
      }
    });

    /** Test the timeSchedule.integration query for L.Integration */
    it("timeSchedule.integration", async () => {
      if (_timeSchedule) {
        const timeSchedule_integration: L.Integration | undefined | null = await _timeSchedule.integration;
        expect(timeSchedule_integration instanceof L.Integration);
      } else {
        console.warn("codegen-doc:print: No TimeSchedule found - cannot test timeSchedule.integration query");
      }
    });

    /** Test the timeSchedule.organization query for L.Organization */
    it("timeSchedule.organization", async () => {
      if (_timeSchedule) {
        const timeSchedule_organization: L.Organization | undefined | null = await _timeSchedule.organization;
        expect(timeSchedule_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No TimeSchedule found - cannot test timeSchedule.organization query");
      }
    });
  });

  /** Test all TriageResponsibility queries */
  describe("TriageResponsibilities", () => {
    let _triageResponsibility: L.TriageResponsibility | undefined | null;
    let _triageResponsibility_id: string | undefined | null;

    /** Test the root connection query for the TriageResponsibility */
    it("triageResponsibilities", async () => {
      const triageResponsibilities: L.TriageResponsibilityConnection | undefined | null =
        await client.triageResponsibilities();
      const triageResponsibility = triageResponsibilities?.nodes?.[0];
      _triageResponsibility_id = triageResponsibility?.id;
      expect(triageResponsibilities instanceof L.TriageResponsibilityConnection);
    });

    /** Test the root query for a single TriageResponsibility */
    it("triageResponsibility", async () => {
      if (_triageResponsibility_id) {
        const triageResponsibility: L.TriageResponsibility | undefined | null =
          await client.triageResponsibility(_triageResponsibility_id);
        _triageResponsibility = triageResponsibility;
        expect(triageResponsibility instanceof L.TriageResponsibility);
      } else {
        console.warn(
          "codegen-doc:print: No first TriageResponsibility found in connection - cannot test triageResponsibility query"
        );
      }
    });

    /** Test the triageResponsibility model query for TriageResponsibility_ManualSelection */
    it("triageResponsibility.manualSelection", async () => {
      if (_triageResponsibility) {
        const manualSelection: L.TriageResponsibilityManualSelection | undefined | null =
          _triageResponsibility.manualSelection;
        expect(manualSelection instanceof L.TriageResponsibilityManualSelection);
      } else {
        console.warn(
          "codegen-doc:print: No triageResponsibility found - cannot test _triageResponsibility.manualSelection query"
        );
      }
    });

    /** Test the triageResponsibility.currentUser query for L.User */
    it("triageResponsibility.currentUser", async () => {
      if (_triageResponsibility) {
        const triageResponsibility_currentUser: L.User | undefined | null = await _triageResponsibility.currentUser;
        expect(triageResponsibility_currentUser instanceof L.User);
      } else {
        console.warn(
          "codegen-doc:print: No TriageResponsibility found - cannot test triageResponsibility.currentUser query"
        );
      }
    });

    /** Test the triageResponsibility.team query for L.Team */
    it("triageResponsibility.team", async () => {
      if (_triageResponsibility) {
        const triageResponsibility_team: L.Team | undefined | null = await _triageResponsibility.team;
        expect(triageResponsibility_team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No TriageResponsibility found - cannot test triageResponsibility.team query");
      }
    });

    /** Test the triageResponsibility.timeSchedule query for L.TimeSchedule */
    it("triageResponsibility.timeSchedule", async () => {
      if (_triageResponsibility) {
        const triageResponsibility_timeSchedule: L.TimeSchedule | undefined | null =
          await _triageResponsibility.timeSchedule;
        expect(triageResponsibility_timeSchedule instanceof L.TimeSchedule);
      } else {
        console.warn(
          "codegen-doc:print: No TriageResponsibility found - cannot test triageResponsibility.timeSchedule query"
        );
      }
    });
  });

  /** Test UserSessions query */
  describe("UserSessions", () => {
    /** Test the root model query for UserSessions */
    it("userSessions", async () => {
      const userSessions: L.AuthenticationSessionResponse[] | undefined | null = await client.userSessions("mock-id");
      userSessions?.map(node => expect(node instanceof L.AuthenticationSessionResponse));
    });
  });

  /** Test UserSettings query */
  describe("UserSettings", () => {
    let _userSettings: L.UserSettings | undefined | null;

    /** Test the root model query for UserSettings */
    it("userSettings", async () => {
      const userSettings: L.UserSettings | undefined | null = await client.userSettings;
      _userSettings = userSettings;
      expect(userSettings instanceof L.UserSettings);
    });

    let _notificationCategoryPreferences: L.NotificationCategoryPreferences | undefined | null;

    /** Test the userSettings model query for UserSettings_NotificationCategoryPreferences */
    it("userSettings.notificationCategoryPreferences", async () => {
      if (_userSettings) {
        const notificationCategoryPreferences: L.NotificationCategoryPreferences | undefined | null =
          _userSettings.notificationCategoryPreferences;
        _notificationCategoryPreferences = notificationCategoryPreferences;
        expect(notificationCategoryPreferences instanceof L.NotificationCategoryPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No userSettings found - cannot test _userSettings.notificationCategoryPreferences query"
        );
      }
    });

    /** Test the userSettings_notificationCategoryPreferences model query for UserSettings_NotificationCategoryPreferences_AppsAndIntegrations */
    it("userSettings_notificationCategoryPreferences.appsAndIntegrations", async () => {
      if (_notificationCategoryPreferences) {
        const appsAndIntegrations: L.NotificationChannelPreferences | undefined | null =
          _notificationCategoryPreferences.appsAndIntegrations;
        expect(appsAndIntegrations instanceof L.NotificationChannelPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No notificationCategoryPreferences found - cannot test _notificationCategoryPreferences.appsAndIntegrations query"
        );
      }
    });

    /** Test the userSettings_notificationCategoryPreferences model query for UserSettings_NotificationCategoryPreferences_Assignments */
    it("userSettings_notificationCategoryPreferences.assignments", async () => {
      if (_notificationCategoryPreferences) {
        const assignments: L.NotificationChannelPreferences | undefined | null =
          _notificationCategoryPreferences.assignments;
        expect(assignments instanceof L.NotificationChannelPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No notificationCategoryPreferences found - cannot test _notificationCategoryPreferences.assignments query"
        );
      }
    });

    /** Test the userSettings_notificationCategoryPreferences model query for UserSettings_NotificationCategoryPreferences_CommentsAndReplies */
    it("userSettings_notificationCategoryPreferences.commentsAndReplies", async () => {
      if (_notificationCategoryPreferences) {
        const commentsAndReplies: L.NotificationChannelPreferences | undefined | null =
          _notificationCategoryPreferences.commentsAndReplies;
        expect(commentsAndReplies instanceof L.NotificationChannelPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No notificationCategoryPreferences found - cannot test _notificationCategoryPreferences.commentsAndReplies query"
        );
      }
    });

    /** Test the userSettings_notificationCategoryPreferences model query for UserSettings_NotificationCategoryPreferences_Customers */
    it("userSettings_notificationCategoryPreferences.customers", async () => {
      if (_notificationCategoryPreferences) {
        const customers: L.NotificationChannelPreferences | undefined | null =
          _notificationCategoryPreferences.customers;
        expect(customers instanceof L.NotificationChannelPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No notificationCategoryPreferences found - cannot test _notificationCategoryPreferences.customers query"
        );
      }
    });

    /** Test the userSettings_notificationCategoryPreferences model query for UserSettings_NotificationCategoryPreferences_DocumentChanges */
    it("userSettings_notificationCategoryPreferences.documentChanges", async () => {
      if (_notificationCategoryPreferences) {
        const documentChanges: L.NotificationChannelPreferences | undefined | null =
          _notificationCategoryPreferences.documentChanges;
        expect(documentChanges instanceof L.NotificationChannelPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No notificationCategoryPreferences found - cannot test _notificationCategoryPreferences.documentChanges query"
        );
      }
    });

    /** Test the userSettings_notificationCategoryPreferences model query for UserSettings_NotificationCategoryPreferences_Feed */
    it("userSettings_notificationCategoryPreferences.feed", async () => {
      if (_notificationCategoryPreferences) {
        const feed: L.NotificationChannelPreferences | undefined | null = _notificationCategoryPreferences.feed;
        expect(feed instanceof L.NotificationChannelPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No notificationCategoryPreferences found - cannot test _notificationCategoryPreferences.feed query"
        );
      }
    });

    /** Test the userSettings_notificationCategoryPreferences model query for UserSettings_NotificationCategoryPreferences_Mentions */
    it("userSettings_notificationCategoryPreferences.mentions", async () => {
      if (_notificationCategoryPreferences) {
        const mentions: L.NotificationChannelPreferences | undefined | null = _notificationCategoryPreferences.mentions;
        expect(mentions instanceof L.NotificationChannelPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No notificationCategoryPreferences found - cannot test _notificationCategoryPreferences.mentions query"
        );
      }
    });

    /** Test the userSettings_notificationCategoryPreferences model query for UserSettings_NotificationCategoryPreferences_PostsAndUpdates */
    it("userSettings_notificationCategoryPreferences.postsAndUpdates", async () => {
      if (_notificationCategoryPreferences) {
        const postsAndUpdates: L.NotificationChannelPreferences | undefined | null =
          _notificationCategoryPreferences.postsAndUpdates;
        expect(postsAndUpdates instanceof L.NotificationChannelPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No notificationCategoryPreferences found - cannot test _notificationCategoryPreferences.postsAndUpdates query"
        );
      }
    });

    /** Test the userSettings_notificationCategoryPreferences model query for UserSettings_NotificationCategoryPreferences_Reactions */
    it("userSettings_notificationCategoryPreferences.reactions", async () => {
      if (_notificationCategoryPreferences) {
        const reactions: L.NotificationChannelPreferences | undefined | null =
          _notificationCategoryPreferences.reactions;
        expect(reactions instanceof L.NotificationChannelPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No notificationCategoryPreferences found - cannot test _notificationCategoryPreferences.reactions query"
        );
      }
    });

    /** Test the userSettings_notificationCategoryPreferences model query for UserSettings_NotificationCategoryPreferences_Reminders */
    it("userSettings_notificationCategoryPreferences.reminders", async () => {
      if (_notificationCategoryPreferences) {
        const reminders: L.NotificationChannelPreferences | undefined | null =
          _notificationCategoryPreferences.reminders;
        expect(reminders instanceof L.NotificationChannelPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No notificationCategoryPreferences found - cannot test _notificationCategoryPreferences.reminders query"
        );
      }
    });

    /** Test the userSettings_notificationCategoryPreferences model query for UserSettings_NotificationCategoryPreferences_Reviews */
    it("userSettings_notificationCategoryPreferences.reviews", async () => {
      if (_notificationCategoryPreferences) {
        const reviews: L.NotificationChannelPreferences | undefined | null = _notificationCategoryPreferences.reviews;
        expect(reviews instanceof L.NotificationChannelPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No notificationCategoryPreferences found - cannot test _notificationCategoryPreferences.reviews query"
        );
      }
    });

    /** Test the userSettings_notificationCategoryPreferences model query for UserSettings_NotificationCategoryPreferences_StatusChanges */
    it("userSettings_notificationCategoryPreferences.statusChanges", async () => {
      if (_notificationCategoryPreferences) {
        const statusChanges: L.NotificationChannelPreferences | undefined | null =
          _notificationCategoryPreferences.statusChanges;
        expect(statusChanges instanceof L.NotificationChannelPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No notificationCategoryPreferences found - cannot test _notificationCategoryPreferences.statusChanges query"
        );
      }
    });

    /** Test the userSettings_notificationCategoryPreferences model query for UserSettings_NotificationCategoryPreferences_Subscriptions */
    it("userSettings_notificationCategoryPreferences.subscriptions", async () => {
      if (_notificationCategoryPreferences) {
        const subscriptions: L.NotificationChannelPreferences | undefined | null =
          _notificationCategoryPreferences.subscriptions;
        expect(subscriptions instanceof L.NotificationChannelPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No notificationCategoryPreferences found - cannot test _notificationCategoryPreferences.subscriptions query"
        );
      }
    });

    /** Test the userSettings_notificationCategoryPreferences model query for UserSettings_NotificationCategoryPreferences_System */
    it("userSettings_notificationCategoryPreferences.system", async () => {
      if (_notificationCategoryPreferences) {
        const system: L.NotificationChannelPreferences | undefined | null = _notificationCategoryPreferences.system;
        expect(system instanceof L.NotificationChannelPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No notificationCategoryPreferences found - cannot test _notificationCategoryPreferences.system query"
        );
      }
    });

    /** Test the userSettings_notificationCategoryPreferences model query for UserSettings_NotificationCategoryPreferences_Triage */
    it("userSettings_notificationCategoryPreferences.triage", async () => {
      if (_notificationCategoryPreferences) {
        const triage: L.NotificationChannelPreferences | undefined | null = _notificationCategoryPreferences.triage;
        expect(triage instanceof L.NotificationChannelPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No notificationCategoryPreferences found - cannot test _notificationCategoryPreferences.triage query"
        );
      }
    });

    /** Test the userSettings model query for UserSettings_NotificationChannelPreferences */
    it("userSettings.notificationChannelPreferences", async () => {
      if (_userSettings) {
        const notificationChannelPreferences: L.NotificationChannelPreferences | undefined | null =
          _userSettings.notificationChannelPreferences;
        expect(notificationChannelPreferences instanceof L.NotificationChannelPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No userSettings found - cannot test _userSettings.notificationChannelPreferences query"
        );
      }
    });

    let _notificationDeliveryPreferences: L.NotificationDeliveryPreferences | undefined | null;

    /** Test the userSettings model query for UserSettings_NotificationDeliveryPreferences */
    it("userSettings.notificationDeliveryPreferences", async () => {
      if (_userSettings) {
        const notificationDeliveryPreferences: L.NotificationDeliveryPreferences | undefined | null =
          _userSettings.notificationDeliveryPreferences;
        _notificationDeliveryPreferences = notificationDeliveryPreferences;
        expect(notificationDeliveryPreferences instanceof L.NotificationDeliveryPreferences);
      } else {
        console.warn(
          "codegen-doc:print: No userSettings found - cannot test _userSettings.notificationDeliveryPreferences query"
        );
      }
    });

    let _mobile: L.NotificationDeliveryPreferencesChannel | undefined | null;

    /** Test the userSettings_notificationDeliveryPreferences model query for UserSettings_NotificationDeliveryPreferences_Mobile */
    it("userSettings_notificationDeliveryPreferences.mobile", async () => {
      if (_notificationDeliveryPreferences) {
        const mobile: L.NotificationDeliveryPreferencesChannel | undefined | null =
          _notificationDeliveryPreferences.mobile;
        _mobile = mobile;
        expect(mobile instanceof L.NotificationDeliveryPreferencesChannel);
      } else {
        console.warn(
          "codegen-doc:print: No notificationDeliveryPreferences found - cannot test _notificationDeliveryPreferences.mobile query"
        );
      }
    });

    let _theme: L.UserSettingsTheme | undefined | null;

    /** Test the userSettings model query for UserSettings_Theme */
    it("userSettings.theme", async () => {
      if (_userSettings) {
        const theme: L.UserSettingsTheme | undefined | null = _userSettings.theme;
        _theme = theme;
        expect(theme instanceof L.UserSettingsTheme);
      } else {
        console.warn("codegen-doc:print: No userSettings found - cannot test _userSettings.theme query");
      }
    });

    let _custom: L.UserSettingsCustomTheme | undefined | null;

    /** Test the userSettings_theme model query for UserSettings_Theme_Custom */
    it("userSettings_theme.custom", async () => {
      if (_theme) {
        const custom: L.UserSettingsCustomTheme | undefined | null = _theme.custom;
        _custom = custom;
        expect(custom instanceof L.UserSettingsCustomTheme);
      } else {
        console.warn("codegen-doc:print: No theme found - cannot test _theme.custom query");
      }
    });
  });

  /** Test all User queries */
  describe("Users", () => {
    let _user: L.User | undefined | null;
    let _user_id: string | undefined | null;

    /** Test the root connection query for the User */
    it("users", async () => {
      const users: L.UserConnection | undefined | null = await client.users();
      const user = users?.nodes?.[0];
      _user_id = user?.id;
      expect(users instanceof L.UserConnection);
    });

    /** Test the root query for a single User */
    it("user", async () => {
      if (_user_id) {
        const user: L.User | undefined | null = await client.user(_user_id);
        _user = user;
        expect(user instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No first User found in connection - cannot test user query");
      }
    });

    /** Test the user connection query for the Issue */
    it("user.assignedIssues", async () => {
      if (_user) {
        const assignedIssues: L.IssueConnection | undefined | null = await _user.assignedIssues();
        expect(assignedIssues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No user found - cannot test _user.assignedIssues query");
      }
    });

    /** Test the user connection query for the Issue */
    it("user.createdIssues", async () => {
      if (_user) {
        const createdIssues: L.IssueConnection | undefined | null = await _user.createdIssues();
        expect(createdIssues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No user found - cannot test _user.createdIssues query");
      }
    });

    /** Test the user connection query for the Issue */
    it("user.delegatedIssues", async () => {
      if (_user) {
        const delegatedIssues: L.IssueConnection | undefined | null = await _user.delegatedIssues();
        expect(delegatedIssues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No user found - cannot test _user.delegatedIssues query");
      }
    });

    /** Test the user connection query for the Draft */
    it("user.drafts", async () => {
      if (_user) {
        const drafts: L.DraftConnection | undefined | null = await _user.drafts();
        expect(drafts instanceof L.DraftConnection);
      } else {
        console.warn("codegen-doc:print: No user found - cannot test _user.drafts query");
      }
    });

    /** Test the user connection query for the TeamMembership */
    it("user.teamMemberships", async () => {
      if (_user) {
        const teamMemberships: L.TeamMembershipConnection | undefined | null = await _user.teamMemberships();
        expect(teamMemberships instanceof L.TeamMembershipConnection);
      } else {
        console.warn("codegen-doc:print: No user found - cannot test _user.teamMemberships query");
      }
    });

    /** Test the user connection query for the Team */
    it("user.teams", async () => {
      if (_user) {
        const teams: L.TeamConnection | undefined | null = await _user.teams();
        expect(teams instanceof L.TeamConnection);
      } else {
        console.warn("codegen-doc:print: No user found - cannot test _user.teams query");
      }
    });

    /** Test the user.organization query for L.Organization */
    it("user.organization", async () => {
      if (_user) {
        const user_organization: L.Organization | undefined | null = await _user.organization;
        expect(user_organization instanceof L.Organization);
      } else {
        console.warn("codegen-doc:print: No User found - cannot test user.organization query");
      }
    });
  });

  /** Test VerifyGitHubEnterpriseServerInstallation query */
  describe("VerifyGitHubEnterpriseServerInstallation", () => {
    /** Test the root model query for VerifyGitHubEnterpriseServerInstallation */
    it("verifyGitHubEnterpriseServerInstallation", async () => {
      const verifyGitHubEnterpriseServerInstallation:
        | L.GitHubEnterpriseServerInstallVerificationPayload
        | undefined
        | null = await client.verifyGitHubEnterpriseServerInstallation("mock-integrationId");
      expect(verifyGitHubEnterpriseServerInstallation instanceof L.GitHubEnterpriseServerInstallVerificationPayload);
    });
  });

  /** Test Viewer query */
  describe("Viewer", () => {
    let _viewer: L.User | undefined | null;

    /** Test the root model query for Viewer */
    it("viewer", async () => {
      const viewer: L.User | undefined | null = await client.viewer;
      _viewer = viewer;
      expect(viewer instanceof L.User);
    });

    /** Test the viewer connection query for the Issue */
    it("viewer.assignedIssues", async () => {
      if (_viewer) {
        const assignedIssues: L.IssueConnection | undefined | null = await _viewer.assignedIssues();
        expect(assignedIssues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No viewer found - cannot test _viewer.assignedIssues query");
      }
    });

    /** Test the viewer connection query for the Issue */
    it("viewer.createdIssues", async () => {
      if (_viewer) {
        const createdIssues: L.IssueConnection | undefined | null = await _viewer.createdIssues();
        expect(createdIssues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No viewer found - cannot test _viewer.createdIssues query");
      }
    });

    /** Test the viewer connection query for the Issue */
    it("viewer.delegatedIssues", async () => {
      if (_viewer) {
        const delegatedIssues: L.IssueConnection | undefined | null = await _viewer.delegatedIssues();
        expect(delegatedIssues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No viewer found - cannot test _viewer.delegatedIssues query");
      }
    });

    /** Test the viewer connection query for the Draft */
    it("viewer.drafts", async () => {
      if (_viewer) {
        const drafts: L.DraftConnection | undefined | null = await _viewer.drafts();
        expect(drafts instanceof L.DraftConnection);
      } else {
        console.warn("codegen-doc:print: No viewer found - cannot test _viewer.drafts query");
      }
    });

    /** Test the viewer connection query for the TeamMembership */
    it("viewer.teamMemberships", async () => {
      if (_viewer) {
        const teamMemberships: L.TeamMembershipConnection | undefined | null = await _viewer.teamMemberships();
        expect(teamMemberships instanceof L.TeamMembershipConnection);
      } else {
        console.warn("codegen-doc:print: No viewer found - cannot test _viewer.teamMemberships query");
      }
    });

    /** Test the viewer connection query for the Team */
    it("viewer.teams", async () => {
      if (_viewer) {
        const teams: L.TeamConnection | undefined | null = await _viewer.teams();
        expect(teams instanceof L.TeamConnection);
      } else {
        console.warn("codegen-doc:print: No viewer found - cannot test _viewer.teams query");
      }
    });
  });

  /** Test all Webhook queries */
  describe("Webhooks", () => {
    let _webhook: L.Webhook | undefined | null;
    let _webhook_id: string | undefined | null;

    /** Test the root connection query for the Webhook */
    it("webhooks", async () => {
      const webhooks: L.WebhookConnection | undefined | null = await client.webhooks();
      const webhook = webhooks?.nodes?.[0];
      _webhook_id = webhook?.id;
      expect(webhooks instanceof L.WebhookConnection);
    });

    /** Test the root query for a single Webhook */
    it("webhook", async () => {
      if (_webhook_id) {
        const webhook: L.Webhook | undefined | null = await client.webhook(_webhook_id);
        _webhook = webhook;
        expect(webhook instanceof L.Webhook);
      } else {
        console.warn("codegen-doc:print: No first Webhook found in connection - cannot test webhook query");
      }
    });

    /** Test the webhook.creator query for L.User */
    it("webhook.creator", async () => {
      if (_webhook) {
        const webhook_creator: L.User | undefined | null = await _webhook.creator;
        expect(webhook_creator instanceof L.User);
      } else {
        console.warn("codegen-doc:print: No Webhook found - cannot test webhook.creator query");
      }
    });

    /** Test the webhook.team query for L.Team */
    it("webhook.team", async () => {
      if (_webhook) {
        const webhook_team: L.Team | undefined | null = await _webhook.team;
        expect(webhook_team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No Webhook found - cannot test webhook.team query");
      }
    });
  });

  /** Test all WorkflowState queries */
  describe("WorkflowStates", () => {
    let _workflowState: L.WorkflowState | undefined | null;
    let _workflowState_id: string | undefined | null;

    /** Test the root connection query for the WorkflowState */
    it("workflowStates", async () => {
      const workflowStates: L.WorkflowStateConnection | undefined | null = await client.workflowStates();
      const workflowState = workflowStates?.nodes?.[0];
      _workflowState_id = workflowState?.id;
      expect(workflowStates instanceof L.WorkflowStateConnection);
    });

    /** Test the root query for a single WorkflowState */
    it("workflowState", async () => {
      if (_workflowState_id) {
        const workflowState: L.WorkflowState | undefined | null = await client.workflowState(_workflowState_id);
        _workflowState = workflowState;
        expect(workflowState instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No first WorkflowState found in connection - cannot test workflowState query");
      }
    });

    /** Test the workflowState connection query for the Issue */
    it("workflowState.issues", async () => {
      if (_workflowState) {
        const issues: L.IssueConnection | undefined | null = await _workflowState.issues();
        expect(issues instanceof L.IssueConnection);
      } else {
        console.warn("codegen-doc:print: No workflowState found - cannot test _workflowState.issues query");
      }
    });

    /** Test the workflowState.inheritedFrom query for L.WorkflowState */
    it("workflowState.inheritedFrom", async () => {
      if (_workflowState) {
        const workflowState_inheritedFrom: L.WorkflowState | undefined | null = await _workflowState.inheritedFrom;
        expect(workflowState_inheritedFrom instanceof L.WorkflowState);
      } else {
        console.warn("codegen-doc:print: No WorkflowState found - cannot test workflowState.inheritedFrom query");
      }
    });

    /** Test the workflowState.team query for L.Team */
    it("workflowState.team", async () => {
      if (_workflowState) {
        const workflowState_team: L.Team | undefined | null = await _workflowState.team;
        expect(workflowState_team instanceof L.Team);
      } else {
        console.warn("codegen-doc:print: No WorkflowState found - cannot test workflowState.team query");
      }
    });
  });
});
