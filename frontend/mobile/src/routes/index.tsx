import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'
import { SignIn } from '../screens/Signin'
export function Routes() {
	return (
		<NavigationContainer>
			{/* <AppRoutes /> */}
			<SignIn />
		</NavigationContainer>
	)
}
