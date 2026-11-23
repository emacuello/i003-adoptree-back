import { Module } from "@nestjs/common";
import { ProductorRepository } from "./productor.repository.js";

@Module({
  providers: [ProductorRepository],
  exports: [ProductorRepository],
})
export class ProductorModule {}
