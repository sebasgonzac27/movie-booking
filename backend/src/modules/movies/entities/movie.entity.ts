import { Genre } from 'src/modules/genres/entities/genre.entity';
import { Language } from 'src/modules/languages/entities/language.entity';
import { TimestampEntity } from 'src/shared/entities';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Movie extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column()
  storyline: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column()
  cover: string;

  @Column()
  duration: number;

  @ManyToMany(() => Genre, (genre) => genre.movies, { cascade: true })
  @JoinTable()
  genres: Genre[];

  @ManyToMany(() => Language, (language) => language.movies, { cascade: true })
  @JoinTable()
  languages: Language[];
}
