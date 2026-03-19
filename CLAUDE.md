# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

pnpm + Turbo によるモノレポ構成の To-Do 管理アプリ。CQRS + DDD + Clean Architecture を採用している。

## コマンド

```bash
# 開発
pnpm dev           # 全パッケージの開発サーバー起動
pnpm build         # 全パッケージビルド

# テスト・Lint（全体）
pnpm test          # lint + unit（CI 用）
pnpm unit          # 全パッケージのユニットテスト
pnpm lint          # 全パッケージの Lint
pnpm fix           # 自動修正

# DB
pnpm db:generate   # Prisma クライアント生成
pnpm db:migrate    # マイグレーション実行（dev/test/e2e スキーマ）
pnpm db:deploy     # マイグレーション本番適用（dev/test/e2e スキーマ）
pnpm db:push       # スキーマ同期（dev/test/e2e スキーマ）
pnpm db:seed       # シードデータ投入

# E2E テスト（apps/e2e/ にて個別実行）
pnpm e2e           # Turbo 経由で E2E テスト実行（CI: web build → start）
pnpm --filter @app/e2e e2e        # ローカル（dev サーバーを再利用）
pnpm --filter @app/e2e e2e:ui     # Playwright UI モード
pnpm --filter @app/e2e e2e:report # レポート表示

# Web アプリ（apps/web/ にて個別実行）
pnpm lint:eslint    # ESLint
pnpm lint:stylelint # Stylelint
pnpm lint:prettier  # Prettier チェック
pnpm lint:tsc       # TypeScript 型チェック
pnpm unit           # Vitest ユニットテスト
pnpm e2e            # Playwright E2E テスト
pnpm vrt:compare    # VRT（ビジュアルリグレッションテスト）
```

### 単一パッケージのテスト実行

各パッケージ（`packages/command/domain/`, `packages/command/processor/`, `packages/query/`, `apps/web/`）は独立したテスト設定を持つ。単一ファイルのテストを実行する場合は対象パッケージの `package.json` のある階層で実行する。

```bash
# 例: command/domain のテスト
cd packages/command/domain && pnpm unit

# 例: web アプリの unit テストのみ
cd apps/web && pnpm unit
```

## アーキテクチャ

### パッケージ構成

```
apps/
  web/                               # Next.js アプリケーション（フロントエンド + Server Actions）
  e2e/                               # Playwright E2E テスト（独立パッケージ）
packages/
  command/
    domain/                            # エンティティ・値オブジェクト・ドメインロジック
    interface-adapter-if/              # Presenter, Processor, Repository のインターフェース定義
    interface-adapter-impl/            # Prisma を使った Repository 実装 + DI ブートストラップ
    processor/                         # コマンドのユースケース実装（tsyringe で DI）
  query/                               # クエリ処理（Prisma 直接参照、読み取り専用）
  db/                                  # Prisma スキーマ・クライアント・テスト用ファクトリー
  infrastructure/                      # 共有ユーティリティ（ID生成、Logger、Result 型、Brand 型）
  ui/                                  # 共有 UI コンポーネント（Button, Input）
  eslint-config/                       # 共有 ESLint 設定
  typescript-config/                   # 共有 TypeScript 設定
  stylelint-config/                    # 共有 Stylelint 設定
```

### CQRS + DDD のデータフロー

**Command（書き込み）:**
`apps/web` の Server Action
→ `command/interface-adapter-impl` の `bootstrap.ts` で DI コンテナから `CommandProcessor` を解決
→ `command/processor` のユースケース実装
→ `command/interface-adapter-impl` の Prisma リポジトリ実装
→ `Presenter` インターフェース経由で結果を返す

**Query（読み取り）:**
`apps/web` の Server Component / Server Action
→ `query` パッケージの QueryProcessor（Prisma 直接使用）
→ DTO として UI へ

### 依存注入

`tsyringe` を使用。デコレーターで注入する（`@injectable()`, `@inject("Token")`）。DI コンテナの設定は `packages/command/interface-adapter-impl/src/bootstrap.ts` にある。

### テスト戦略

| 層                   | テストランナー              | 対象                                                          |
| -------------------- | --------------------------- | ------------------------------------------------------------- |
| ドメイン             | Jest                        | `packages/command/domain/`                                    |
| コマンドプロセッサー | Jest                        | `packages/command/processor/`                                 |
| クエリ + リポジトリ  | Jest + @quramy/jest-prisma  | `packages/query/`, `packages/command/interface-adapter-impl/` |
| Web コンポーネント   | Vitest                      | `apps/web/`                                                   |
| Storybook VRT        | Vitest + Storycap + reg-cli | `apps/web/`                                                   |
| E2E                  | Playwright                  | `apps/e2e/`                                                   |

インテグレーションテスト（`packages/query/` と `interface-adapter-impl/`）は実際の DB に接続する（モック禁止）。テスト用スキーマは `DATABASE_URL?schema=test` を使用。E2E テストは `DATABASE_URL?schema=e2e` を使用。

### Path Aliases（apps/web）

```
#actions/*   → app/_actions/
#components/* → app/_components/*/index.tsx
#lib/*        → app/_lib/
#lib/session  → Storybook 時はモック実装に切り替わる
#lib/dal      → Storybook 時はモック実装に切り替わる
```

### 環境変数

`.env.example` を参照。最低限必要なもの：

- `DATABASE_URL` — PostgreSQL 接続文字列
- `SESSION_SECRET` — 32 文字以上の JWT 署名シークレット
- `ADMIN_USERNAME`, `ADMIN_PASSWORD` — シードデータ用管理者アカウント

ローカル開発は `compose.yml`（Docker Compose）で DB を起動する。

## コミットメッセージ

[Conventional Commits](https://www.conventionalcommits.org/) に従う。

```
<type>[optional scope]: <description>
```

主な type:

- `feat` — 新機能
- `fix` — バグ修正
- `refactor` — 動作変更を伴わないコード変更
- `test` — テストの追加・修正
- `chore` — ビルド・ツール・設定の変更
- `docs` — ドキュメントのみの変更

破壊的変更は `!` を付ける（例: `feat!: ...`）またはフッターに `BREAKING CHANGE:` を記載する。

## テキスト規約

ドキュメント・コードコメント・テスト名（`describe`, `it`, `test` など）・テストデータなどのテキストでは、カッコは半角を使用し英語のルールに準拠する。

- `(` の直前: スペースを入れる
- `(` の直後・`)` の直前: スペースなし
- `)` の直後: 単語が続く場合はスペースを入れ、`.` `,` `:` `。` `、` などの記号が続く場合はスペースなし

```
// 良い例
Todo (created by user)
returns error (invalid input).
エラーを返す (無効な入力)。
Todo (with due date): ...
Todo (期限あり)、...

// 悪い例
Todo（created by user）   // 全角カッコ
Todo(created by user)     // ( の前のスペースなし
Todo ( created by user )  // ( の後・) の前に余分なスペース
returns error (invalid input) .  // ) の後の記号前にスペース
エラーを返す (無効な入力) 。  // ) の後の句読点前にスペース
```
