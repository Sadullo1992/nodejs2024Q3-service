import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { isMatchPassword } from 'src/helpers/hashPassword';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { login, password } = loginUserDto;

    const user = await this.prisma.user.findFirst({ where: { login } });
    if (!user) throw new HttpException('User not found.', HttpStatus.FORBIDDEN);

    const isMatch = await isMatchPassword(password, user.password);
    if (!isMatch)
      throw new HttpException('User not found.', HttpStatus.FORBIDDEN);

    const accessToken = await this.jwtService.signAsync({
      userId: user.id,
      login,
    });

    const expireTime = this.configService.get<string>(
      'TOKEN_REFRESH_EXPIRE_TIME',
    );
    const secret = this.configService.get<string>('JWT_SECRET_REFRESH_KEY');

    const refreshToken = await this.jwtService.signAsync(
      {
        userId: user.id,
        login: loginUserDto.login,
      },
      { expiresIn: expireTime, secret },
    );

    return { accessToken, refreshToken };
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    const isValidDto = 'refreshToken' in refreshTokenDto;
    if (!isValidDto)
      throw new HttpException(
        'refreshToken is not exist in body',
        HttpStatus.UNAUTHORIZED,
      );

    const { refreshToken } = refreshTokenDto;

    try {
      const secret = this.configService.get<string>('JWT_SECRET_REFRESH_KEY');
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret,
      });

      const accessToken = await this.jwtService.signAsync({
        userId: payload.userId,
        login: payload.login,
      });

      return { accessToken, refreshToken };
    } catch (err) {
      throw new HttpException(
        'Refresh token is invalid or expired',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
