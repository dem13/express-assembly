import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Client} from "./Client";

@Entity()
export class AccessToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Client, {nullable: true})
  client: Client;

  @Column("json")
  scope: string[];
}