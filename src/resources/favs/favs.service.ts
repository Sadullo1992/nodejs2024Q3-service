import { Injectable } from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { Favs } from './entities/fav.entity';

@Injectable()
export class FavsService {
  constructor(
    private artistService: ArtistService,
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {}

  private favs: Favs = {
    artists: [],
    albums: [],
    tracks: [],
  };

  findAll() {
    const allArtists = this.artistService.findAll();
    const artists = allArtists.filter((artist) =>
      this.favs.artists.some((artistId) => artistId === artist.id),
    );

    const allAlbums = this.albumService.findAll();
    const albums = allAlbums.filter((album) =>
      this.favs.albums.some((albumId) => albumId === album.id),
    );

    const allTracks = this.trackService.findAll();
    const tracks = allTracks.filter((track) =>
      this.favs.tracks.some((trackId) => trackId === track.id),
    );

    return { artists, albums, tracks };
  }

  // Only get their ids
  getAllFavs() {
    return this.favs;
  }

  addTrack(id: string) {
    this.favs.tracks.push(id);
  }

  removeTrack(id: string) {
    const index = this.favs.tracks.findIndex((trackId) => trackId === id);

    if (index > -1) this.favs.tracks.splice(index, 1);
  }

  addArtist(id: string) {
    this.favs.artists.push(id);
  }

  removeArtist(id: string) {
    const index = this.favs.artists.findIndex((artistId) => artistId === id);

    if (index > -1) this.favs.artists.splice(index, 1);
  }

  addAlbum(id: string) {
    this.favs.albums.push(id);
  }

  removeAlbum(id: string) {
    const index = this.favs.albums.findIndex((albumId) => albumId === id);

    if (index > -1) this.favs.albums.splice(index, 1);
  }
}
