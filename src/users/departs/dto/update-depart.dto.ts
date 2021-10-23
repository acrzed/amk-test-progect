import { PartialType } from '@nestjs/swagger';
import { CreateDepartDto } from './create-depart.dto';

export class UpdateDepartDto extends PartialType(CreateDepartDto) {}
