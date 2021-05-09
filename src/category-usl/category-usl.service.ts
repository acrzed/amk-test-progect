import { Injectable } from '@nestjs/common';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { CatUsl, CatUslDocument } from './categoty-usl.models';

@Injectable()

export class CategoryUslService {

  constructor(@InjectModel(CatUsl.name) private CategoryUslRepo: Model<CatUslDocument>) {
  }
  create(dto: CreateCategoryDTO): Promise<CatUsl> {
    try {
      const category = new this.CategoryUslRepo(dto)
      return category.save();
    }catch (e) {
      console.log(e)
    }
  }
}
