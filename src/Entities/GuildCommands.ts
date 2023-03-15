import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

export type CommandAction = {
  message?: string;
  ephemeral?: boolean;
};

export type GuildCommand = {
  id: string;
  name: string;
  description: string;
  options?: [
    {
      name: string;
      description: string;
      type: 1 | 2 | 3 | 4 | 5;
      required?: boolean;
      choices?: [
        {
          name: string;
          value: string;
        }
      ];
    }
  ];
  action?: CommandAction;
};

@Entity()
@Unique(["server_id"])
export class GuildCommands extends BaseEntity {
  @PrimaryColumn({ name: "server_id" })
  server_id!: string;

  @Column({ name: "user_id" })
  user_id!: string;

  @Column("simple-json")
  commands!: GuildCommand[];

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
