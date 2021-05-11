import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Material, MaterialDocument } from './material.models';
import { Model } from 'mongoose';
import { CreateMaterialDto } from './dto/create-material.dto';
import { CategoryMaterialService } from '../category-material/category-material.service';
import { ValidationException } from '../exception/ValidationException';

@Injectable()
export class MaterialsService {
  constructor(@InjectModel(Material.name) private materialRepo: Model<MaterialDocument>,
              private categoryMaterialService: CategoryMaterialService) {
  }
  getAllMaterial(): Promise<Material[]> {
    return this.materialRepo.find().exec();
  }
  async getMaterialByName(name: string){
    return this.materialRepo.findOne({name})
  }
  async getCategoryByName(category){
    return this.categoryMaterialService.getCategoryByName(category)
  }
  async createMaterial(dto: CreateMaterialDto): Promise<Material> {
    try {
      const material = new this.materialRepo(dto);
      await material.$set('category', dto.category);
      console.log(
        `Создан материал - ${material.name}, 
          категория - ${material.category}, 
          описание - ${material.note}`);
      return material.save();
    } catch (e) {
      console.log(e);
    }
  }
}
