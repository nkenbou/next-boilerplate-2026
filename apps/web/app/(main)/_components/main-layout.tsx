import { Box, Container } from "@radix-ui/themes";
import { JSX, ReactNode } from "react";

type Props = {
  readonly header: ReactNode;
  readonly children: ReactNode;
};

export function MainLayout({ header, children }: Props): JSX.Element {
  return (
    <Box
      style={{ minHeight: "100vh", backgroundColor: "var(--background-color)" }}
    >
      {header}
      <Container size="3" pt="6">
        {children}
      </Container>
    </Box>
  );
}
