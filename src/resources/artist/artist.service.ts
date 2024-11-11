import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { TrackService } from '../track/track.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  private db = new DatabaseService<Artist>();

  constructor(private trackService: TrackService) {}

  create(createArtistDto: CreateArtistDto) {
    return this.db.create(createArtistDto);
  }

  findAll() {
    return this.db.findAll();
  }

  findOne(id: string) {
    return this.db.findOne(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.db.update(id, updateArtistDto);
  }

  remove(id: string) {
    this.db.remove(id);

    const artistTracks = this.trackService
      .findAll()
      .filter((track) => track.artistId === id);

    artistTracks.forEach((track) => {
      track.artistId = null;
    });
  }
}
