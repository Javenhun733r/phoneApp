import { FC } from 'react'
import { Image, View } from 'react-native'

import Heading from '@/components/ui/Heading'
import Button from '@/components/ui/button/Button'
import Layout from '@/components/ui/layout/Layout'

import { useAuth } from '@/hooks/useAuth'

import { AuthService } from '@/services/auth/auth.service'

import OrderHistory from './order-history/OrderHistory'
import { useProfile } from './useProfile'

const Profile: FC = () => {
	const { setUser } = useAuth()
	const profile = useProfile()
	return (
		<Layout>
			<Heading isCenter> Profile </Heading>
			<View className='my-6 items-center justify-center px-4'>
				<Image
					source={{ uri: profile?.avatarPath }}
					className='w-40 h-40 rounded-full'
				/>
			</View>
			<View className='px-4 w-full'>
				<OrderHistory />
			</View>
			<Button
				onPress={() => AuthService.logout().then(() => setUser(null))}
				className='mt-5'
			>
				Logout
			</Button>
		</Layout>
	)
}

export default Profile
