import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usluga, UslugaDocument } from './usluga.models';
import { Model } from 'mongoose';
import { CategoryUslugService } from '../category-uslug/category-uslug.service';
import { CreateUslugyDto } from './dto/create-uslugy.dto';
import { NoUniqueNameException } from '../exception/NoUniqueNameException';
import { ValidationException } from '../exception/ValidationException';

@Injectable()
export class UslugyService {
  constructor(@InjectModel(Usluga.name) private uslugaRepo: Model<UslugaDocument>,
              private categoryUslugService: CategoryUslugService) {
  }

  getAllUslugy(): Promise<Usluga[]> {
    return this.uslugaRepo.find().exec();
  }
  async getUsluguByName(name: string){
    return this.uslugaRepo.findOne({name})
  }
  async getCategoryByName(category){
    return this.categoryUslugService.getCategoryByName(category)
  }
  async createUslugy(dto: CreateUslugyDto): Promise<Usluga> {
    try {
      const usluga = new this.uslugaRepo(dto);
      await usluga.$set('category', dto.category);
      console.log(
        `Создан материал - ${usluga.name}, 
          категория - ${usluga.category}, 
          описание - ${usluga.note}`);
      return usluga.save();

    } catch (e) {
      console.log(e);
    }
  }
}
