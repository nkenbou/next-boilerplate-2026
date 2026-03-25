import { DueDate } from "./due-date";

describe("DueDate", () => {
  const date = new Date("2026-01-01T00:00:00.000Z");

  describe("of()", () => {
    it("引数なしで isNone() が true", () => {
      expect(DueDate.of().isNone()).toBe(true);
    });

    it("undefined で isNone() が true", () => {
      expect(DueDate.of(undefined).isNone()).toBe(true);
    });

    it("null で isNone() が true", () => {
      expect(DueDate.of(null).isNone()).toBe(true);
    });

    it("Date で isNone() が false", () => {
      expect(DueDate.of(date).isNone()).toBe(false);
    });

    it("引数なしで toDTO() が null", () => {
      expect(DueDate.of().toDTO()).toBeNull();
    });

    it("Date で toDTO() が同じ Date を返す", () => {
      expect(DueDate.of(date).toDTO()).toBe(date);
    });

    it("of() と of(null) は同一参照 (シングルトン)", () => {
      expect(DueDate.of()).toBe(DueDate.of(null));
    });

    it("of() と of(undefined) は同一参照 (シングルトン)", () => {
      expect(DueDate.of()).toBe(DueDate.of(undefined));
    });
  });

  describe("validate()", () => {
    it("有効な Date で success を返す", () => {
      const result = DueDate.validate(date);
      expect(result.type).toBe("success");
      if (result.type === "success") {
        expect(result.value.isNone()).toBe(false);
      }
    });

    it("null で success かつ isNone() が true", () => {
      const result = DueDate.validate(null);
      expect(result.type).toBe("success");
      if (result.type === "success") {
        expect(result.value.isNone()).toBe(true);
      }
    });

    it("undefined で success かつ isNone() が true", () => {
      const result = DueDate.validate(undefined);
      expect(result.type).toBe("success");
      if (result.type === "success") {
        expect(result.value.isNone()).toBe(true);
      }
    });

    it("Invalid Date で failure を返す", () => {
      const result = DueDate.validate(new Date("invalid"));
      expect(result.type).toBe("failure");
      if (result.type === "failure") {
        expect(result.error.type).toBe("INVALID_DUE_DATE");
      }
    });
  });
});
