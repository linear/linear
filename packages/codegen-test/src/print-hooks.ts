import { printComment, printLines } from "@linear/codegen-doc";
import { Sdk } from "@linear/codegen-sdk";

/**
 * Prints code required before tests
 */
export function printBeforeSuite(): string {
  return printLines([
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
      client = await startClient()
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
      stopClient()
    })`,
    "\n",
  ]);
}
