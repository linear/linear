import { printComment, printLines } from "@linear/common";
import { SdkConstants } from "@linear/plugin-sdk";

/**
 * Prints code required before tests
 */
export function printBeforeSuite(): string {
  return printLines([
    printComment(["Initialize mock server variable"]),
    `let mockServer: ExecaChildProcess`,
    "\n",
    printComment(["Initialize Linear client variable"]),
    `let client: ${SdkConstants.NAMESPACE}.LinearClient`,
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
        printComment([`Create sleep function`]),
        "const sleep = promisify(setTimeout)",
        "\n",
        printComment([`Get a port for the mock server`]),
        `const port = await getPort()`,
        "\n",
        printComment(["Initialize Linear client with environment api key and url"]),
        `client = new ${SdkConstants.NAMESPACE}.LinearClient({
          apiKey: process.env.E2E_API_KEY ?? 'test',
          apiUrl: process.env.E2E_API_KEY ? undefined : \`http://localhost:\$\{port\}/graphql\`,
        })`,
        "\n",
        printComment(["Start the mock server"]),
        `try {
          mockServer = execa("npx", ["graphql-faker", "packages/client/src/schema.graphql", \`-p \$\{port\}\`])
          await sleep(1000)
        } catch (error) {
          logger.fatal(error)
          throw new Error('Failed to start the mock server')
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
          mockServer.kill("SIGTERM", {
            forceKillAfterTimeout: 2000,
          })
        } catch (error) {
          logger.fatal(error)
          throw new Error('Failed to kill the mock server')
        }`,
      ])}
    })`,
    "\n",
  ]);
}
