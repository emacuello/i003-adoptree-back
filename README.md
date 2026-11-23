# Adoptree API

NestJS 12 (ESM) + Prisma 6 + PostgreSQL. Node 24 y pnpm.

```bash
pnpm install
cp .env.example .env        # completar DATABASE_URL y el resto
pnpm exec prisma db push    # crea el esquema
pnpm start:dev              # al arrancar carga datos de demo si no existe admin@example.com
```

`pnpm build`, `pnpm lint` (oxlint) y `pnpm test` (Jest en modo ESM).

## Deploy

Corre en el VPS de `emacuello/infra` (`apps/adoptree/`) en `https://api-adoptree.emacuello.dev`. Un push a `main` ejecuta `.github/workflows/main.yml`, que entra por SSH con una clave restringida a `/opt/infra/deploy.sh`; el server clona `main`, construye el `Dockerfile` y reinicia el contenedor. Al arrancar, el contenedor corre `prisma db push`.
