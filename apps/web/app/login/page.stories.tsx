import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import {
  Login,
  LoginAuthenticationState,
  LoginBox,
  LoginForm,
} from "./_components";
import { MESSAGES } from "./_components/login-form-container/login-form-state";

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
  decorators: [
    (Story) => (
      <LoginBox>
        <Login loginFormNode={<Story />} />
      </LoginBox>
    ),
  ],
  args: {
    loginAction: fn(),
  },
  excludeStories: [
    "initialState",
    "usernameErrorState",
    "passwordErrorState",
    "errorState",
  ],
} satisfies Meta<typeof LoginForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const initialState: LoginAuthenticationState = undefined;
export const Default: Story = {
  name: "初期表示",
};

export const usernameErrorState: LoginAuthenticationState = {
  password: "foo-password",
  errors: {
    username: [MESSAGES.INVALID_USERNAME],
  },
};
export const UsernameError: Story = {
  name: "ユーザー名エラー",
  args: {
    state: usernameErrorState,
  },
};

export const passwordErrorState: LoginAuthenticationState = {
  username: "foo",
  errors: {
    password: [MESSAGES.INVALID_USER_PASSWORD],
  },
};
export const PasswordError: Story = {
  name: "パスワードエラー",
  args: {
    state: passwordErrorState,
  },
};

export const errorState: LoginAuthenticationState = {
  username: "foo",
  password: "foo-password",
  messages: [MESSAGES.ERROR_INVALID_CREDENTIALS],
};
export const LoginError: Story = {
  name: "ログインエラー",
  args: {
    state: errorState,
  },
};
