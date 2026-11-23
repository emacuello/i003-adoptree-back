import { Module } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import { ArbolController } from "./arbol.controller.js";
import { ArbolRepository } from "./arbol.repository.js";
import { ArbolService } from "./arbol.service.js";

@Module({
  providers: [ArbolService, ArbolRepository, PrismaService],
  controllers: [ArbolController],
  exports: [ArbolRepository],
})
export class ArbolModule {}
