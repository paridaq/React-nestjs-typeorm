import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/typeorm/entities/product";
import { Repository } from "typeorm";
import { productfilter } from "../dtos/Product.dto";
import { filterProduct } from "src/utills/types";



@Injectable()
export class ProductService{
    
    constructor(@InjectRepository (Product)private productRepository:Repository<Product>){}



    //method for add the product to the db
async createProduct(productDetails:filterProduct):Promise<Product>{
    const product  = this.productRepository.create(productDetails)
    return this.productRepository.save(product) as Promise<Product>;
}



//method for update the product in hte db 
async updateProduct(id:number,productDetails:filterProduct):Promise<Product>{
    const product = await this.productRepository.findOneBy({ id });
    if(!product){
        throw new NotFoundException("product not found")
    }
    Object.assign(product,productDetails)
    return await this.productRepository.save(product);

}


///method for delete the product from the db
deleteProduct(id :number){
  return this.productRepository.delete({id})
}


// method for getting all the product from the db

async getProducts():Promise<Product[]>{
    return await this.productRepository.find()

}


}
