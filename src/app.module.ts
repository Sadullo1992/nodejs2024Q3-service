import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UserModule } from './resources/user/user.module';
import { DatabaseModule } from './database/database.module';
import { TrackModule } from './resources/track/track.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, DatabaseModule, TrackModule],
  controllers: [AppController],
})
export class AppModule {}
