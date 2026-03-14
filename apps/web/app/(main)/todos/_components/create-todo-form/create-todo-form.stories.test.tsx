import { composeStories } from "@storybook/nextjs-vite";
import { render, screen } from "@testing-library/react";
import * as stories from "./create-todo-form.stories";
import { ANY_ERROR_MESSAGE, MESSAGES } from "./form-state";

const {
  Default,
  TitleEmptyError,
  TitleTooLongError,
  DescriptionTooLongError,
  AnyError,
} = composeStories(stories);

describe("CreateTodoForm", () => {
  it(Default.name, () => {
    const { container } = render(<Default />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it(TitleEmptyError.name, () => {
    const { container } = render(<TitleEmptyError />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      MESSAGES.INVALID_TODO_TITLE_EMPTY,
    );
    expect(container).toMatchSnapshot();
  });

  it(TitleTooLongError.name, () => {
    const { container } = render(<TitleTooLongError />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      MESSAGES.INVALID_TODO_TITLE_TOO_LONG,
    );
    expect(container).toMatchSnapshot();
  });

  it(DescriptionTooLongError.name, () => {
    const { container } = render(<DescriptionTooLongError />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      MESSAGES.INVALID_TODO_DESCRIPTION_TOO_LONG,
    );
    expect(container).toMatchSnapshot();
  });

  it(AnyError.name, () => {
    const { container } = render(<AnyError />);
    expect(screen.getByRole("alert")).toHaveTextContent(ANY_ERROR_MESSAGE);
    expect(container).toMatchSnapshot();
  });
});
