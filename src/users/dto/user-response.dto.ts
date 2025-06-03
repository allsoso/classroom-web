import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../models/user.model';

export class UserResponseDto {

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: UserRole;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
} 