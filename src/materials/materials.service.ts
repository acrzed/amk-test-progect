import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Material, MaterialDocument } from './material.models';
import { Model } from 'mongoose';
// import { CreateMaterialDto } from './dto/create-material.dto';
// import { CategoryMaterialService } from '../category-mat/category-material.service';

@Injectable()
export class MaterialsService {

  constructor(@InjectModel(Material.name) private materialRepo: Model<MaterialDocument>,
              // private categoryMatService: CategoryMaterialService
  ) {
  }
  getAllMaterial(): Promise<Material[]> {
    return this.materialRepo.find().exec();
  }
  // async createMaterial(dto: CreateMaterialDto): Promise<Material> {
  //   try {
  //     const material = new this.materialRepo(dto);
  //     const category = await this.categoryMatService.getCategoryByName('ткань');
  //     await material.$set('category', [category.name]);
  //     return material.save();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

}
