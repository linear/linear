import { describe, expect, it } from "vitest";
import { printComment } from "../print.js";

describe("printComment", () => {
  it("wraps a single line in a JSDoc block", () => {
    expect(printComment(["hello world"])).toEqual("/** hello world */");
  });

  it("wraps multiple lines in a JSDoc block", () => {
    expect(printComment(["first line", "second line"])).toEqual("/**\n * first line\n * second line\n */");
  });

  it("splits a line containing newlines", () => {
    expect(printComment(["first\nsecond"])).toEqual("/**\n * first\n * second\n */");
  });

  it("filters out empty and undefined lines", () => {
    expect(printComment(["", undefined, "only"])).toEqual("/** only */");
  });

  it("escapes */ in a single line so the comment cannot terminate early", () => {
    expect(printComment(["hello */ world"])).toEqual("/** hello * / world */");
  });

  it("escapes */ on every line in a multi-line block", () => {
    expect(printComment(["first */ break", "second */ break"])).toEqual(
      "/**\n * first * / break\n * second * / break\n */"
    );
  });

  it("escapes multiple */ occurrences on the same line", () => {
    expect(printComment(["a */ b */ c"])).toEqual("/** a * / b * / c */");
  });

  it("escapes */ that appear after a newline split", () => {
    expect(printComment(["safe\nthen */ unsafe"])).toEqual("/**\n * safe\n * then * / unsafe\n */");
  });
});
