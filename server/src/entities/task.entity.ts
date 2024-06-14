import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  task_id!: string;

  @Column({ length: 50 })
  task_name!: string;

  @Column({ default: 0 })
  status!: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  update_at!: Date;
}
