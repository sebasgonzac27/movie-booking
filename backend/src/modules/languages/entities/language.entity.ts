import { TimestampEntity } from 'src/common/entities';
import { Movie } from 'src/modules/movies/entities/movie.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Language extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.languages)
  movies: Movie[];
}
