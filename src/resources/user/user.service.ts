import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { genHashPassword, isMatchPassword } from 'src/helpers/hashPassword';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({ login, password }: CreateUserDto) {
    const hash = await genHashPassword(password);
    const user = {
      login,
      password: hash,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    return this.prisma.user.create({ data: user });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    const user = await this.prisma.user.findUnique({ where: { id } });

    const isMatch = await isMatchPassword(oldPassword, user.password);

    if (!isMatch)
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);

    const hash = await genHashPassword(newPassword);

    const data = {
      password: hash,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
