import {
  Controller,
  Get,
  Post,
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
  async findAll() {
    return await this.favsService.findAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.trackService.findOne(id);

    if (!track) throw new UnprocessableEntityException('Track is not found!');

    await this.favsService.addTrack(id);

    return 'Track added to favorites!';
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = (await this.favsService.findAll()).tracks.find(
      (item) => item.id === id,
    );

    if (!track) throw new NotFoundException('Track is not favorite!');

    await this.favsService.removeTrack(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.artistService.findOne(id);

    if (!artist) throw new UnprocessableEntityException('Artist is not found!');

    await this.favsService.addArtist(id);

    return 'Artist added to favorites!';
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = (await this.favsService.findAll()).artists.find(
      (item) => item.id === id,
    );

    if (!artist) throw new NotFoundException('Artist is not favorite!');

    await this.favsService.removeArtist(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumService.findOne(id);

    if (!album) throw new UnprocessableEntityException('Album is not found!');

    await this.favsService.addAlbum(id);

    return 'Album added to favorites!';
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = (await this.favsService.findAll()).albums.find(
      (item) => item.id === id,
    );

    if (!album) throw new NotFoundException('Album is not favorite!');

    await this.favsService.removeAlbum(id);
  }
}
