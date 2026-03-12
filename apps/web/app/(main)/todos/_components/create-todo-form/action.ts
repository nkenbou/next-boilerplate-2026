"use server";

import { TodoTitle, UserId } from "@app/command-domain";
import { createTodoProcessor } from "@app/command-interface-adapter-impl/processors";
import { revalidatePath } from "next/cache";

type CreateTodoState =
  | {
      title?: string;
      errors?: { title?: string[] };
      messages?: string[];
    }
  | undefined;

export async function createTodo(
  userId: string,
  formData: FormData,
  createProcessor = createTodoProcessor,
  revalidate = revalidatePath,
): Promise<CreateTodoState> {
  const title = formData.get("title");
  const titleStr = typeof title === "string" ? title : "";

  const validated = TodoTitle.validate(titleStr);
  if (validated.type === "failure") {
    const titleMessages = {
      INVALID_TODO_TITLE_EMPTY: "タイトルを入力してください。",
      INVALID_TODO_TITLE_TOO_LONG: "タイトルは200文字以内にしてください。",
    } satisfies Record<typeof validated.error.type, string>;
    return {
      title: titleStr,
      errors: { title: [titleMessages[validated.error.type]] },
    };
  }

  let error: string | undefined;
  const presenter = {
    presentTodo(): void {},
    presentAnyError(_err: unknown): void {
      error = "タスクの作成に失敗しました。";
    },
  };

  const processor = createProcessor(presenter);
  await processor.create(UserId.of(userId), validated.value);

  if (error) {
    return { messages: [error] };
  }

  revalidate("/todos");
}
