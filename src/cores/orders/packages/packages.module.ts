import { forwardRef, Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trash, TrashSchema } from '../../../comCores/trashs/entities/trash.entity';
import { SupsModule } from '../../sups/sups.module';
import { AuthModule } from '../../../auth/auth.module';
import { Package, PackageSchema } from './entities/package.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Package.name, schema: PackageSchema },
      { name: Trash.name, schema: TrashSchema },
    ]),
    forwardRef(() => SupsModule),
    forwardRef(() => AuthModule)
  ],
  controllers: [PackagesController],
  providers: [PackagesService],
  exports: [PackagesService]
})
export class PackagesModule {}
