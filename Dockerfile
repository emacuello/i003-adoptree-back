FROM node:24-alpine AS base
RUN corepack enable
WORKDIR /app

FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile && pnpm exec prisma generate

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm exec prisma generate && pnpm build

# Dependencias de producción con el cliente de Prisma generado (prisma también hace falta para "db push" al arrancar).
FROM base AS prod-deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile --prod && pnpm exec prisma generate

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache dumb-init openssl \
    && addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nestjs
COPY --from=prod-deps --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --chown=nestjs:nodejs package.json ./
COPY --chown=nestjs:nodejs prisma ./prisma
USER nestjs
EXPOSE 3000
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
# Sincroniza el esquema (como el start.sh original) y arranca. El seed de demo corre solo si no existe admin@example.com.
CMD ["sh", "-c", "node_modules/.bin/prisma db push --skip-generate && node dist/main.js"]
