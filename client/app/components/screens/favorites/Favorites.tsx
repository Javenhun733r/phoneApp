import { FC } from 'react'

import Catalog from '@/components/ui/catalog/Catalog'
import Layout from '@/components/ui/layout/Layout'

import { useProfile } from '../profile/useProfile'

const Favorites: FC = () => {
	const profile = useProfile()
	return (
		<Layout>
			<Catalog title='Favorites' products={profile?.favorites || []} />
		</Layout>
	)
}

export default Favorites
