import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import * as mongoose from 'mongoose';
import { User, UserDocument } from '../users/user.model';
import { RemoveTrashDto } from './dto/remove-trash.dto';
import { Trash, TrashDocument } from './entities/trash.entity';

@Injectable()
export class TrashService {
  constructor(
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,
    @InjectModel(User.name) private userDB: Model<UserDocument>,
  ) {
  }

  async findAll(): Promise<Trash[]> {
    try { return await this.trashDB.find().exec()} catch (e) { console.log(e) }
  }

  async removeAll(dto: RemoveTrashDto): Promise<User> {
    const { idCreator, desc } = dto;
    if ( !mongoose.isValidObjectId(idCreator) ){ throw new HttpException({ message: `ID удаляющего пользователя #${idCreator} не корректен!` }, HttpStatus.BAD_REQUEST)}
    let creator
    try { creator = await this.userDB.findById( idCreator ) } catch (e) { console.log(e) }
    if ( !creator ){ throw new HttpException({ message: `Удаляющий пользователь с ID #${idCreator} не найден` }, HttpStatus.NOT_FOUND)}
    if (!desc) { throw new HttpException({ message: `Необходимо указать причину удаления` }, HttpStatus.NOT_FOUND)}
    let cursor, i = 0
    try {
      cursor = await this.trashDB.find()
      for (i; i < cursor.length; i++){
        await this.trashDB.findByIdAndDelete(cursor[i]._id)
      }
      /*await cursor.forEach(
        (obj) => {
          this.trashDB.findByIdAndDelete(obj.id)
          count++
        }
      )*/
      const trash = await new this.trashDB({
        idCreator: idCreator, desc: desc, countTrash: i })
      await trash.save()
    } catch (e) { console.log(e) }
    console.log(`Пользователем ${creator.name} c ID #${creator.id} удалено ${i} объектов корзины`)
    return creator
  }
}
