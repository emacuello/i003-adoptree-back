import { Module } from "@nestjs/common";
import { AdoptionService } from "./adoption.service.js";
import { AdoptionController } from "./adoption.controller.js";
import { AdoptionRepository } from "./adoption.repository.js";

@Module({
  controllers: [AdoptionController],
  providers: [AdoptionService, AdoptionRepository],
  exports: [AdoptionService],
})
export class AdoptionModule {}
