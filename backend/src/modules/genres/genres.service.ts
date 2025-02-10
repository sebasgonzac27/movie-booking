import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async create(createGenreDto: CreateGenreDto) {
    return await this.genreRepository.save(createGenreDto);
  }

  async findOrCreate(name: string) {
    let genre = await this.genreRepository.findOne({ where: { name } });
    if (!genre) {
      genre = this.genreRepository.create({ name });
      await this.genreRepository.save(genre);
    }
    return genre;
  }

  async findAll() {
    return await this.genreRepository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: number) {
    const genre = await this.genreRepository.findOneBy({ id });
    if (!genre) {
      throw new NotFoundException(`Genre with id ${id} not found.`);
    }
    return genre;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    const result = await this.genreRepository.update(id, updateGenreDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Genre with id ${id} not found.`);
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.genreRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Genre with id ${id} not found.`);
    }
    return result;
  }
}
