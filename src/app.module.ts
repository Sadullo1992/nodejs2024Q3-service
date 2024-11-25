import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UserModule } from './resources/user/user.module';
import { DatabaseModule } from './database/database.module';
import { TrackModule } from './resources/track/track.module';
import { ArtistModule } from './resources/artist/artist.module';
import { AlbumModule } from './resources/album/album.module';
import { FavsModule } from './resources/favs/favs.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    UserModule,
    DatabaseModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    PrismaModule,
    LoggerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
