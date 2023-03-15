import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@Unique(["server_id", "user_id"])
export class KarmaTotal extends BaseEntity {
  @PrimaryColumn({ name: "server_id" })
  server_id!: string;

  @PrimaryColumn({ name: "user_id" })
  user_id!: string;

  @Column({ default: 0 })
  total!: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at!: Date;
}
