import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Function } from './entities/function.entity';

@Injectable()
export class FunctionsService {
  constructor(
    @InjectRepository(Function)
    private readonly functionRepository: Repository<Function>,
  ) {}

  async create(createFunctionDto: CreateFunctionDto) {
    return await this.functionRepository.save(createFunctionDto);
  }

  async findAll() {
    return this.functionRepository.find();
  }

  async findOne(id: number) {
    const findedFunction = await this.functionRepository.findOne({
      where: { id },
    });
    if (!findedFunction) {
      throw new NotFoundException(`function with id ${id} not found`);
    }
    return findedFunction;
  }

  async update(id: number, updateFunctionDto: UpdateFunctionDto) {
    const result = await this.functionRepository.update(id, updateFunctionDto);
    if (!result.affected) {
      throw new NotFoundException(`function with id ${id} not found`);
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.functionRepository.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException(`function with id ${id} not found`);
    }
    return result;
  }
}
