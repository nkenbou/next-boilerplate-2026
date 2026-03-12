import { Theme } from "@radix-ui/themes";
import type { Preview } from "@storybook/nextjs-vite";
import { Noto_Sans_JP } from "next/font/google";
import "../app/global.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={notoSansJP.className}>
        <Theme accentColor="indigo">
          <div
            style={{
              backgroundColor: "var(--background-color)",
            }}
          >
            <Story />
          </div>
        </Theme>
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
