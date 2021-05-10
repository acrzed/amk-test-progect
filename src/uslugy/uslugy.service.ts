import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usluga, UslugaDocument } from './usluga.models';
import { Model } from 'mongoose';
import { CategoryUslugService } from '../category-uslug/category-uslug.service';
import { CreateUslugyDto } from './dto/create-uslugy.dto';

@Injectable()
export class UslugyService {
  constructor(@InjectModel(Usluga.name) private uslugaRepo: Model<UslugaDocument>,
              private categoryUslugService: CategoryUslugService) {
  }

  getAllUslugy(): Promise<Usluga[]> {
    return this.uslugaRepo.find().exec();
  }

  async createUslugy(dto: CreateUslugyDto): Promise<Usluga> {
    try {
      console.log(dto)
      const usluga = new this.uslugaRepo(dto);
      const category = await this.categoryUslugService.getCategoryByName(dto.category);
      if (usluga && category) {
        const { name } = category;
        await usluga.$set('category', name);
        console.log('Создана услуга -', usluga.name,
          'категория -', usluga.category, 'описание -', usluga.note);
        return usluga.save();
      }
      throw new HttpException({ message: 'Категория не найдена' }, HttpStatus.NOT_FOUND);
    } catch (e) {
      console.log(e);
    }
  }
}
