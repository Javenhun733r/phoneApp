import { Module } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { PrismaService } from 'src/prisma.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, CategoryService],
})
export class ProductModule {}
