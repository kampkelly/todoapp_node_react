/* eslint-disable import/no-cycle */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';

import { StatusEnum } from './enums';
import Subtask from './Subtask';

@Entity()
export default class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('enum', {
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  status: StatusEnum;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @OneToMany(
    () => Subtask,
    (subtask: Subtask) => subtask.todo,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  subtasks?: Subtask[];
}
