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
  create(@Body() createUserDto: CreateUserDto) {
    const { password, ...userWithoutPassword } =
      this.userService.create(createUserDto);

    return userWithoutPassword;
  }

  @Get()
  findAll() {
    const users = this.userService.findAll();

    const withoutPasswordUsers = users.map(({ password, ...rest }) => rest);

    return withoutPasswordUsers;
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.userService.findOne(id);

    if (!user) throw new NotFoundException('User is not found!');

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = this.userService.findOne(id);

    if (!user) throw new NotFoundException('User is not found!');

    const { password, ...userWithoutPassword } = this.userService.update(
      id,
      updatePasswordDto,
    );

    return userWithoutPassword;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.userService.findOne(id);

    if (!user) throw new NotFoundException('User is not found!');

    return this.userService.remove(id);
  }
}
