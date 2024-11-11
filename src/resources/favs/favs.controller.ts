import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.trackService.findOne(id);

    if (!track) throw new UnprocessableEntityException('Track is not found!');

    this.favsService.addTrack(id);

    return 'Track added to favorites!';
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    const trackId = this.favsService.getAllFavs().tracks.includes(id);

    if (!trackId) throw new NotFoundException('Track is not favorite!');

    this.favsService.removeTrack(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.artistService.findOne(id);

    if (!artist) throw new UnprocessableEntityException('Artist is not found!');

    this.favsService.addArtist(id);

    return 'Artist added to favorites!';
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artistId = this.favsService.getAllFavs().artists.includes(id);

    if (!artistId) throw new NotFoundException('Artist is not favorite!');

    this.favsService.removeArtist(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumService.findOne(id);

    if (!album) throw new UnprocessableEntityException('Album is not found!');

    this.favsService.addAlbum(id);

    return 'Album added to favorites!';
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const albumId = this.favsService.getAllFavs().albums.includes(id);

    if (!albumId) throw new NotFoundException('Album is not favorite!');

    this.favsService.removeAlbum(id);
  }
}
