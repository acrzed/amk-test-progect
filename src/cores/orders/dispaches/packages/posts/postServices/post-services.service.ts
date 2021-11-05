import { Injectable } from '@nestjs/common';
//import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

import { CreatePostServiceDto } from './dto/create-post-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PostService, PostServiceDocument } from './entities/postService.entity';

@Injectable()
export class postService {

  constructor(
    @InjectModel(PostService.name) private postSeviceDB: Model<PostServiceDocument>,
  ) {
  }

 async create(dto: CreatePostServiceDto) {
    return await this.postSeviceDB.create(dto);
  }

  findAll() {
    return `This action returns all services`;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
