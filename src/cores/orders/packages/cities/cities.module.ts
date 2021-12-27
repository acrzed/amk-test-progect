import { forwardRef, Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trash, TrashSchema } from '../../../../comCores/trashs/entities/trash.entity';
import { SupsModule } from '../../../sups/sups.module';
import { AuthModule } from '../../../../auth/auth.module';
import { City, CitySchema } from './entities/city.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: City.name, schema: CitySchema },
      { name: Trash.name, schema: TrashSchema },
    ]),
    forwardRef(() => SupsModule),
    forwardRef(() => AuthModule)
  ],
  controllers: [CitiesController],
  providers: [CitiesService],
  exports: [CitiesService]
})
export class CitiesModule {}
