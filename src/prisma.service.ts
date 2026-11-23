import { Global, Injectable, Module, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

// Reemplaza a nestjs-prisma (sin soporte para NestJS 12). El cliente se conecta solo en la primera query.
@Injectable()
export class PrismaService
  extends PrismaClient<{ log: [{ emit: "event"; level: "query" }] }>
  implements OnModuleDestroy
{
  constructor() {
    super({ log: [{ emit: "event", level: "query" }] });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

@Global()
@Module({ providers: [PrismaService], exports: [PrismaService] })
export class PrismaModule {}
