import { Box, Card, Heading } from "@radix-ui/themes";
import { JSX, ReactNode } from "react";

type Props = {
  readonly loginFormNode: ReactNode;
};

export function Login({ loginFormNode }: Props): JSX.Element {
  return (
    <Box style={{ width: "400px" }}>
      <Card size="4">
        <Heading mb="5" size="6" align="center">
          ログイン
        </Heading>
        {loginFormNode}
      </Card>
    </Box>
  );
}
