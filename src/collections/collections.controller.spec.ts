import { Test, TestingModule } from '@nestjs/testing';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { CollectionDto } from './dtos/collections';
import { PrismaService } from '../common/utils/prisma.service';

describe('CollectionController', () => {
  let collectionsController: CollectionsController;
  let collectionService: CollectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionsController],
      providers: [CollectionsService, PrismaService],
    }).compile();

    collectionsController = module.get<CollectionsController>(
      CollectionsController,
    );
    collectionService = module.get<CollectionsService>(CollectionsService);
  });
  it('should be defined', () => {
    expect(collectionsController).toBeDefined();
  });

  describe('getAllCollection', () => {
    it('should return an array of collections', async () => {
      const collection = new CollectionDto();
      const result = [collection];
      jest
        .spyOn(collectionService, 'getAllCollection')
        .mockImplementation(() => Promise.resolve(result));

      expect(await collectionsController.getCollection(0, 100)).toBe(result);
    });
  });
});
