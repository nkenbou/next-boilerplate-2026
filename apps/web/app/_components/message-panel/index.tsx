import { Text, TextProps } from "@radix-ui/themes";
import { type JSX } from "react";

type Color = TextProps["color"];
type Messages = string[];

/**
 * @public
 */
export function MessagePanel({
  id,
  color,
  messages,
}: {
  id?: string;
  color: Color;
  messages: Messages;
}): JSX.Element {
  return (
    <Text
      {...(id && { id })}
      as="p"
      color={color}
      dangerouslySetInnerHTML={{
        __html: messages.join("<br/>"),
      }}
      role="alert"
      aria-live="polite"
    />
  );
}

/**
 * @public
 */
export function ErrorMessagePanel(props: {
  id?: string;
  messages: Messages;
}): JSX.Element {
  return <MessagePanel color="red" {...props} />;
}
