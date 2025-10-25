import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { ProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.productService.getAll(searchTerm);
  }
  @Get('by-category/:categorySlug')
  async getByCategory(@Param('categorySlug') categorySlug: string) {
    return this.productService.getByCategory(categorySlug);
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.productService.getBySlug(slug);
  }
  @HttpCode(200)
  @Post()
  @Auth()
  async create() {
    return this.productService.create();
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(@Param('id') id: string, @Body() dto: ProductDTO) {
    return this.productService.update(id, dto);
  }
  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
