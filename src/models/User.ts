import {IsEmail, Length, MaxLength} from "class-validator";

export default class User {
  @MaxLength( 200)
  name: string

  @IsEmail()
  email: string

  @Length(5, 200)
  password: string
}