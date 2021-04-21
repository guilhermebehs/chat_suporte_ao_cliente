import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export default class UserEntity {
  @PrimaryGeneratedColumn()
  uuid?: string;
  @Column()
  email: string;
  @CreateDateColumn({ name: 'created_at' })
  createadAt: Date;
}
