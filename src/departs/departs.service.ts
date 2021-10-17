import { Injectable } from '@nestjs/common';
import { CreateDepartDto } from './dto/create-depart.dto';
import { UpdateDepartDto } from './dto/update-depart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Depart, DepartDocument } from './depart.model';


@Injectable()
export class DepartsService {
  constructor(@InjectModel(Depart.name) private dapartsDB: Model<DepartDocument> ) {
  }
  async create(createDepartDto: CreateDepartDto) {
    try {
      const dept = new this.dapartsDB(createDepartDto);
      return dept.save().then(() => console.log('cоздан отдел - ',dept));
    }catch (e) {
      console.log(e);
    }

  }

  findAll() {
    return `This action returns all departs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} depart`;
  }
  findByName(name: string) {
    return this.dapartsDB.findOne({name: name});
  }

  update(id: number, updateDepartDto: UpdateDepartDto) {
    return `This action updates a #${id} depart`;
  }

  remove(id: number) {
    return `This action removes a #${id} depart`;
  }
}
