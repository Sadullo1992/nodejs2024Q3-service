import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class Artist {
  @IsUUID('4')
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
