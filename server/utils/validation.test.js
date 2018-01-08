const expect = require("expect");
const {isRealString} = require("./validation");

describe("isRealString", () => {
    it("should reject non-string values", () => {
        expect(isRealString(123)).toBe(false);
    });

    it("should reject strings with only spases", () => {
        expect(isRealString("      ")).toBe(false);
    });

    it("should allow strings with non-space charecters", () => {
        expect(isRealString("   ho  la   ")).toBe(true);
    });
});