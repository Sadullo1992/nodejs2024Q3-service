import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  NotFoundException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const { password, ...userWithoutPassword } = await this.userService.create(
      createUserDto,
    );

    return userWithoutPassword;
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();

    const withoutPasswordUsers = users.map(({ password, ...rest }) => rest);

    return withoutPasswordUsers;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id);

    if (!user) throw new NotFoundException('User is not found!');

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = await this.userService.findOne(id);

    if (!user) throw new NotFoundException('User is not found!');

    const { password, ...userWithoutPassword } = await this.userService.update(
      id,
      updatePasswordDto,
    );

    return userWithoutPassword;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id);

    if (!user) throw new NotFoundException('User is not found!');

    await this.userService.remove(id);
  }
}
