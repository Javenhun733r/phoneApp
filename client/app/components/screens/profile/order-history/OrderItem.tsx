import { FC } from 'react'
import { Text, View } from 'react-native'

import { IOrder } from '@/types/order.interface'

import { convertPrice } from '@/utils/convertPrice'

const OrderItem: FC<{ order: IOrder }> = ({ order }) => {
	return (
		<View className='border-b border-gray-600 mb-4 pb-4'>
			<Text className='text-black text-lg font-bold'>
				Order {order.id.substring(0, 8)}...
			</Text>
			<Text className='text-gray-400 text-sm'>
				Date: {new Date(order.createdAt).toLocaleDateString()}
			</Text>
			<Text className='text-gray-400 text-sm mb-2'>
				Quantity: {order.items.length}
			</Text>
			<Text className='text-black text-xl font-bold'>
				Total: {convertPrice(order.total)}
			</Text>
		</View>
	)
}

export default OrderItem
