import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class User {
  @IsUUID('4')
  id: string;

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
