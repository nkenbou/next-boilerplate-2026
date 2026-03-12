FROM node:24-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack
RUN corepack enable

FROM base AS builder
WORKDIR /app
RUN pnpm add --global turbo
COPY . .
RUN turbo prune web --docker

FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo db:generate
RUN pnpm --filter=web exec turbo run build

FROM base AS runner
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

RUN addgroup --system --gid 999 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs:nodejs

COPY --from=installer /app/apps/web/next.config.mjs .
COPY --from=installer /app/apps/web/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

EXPOSE 3000
CMD ["node", "/app/apps/web/server.js"]
