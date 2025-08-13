FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
EXPOSE 3001

FROM base as builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm fetch
COPY . .
RUN pnpm install --offline --frozen-lockfile
RUN pnpm build
RUN pnpm prune --prod

FROM base as production
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
CMD ["pnpm","start"]

FROM base as dev
ENV NODE_ENV=development
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
CMD ["pnpm","dev"]
