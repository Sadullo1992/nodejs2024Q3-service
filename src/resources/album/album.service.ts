import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { TrackService } from '../track/track.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  private db = new DatabaseService<Album>();

  constructor(private trackService: TrackService) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.db.create(createAlbumDto);
  }

  findAll() {
    return this.db.findAll();
  }

  findOne(id: string) {
    return this.db.findOne(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.db.update(id, updateAlbumDto);
  }

  remove(id: string) {
    this.db.remove(id);

    const albumTracks = this.trackService
      .findAll()
      .filter((track) => track.albumId === id);

    albumTracks.forEach((track) => {
      track.albumId = null;
    });
  }
}
