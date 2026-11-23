import { Injectable, NotFoundException } from "@nestjs/common";
import { Arbol } from "@prisma/client";
import { ERROR_KEYS } from "../../constants/index.js";
import { ArbolRepository } from "./arbol.repository.js";
import { CreateArbolDto } from "./dto/create-arbol.dto.js";
import { ArbolFilterDto } from "./dto/filter-arbol.dto.js";
import { UpdateArbolDto } from "./dto/update-arbol.js";

@Injectable()
export class ArbolService {
  constructor(private readonly arbolRepository: ArbolRepository) {}

  async createArbol(createArbolDto: CreateArbolDto): Promise<Arbol> {
    return this.arbolRepository.create({
      type: createArbolDto.type,
      fincaId: createArbolDto.fincaId,
      userId: createArbolDto.userId,
      statusTree: createArbolDto.statusTree,
      images: createArbolDto.images,
      price: createArbolDto.price,
    });
  }

  async findAll(filters?: ArbolFilterDto): Promise<Arbol[]> {
    return await this.arbolRepository.findAll(filters);
  }

  async findOne(id: number): Promise<Arbol | null> {
    return await this.arbolRepository.findOne(id);
  }

  async update(id: number, updateArbolDto: UpdateArbolDto): Promise<Arbol> {
    return await this.arbolRepository.update(id, updateArbolDto);
  }

  async remove(id: number): Promise<Arbol> {
    return await this.arbolRepository.remove(id);
  }

  async findStatusTreeById(
    id: number,
  ): Promise<{ id: number; statusTree: string; images: string[] }> {
    const statusTree = await this.arbolRepository.findStatusTreeById(id);
    if (!statusTree) {
      throw new NotFoundException(ERROR_KEYS.PRUEBA_TREE_NOT_FOUND);
    }
    return statusTree;
  }
}
