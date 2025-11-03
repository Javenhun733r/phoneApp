import { FC } from 'react'

import Loader from '@/components/ui/Loader'
import Catalog from '@/components/ui/catalog/Catalog'
import Layout from '@/components/ui/layout/Layout'

import { useGetAllProducts } from './useGetAllProduct'

const Explorer: FC = () => {
	const { products, isLoading } = useGetAllProducts()
	return (
		<Layout>
			{isLoading ? (
				<Loader />
			) : (
				<Catalog title='Explorer' products={products || []} />
			)}
		</Layout>
	)
}

export default Explorer
