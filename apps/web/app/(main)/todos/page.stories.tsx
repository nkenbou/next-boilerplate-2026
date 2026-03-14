import { TodoDTO, TodoIdDTO, TodoTitleDTO, UserIdDTO } from "@app/query/dto";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
// eslint-disable-next-line import-access/jsdoc -- Storybook
import { TodoList } from "./_components/todo-list";

const sampleTodos: TodoDTO[] = [
  TodoDTO({
    id: TodoIdDTO("todo-1"),
    title: TodoTitleDTO("タスク1"),
    status: "pending",
    createdAt: new Date("2024-01-01"),
    dueDate: null,
    userId: UserIdDTO("user-1"),
    description: "",
  }),
  TodoDTO({
    id: TodoIdDTO("todo-2"),
    title: TodoTitleDTO("タスク2"),
    status: "completed",
    createdAt: new Date("2024-01-02"),
    dueDate: null,
    userId: UserIdDTO("user-1"),
    description: "",
  }),
];

const meta: Meta<typeof TodoList> = {
  component: TodoList,
  args: {
    todos: sampleTodos,
  },
  excludeStories: ["sampleTodos"],
} satisfies Meta<typeof TodoList>;
export default meta;

export { sampleTodos };

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Todo 一覧",
};

export const Empty: Story = {
  name: "空の一覧",
  args: {
    todos: [],
  },
};
