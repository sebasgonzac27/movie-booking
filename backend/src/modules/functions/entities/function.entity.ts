import { Movie } from 'src/modules/movies/entities/movie.entity';
import { Ticket } from 'src/modules/tickets/entities/ticket.entity';
import { TimestampEntity } from 'src/shared/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Function extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  schedule: Date;

  @Column()
  price: number;

  @Column()
  availableTickets: number;

  @ManyToOne(() => Movie, (movie) => movie.functions)
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @Column()
  movieId: number;

  @OneToMany(() => Ticket, (ticket) => ticket.function)
  tickets: Ticket[];
}
