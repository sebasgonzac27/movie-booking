import { TimestampEntity } from 'src/common/entities';
import { Function } from 'src/modules/functions/entities/function.entity';
import { PaymentMethod } from 'src/modules/payment_methods/entities/payment_method.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ticket extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  totalPrice: number;

  @Column({ type: 'timestamp' })
  purchaseDate: Date;

  @ManyToOne(() => Function, (func) => func.tickets)
  @JoinColumn({ name: 'functionId' })
  function: Function;

  @Column()
  functionId: number;

  @ManyToOne(() => User, (user) => user.tickets)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.tickets)
  @JoinColumn({ name: 'paymentMethodId' })
  paymentMethod: PaymentMethod;

  @Column()
  paymentMethodId: number;
}
