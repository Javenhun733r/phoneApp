import { FC } from 'react'
import RnToast, { BaseToast } from 'react-native-toast-message'

const options = (primaryColor: string) => ({
	style: { backgroundColor: '#000000', borderLeftColor: primaryColor },
	text1Style: {
		color: '#fff',
		fontSize: 16
	},
	text2Style: {
		fontSize: 14
	}
})

const Toast: FC = () => {
	const config = {
		success: (props: any) => (
			<BaseToast {...props} {...options('#67E769')} />
		),
		info: (props: any) => <BaseToast {...props} {...options('#65d4ff')} />,
		error: (props: any) => <BaseToast {...props} {...options('#ff4949')} />
	}

	return <RnToast topOffset={58} config={config} />
}

export default Toast
