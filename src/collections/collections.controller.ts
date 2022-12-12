import { Controller } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('collections')
@ApiTags('Collections management')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}
}
