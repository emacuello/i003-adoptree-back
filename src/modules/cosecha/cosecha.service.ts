import { Injectable } from "@nestjs/common";
import { Cosecha } from "@prisma/client";
import { CosechaRepository } from "./cosecha.repository.js";
import { CreateCosechaDto } from "./dto/create-cosecha.dto.js";
import { FilterCosechaDto } from "./dto/filter-cosecha.dto.js";
import { UpdateCosechaDto } from "./dto/update-cosecha.dto.js";

@Injectable()
export class CosechaService {
  constructor(private readonly cosechaRepository: CosechaRepository) {}

  create(input: CreateCosechaDto): Promise<Cosecha> {
    return this.cosechaRepository.create(input);
  }

  findAll(filter?: FilterCosechaDto): Promise<Cosecha[]> {
    const where: FilterCosechaDto = {};

    if (filter?.arbolId !== undefined) {
      where.arbolId = Number(filter.arbolId);
    }
    return this.cosechaRepository.findAll(where);
  }

  findOne(id: number): Promise<Cosecha | null> {
    return this.cosechaRepository.findOne(id);
  }

  update(id: number, input: UpdateCosechaDto): Promise<Cosecha> {
    return this.cosechaRepository.update(id, input);
  }

  remove(id: number): Promise<Cosecha> {
    return this.cosechaRepository.remove(id);
  }
}
