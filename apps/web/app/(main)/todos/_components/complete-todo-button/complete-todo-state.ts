import type { Todo } from "@app/command-domain";
import type { TodoPresenter } from "@app/command-interface-adapter-if";

export type CompleteTodoState = { messages?: string[] } | undefined;

export class CompleteTodoFormState implements TodoPresenter {
  private state: CompleteTodoState;

  constructor(
    prevState: CompleteTodoState = undefined,
    private readonly revalidate: (path: string) => void,
  ) {
    this.state = prevState;
  }

  presentTodo(_todo: Todo): void {
    this.revalidate("/todos");
  }

  presentAnyError(_err: unknown): void {
    this.state = { messages: ["タスクの完了に失敗しました。"] };
  }

  getState(): CompleteTodoState {
    return this.state;
  }
}
