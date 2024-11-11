import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UserModule } from './resources/user/user.module';
import { DatabaseModule } from './database/database.module';
import { TrackModule } from './resources/track/track.module';
import { ArtistModule } from './resources/artist/artist.module';
import { AlbumModule } from './resources/album/album.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    DatabaseModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
