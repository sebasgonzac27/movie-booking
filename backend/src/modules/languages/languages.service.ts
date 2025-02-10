import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async create(createLanguageDto: CreateLanguageDto) {
    return await this.languageRepository.save(createLanguageDto);
  }

  async findOrCreate(name: string) {
    const existingLanguage = await this.languageRepository.findOneBy({ name });
    if (existingLanguage) {
      return existingLanguage;
    }
    return await this.languageRepository.save({ name });
  }

  async findAll() {
    return await this.languageRepository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: number) {
    const language = await this.languageRepository.findOneBy({ id });
    if (!language) {
      throw new NotFoundException(`Language with id ${id} not found.`);
    }
    return language;
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    const result = await this.languageRepository.update(id, updateLanguageDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Language with id ${id} not found.`);
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.languageRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Language with id ${id} not found.`);
    }
    return result;
  }
}
