import type { Todo } from "@app/command-domain";
import type { TodoPresenter } from "@app/command-interface-adapter-if";

export type CompleteTodoState = { messages?: string[] } | undefined;

export class CompleteTodoFormState implements TodoPresenter {
  private state: CompleteTodoState;
  private successful = false;

  constructor(
    prevState: CompleteTodoState = undefined,
    private readonly revalidate: (path: string) => void,
  ) {
    this.state = prevState;
  }

  presentTodo(_todo: Todo): void {
    this.successful = true;
  }

  presentAnyError(_err: unknown): void {
    this.state = { messages: ["タスクの完了に失敗しました。"] };
  }

  next(): CompleteTodoState {
    if (this.successful) {
      this.revalidate("/todos");
    }
    return this.state;
  }
}
