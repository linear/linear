import { Importer, ImportIssue, ImportResult, Issue } from '../../types';
import { Client } from '@microsoft/microsoft-graph-client';
import 'isomorphic-fetch'; // Required for Microsoft Graph client
import { LinearClient, Team, User, WorkflowState, Project } from '@linear/sdk';

// Helper to find a Linear user - replace with actual user mapping logic
const getLinearUser = async (linearClient: LinearClient, displayName?: string): Promise<User | undefined> => {
  if (!displayName) return undefined;
  // This is a simplified example, you'll need a robust way to map users
  const users = await linearClient.users({ filter: { displayName: { eq: displayName } } });
  return users.nodes[0];
};

export class PlannerImporterService implements Importer {
  public name = "Microsoft Planner"; // Added name property
  private graphClient: Client;
  private linearClient: LinearClient;
  private teamId: string;

  public constructor(apiKey: string, linearApiKey: string, teamId: string) {
    this.teamId = teamId;
    this.graphClient = Client.init({
      authProvider: (done) => {
        done(null, apiKey); // Microsoft Graph API Key
      },
    });
    this.linearClient = new LinearClient({ apiKey: linearApiKey });
  }

  // Maps Planner priority to Linear priority value (0-3, 0 = No priority)
  private getLinearPriority(priority: number | undefined): number {
    if (priority === undefined) return 0;
    // Planner priorities: 1, 3, 5, 9 (urgent, important, medium, low)
    // Linear priorities: 0 (None), 1 (Urgent), 2 (High), 3 (Medium), 4 (Low)
    switch (priority) {
      case 1: // Urgent
        return 1;
      case 3: // Important
        return 2;
      case 5: // Medium
        return 3;
      case 9: // Low
        return 4;
      default:
        return 0; // No priority
    }
  }

  // Maps Planner progress status to Linear workflow state ID
  private async getLinearStateId(progress: string | undefined): Promise<string | undefined> {
    const team = await this.linearClient.team(this.teamId);
    const states = await team.states();
    if (!states.nodes.length) {
      throw new Error(`No workflow states found for team ${this.teamId}`);
    }

    // Planner progress: notStarted, inProgress, completed
    switch (progress) {
      case 'notStarted':
        return states.nodes.find((s: WorkflowState) => s.name.toLowerCase() === 'todo' || s.name.toLowerCase() === 'backlog')?.id;
      case 'inProgress':
        return states.nodes.find((s: WorkflowState) => s.name.toLowerCase() === 'in progress')?.id;
      case 'completed':
        return states.nodes.find((s: WorkflowState) => s.name.toLowerCase() === 'done' || s.name.toLowerCase() === 'completed')?.id;
      default:
        return states.nodes[0].id; // Default to the first state
    }
  }

  private async getLinearAssigneeId(assignedTo?: string): Promise<string | undefined> {
    if (!assignedTo) return undefined;
    // In Planner, assignedTo is a user ID. You'll need to map this to a Linear user.
    // This example assumes assignedTo is a display name that can be looked up in Linear.
    // You'll need a more robust mapping in a real scenario (e.g., email, or a pre-defined mapping table).
    try {
      // Attempt to get the user by ID first if you have a mapping
      // const user = await this.linearClient.user(assignedTo);
      // if (user) return user.id;

      // Fallback to searching by a name or email if available in Planner task details
      // This part is highly dependent on what 'assignedTo' contains from Planner
      const users = await this.linearClient.users({ filter: { displayName: { eq: assignedTo } } });
      if (users.nodes.length > 0) {
        return users.nodes[0].id;
      }
      console.warn(`Could not find Linear user for Planner assignee: ${assignedTo}`);
      return undefined;
    } catch (error) {
      console.error(`Error fetching Linear user for assignee ${assignedTo}:`, error);
      return undefined;
    }
  }


  private async getLinearProjectId(bucketName: string, planName: string): Promise<string | undefined> {
    if (!bucketName) return undefined;
    const projectName = `${planName} - ${bucketName}`; // Combine plan and bucket for project name

    try {
      let project: Project | undefined;
      const existingProjects = await this.linearClient.projects({ filter: { name: { eq: projectName } } });

      if (existingProjects.nodes.length > 0) {
        project = existingProjects.nodes[0];
      } else {
        console.log(`Creating new project in Linear: ${projectName}`);
        const projectCreate = await this.linearClient.createProject({
          name: projectName,
          teamIds: [this.teamId], // Associate with the current team
          // You might want to set other project properties here
        });
        if (projectCreate.success) {
          project = await projectCreate.project;
        } else {
          console.error(`Failed to create project ${projectName}:`, await projectCreate.issue);
        }
      }
      return project?.id;
    } catch (error) {
      console.error(`Error finding or creating project ${projectName}:`, error);
      return undefined;
    }
  }

