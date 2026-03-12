import { defineTodoFactory, defineUserFactory } from "./__generated__/fabbrica";

export const UserFactory = defineUserFactory();

export const TodoFactory = defineTodoFactory({
  defaultData: {
    user: UserFactory,
  },
});
