import { Entypo } from '@expo/vector-icons'
import { FC } from 'react'
import { Text, View } from 'react-native'

import Heading from '@/components/ui/Heading'
import Loader from '@/components/ui/Loader'

import OrderItem from './OrderItem'
import { useOrders } from './useOrders'

const OrderHistory: FC = () => {
	const { orders, isLoading } = useOrders()

	if (isLoading) {
		return <Loader />
	}

	return (
		<View className='mt-8'>
			<Heading>Order history</Heading>
			{orders && orders.length > 0 ? (
				orders.map(order => <OrderItem key={order.id} order={order} />)
			) : (
				<View className='flex-row items-center mt-4 p-4 bg-gray-700 rounded-lg'>
					<Entypo name='info' size={20} color='white' />
					<Text className='text-white text-base ml-2'>
						There are no orders yet.
					</Text>
				</View>
			)}
		</View>
	)
}

export default OrderHistory
