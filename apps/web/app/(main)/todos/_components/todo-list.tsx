import { TodoDTO } from "@app/query/dto";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { JSX } from "react";
// eslint-disable-next-line import-access/jsdoc -- Internal component
import { CompleteTodoButton } from "./complete-todo-button/complete-todo-button";

type Props = {
  readonly todos: TodoDTO[];
};

export function TodoList({ todos }: Props): JSX.Element {
  if (todos.length === 0) {
    return (
      <Box py="4">
        <Text color="gray">Todo がありません</Text>
      </Box>
    );
  }

  return (
    <Flex direction="column" gap="3" mt="4">
      {todos.map((todo) => (
        <Card key={todo.id}>
          <Flex align="center" justify="between">
            <Text
              style={{
                textDecoration:
                  todo.status === "completed" ? "line-through" : "none",
                color:
                  todo.status === "completed" ? "var(--gray-9)" : "inherit",
              }}
            >
              {todo.title}
            </Text>
            {todo.status === "pending" && (
              <CompleteTodoButton todoId={todo.id} />
            )}
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}
