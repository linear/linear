// import { printOperations } from "../operation";

// function resolveWithData(data: unknown) {
//   return () => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     return Promise.resolve(data) as any;
//   };
// }

// describe("operations", () => {
//   it("calls the requester", async () => {
//     const requester = jest.fn();
//     const sdk = printOperations(requester);
//     const id = "asd";
//     const options = { asd: "qwe" };
//     await sdk.team(id, options);

//     expect(requester).toHaveBeenCalledWith(TeamDocument, { id }, options);
//   });

// });
