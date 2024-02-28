import {
    Controller, Get, Post, Delete, Put,
    Param, Query, Body,
    HttpCode, HttpStatus
} from '@nestjs/common'

import { ProductsService } from '../../services/products/products.service'
import { CreateProductDto,UpdateProductDto } from '../../dtos/products.dtos'

@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService) {}

  @Get('')
  getProducts(
    @Query('limit')  limit = 100,
    @Query('offset') offset = 0,
    @Query('brand')  brand :string
  ) {
    return {
      message: `This action returns all products. Limit: ${limit}, offset: ${offset}, brand: ${brand}`,
      result: this.productsService.findAll()
    }
  }

  @Get('filter')
  getProductFilter() {
    return {
      message: 'This action returns all products'
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('id') id: string) {
    return {
      message: `This action returns a #${id} product`,
      result: this.productsService.findOne(+id)
    }
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateProductDto){
    return {
      message: 'Create action',
      payload : this.productsService.create(payload)
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Body() body: UpdateProductDto, @Param('id') id: string){
    return {
      message: 'Update action',
      id,
      body: this.productsService.update(+id, body)
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string){
    return {
      message: 'Delete action',
      id : this.productsService.delete(+id)
    }
  }
}
