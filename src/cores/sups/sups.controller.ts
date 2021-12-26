import { Controller } from '@nestjs/common';
import { SupsService } from './sups.service';

@Controller('api/sups')
export class SupsController {
  constructor(private readonly supsService: SupsService) {}
}
