import { generateSlug } from '../src/utils/generate-slug';
import { Category, PrismaClient } from '../src/generated/client';

const prisma = new PrismaClient();

const categoriesData = [
  { name: 'Smartphones', image: '/uploads/categories/smartphones.png' },
  { name: 'Laptops', image: '/uploads/categories/laptops.png' },
  { name: 'Accessories', image: '/uploads/categories/accessories.png' },
];

async function main() {
  console.log('Starting database seeding...');
  const categories: Category[] = [];

  for (const item of categoriesData) {
    const category = await prisma.category.upsert({
      where: { name: item.name },
      update: {},
      create: {
        name: item.name,
        slug: generateSlug(item.name),
        image: item.image,
      },
    });
    categories.push(category);
    console.log(`Created category: ${category.name}`);
  }

  const smartphoneId = categories.find((c) => c.name === 'Smartphones')?.id;
  const laptopId = categories.find((c) => c.name === 'Laptops')?.id;

  if (smartphoneId && laptopId) {
    const productsData = [
      {
        name: 'iPhone 15 Pro Max',
        description:
          'The newest flagship smartphone with a titanium body and powerful A17 Bionic chip.',
        price: 45000,
        image: '/uploads/products/iphone15.png',
        categoryId: smartphoneId,
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        description:
          'A smartphone with powerful zoom and intelligent Galaxy AI features.',
        price: 38000,
        image: '/uploads/products/s24ultra.png',
        categoryId: smartphoneId,
      },
      {
        name: 'MacBook Pro 16" M3 Max',
        description:
          'A professional laptop with unparalleled performance for developers and designers.',
        price: 90000,
        image: '/uploads/products/macbookpro.png',
        categoryId: laptopId,
      },
      {
        name: 'Xiaomi RedmiBook Pro',
        description:
          'A budget-friendly and powerful laptop for everyday tasks.',
        price: 25000,
        image: '/uploads/products/redmibook.png',
        categoryId: laptopId,
      },
    ];

    for (const item of productsData) {
      const product = await prisma.product.upsert({
        where: { name: item.name },
        update: {},
        create: {
          name: item.name,
          slug: generateSlug(item.name),
          description: item.description,
          price: item.price,
          image: item.image,
          categoryId: item.categoryId,
        },
      });
      console.log(`Created product: ${product.name}`);
    }
  } else {
    console.error('Failed to find category IDs to link products.');
  }

  console.log('Database seeding finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
