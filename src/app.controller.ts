import { Controller, Get } from '@nestjs/common';
import { Public } from './resources/auth/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  getHome(): string {
    return 'Welcome to Home Library Service';
  }
}
