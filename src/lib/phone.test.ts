import { describe, it, expect } from "vitest";
import { normalizePhoneRO } from "./phone";
describe("normalizePhoneRO", () => {
  it("converts local 07 numbers", () => expect(normalizePhoneRO("0740 123 456")).toBe("40740123456"));
  it("keeps +40 numbers", () => expect(normalizePhoneRO("+40 740-123-456")).toBe("40740123456"));
  it("strips 00 prefix", () => expect(normalizePhoneRO("0040740123456")).toBe("40740123456"));
  it("rejects too short", () => expect(normalizePhoneRO("12345")).toBeNull());
});
