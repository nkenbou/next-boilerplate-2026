import { Box } from "@radix-ui/themes";
import { JSX, ReactNode } from "react";

export function LoginBox({ children }: { children: ReactNode }): JSX.Element {
  return (
    <Box
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Box>
  );
}
