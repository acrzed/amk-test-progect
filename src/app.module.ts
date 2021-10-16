import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { DeptsModule } from './depts/depts.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    MongooseModule.forRoot('mongodb+srv://acridzed:GHYEgbSyEv3dsENw@amkcrm.jeeyu.mongodb.net/staff?retryWrites=true&w=majority', {
    //MongooseModule.forRoot('mongodb://localhost/CRM', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    DeptsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

/*
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://acridzed:EMk$3@is_BG9@cluster0.crtsi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/
