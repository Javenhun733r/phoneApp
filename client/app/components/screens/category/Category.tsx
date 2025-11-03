import { FC } from 'react'
import { Text } from 'react-native'

import Loader from '@/components/ui/Loader'
import Catalog from '@/components/ui/catalog/Catalog'
import Layout from '@/components/ui/layout/Layout'

import { IProduct } from '@/types/product.interface'

import { useCategory } from './useCategory'

const getProductsArray = (
	data: IProduct[] | IProduct | null | undefined
): IProduct[] => {
	if (Array.isArray(data)) {
		return data
	}
	if (data && typeof data === 'object') {
		return [data as IProduct]
	}
	return []
}

const Category: FC = () => {
	const { category, products, isLoading } = useCategory()

	const productsArray = getProductsArray(products)

	if (isLoading) {
		return <Loader />
	}

	return (
		<Layout>
			{category ? (
				<Catalog title={category.name} products={productsArray} />
			) : (
				<Text>Category not found!</Text>
			)}
		</Layout>
	)
}

export default Category
