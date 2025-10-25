import { returnCategoryObject } from 'src/category/return-category.object';

export const returnProductObject = {
  id: true,
  name: true,
  slug: true,
  description: true,
  price: true,
  createdAt: true,
  image: true,
  category: { select: returnCategoryObject },
};

export type ProductSelection = typeof returnProductObject;
