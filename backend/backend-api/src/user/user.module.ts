import { Module } from '@nestjs/common';

import { UserController } from './controller/user/user.controller';
import { Userservice } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Product } from 'src/typeorm/entities/product';
import { ProductController } from './controller/product/product.controller';
import { ProductService } from './service/product.service';

@Module({
  imports:[TypeOrmModule.forFeature([User,Product])],
  controllers: [UserController, ProductController],
  providers:[Userservice, ProductService]
})
export class UserModule {}
