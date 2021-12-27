import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostSrv, PostSrvDocument } from './entities/postSrv.entity';
import { Trash, TrashDocument } from '../../../../comCores/trashs/entities/trash.entity';
import { SupsService } from '../../../sups/sups.service';
import { RemoveTrashDto } from '../../../../comCores/trashs/dto/remove-trash.dto';

@Injectable()
export class PostsService {

  constructor(
    @InjectModel(PostSrv.name) private postSrvDB: Model<PostSrvDocument>,
    @InjectModel(Trash.name)    private trashDB: Model<TrashDocument>,
    private supsService: SupsService
  ) {
  }
  async create(dto: CreatePostDto): Promise<PostSrv> {
    const { post } = dto
    // проверка DTO
    if (!post){ throw new HttpException({ message: `Ошибка - название сервиса не заполнено!` }, HttpStatus.NOT_FOUND); }
    let pPost = await this.postSrvDB.findOne({post: post})
    if (pPost) { throw new HttpException({ message: `Ошибка - такой почтовый сервис уже зарегистрирован!` }, HttpStatus.CONFLICT);}
    return await this.postSrvDB.create(dto);
  }

  async findAll(): Promise<PostSrv[]> {
    try { return await this.postSrvDB.find().exec() } catch (e) { console.log(e) }
  }

  async findOne(id: string): Promise<PostSrv>  {
    return await this.supsService.validatePost(id);
  }

  async update(id: string, dto: UpdatePostDto): Promise<PostSrv> {
    const { post, desc } = dto
    let postUp = await this.supsService.validatePost(id)
    if( await this.postSrvDB.findOne({ post: post }) ){
      throw new HttpException({ message: `Ошибка - такой почтовый сервис уже зарегистрирован!` }, HttpStatus.CONFLICT)}
    let pPost = post ? post : postUp.post, pDesc = desc ? desc : postUp.desc
    return await postUp
      .$set('post', pPost)
      .$set('desc', pDesc)
      .save()
  }

  async remove(id: string, dto: RemoveTrashDto) {
    const { idCreator, desc } = dto
    // проверки почты, создателя
    let pPost = await this.supsService.validatePost(id)
    await this.supsService.validateDesc(desc)
    let creator = await this.supsService.validateCreator(idCreator)
    try {
      const trashPost = await new this.trashDB({
        idCreator: creator, removeDate: Date.now(), post: pPost, desc: desc
      })
      await trashPost.save() } catch (e) { console.log(e) }
      return await pPost.remove()
  }
}
