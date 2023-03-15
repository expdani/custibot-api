import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class Sessions extends BaseEntity {
  @PrimaryColumn({ name: "access_token" })
  access_token!: string;

  @Column()
  user_id!: string;

  @Column()
  discord_token!: string;

  @Column()
  discord_type!: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at!: Date;
}
