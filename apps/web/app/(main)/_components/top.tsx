import { Box, Heading, Link, Text } from "@radix-ui/themes";
import { JSX } from "react";

type Props = {
  readonly userName: string;
};

export function Top({ userName }: Props): JSX.Element {
  return (
    <Box>
      <Heading mb="4">ようこそ、{userName}さん</Heading>
      <Text>
        <Link href="/todos">Todo 一覧を見る</Link>
      </Text>
    </Box>
  );
}
