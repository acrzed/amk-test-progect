import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { MaterialsModule } from './materials/materials.module';
import { CategoryMaterialModule } from './category-material/category-material.module';
import { CategoryUslugModule } from './category-uslug/category-uslug.module';
import { UslugyModule } from './uslugy/uslugy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    MongooseModule.forRoot('mongodb://localhost/CRM', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    MaterialsModule,
    CategoryMaterialModule,
    CategoryUslugModule,
    UslugyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
