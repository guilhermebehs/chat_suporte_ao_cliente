import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserEntity from './UserEntity';

@Entity('connections')
export default class ConnectionEntity {
  @PrimaryGeneratedColumn()
  uuid?: string;
  @Column({ name: 'socket_id' })
  socketId: string;
  @Column({ name: 'admin_id' })
  adminId: string;
  @Column({ name: 'user_uuid' })
  userId: string;
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'uuid' })
  @ManyToOne(() => UserEntity)
  user: UserEntity;
  @CreateDateColumn({ name: 'created_at' })
  createadAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
