import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, ObjectId } from 'mongoose';

import { Depart, DepartDocument } from './depart.model';
import { User, UserDocument } from '../user.model';
import { Trash, TrashDocument } from '../../../comCores/trashs/entities/trash.entity';

import { CreateDepartDto } from './dto/create-depart.dto';
import { UpdateDepartDto } from './dto/update-depart.dto';
import { FileService, FileType } from '../../../file/file.service';


@Injectable()
export class DepartsService {
  constructor(
    @InjectModel(Depart.name) private departmentDB: Model<DepartDocument>,
    @InjectModel(User.name) private userDB: Model<UserDocument>,
    @InjectModel(Trash.name) private trashDB: Model<TrashDocument>,
    private fileService: FileService) {
  }

  async create(createDepartDto: CreateDepartDto, image): Promise<Depart> {
    // console.log(image)
    const { name } = createDepartDto;
    let candidate;
    try {
      candidate = await this.departmentDB.findOne({ name: name });
    } catch (e) {
      console.log(e);
    }
    if (candidate) {
      throw new HttpException({ message: `Ошибка - отдел - ${candidate.name} уже существует!` }, HttpStatus.CONFLICT);
    }
    try {
      const imagePath = this.fileService.createFile(FileType.IMAGE, image);
      const dept = new this.departmentDB({ ...createDepartDto, img: imagePath });
      console.log('createDepart - создан отдел - ', dept);
      await dept.save();
      return dept;
    } catch (e) {
      console.log(e);
    }

  }

  async findAll(): Promise<Depart[]> {
    try {
      return await this.departmentDB.find().exec();
    } catch (e) {
      console.log(e);
    }
  }

  async findByID(id: ObjectId): Promise<Depart> {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException({ message: `Ошибка - ID #${id} не корректен!` }, HttpStatus.BAD_REQUEST);
    }
    const dept = await this.departmentDB.findById(id);
    if (!dept) {
      throw new HttpException({ message: `Ошибка - отдел с ID #${id} не найден!` }, HttpStatus.NOT_FOUND);
    }
    return dept;
  }

  async findByName(name: string): Promise<Depart> {
    const dept = await this.departmentDB.findOne({ name: name });
    if (!dept) {
      throw new HttpException({ message: `Ошибка - отдел с названием - ${name} не найден!` }, HttpStatus.NOT_FOUND);
    }
    return dept;
  }

  async update(id: ObjectId, updateDepartDto: UpdateDepartDto, file): Promise<Depart> {
    // console.log('server.dept.serv.upd: - ', id, '\n', updateDepartDto, '\n', file);
    const { name, desc } = updateDepartDto;
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException({ message: `Ошибка - ID #${id} не корректен!` }, HttpStatus.BAD_REQUEST);
    }
    let updDept;
    try {
      updDept = await this.departmentDB.findById(id);
    } catch (e) {
      console.log(e);
    }
    if (!updDept) {
      throw new HttpException({ message: `Отдел с ID #${id} не найден!` }, HttpStatus.NOT_FOUND);
    }
    if (name || desc) {
      if (name && String(name).length > 2) {
        updDept.$set({ name: name });
        updDept.$set({ desc: desc });
      }
      if (file) {
        const imagePath = this.fileService.createFile(FileType.IMAGE, file);
        console.log('server.dept.serv.upd.imagePath: - ', imagePath);
        updDept.$set({ img: imagePath });
      }
      try {
        await updDept.save();
        return updDept;
      } catch (e) {
        console.log(e);
      }
    } else {
      throw new HttpException({ message: `Нет заполненных полей для изменения!` }, HttpStatus.CONFLICT);
    }

  }

  async remove(id: ObjectId) {
    console.log('server: remove - ', id);
    let delDept;
    try {
      delDept = await this.departmentDB.findById(id);
    } catch (e) {
      console.log(e);
    }
    return delDept;
    // const { idCreator, name, desc } = dto;
    // if( !mongoose.isValidObjectId(idCreator) ) { throw new HttpException({ message: `Ошибка - ID удаляющего пользователя #${idCreator} не корректен!` }, HttpStatus.BAD_REQUEST);}
    // let user
    // try { user = await this.userDB.findById( idCreator ) } catch (e) { console.log(e) }
    // if ( !user ){ throw new HttpException({ message: `Удаляющий пользователь с ID #${idCreator} не найден` }, HttpStatus.NOT_FOUND)}
    // if( !mongoose.isValidObjectId(id) ) {  throw new HttpException({ message: `Ошибка - ID отдела #${id} не корректен!` }, HttpStatus.BAD_REQUEST);}
    // let delDept
    // try { delDept = await this.departmentDB.findById(id) } catch (e) { console.log(e) }
    // if ( !delDept ) { throw new HttpException({ message: `Отдел с ID #${id} не найден!` }, HttpStatus.NOT_FOUND);}
    // if (!desc) { throw new HttpException({ message: `Необходимо указать причину удаления` }, HttpStatus.NOT_FOUND)}
    // let dept
    // try { dept = await this.departmentDB.findOne({ name: name }) } catch (e) { console.log(e) }
    // if( !dept ) { throw new HttpException({ message: `Ошибка - отдел с названием - ${name} не найден!` }, HttpStatus.NOT_FOUND);}
    // if( delDept.name === name ) { throw new HttpException({ message: `Ошибка - отдел переназначения ${name} является удаляемым отделом!` }, HttpStatus.CONFLICT);}
    // try {
    //   let userArr = await this.userDB.find({depart: delDept.id})
    //   for (let i = 0; i < userArr.length; i++){
    //     userArr[i].$set('depart', dept.id)
    //     await userArr[i].save()
    //   }
    //   const del = await this.departmentDB.findByIdAndDelete(id)
    //   const trash = await new this.trashDB({
    //     idCreator: idCreator, name: del.name, desc: desc })
    //   console.log(`Пользователем ${user.name} удалён отдел ${del.name} с ID #${id}`)
    //   await trash.save()
    //   return del
    // }catch (e) {
    //   console.log(e)
    // }
  }
}
