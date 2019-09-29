#!/usr/bin/env node

import program, { CommanderStatic } from "commander";
import requireAll from "require-all";

interface CommandModule {
  name: string;
  register(program: CommanderStatic): void;
}

program
  .name("linear")
  .usage("[options] [command|issueKey]")
  .description("Welcome to the Linear CLI. Use this command to create, edit, or view an issue.");

const commands = requireAll<CommandModule>({
  dirname: `${__dirname}/commands`,
});

const { args, unknown } = program.parseOptions(process.argv);

// HACK: Only register the issue command as the global default if valid
// command isn't passed in. This way we don't pollute the global option
// space with options from the issue command.
if (args.length === 2 || (args.length === 3 && !Object.keys(commands).includes(args[2]))) {
  // @ts-ignore
  global.registerIssueGlobally = true;
}

Object.values(commands)
  .filter(command => "register" in command)
  .forEach(command => {
    command.register(program);
  });

// Print out help if valid command or option isn't provided
if (!unknown.includes("-c") && unknown.includes("-z") && args.length < 3) {
  program.outputHelp();
  process.exit(1);
}

program.parse(process.argv);