  private async mapPlannerTaskToLinearIssue(task: { title: string; priority?: number; details?: { description?: string; }; percentComplete?: number; assignments?: { [key: string]: any }; createdDateTime?: string; dueDateTime?: string; }, planName: string, bucketName: string): Promise<ImportIssue | null> {
    try {
      const title = task.title;
      if (!title) {
        console.warn('Skipping task without title:', task);
        return null;
      }

      const description = task.details?.description || undefined;
      const priority = this.getLinearPriority(task.priority);
      const stateId = await this.getLinearStateId(task.percentComplete === 100 ? 'completed' : task.percentComplete > 0 ? 'inProgress' : 'notStarted');
      const assigneeId = task.assignments ? await this.getLinearAssigneeId(Object.keys(task.assignments)[0]) : undefined; // Takes the first assignee
      const projectId = await this.getLinearProjectId(bucketName, planName);

      const linearIssue: ImportIssue = {
        title,
        description,
        priority: priority as ImportIssue['priority'], // Explicitly cast to IssuePriority
        teamId: this.teamId,
      };

      if (stateId) linearIssue.stateId = stateId;
      if (assigneeId) linearIssue.assigneeId = assigneeId;
      if (projectId) linearIssue.projectId = projectId;
      if (task.createdDateTime) linearIssue.createdAt = new Date(task.createdDateTime);
      if (task.dueDateTime) linearIssue.dueDate = new Date(task.dueDateTime);


      return linearIssue;
    } catch (error) {
      console.error(`Error mapping Planner task "${task.title}" to Linear issue:`, error);
      return null;
    }
  }


  public async import(): Promise<ImportResult> {
    console.log('Importing from Microsoft Planner...');
    const importedIssues: Issue[] = [];
    let createdCount = 0;
    let failedCount = 0;

    try {
      const plans = await this.graphClient.api(`/me/planner/plans`).get();
      if (!plans || !plans.value) {
        console.log('No plans found for the user.');
        return { issues: [], users: {}, labels: {}, statuses: {} };
      }
      console.log(`Found ${plans.value.length} plans.`);

      for (const plan of plans.value) {
        console.log(`Processing plan: ${plan.title} (ID: ${plan.id})`);
        const buckets = await this.graphClient.api(`/planner/plans/${plan.id}/buckets`).get();
        if (!buckets || !buckets.value) {
          console.log(`No buckets found for plan ${plan.title}.`);
          continue;
        }
        console.log(`Found ${buckets.value.length} buckets for plan ${plan.title}.`);

        for (const bucket of buckets.value) {
          console.log(`Processing bucket: ${bucket.name} (ID: ${bucket.id}) in plan ${plan.title}`);
          const tasksResponse = await this.graphClient.api(`/planner/buckets/${bucket.id}/tasks`)
            .select('id,title,priority,createdDateTime,dueDateTime,percentComplete,assignments,planId,bucketId')
            .get();

          if (!tasksResponse || !tasksResponse.value) {
            console.log(`No tasks found for bucket ${bucket.name}.`);
            continue;
          }
          console.log(`Found ${tasksResponse.value.length} tasks in bucket ${bucket.name}.`);

          for (const task of tasksResponse.value) {
            const taskDetails = await this.graphClient.api(`/planner/tasks/${task.id}/details`).get();
            const fullTask = { ...task, details: taskDetails };

            console.log(`Mapping task: ${fullTask.title}`);
            const linearIssueData = await this.mapPlannerTaskToLinearIssue(fullTask, plan.title, bucket.name);

            if (linearIssueData) {
              try {
                const result = await this.linearClient.issueCreate(linearIssueData);
                if (result.success) {
                  const createdIssue = await result.issue;
                  if (createdIssue) {
                    importedIssues.push({ title: createdIssue.title }); // Add more details if needed
                  }
                  console.log(`Successfully created Linear issue: ${createdIssue?.title} (ID: ${createdIssue?.id})`);
                  createdCount++;
                } else {
                  failedCount++;
                  const errorResult = await result.issue;
                  console.error(`Failed to create Linear issue for task "${fullTask.title}":`, errorResult);
                }
              } catch (error) {
                failedCount++;
                console.error(`Error creating Linear issue for task "${fullTask.title}":`, error);
              }
            } else {
              failedCount++;
              console.warn(`Skipped creating issue for task "${fullTask.title}" due to mapping error or missing title.`);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching Planner data or processing import:', error);
      // Consider how to handle overall import failure
    }

    console.log(`\nImport process completed.`);
    console.log(`Successfully created issues: ${createdCount}`);
    console.log(`Failed to create issues: ${failedCount}`);

    // TODO: Populate users, labels, and statuses correctly if needed for the CLI output.
    // For now, returning empty objects for these.
    return {
      issues: importedIssues,
      users: {}, // Populate with actual user mapping if available/needed
      labels: {}, // Populate with actual label mapping if available/needed
      statuses: {}, // Populate with actual status mapping if available/needed
    };
  }
}
