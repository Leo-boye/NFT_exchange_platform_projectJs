import { Controller } from '@nestjs/common';
import { NftService } from './nft.service';

@Controller()
export class nftController {
  constructor(private readonly nftService: NftService) {}
}
