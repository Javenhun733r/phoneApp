import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { FC } from 'react'
import { Pressable, Text, View } from 'react-native'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { ICartItem } from '@/types/cart.interface'

interface ICartActions {
	item: ICartItem
}

const CartActions: FC<ICartActions> = ({ item }) => {
	const { removeFromCart, changeQuantity } = useActions()
	const { items } = useCart()

	const quantity =
		items.find(cartItem => cartItem.id === item.id)?.quantity || 0

	return (
		<View className='mt-4 flex-row items-center gap-x-4'>
			<Pressable
				onPress={() => {
					if (quantity > 1) {
						changeQuantity({ id: item.id, type: 'minus' })
					}
				}}
				disabled={quantity <= 1}
			>
				<AntDesign
					name='minus'
					size={18}
					color={quantity <= 1 ? '#ccc' : '#000'}
				/>
			</Pressable>

			<Text className='w-4 text-center'>{quantity}</Text>

			<Pressable
				onPress={() => changeQuantity({ id: item.id, type: 'plus' })}
			>
				<AntDesign name='plus' size={18} />
			</Pressable>

			<Pressable
				onPress={() => removeFromCart({ id: item.id })}
				className='ml-6'
			>
				<MaterialCommunityIcons
					name='delete-outline'
					size={20}
					color='#EA3949'
				/>
			</Pressable>
		</View>
	)
}

export default CartActions
