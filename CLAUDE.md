# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド一覧

### 開発

```bash
# 開発サーバー起動 (Next.js + Storybook)
pnpm dev

# ビルド
pnpm build

# テスト (lint + unit)
pnpm test

# ユニットテストのみ
pnpm unit

# リント
pnpm lint

# リント自動修正
pnpm fix
```

### 特定パッケージのテスト

```bash
# パッケージを指定してテスト
pnpm --filter @app/query unit
pnpm --filter @app/command-interface-adapter-impl unit
pnpm --filter web unit

# 特定ファイルのテスト (web パッケージ内)
cd apps/web && pnpm vitest run src/path/to/file.test.ts
```

### データベース

```bash
pnpm db:generate   # Prismaクライアント生成
pnpm db:migrate    # マイグレーション作成・適用 (dev)
pnpm db:deploy     # マイグレーション適用 (prod)
pnpm db:push       # スキーマをDBに直接反映 (dev)
pnpm db:seed       # シードデータ投入
```

### Docker

```bash
docker compose up -d    # dev環境起動 (app + db)
docker compose down     # 停止
```

## アーキテクチャ

### 全体構成

**CQRS + クリーンアーキテクチャ** に基づくモノレポ (pnpm workspaces + Turborepo)。

```
apps/web                    # Next.js フロントエンド + Server Actions
packages/
  command/
    domain/                 # @app/command-domain      ドメインモデル・ValueObject・エラー定義
    interface-adapter-if/   # @app/command-interface-adapter-if  各種インターフェース定義 + Mock
    processor/              # @app/command-processor   ビジネスロジック実装 (tsyringe DI)
    interface-adapter-impl/ # @app/command-interface-adapter-impl  Processorファクトリ
  query/                    # @app/query               Read Model (QueryProcessor + DTO)
  db/                       # @app/db                  Prisma Client + ファクトリ + シード
  infrastructure/           # @app/infrastructure      Logger, Brand型, Result型, ID生成(UUIDv7)
  ui/                       # @app/ui                  共有UIコンポーネント (Radix UI + Tailwind)
  typescript-config/        # TypeScript共通設定
  eslint-config/            # ESLint共通設定
```

### データフロー

**コマンドサイド (書き込み):**
```
Next.js Server Action
  → @app/command-interface-adapter-impl の createXxxProcessor()
    → @app/command-processor (tsyringe DI + @app/command-domain)
      → @app/db (Prisma)
```

**クエリサイド (読み取り):**
```
Next.js Server Component / dal.ts
  → @app/query の createTodoProcessor()
    → @app/db (Prisma)
    → DTO として返却
```

### 重要なパターン

**Processor の命名規則:**
- コマンドサイド: `LoginAuthenticationCommandProcessor`, `TodoCommandProcessor`
- クエリサイド: `TodoQueryProcessor`
- Aggregate単位 (コマンド) / ReadModel単位 (クエリ) でProcessorを分割

**インターフェース分離:**
- `@app/command-interface-adapter-if` にインターフェース + Mock 実装を置く
- 実装は `@app/command-processor` と `@app/command-interface-adapter-impl` に分離

**DI:** tsyringe を使用。`reflect-metadata` のインポートが必要 (setup.ts で設定済み)

**Result型:** エラー処理に `@app/infrastructure` の Result型を使用

**Brand型:** 型安全な識別子 (UserId, TodoId 等) に `@app/infrastructure` の Brand型を使用

### テスト構成

- **web:** Vitest (unit) + Playwright (e2e) + Storybook (visual)
- **その他パッケージ:** Jest + ts-jest (ESM モード)

### 環境変数

`.env.example` を参照。必須:
- `DATABASE_URL` - PostgreSQL接続文字列
- `SESSION_SECRET` - JWT署名用シークレット (32文字以上)

### セッション管理

`apps/web/app/_lib/session.ts` で JWT + Cookie ベースのセッション管理。有効期限7日。
`apps/web/app/_lib/dal.ts` でキャッシュ付きの認証済みユーザー取得・クエリ実行。
