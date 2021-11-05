import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderStatDto } from './create-order-stat.dto';

export class UpdateOrderStatDto extends PartialType(CreateOrderStatDto) {}
