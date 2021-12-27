import { PartialType } from '@nestjs/mapped-types';
import { CreatePostServiceDto } from './create-post-service.dto';

export class UpdateServiceDto extends PartialType(CreatePostServiceDto) {}
