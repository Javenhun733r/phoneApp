import { FC } from 'react'
import { Text } from 'react-native'

import Button from '@/components/ui/button/Button'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { IProduct } from '@/types/product.interface'

interface IAddCardButton {
	product: IProduct
}
const AddToCardButton: FC<IAddCardButton> = ({ product }) => {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()
	const currentElement = items.find(
		cardItem => cardItem.product.id === product.id
	)
	return (
		<Button
			onPress={() =>
				currentElement
					? removeFromCart({ id: currentElement.id })
					: addToCart({ product, quantity: 1, price: product.price })
			}
			className='mt-6'
		>
			<Text>{currentElement ? 'Remove from cart' : 'Add to cart'}</Text>
		</Button>
	)
}

export default AddToCardButton
