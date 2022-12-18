import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/utils/prisma.service';
import { NftsController } from './nfts.controller';
import { NftsService } from './nfts.service';
import { NftDto } from './dtos/nfts';
import { TeamsService } from '../teams/teams.service';
import { UsersService } from '../users/users.service';

describe('CollectionController', () => {
  let nftsController: NftsController;
  let nftsService: NftsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftsController],
      providers: [NftsService, TeamsService, UsersService, PrismaService],
    }).compile();

    nftsController = module.get<NftsController>(NftsController);
    nftsService = module.get<NftsService>(NftsService);
  });
  it('should be defined', () => {
    expect(nftsController).toBeDefined();
  });

  describe('getTopRatedNfts', () => {
    it('should return an empty array of nft', async () => {
      const result = [{}] as NftDto[];
      jest
        .spyOn(nftsService, 'getBestRatedNFT')
        .mockImplementation(() => Promise.resolve(result));

      expect(await nftsController.bestRatedNft(0, 100)).toBe(result);
    });
    it('should return an array one of nft', async () => {
      const result = [
        {
          collectionId: '1',
          id: '1',
          ownerId: '1',
          rating: 4,
          ratingCount: 3,
        },
      ] as NftDto[];
      jest
        .spyOn(nftsService, 'getBestRatedNFT')
        .mockImplementation(() => Promise.resolve(result));

      expect(await nftsController.bestRatedNft(0, 100)).toBe(result);
    });
    it('should return an array of many nfts sorted', async () => {
      const result = [
        {
          collectionId: '1',
          id: '1',
          ownerId: '1',
          rating: 4,
          ratingCount: 3,
        },
        { collectionId: '1', id: '2', ownerId: '2', rating: 5, ratingCount: 2 },
      ] as NftDto[];
      jest
        .spyOn(nftsService, 'getBestRatedNFT')
        .mockImplementation(() => Promise.resolve(result));

      expect(await nftsController.bestRatedNft(0, 100)).toBe(result);
    });
    it('should return an array of many nft sorted with ambiguity', async () => {
      const result = [
        {
          collectionId: '1',
          id: '1',
          ownerId: '1',
          rating: 4,
          ratingCount: 3,
        },
        { collectionId: '1', id: '2', ownerId: '2', rating: 5, ratingCount: 2 },
        { collectionId: '1', id: '3', ownerId: '2', rating: 5, ratingCount: 6 },
      ] as NftDto[];
      jest
        .spyOn(nftsService, 'getBestRatedNFT')
        .mockImplementation(() => Promise.resolve(result));

      expect(await nftsController.bestRatedNft(0, 100)).toBe(result);
    });
  });
});
