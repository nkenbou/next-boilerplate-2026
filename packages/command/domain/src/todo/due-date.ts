import type { Result } from "@app/infrastructure/result";
import { DomainError } from "../domain-error";

const __type = Symbol();

export abstract class DueDate {
  readonly __type = __type;

  abstract readonly value: Date | null;
  abstract isNone(): boolean;
  abstract toDTO(): Date | null;
  abstract toString(): string;

  /**
   * 信頼済みの値からインスタンスを生成する (DB・内部ロジック用)
   * value が undefined / null の場合は NullDueDate を返す
   */
  static of(value?: Date | null): DueDate {
    return value ? new PresentDueDate(value) : NullDueDate.instance;
  }

  /**
   * 外部入力を検証してインスタンスを生成する (Server Action・フォーム境界用)
   * 現在は型チェックのみ。将来的に業務ルール (過去日不可など) を追加する起点。
   */
  static validate(
    value?: Date | null,
  ): Result<DueDate, DomainError<"INVALID_DUE_DATE">> {
    try {
      if (value !== null && value !== undefined && isNaN(value.getTime())) {
        throw new DomainError("INVALID_DUE_DATE", "DueDate is invalid");
      }
      return { type: "success", value: DueDate.of(value) };
    } catch (error) {
      if (error instanceof DomainError)
        return {
          type: "failure",
          error: error as DomainError<"INVALID_DUE_DATE">,
        };
      throw error;
    }
  }
}

// 期限あり (module 内部クラス)
class PresentDueDate extends DueDate {
  readonly value: Date;

  constructor(value: Date) {
    super();
    this.value = value;
  }

  isNone(): false {
    return false;
  }

  toDTO(): Date {
    return this.value;
  }

  toString(): string {
    return `DueDate(${this.value.toISOString()})`;
  }
}

// 期限なし・Null Object (module 内部クラス、シングルトン)
class NullDueDate extends DueDate {
  static readonly instance: NullDueDate = new NullDueDate();
  readonly value = null;

  private constructor() {
    super();
  }

  isNone(): true {
    return true;
  }

  toDTO(): null {
    return null;
  }

  toString(): string {
    return "DueDate(none)";
  }
}
