import { Injectable } from '@nestjs/common';
import { CreateCategoryMaterialDto } from './dto/create-category-material.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryMaterial, CategoryMaterialDocument } from './categoty-material.models';
import { Model } from 'mongoose';

@Injectable()
export class CategoryMaterialService {

  constructor(@InjectModel(CategoryMaterial.name) private categoryMaterialRepo: Model<CategoryMaterialDocument>,
              ) {
  }

  async create(dto: CreateCategoryMaterialDto): Promise<CategoryMaterial> {
    try {
      const category = new this.categoryMaterialRepo(dto);
      return category.save();
    } catch (e) {
      console.log(e);
    }
  }

  async getAllCategories(): Promise<CategoryMaterial[]> {
    return this.categoryMaterialRepo.find().exec()
  }
  // async getCategoryByName(value: string){
  //   const category = await this.categoryMaterialRepo.findOne({value})
  //   return category
  // }
}
