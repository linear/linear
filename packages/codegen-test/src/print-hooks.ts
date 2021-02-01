import { printComment, printLines } from "@linear/codegen-doc";
import { Sdk } from "@linear/codegen-sdk";

/**
 * Prints code required before tests
 */
export function printBeforeSuite(): string {
  return printLines([
    printComment(["Initialize mock server variable"]),
    `let mockServer: ExecaChildProcess`,
    "\n",
    printComment(["Initialize Linear client variable"]),
    `let client: ${Sdk.NAMESPACE}.LinearClient`,
    "\n",
  ]);
}

/**
 * Prints the hook to call before all tests run
 * Starts the mock server
 */
export function printBeforeAll(): string {
  return printLines([
    `beforeAll(async () => {
      ${printLines([
        printComment(["Determine whether to use production or a mock server"]),
        `if (Boolean(process.env.E2E)) {
          ${printLines([
            'logger.info("Using Linear API production endpoint for end-to-end test")',
            "\n",
            printComment(["Create Linear client with production server endpoint"]),
            `client = new ${Sdk.NAMESPACE}.LinearClient({
              apiKey: process.env.E2E_API_KEY,
            })`,
          ])}
        } else {
          ${printLines([
            "\n",
            printComment([`Create sleep function`]),
            "const sleep = promisify(setTimeout)",
            "\n",
            printComment([`Get a port for the mock server`]),
            `const port = await getPort()`,
            "\n",
            printComment(["Start the mock server"]),
            `try {
              logger.info(\`Using mock server on http://localhost:\$\{port\}/graphql\`)
              mockServer = execa("npx", ["graphql-faker", "packages/sdk/src/schema.graphql", \`-p \$\{port\}\`])
            } catch (error) {
              logger.fatal(error)
              throw new Error('Failed to start the mock server')
            }`,
            "\n",
            printComment(["Wait for mock server to start"]),
            `await sleep(1000)`,
            "\n",
            printComment(["Create Linear client with mock server endpoint"]),
            `client = new ${Sdk.NAMESPACE}.LinearClient({
              apiKey: 'test',
              apiUrl: \`http://localhost:\$\{port\}/graphql\`,
            })`,
          ])}
        }`,
      ])}
    })`,
    "\n",
  ]);
}

/**
 * Prints the hook to call after all test have run
 * Kills the mock server
 */
export function printAfterAll(): string {
  return printLines([
    `afterAll(() => {
      ${printLines([
        printComment(["Kill the mock server"]),
        `try {
          if (mockServer) {
            mockServer.kill("SIGTERM", {
              forceKillAfterTimeout: 2000,
            })
          }
        } catch (error) {
          logger.fatal(error)
          throw new Error('Failed to kill the mock server')
        }`,
      ])}
    })`,
    "\n",
  ]);
}
