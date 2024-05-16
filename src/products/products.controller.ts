import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name)
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}
  @Post()
  createProduct(@Body()createProduct : CreateProductDto) {
    this.logger.log(createProduct)
    return this.productsClient.send(
      { cmd: 'create_product' },
      createProduct,
    );  }
  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    console.log(paginationDto);

    return this.productsClient.send(
      { cmd: 'find_all_products' },
      paginationDto,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({ cmd: 'find_one_product' }, { id })
    .pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );

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
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return id;
    //   return this.client.send({ cmd: 'delete_product' }, { id }).pipe(
    //     catchError((err) => {
    //       throw new RpcException(err);
    //     }),
    //   );
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto,
  ) {
    return id;
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
