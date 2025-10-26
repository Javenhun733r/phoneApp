import { FC } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import MenuItem from './MenuItem'
import { menuItems } from './menu.data'
import { TypeNavigate } from './menu.interface'

interface IBottomMenu {
	nav: TypeNavigate
	currentRoute?: string
}
const BottomMenu: FC<IBottomMenu> = props => {
	const PADDING_BOTTOM = 20
	const { bottom } = useSafeAreaInsets()
	return (
		<View
			className='pt-5 px-2 flex-row justify-between items-center w-[100%] border-t border-t-solid border-t-[#bbbbbb] bg-white'
			style={{
				paddingBottom: Math.max(bottom, PADDING_BOTTOM)
			}}
		>
			{menuItems.map(item => (
				<MenuItem key={item.path} item={item} {...props} />
			))}
		</View>
	)
}

export default BottomMenu
