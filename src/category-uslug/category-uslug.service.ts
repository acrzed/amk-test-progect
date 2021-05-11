import { Injectable } from '@nestjs/common';
import { CreateCategoryUslugDto } from './dto/create-category-uslug.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryUslug, CategoryUslugDocument } from './categoty-uslug.models';

@Injectable()

export class CategoryUslugService {

  constructor(@InjectModel(CategoryUslug.name) private categoryUslugRepo: Model<CategoryUslugDocument>) {
  }

  async create(dto: CreateCategoryUslugDto): Promise<CategoryUslug> {
    try {
      console.log(
        `Создана категория услуг - ${dto.name}, 
         описание - ${dto.note}`)
      return new this.categoryUslugRepo(dto).save();
    } catch (e) {
      console.log(e);
    }
  }

  async getAllCategories(): Promise<CategoryUslug[]> {
    return this.categoryUslugRepo.find().exec();
  }

  async getCategoryByName(name: string) {
    return this.categoryUslugRepo.findOne({ name });
  }
}
