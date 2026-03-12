import { composeStories } from "@storybook/nextjs-vite";
import { render, screen } from "@testing-library/react";
import * as stories from "./page.stories";

const { Default } = composeStories(stories);

describe("/", () => {
  it(Default.name, () => {
    const { container } = render(<Default />);
    expect(screen.getByText(/テストユーザー/)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
