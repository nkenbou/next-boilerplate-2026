# Plan: Todo に description を追加し、object ベース Presenter 設計を適用する

## Context

本プロジェクトはボイラープレート。`CreateTodoFormPresenter` は現在 title のみを扱っており、
複数フィールドのフォームに備えた設計方針（object ベース）を示すためにはサンプルが必要。

`description` フィールドを全層に追加することで以下の設計を実証する:

```typescript
// 入力値は fields オブジェクトで一括渡し（フィールド追加時は型拡張のみ）
presentFormData(fields: { title: string; description: string }): void

// エラーはフィールド名＋errorType のみ（入力値は presentFormData が持つ）
presentValidationError(field: "title" | "description", errorType: TodoFormErrorType): void
```

`presentValidationError` は呼ぶたびに `errors` をマージするため、
複数フィールドの同時エラー表示にも対応する。

---

## 変更ファイル一覧

| レイヤー | ファイル | 変更内容 |
|---|---|---|
| Domain | `packages/command/domain/src/todo/todo-description.ts` (NEW) | `TodoDescription` ValueObject（空 → null、500 字超 → エラー） |
| Domain | `packages/command/domain/src/todo/todo.ts` | `description: TodoDescription \| null` フィールド追加 |
| Domain | `packages/command/domain/src/todo/index.ts` | `TodoDescription` をエクスポート追加 |
| Domain | `packages/command/domain/src/index.ts` | `TodoDescription` をエクスポート追加 |
| DB | `packages/db/prisma/schema.prisma` | `description String?` カラム追加 |
| DB | `packages/command/interface-adapter-impl/src/gateways/db/repository/prisma-todo-repository/prisma-todo-repository.ts` | `store`・`reconstruct` に description を追加 |
| Command IF | `packages/command/interface-adapter-if/src/processor/todo-command-processor.ts` | `create` に `description?: TodoDescription` を追加 |
| Command Processor | `packages/command/processor/src/todo/todo-command-processor.ts` | `create` 実装に description を追加 |
| Query | `packages/query/src/dto.ts` | `TodoDTO` に `description: string \| null` を追加 |
| Query | `packages/query/src/processor/todo/todo-query-processor.ts` | `list` で `t.description` をマッピング |
| Web UI | `apps/web/app/(main)/todos/_components/todo-list.tsx` | description を表示 |
| Web Form | `apps/web/app/(main)/todos/_components/create-todo-form/controller.ts` | Presenter インターフェースを object ベースに変更、description バリデーション追加 |
| Web Form | `apps/web/app/(main)/todos/_components/create-todo-form/form-state.ts` | 新インターフェース実装 |
| Web Form | `apps/web/app/(main)/todos/_components/create-todo-form/action.ts` | command.create に description を渡す |
| Web Form | `apps/web/app/(main)/todos/_components/create-todo-form/create-todo-form.tsx` | TextArea を追加 |
| Tests | `apps/web/app/(main)/todos/_components/create-todo-form/form-state.test.ts` | 新インターフェースに合わせて更新 |
| Tests | `apps/web/app/(main)/todos/_components/create-todo-form/controller.test.ts` | 新インターフェースに合わせて更新 |

---

## 実装

### 1. `TodoDescription` ValueObject (NEW)

`TodoTitle` と同じ構造。空文字列は `null` を返す（エラーにしない）。

```typescript
// packages/command/domain/src/todo/todo-description.ts
export class TodoDescription {
  private constructor(public readonly value: string) {}

  toDTO(): string { return this.value; }

  static validate(
    value: string,
  ): Result<TodoDescription | null, DomainError<"INVALID_TODO_DESCRIPTION_TOO_LONG">> {
    if (value.trim().length === 0) return { type: "success", value: null };
    if (value.length > 500) return { type: "failure", error: new DomainError("INVALID_TODO_DESCRIPTION_TOO_LONG", "...") };
    return { type: "success", value: new TodoDescription(value) };
  }

  static of(value: string): TodoDescription { return new TodoDescription(value); }
}
```

### 2. `Todo` エンティティ更新

```typescript
// constructor に description: TodoDescription | null を追加
static create(id, title, userId, description?: TodoDescription, dueDate?: DueDate): Todo
static of(id, title, status, createdAt, userId, description: TodoDescription | null, dueDate: DueDate | null): Todo

toDTO() {
  return { ..., description: this.description?.value ?? null };
}
```

