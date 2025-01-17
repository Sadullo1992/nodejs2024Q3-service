import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.prisma.artist.create({ data: createArtistDto });
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.artist.findUnique({ where: { id } });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    return await this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.artist.delete({ where: { id } });
  }
}
