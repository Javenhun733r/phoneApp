import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { generateSlug } from 'src/utils/generate-slug';
import { CategoryDTO } from './dto/category.dto';
import { returnCategoryObject } from './return-category.object';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    return this.prisma.category.findMany({
      select: returnCategoryObject,
    });
  }
  async getById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) throw new Error('Category not found');
    return category;
  }
  async getBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        slug,
      },
    });
    if (!category) throw new Error('Category not found');
    return category;
  }
  async create() {
    return this.prisma.category.create({
      data: {
        name: '',
        slug: '',
        image: '',
      },
    });
  }
  async update(id: string, dto: CategoryDTO) {
    return this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        image: dto.image,
        slug: generateSlug(dto.name),
      },
    });
  }
  async delete(id: string) {
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
