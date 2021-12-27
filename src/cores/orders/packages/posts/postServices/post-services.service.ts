import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

import { CreatePostServiceDto } from './dto/create-post-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PostService, PostServiceDocument } from './entities/postService.entity';
import { RemoveTrashDto } from '../../../../../comCores/trashs/dto/remove-trash.dto';
import { Trash, TrashDocument } from '../../../../../comCores/trashs/entities/trash.entity';
//import { SupsService } from '../../../../../sups/sups.service';

@Injectable()
export class postService {

  constructor(
    @InjectModel(PostService.name) private postServicesDB: Model<PostServiceDocument>,
    @InjectModel(Trash.name)    private trashDB: Model<TrashDocument>,
    //private supsService: SupsService
  ) {
  }

  async create(dto: CreatePostServiceDto) {
    return await this.postServicesDB.create(dto);
  }

  async findAll() {
    try { return await this.postServicesDB.find().exec() } catch (e) { console.log(e) }  }

  async findOne(id: string) {
    try { return await this.postServicesDB.findById(id) } catch (e) { console.log(e) }
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    try { return await this.postServicesDB.findByIdAndUpdate(id,updateServiceDto) } catch (e) { console.log(e) }
  }

  async remove(id: string, dto: RemoveTrashDto) {
    const {idCreator, desc} = dto
    const delSrv = await this.postServicesDB.findById(id)
    try {
      const trashSrv = await new this.trashDB({
        idCreator: idCreator, removeDate: Date.now(), postServices: delSrv, desc: desc
      })
      await trashSrv.save() } catch (e) { console.log(e) }
    return await delSrv.remove()
  }
}
