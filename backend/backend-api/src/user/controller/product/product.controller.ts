import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { productfilter } from "src/user/dtos/Product.dto";
import { ProductService } from "src/user/service/product.service";





@Controller("product")
export class ProductController{
    constructor(private productService:ProductService){}

    //post the product 
  @Post("addproduct")
  async addproduct( @Body() productDetails:productfilter){
    return await this.productService.createProduct(productDetails)
  
  }


    // get the products
    @Get("products")
    getAllProducts(){
      return this.productService.getProducts();
    }



    //patch the product 
  @Patch(':id')
updateProduct(
  @Param('id') id: number,
  @Body() updateData: productfilter,
) {
  return this.productService.updateProduct(id, updateData);
}



    //delete the produt
@Delete(":id")
deleteProduct(@Param('id') id:number){
  return  this.productService.deleteProduct(id)
}
    
}