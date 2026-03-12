import { Box, Flex, Heading, Link } from "@radix-ui/themes";
import { JSX } from "react";
import { LogoutButton } from "../logout-button";

export function Header(): JSX.Element {
  return (
    <Box
      style={{
        height: "var(--header-height)",
        backgroundColor: "var(--indigo-9)",
      }}
      px="4"
    >
      <Flex align="center" justify="between" height="100%">
        <Link href="/" style={{ color: "white", textDecoration: "none" }}>
          <Heading size="4" style={{ color: "white" }}>
            App
          </Heading>
        </Link>
        <LogoutButton />
      </Flex>
    </Box>
  );
}
