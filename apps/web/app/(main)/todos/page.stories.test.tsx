import { composeStories } from "@storybook/nextjs-vite";
import { render, screen } from "@testing-library/react";
import * as stories from "./page.stories";

const { Default, Empty } = composeStories(stories);

describe("/todos", () => {
  it(Default.name, () => {
    const { container } = render(<Default />);
    expect(
      screen.getByText("pending / description なし / dueDate なし"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("completed / description あり / dueDate あり"),
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it(Empty.name, () => {
    const { container } = render(<Empty />);
    expect(screen.getByText("Todo がありません")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
