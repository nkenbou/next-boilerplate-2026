import type { User } from "../../../.prisma/client.js";
import type { Todo } from "../../../.prisma/client.js";
import type { Prisma } from "../../../.prisma/client.js";
import type { Resolver } from "@quramy/prisma-fabbrica/lib/internal";
export { resetSequence, registerScalarFieldValueGenerator, resetScalarFieldValueGenerator } from "@quramy/prisma-fabbrica/lib/internal";
type BuildDataOptions<TTransients extends Record<string, unknown>> = {
    readonly seq: number;
} & TTransients;
type TraitName = string | symbol;
type CallbackDefineOptions<TCreated, TCreateInput, TTransients extends Record<string, unknown>> = {
    onAfterBuild?: (createInput: TCreateInput, transientFields: TTransients) => void | PromiseLike<void>;
    onBeforeCreate?: (createInput: TCreateInput, transientFields: TTransients) => void | PromiseLike<void>;
    onAfterCreate?: (created: TCreated, transientFields: TTransients) => void | PromiseLike<void>;
};
export declare const initialize: (options: import("@quramy/prisma-fabbrica/lib/internal").InitializeOptions) => void;
type UserFactoryDefineInput = {
    userId?: string;
    username?: string;
    password?: string;
    displayName?: string;
    todos?: Prisma.TodoCreateNestedManyWithoutUserInput;
};
type UserTransientFields = Record<string, unknown> & Partial<Record<keyof UserFactoryDefineInput, never>>;
type UserFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<UserFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<User, Prisma.UserCreateInput, TTransients>;
type UserFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData?: Resolver<UserFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: TraitName]: UserFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<User, Prisma.UserCreateInput, TTransients>;
type UserTraitKeys<TOptions extends UserFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface UserFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "User";
    build(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Prisma.UserCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Prisma.UserCreateInput>;
    buildList(list: readonly Partial<Prisma.UserCreateInput & TTransients>[]): PromiseLike<Prisma.UserCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Prisma.UserCreateInput[]>;
    pickForConnect(inputData: User): Pick<User, "userId">;
    create(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<User>;
    createList(list: readonly Partial<Prisma.UserCreateInput & TTransients>[]): PromiseLike<User[]>;
    createList(count: number, item?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<User[]>;
    createForConnect(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Pick<User, "userId">>;
}
export interface UserFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends UserFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): UserFactoryInterfaceWithoutTraits<TTransients>;
}
interface UserFactoryBuilder {
    <TOptions extends UserFactoryDefineOptions>(options?: TOptions): UserFactoryInterface<{}, UserTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends UserTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends UserFactoryDefineOptions<TTransients>>(options?: TOptions) => UserFactoryInterface<TTransients, UserTraitKeys<TOptions>>;
}
/**
 * Define factory for {@link User} model.
 *
 * @param options
 * @returns factory {@link UserFactoryInterface}
 */
export declare const defineUserFactory: UserFactoryBuilder;
type TodouserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutTodosInput["create"]>;
};
type TodoFactoryDefineInput = {
    todoId?: string;
    title?: string;
    description?: string;
    status?: string;
    createdAt?: Date;
    dueDate?: Date | null;
    user: TodouserFactory | Prisma.UserCreateNestedOneWithoutTodosInput;
};
type TodoTransientFields = Record<string, unknown> & Partial<Record<keyof TodoFactoryDefineInput, never>>;
type TodoFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<TodoFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Todo, Prisma.TodoCreateInput, TTransients>;
type TodoFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<TodoFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: TodoFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Todo, Prisma.TodoCreateInput, TTransients>;
type TodoTraitKeys<TOptions extends TodoFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface TodoFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Todo";
    build(inputData?: Partial<Prisma.TodoCreateInput & TTransients>): PromiseLike<Prisma.TodoCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TodoCreateInput & TTransients>): PromiseLike<Prisma.TodoCreateInput>;
    buildList(list: readonly Partial<Prisma.TodoCreateInput & TTransients>[]): PromiseLike<Prisma.TodoCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.TodoCreateInput & TTransients>): PromiseLike<Prisma.TodoCreateInput[]>;
    pickForConnect(inputData: Todo): Pick<Todo, "todoId">;
    create(inputData?: Partial<Prisma.TodoCreateInput & TTransients>): PromiseLike<Todo>;
    createList(list: readonly Partial<Prisma.TodoCreateInput & TTransients>[]): PromiseLike<Todo[]>;
    createList(count: number, item?: Partial<Prisma.TodoCreateInput & TTransients>): PromiseLike<Todo[]>;
    createForConnect(inputData?: Partial<Prisma.TodoCreateInput & TTransients>): PromiseLike<Pick<Todo, "todoId">>;
}
export interface TodoFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends TodoFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): TodoFactoryInterfaceWithoutTraits<TTransients>;
}
interface TodoFactoryBuilder {
    <TOptions extends TodoFactoryDefineOptions>(options: TOptions): TodoFactoryInterface<{}, TodoTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends TodoTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends TodoFactoryDefineOptions<TTransients>>(options: TOptions) => TodoFactoryInterface<TTransients, TodoTraitKeys<TOptions>>;
}
/**
 * Define factory for {@link Todo} model.
 *
 * @param options
 * @returns factory {@link TodoFactoryInterface}
 */
export declare const defineTodoFactory: TodoFactoryBuilder;
//# sourceMappingURL=index.d.ts.map