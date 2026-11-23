import { Module } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import { FincaController } from "./finca.controller.js";
import { FincaRepository } from "./finca.repository.js";
import { FincaService } from "./finca.service.js";
import { ProductorModule } from "../productor/productor.module.js";

@Module({
  imports: [ProductorModule],
  controllers: [FincaController],
  providers: [FincaService, FincaRepository, PrismaService],
})
export class FincaModule {}
