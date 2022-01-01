import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './cores/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './comCores/roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { DepartsModule } from './cores/users/departs/departs.module';
import { ClientsModule } from './cores/clients/clients.module';
import { OrdersModule } from './cores/orders/orders.module';
import { TrashModule } from './comCores/trashs/trashModule';
import { ChannelNamesModule } from './comCores/channel-names/channel-names.module';
import { SupsModule } from './cores/sups/sups.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './file/file.module';
import * as path from 'path';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),

    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot('mongodb+srv://acridzed:GHYEgbSyEv3dsENw@amkcrm.jeeyu.mongodb.net/staff?retryWrites=true&w=majority', {
      // MongooseModule.forRoot('mongodb://localhost/AMK-CRM', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    forwardRef(() => AuthModule),
    SupsModule,
    UsersModule,
    RolesModule,
    AuthModule,
    DepartsModule,
    ClientsModule,
    OrdersModule,
    TrashModule,
    ChannelNamesModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
