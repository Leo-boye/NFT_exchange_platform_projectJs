import { Controller } from '@nestjs/common';
import { NftsService } from './nfts.service';

@Controller('nfts')
export class nftsController {
  constructor(private readonly nftsService: NftsService) {}
}