### 3. Prisma スキーマ

```prisma
model Todo {
  // 既存フィールド
  description String?   // 追加
}
```

マイグレーション実行: `pnpm db:migrate`

### 4. `PrismaTodoRepository` 更新

```typescript
// store の update/create に description を追加
description: todo.description?.value ?? null,

// reconstruct に description を追加
record.description ? TodoDescription.of(record.description) : null,
```

### 5. `TodoCommandProcessor` インターフェース更新

```typescript
create(userId: UserId, title: TodoTitle, description?: TodoDescription, dueDate?: Date): Promise<void>
```

### 6. `TodoCommandProcessorImpl.create()` 更新

```typescript
async create(userId, title, description?, dueDate?): Promise<void> {
  const todo = Todo.create(TodoId.of(generateId()), title, userId, description, dueDate ? DueDate.of(dueDate) : undefined);
  // ...
}
```

### 7. Query DTO 更新

```typescript
type TodoDTOValue = {
  // 既存フィールド
  readonly description: string | null;  // 追加
};
```

`TodoQueryProcessorImpl.list()` でマッピング: `description: t.description`

### 8. `TodoList` UI 更新

description がある場合にサブテキストとして表示。

```tsx
<Text size="1" color="gray">{todo.description}</Text>
```

### 9. `controller.ts` — 設計方針の中核変更

```typescript
type TodoFormErrorType =
  | "INVALID_TODO_TITLE_EMPTY"
  | "INVALID_TODO_TITLE_TOO_LONG"
  | "INVALID_TODO_DESCRIPTION_TOO_LONG";

export interface CreateTodoFormPresenter {
  presentFormData(fields: { title: string; description: string }): void;
  presentValidationError(field: "title" | "description", errorType: TodoFormErrorType): void;
}

export async function createTodoController(...): Promise<void> {
  const title = ...;
  const description = formData.get("description");
  const descriptionStr = typeof description === "string" ? description : "";

  presenter.presentFormData({ title: titleStr, description: descriptionStr });

  const validatedTitle = TodoTitle.validate(titleStr);
  if (validatedTitle.type === "failure") {
    presenter.presentValidationError("title", validatedTitle.error.type);
    return;
  }

  const validatedDescription = TodoDescription.validate(descriptionStr);
  if (validatedDescription.type === "failure") {
    presenter.presentValidationError("description", validatedDescription.error.type);
    return;
  }

  await command.create(UserId.of(userId), validatedTitle.value, validatedDescription.value ?? undefined);
}
```

### 10. `form-state.ts` 更新

```typescript
const MESSAGES: Record<TodoFormErrorType, string> = {
  INVALID_TODO_TITLE_EMPTY: "タイトルを入力してください。",
  INVALID_TODO_TITLE_TOO_LONG: "タイトルは200文字以内にしてください。",
  INVALID_TODO_DESCRIPTION_TOO_LONG: "説明は500文字以内にしてください。",
};

export type CreateTodoState = {
  title?: string;
  description?: string;
  errors?: { title?: string[]; description?: string[] };
  messages?: string[];
} | undefined;

// presentFormData: 全入力値を一括でセット（errors はリセット）
presentFormData(fields: { title: string; description: string }): void {
  this.state = { ...fields };
}

// presentValidationError: errors をマージ（複数フィールドエラーに対応）
presentValidationError(field: "title" | "description", errorType: TodoFormErrorType): void {
  this.state = {
    ...this.state,
    errors: { ...this.state?.errors, [field]: [MESSAGES[errorType]] },
  };
}
```

### 11. `create-todo-form.tsx` 更新

Textarea for description を追加（Radix UI の `TextArea` コンポーネント使用）。

---

## 依存フロー（変更後）

```
presentFormData({ title, description })   ← 入力値を全フィールド一括・errors リセット
presentValidationError("title", errorType)    ← エラー情報のみ・errors をマージ
presentValidationError("description", errorType)
```

---

## 検証

```bash
# DB マイグレーション
pnpm db:migrate

# Prisma クライアント再生成
pnpm db:generate

# ユニットテスト
cd apps/web && pnpm vitest run --reporter=verbose

# 全テスト
pnpm test
```
