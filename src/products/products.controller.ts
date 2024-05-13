import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}
  @Post()
  createProduct(){
    return 'Create Product'

  }
  @Get()
  findAllProducts(@Query() paginationDto) {
    return paginationDto
    // return this.client.send(
    //   { cmd: 'find_all_products' },
    //   paginationDto,
    // );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return id
    // return this.client.send({ cmd: 'find_one_product' }, { id }).pipe(
    //   catchError((err) => {
    //     throw new RpcException(err);
    //   }),
    // );

    // try {

    //   const product = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one_product' },{ id })
    //   );
    //   return product;

    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }

  @Delete(':id')
  deleteProduct(@Param('id',ParseIntPipe) id: number) {
    return id
  //   return this.client.send({ cmd: 'delete_product' }, { id }).pipe(
  //     catchError((err) => {
  //       throw new RpcException(err);
  //     }),
  //   );
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto
  ) {
    return id
    // return this.client
    //   .send(
    //     { cmd: 'update_product' },
    //     {
    //       id,
    //       ...updateProductDto,
    //     },
    //   )
    //   .pipe(
    //     catchError((err) => {
    //       throw new RpcException(err);
    //     }),
    //   );
  }


}
