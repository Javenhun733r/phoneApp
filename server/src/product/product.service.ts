import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { PrismaService } from 'src/prisma.service';
import { generateSlug } from 'src/utils/generate-slug';
import { ProductDTO } from './dto/product.dto';
import { returnProductObject } from './return-product.object';
@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoryService,
  ) {}
  async getAll(searchTerm?: string) {
    if (searchTerm) return this.search(searchTerm);
    return this.prisma.product.findMany({
      select: returnProductObject,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async search(searchTerm?: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
            description: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: returnProductObject,
    });
  }
  async getBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        slug,
      },
      select: returnProductObject,
    });
    if (!product) throw new Error('Product not found');
    return product;
  }
  async getByCategory(categorySlug: string) {
    const products = await this.prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
      },
      select: returnProductObject,
    });
    if (!products) throw new Error('Product not found');
    return products;
  }
  async create() {
    return this.prisma.product.create({
      data: {
        name: '',
        slug: '',
        image: '',
        description: '',
        price: 0,
      },
    });
  }
  async update(id: string, dto: ProductDTO) {
    const { name, description, price, categoryId, image } = dto;
    await this.categoryService.getById(categoryId);
    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        category: {
          connect: {
            id: categoryId,
          },
        },
        image,
        slug: generateSlug(name),
      },
    });
  }
  async delete(id: string) {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
