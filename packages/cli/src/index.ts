#!/usr/bin/env node

import program, { CommanderStatic } from "commander";
import requireAll from "require-all";

interface CommandModule {
  name: string;
  register(program: CommanderStatic): void;
}

program.name("linear").usage("[options] [command|issueKey]");

const commands = requireAll<CommandModule>({
  dirname: `${__dirname}/commands`,
});

const { args, unknown } = program.parseOptions(process.argv);

// HACK: Only register the issue command as the global default if valid
// command isn't passed in. This way we don't pollute the global option
// space with options from issue.
if ((args.length === 2 && unknown.includes("-c")) || (args.length === 3 && !Object.keys(commands).includes(args[2]))) {
  // @ts-ignore
  global.registerIssueGlobally = true;
}

Object.values(commands)
  .filter(command => "register" in command)
  .forEach(command => {
    command.register(program);
  });

if (!unknown.includes("-c") && args.length < 3) {
  program.option("-c, --create", "create an issue");
  program.outputHelp();
  process.exit(1);
}

program.parse(process.argv);
