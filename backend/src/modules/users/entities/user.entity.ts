import { TimestampEntity } from 'src/common/entities';
import { UserRole } from 'src/common/enums';
import { Ticket } from 'src/modules/tickets/entities/ticket.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Admin })
  role: UserRole;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];
}
