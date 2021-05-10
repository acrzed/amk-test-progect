import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Material, MaterialDocument } from './material.models';
import { Model } from 'mongoose';
import { CreateMaterialDto } from './dto/create-material.dto';
import { CategoryMaterialService } from '../category-material/category-material.service';

@Injectable()
export class MaterialsService {
  constructor(@InjectModel(Material.name) private materialRepo: Model<MaterialDocument>,
              private categoryMaterialService: CategoryMaterialService) {
  }

  getAllMaterial(): Promise<Material[]> {
    return this.materialRepo.find().exec();
  }

  async createMaterial(dto: CreateMaterialDto): Promise<Material> {
    try {
      const material = new this.materialRepo(dto);
      const category = await this.categoryMaterialService.getCategoryByName(dto.category);
      if (material && category) {
        const { name } = category;
        await material.$set('category', name);
        console.log('Создан материал -', material.name,
          'категория -', material.category, 'описание -', material.note);
        return material.save();
      }
      throw new HttpException({ message: 'Категория не найдена' }, HttpStatus.NOT_FOUND);
    } catch (e) {
      console.log(e);
    }
  }
}
