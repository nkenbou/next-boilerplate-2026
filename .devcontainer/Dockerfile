FROM node:24-bookworm

RUN npm install -g corepack
RUN corepack enable

ARG USER_NAME=node
ARG GROUP_NAME=node

RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    sudo \
 && npx playwright install-deps \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

RUN echo ${USER_NAME} ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/${USER_NAME} \
 && chmod 0440 /etc/sudoers.d/${USER_NAME}

RUN mkdir -p /pnpm \
 && chown -R ${USER_NAME}:${GROUP_NAME} /pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

RUN mkdir -p /workspace /home/${USER_NAME}/.claude /home/${USER_NAME}/.gemini \
 && chown -R ${USER_NAME}:${GROUP_NAME} /workspace /home/${USER_NAME}/.claude /home/${USER_NAME}/.gemini

WORKDIR /workspace

USER ${USER_NAME}:${GROUP_NAME}

COPY --chown=${USER_NAME}:${GROUP_NAME} package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chown=${USER_NAME}:${GROUP_NAME} apps/web/package.json ./apps/web/
COPY --chown=${USER_NAME}:${GROUP_NAME} packages/command/domain/package.json ./packages/command/domain/
COPY --chown=${USER_NAME}:${GROUP_NAME} packages/command/interface-adapter-if/package.json ./packages/command/interface-adapter-if/
COPY --chown=${USER_NAME}:${GROUP_NAME} packages/command/interface-adapter-impl/package.json ./packages/command/interface-adapter-impl/
COPY --chown=${USER_NAME}:${GROUP_NAME} packages/command/processor/package.json ./packages/command/processor/
COPY --chown=${USER_NAME}:${GROUP_NAME} packages/query/package.json ./packages/query/
COPY --chown=${USER_NAME}:${GROUP_NAME} packages/db/package.json ./packages/db/
COPY --chown=${USER_NAME}:${GROUP_NAME} packages/infrastructure/package.json ./packages/infrastructure/
COPY --chown=${USER_NAME}:${GROUP_NAME} packages/ui/package.json ./packages/ui/
COPY --chown=${USER_NAME}:${GROUP_NAME} packages/eslint-config/package.json ./packages/eslint-config/
COPY --chown=${USER_NAME}:${GROUP_NAME} packages/stylelint-config/package.json ./packages/stylelint-config/
COPY --chown=${USER_NAME}:${GROUP_NAME} packages/typescript-config/package.json ./packages/typescript-config/
RUN pnpm config set store-dir "${PNPM_HOME}" \
 && pnpm install --frozen-lockfile \
 && pnpm --filter web exec playwright install chromium

COPY --chown=${USER_NAME}:${GROUP_NAME} . .

EXPOSE 3000 6006
CMD ["/bin/bash"]
