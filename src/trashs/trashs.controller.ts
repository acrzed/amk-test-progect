import { Controller } from '@nestjs/common';
import { TrashsService } from './trashs.service';

@Controller('trashs')
export class TrashsController {
  constructor(private readonly trashsService: TrashsService) {}
}
