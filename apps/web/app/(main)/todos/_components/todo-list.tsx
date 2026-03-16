import { TodoDTO } from "@app/query/dto";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { JSX } from "react";
import { CompleteTodoButton } from "./complete-todo-button";

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
        <Card key={todo.id} role="article" aria-label={todo.title}>
          <Flex align="center" justify="between">
            <Box>
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
              {todo.description && (
                <Text as="p" size="1" color="gray">
                  {todo.description}
                </Text>
              )}
              {todo.dueDate && (
                <Text as="p" size="1" color="gray">
                  期限: {todo.dueDate.toLocaleDateString("ja-JP")}
                </Text>
              )}
            </Box>
            {todo.status === "pending" && (
              <CompleteTodoButton todoId={todo.id} />
            )}
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}
