import * as inquirer from 'inquirer';
import { PlannerImporterService } from './planner';
import { Team } from '@linear/sdk';

export const plannerImporter = async (linearApiKey: string): Promise<PlannerImporterService | undefined> => {
  try {
    const answers = await inquirer.prompt<any>([
      {
        type: 'input',
        name: 'msGraphApiKey',
        message: 'Input your Microsoft Graph API key:',
      },
      {
        type: 'input',
        name: 'teamId',
        message: 'Input the Linear Team ID you want to import issues to:',
        // You might want to add validation or fetch teams from Linear API here
      },
    ]);

    if (!answers.msGraphApiKey || !answers.teamId) {
      console.warn('Microsoft Graph API key and Team ID are required.');
      return undefined;
    }

    // You could add a step here to validate the teamId against the Linear API
    // For example, fetch team and ensure it exists:
    // const linearClient = new LinearClient({ apiKey: linearApiKey });
    // const team = await linearClient.team(answers.teamId);
    // if (!team) {
    //   console.warn(`Team with ID ${answers.teamId} not found in your Linear workspace.`);
    //   return undefined;
    // }

    return new PlannerImporterService(answers.msGraphApiKey, linearApiKey, answers.teamId);
  } catch (e) {
    console.error('Failed to gather Planner importer configuration:', e);
    return undefined;
  }
};
