import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/utils/prisma.service';
import {
  CollectionCreateDto,
  CollectionDto,
  CollectionUpdateDto,
} from './dtos/collections';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}

  async getAllCollections(
    offset: number,
    limit: number,
  ): Promise<Array<CollectionDto>> {
    return await this.prisma.collection.findMany({
      skip: offset,
      take: limit,
    });
  }

  async getCollectionById(collectionId: string): Promise<CollectionDto | null> {
    return await this.prisma.collection.findUnique({
      where: { id: collectionId },
    });
  }

  async createCollection(
    collection: CollectionCreateDto,
    ownerTeamId: string,
    userName: string,
  ): Promise<CollectionDto> {
    return await this.prisma.collection.create({
      data: { ...collection, teamId: ownerTeamId, userName: userName },
    });
  }

  async updateCollection(
    collection: CollectionUpdateDto,
    collectionID: string,
  ): Promise<CollectionDto> {
    return await this.prisma.collection.update({
      where: { id: collectionID },
      data: collection,
    });
  }
}
