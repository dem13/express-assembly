import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Client {
  @PrimaryGeneratedColumn("uuid")
  clientId: string;

  @Column()
  clientSecret: string;
}