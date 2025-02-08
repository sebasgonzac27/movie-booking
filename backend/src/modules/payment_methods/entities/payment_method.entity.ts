import { TimestampEntity } from 'src/common/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentMethod extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  icon: string;
}
