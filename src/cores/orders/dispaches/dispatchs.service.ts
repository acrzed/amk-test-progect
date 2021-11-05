import { Injectable } from '@nestjs/common';
import { CreateDispatchDto } from './dto/create-dispatch.dto';
import { UpdateDispatchDto } from './dto/update-dispatch.dto';

@Injectable()
export class DispatchsService {
  create(createDispatchDto: CreateDispatchDto) {
    return 'This action adds a new dispatch';
  }

  findAll() {
    return `This action returns all dispatchs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dispatch`;
  }

  update(id: number, updateDispatchDto: UpdateDispatchDto) {
    return `This action updates a #${id} dispatch`;
  }

  remove(id: number) {
    return `This action removes a #${id} dispatch`;
  }
}
