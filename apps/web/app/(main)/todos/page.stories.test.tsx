import { composeStories } from "@storybook/nextjs-vite";
import { render, screen } from "@testing-library/react";
import * as stories from "./page.stories";

const { Default, Empty } = composeStories(stories);

describe("/todos", () => {
  it(Default.name, () => {
    const { container } = render(<Default />);
    expect(screen.getByText("タスク1")).toBeInTheDocument();
    expect(screen.getByText("タスク2")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it(Empty.name, () => {
    const { container } = render(<Empty />);
    expect(screen.getByText("Todo がありません")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
