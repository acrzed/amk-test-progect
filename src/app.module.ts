import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { MaterialsModule } from './materials/materials.module';
import { CategoryMaterialModule } from './category-mat/category-material.module';
import { CategoryUslModule } from './category-usl/category-usl.module';

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
    CategoryUslModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
