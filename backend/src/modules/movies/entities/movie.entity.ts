import { TimestampEntity } from 'src/common/entities';
import { Function } from 'src/modules/functions/entities/function.entity';
import { Genre } from 'src/modules/genres/entities/genre.entity';
import { Language } from 'src/modules/languages/entities/language.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Movie extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column({ type: 'varchar', length: 600 })
  storyline: string;

  @Column({ type: 'timestamp' })
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

  @OneToMany(() => Function, (func) => func.movie)
  functions: Function[];
}
