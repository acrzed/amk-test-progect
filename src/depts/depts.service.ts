import { Injectable } from '@nestjs/common';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Dept, DeptDocument } from './dept.model';
import { Model } from 'mongoose';

@Injectable()
export class DeptsService {
  // constructor(@InjectModel(Dept.name) private deptDBRepo: Model<DeptDocument>) {
  // }
  create(createDeptDto: CreateDeptDto) {
    return 'This action adds a new dept';
  }

  findAll() {
    return `This action returns all depts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dept`;
  }

  findByName(name: string) {
    return `This action returns a #${name} dept`;
    //return this.deptDBRepo.findOne({name: name});
  }

  update(id: number, updateDeptDto: UpdateDeptDto) {
    return `This action updates a #${id} dept`;
  }

  remove(id: number) {
    return `This action removes a #${id} dept`;
  }
}
