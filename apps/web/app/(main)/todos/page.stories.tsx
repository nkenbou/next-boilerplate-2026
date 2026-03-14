import {
  TodoCreatedAtDTO,
  TodoDTO,
  TodoDescriptionDTO,
  TodoDueDateDTO,
  TodoIdDTO,
  TodoStatusDTO,
  TodoTitleDTO,
  UserIdDTO,
} from "@app/query/dto";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TodoList } from "./_components";

const allTodos: TodoDTO[] = [
  TodoDTO({
    id: TodoIdDTO("todo-1"),
    title: TodoTitleDTO("pending / description なし / dueDate なし"),
    status: TodoStatusDTO("pending"),
    createdAt: TodoCreatedAtDTO(new Date("2024-01-01")),
    dueDate: TodoDueDateDTO(null),
    userId: UserIdDTO("user-1"),
    description: TodoDescriptionDTO(""),
  }),
  TodoDTO({
    id: TodoIdDTO("todo-2"),
    title: TodoTitleDTO("pending / description あり / dueDate なし"),
    status: TodoStatusDTO("pending"),
    createdAt: TodoCreatedAtDTO(new Date("2024-01-02")),
    dueDate: TodoDueDateDTO(null),
    userId: UserIdDTO("user-1"),
    description: TodoDescriptionDTO("これはサンプルの説明文です。"),
  }),
  TodoDTO({
    id: TodoIdDTO("todo-3"),
    title: TodoTitleDTO("pending / description なし / dueDate あり"),
    status: TodoStatusDTO("pending"),
    createdAt: TodoCreatedAtDTO(new Date("2024-01-03")),
    dueDate: TodoDueDateDTO(new Date("2024-03-31")),
    userId: UserIdDTO("user-1"),
    description: TodoDescriptionDTO(""),
  }),
  TodoDTO({
    id: TodoIdDTO("todo-4"),
    title: TodoTitleDTO("pending / description あり / dueDate あり"),
    status: TodoStatusDTO("pending"),
    createdAt: TodoCreatedAtDTO(new Date("2024-01-04")),
    dueDate: TodoDueDateDTO(new Date("2024-03-31")),
    userId: UserIdDTO("user-1"),
    description: TodoDescriptionDTO("これはサンプルの説明文です。"),
  }),
  TodoDTO({
    id: TodoIdDTO("todo-5"),
    title: TodoTitleDTO("completed / description なし / dueDate なし"),
    status: TodoStatusDTO("completed"),
    createdAt: TodoCreatedAtDTO(new Date("2024-01-05")),
    dueDate: TodoDueDateDTO(null),
    userId: UserIdDTO("user-1"),
    description: TodoDescriptionDTO(""),
  }),
  TodoDTO({
    id: TodoIdDTO("todo-6"),
    title: TodoTitleDTO("completed / description あり / dueDate なし"),
    status: TodoStatusDTO("completed"),
    createdAt: TodoCreatedAtDTO(new Date("2024-01-06")),
    dueDate: TodoDueDateDTO(null),
    userId: UserIdDTO("user-1"),
    description: TodoDescriptionDTO("これはサンプルの説明文です。"),
  }),
  TodoDTO({
    id: TodoIdDTO("todo-7"),
    title: TodoTitleDTO("completed / description なし / dueDate あり"),
    status: TodoStatusDTO("completed"),
    createdAt: TodoCreatedAtDTO(new Date("2024-01-07")),
    dueDate: TodoDueDateDTO(new Date("2024-03-31")),
    userId: UserIdDTO("user-1"),
    description: TodoDescriptionDTO(""),
  }),
  TodoDTO({
    id: TodoIdDTO("todo-8"),
    title: TodoTitleDTO("completed / description あり / dueDate あり"),
    status: TodoStatusDTO("completed"),
    createdAt: TodoCreatedAtDTO(new Date("2024-01-08")),
    dueDate: TodoDueDateDTO(new Date("2024-03-31")),
    userId: UserIdDTO("user-1"),
    description: TodoDescriptionDTO("これはサンプルの説明文です。"),
  }),
];

export const sampleTodos = allTodos;

const meta: Meta<typeof TodoList> = {
  component: TodoList,
  args: {
    todos: allTodos,
  },
  excludeStories: ["sampleTodos"],
} satisfies Meta<typeof TodoList>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "全パターン",
};

export const PendingOnly: Story = {
  name: "未完了のみ",
  args: {
    todos: allTodos.slice(0, 4),
  },
};

export const CompletedOnly: Story = {
  name: "完了済みのみ",
  args: {
    todos: allTodos.slice(4),
  },
};

export const Empty: Story = {
  name: "空の一覧",
  args: {
    todos: [],
  },
};
