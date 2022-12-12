import { Module } from '@nestjs/common';
import { NftsService } from './nfts.service';
import { nftsController } from './nfts.controller';

@Module({
  controllers: [nftsController],
  providers: [NftsService],
})
export class NftsModule {}
