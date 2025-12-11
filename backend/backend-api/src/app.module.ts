import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Product } from './typeorm/entities/product';

@Module({
  imports:[TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'Biswajit@091',
    database:'nestjs_typeorm_project',
    entities:[User,Product],
    synchronize:true
  }),UserModule],
  

})
export class AppModule {}
