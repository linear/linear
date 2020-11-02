import { double } from "../index";

describe("Index", () => {
  it("has double function", () => {
    expect(double("asd")).toEqual("asdasd");
  });
});
