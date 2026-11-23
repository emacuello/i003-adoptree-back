import { Module } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import { ArbolModule } from "../arbol/arbol.module.js";
import { CosechaController } from "./cosecha.controller.js";
import { CosechaRepository } from "./cosecha.repository.js";
import { CosechaService } from "./cosecha.service.js";

@Module({
  imports: [ArbolModule],
  controllers: [CosechaController],
  providers: [CosechaRepository, CosechaService, PrismaService],
})
export class CosechaModule {}
