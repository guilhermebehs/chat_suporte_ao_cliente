import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import UserEntity from './UserEntity';

@Entity('messages')
export default class MessageEntity {
  @PrimaryGeneratedColumn()
  uuid?: string;
  @Column()
  text: string;
  @Column({ name: 'admin_uuid' })
  adminId: string;
  @Column({ name: 'user_uuid' })
  userId: string;
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'uuid' })
  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createadAt: Date;
}
