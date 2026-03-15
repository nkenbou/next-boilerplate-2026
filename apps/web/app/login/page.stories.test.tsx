import { composeStories } from "@storybook/nextjs-vite";
import { render, screen } from "@testing-library/react";
import { MESSAGES } from "./_components/login-form-container/login-form-state";
import * as stories from "./page.stories";

const { Default, UsernameError, PasswordError, LoginError } =
  composeStories(stories);

describe("/login", () => {
  it(Default.name, () => {
    const { container } = render(<Default />);
    expect(screen.getByLabelText("ユーザー名")).toHaveValue("");
    expect(screen.getByLabelText("パスワード")).toHaveValue("");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it(UsernameError.name, () => {
    const { container } = render(<UsernameError />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      MESSAGES.INVALID_USERNAME,
    );
    expect(container).toMatchSnapshot();
  });

  it(PasswordError.name, () => {
    const { container } = render(<PasswordError />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      MESSAGES.INVALID_USER_PASSWORD,
    );
    expect(container).toMatchSnapshot();
  });

  it(LoginError.name, () => {
    const { container } = render(<LoginError />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      MESSAGES.ERROR_INVALID_CREDENTIALS,
    );
    expect(container).toMatchSnapshot();
  });
});
