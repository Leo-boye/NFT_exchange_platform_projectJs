import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { nftController } from './nft.controller';

@Module({
  controllers: [nftController],
  providers: [NftService],
})
export class NftModule {}
