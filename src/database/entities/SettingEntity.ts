import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('settings')
export default class SettingEntity {
  @PrimaryGeneratedColumn()
  uuid?: string;
  @Column()
  username: string;
  @Column()
  chat: boolean;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @CreateDateColumn({ name: 'created_at' })
  createadAt: Date;
}
