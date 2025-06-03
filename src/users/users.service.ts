import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Model } from 'sequelize-typescript';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  private mapToResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userModel.create(createUserDto as any);
    return this.mapToResponseDto(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userModel.findAll();
    return users.map(user => this.mapToResponseDto(user));
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.mapToResponseDto(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    await this.userModel.update(updateUserDto, { where: { id } });
    const updatedUser = await this.userModel.findByPk(id);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.mapToResponseDto(updatedUser);
  }

  async remove(id: number): Promise<UserResponseDto> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await user.destroy();
    return this.mapToResponseDto(user);
  }
}
