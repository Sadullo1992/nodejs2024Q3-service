import { Injectable } from '@nestjs/common';
import { FAV_ID } from 'src/helpers/seedDatabase';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { Favs } from './entities/fav.entity';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  private favs: Favs = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async findAll() {
    const favs = await this.prisma.favs.findUnique({
      where: { id: FAV_ID },
      include: { tracks: true, albums: true, artists: true },
    });
    return favs;
  }

  async addTrack(id: string) {
    return await this.prisma.favs.update({
      where: { id: FAV_ID },
      data: {
        tracks: { connect: { id } },
      },
    });
  }

  async removeTrack(id: string) {
    return await this.prisma.favs.update({
      where: { id: FAV_ID },
      data: {
        tracks: { disconnect: { id } },
      },
    });
  }

  async addArtist(id: string) {
    return await this.prisma.favs.update({
      where: { id: FAV_ID },
      data: {
        artists: { connect: { id } },
      },
    });
  }

  async removeArtist(id: string) {
    return await this.prisma.favs.update({
      where: { id: FAV_ID },
      data: {
        artists: { disconnect: { id } },
      },
    });
  }

  async addAlbum(id: string) {
    return await this.prisma.favs.update({
      where: { id: FAV_ID },
      data: {
        albums: { connect: { id } },
      },
    });
  }

  async removeAlbum(id: string) {
    return await this.prisma.favs.update({
      where: { id: FAV_ID },
      data: {
        albums: { disconnect: { id } },
      },
    });
  }
}
