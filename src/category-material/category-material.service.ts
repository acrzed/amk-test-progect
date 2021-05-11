import { Injectable } from '@nestjs/common';
import { CreateCategoryMaterialDto } from './dto/create-category-material.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryMaterial, CategoryMaterialDocument } from './categoty-material.models';
import { Model } from 'mongoose';

@Injectable()
export class CategoryMaterialService {

  constructor(@InjectModel(CategoryMaterial.name)
              private categoryMaterialRepo: Model<CategoryMaterialDocument>,
              ) {
  }
  async create(dto: CreateCategoryMaterialDto): Promise<CategoryMaterial> {
    try {
      console.log(
        `Создана категория материалов - ${dto.name}, 
         описание - ${dto.note}`)
      return new this.categoryMaterialRepo(dto).save();
    } catch (e) {
      console.log(e);
    }
  }
  async getAllCategories(): Promise<CategoryMaterial[]> {
    return this.categoryMaterialRepo.find().exec()
  }
  async getCategoryByName(name: string){
    return this.categoryMaterialRepo.findOne({ name });


  }
}
