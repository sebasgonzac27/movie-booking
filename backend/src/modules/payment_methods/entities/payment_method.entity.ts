import { TimestampEntity } from 'src/common/entities';
import { Ticket } from 'src/modules/tickets/entities/ticket.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentMethod extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  icon: string;

  @OneToMany(() => Ticket, (ticket) => ticket.paymentMethod)
  tickets: Ticket[];
}
