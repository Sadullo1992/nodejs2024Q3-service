import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  private db = new DatabaseService<Track>();

  create(createTrackDto: CreateTrackDto) {
    return this.db.create(createTrackDto);
  }

  findAll() {
    return this.db.findAll();
  }

  findOne(id: string) {
    return this.db.findOne(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.db.update(id, updateTrackDto);
  }

  remove(id: string) {
    this.db.remove(id);
  }
}
