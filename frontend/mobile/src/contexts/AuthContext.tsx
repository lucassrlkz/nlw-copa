import { createContext, ReactNode, useState, useEffect } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

interface UserProps {
	name: string
	avatarUrl: string
}

interface AuthProviderProps {
	children: ReactNode
}

export interface AuthContextProps {
	user: UserProps
	isUserLoading: boolean
	signIn: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthContextProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<UserProps>({} as UserProps)

	const [isUserLoading, setIsUserLoading] = useState(false)

	const [request, response, promptAsync] = Google.useAuthRequest({
		clientId:
			'776219448607-gqca15ehc5tu8956sr015nvqkpo7to0f.apps.googleusercontent.com',
		redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
		scopes: ['profile', 'email'],
	})

	async function signIn() {
		try {
			setIsUserLoading(true)
			await promptAsync()
		} catch (error) {
			console.log(error)
			throw error
		} finally {
			setIsUserLoading(false)
		}
	}

	async function signInWithGoogle(accessToken: string) {
		console.log('Token de authenticação ==> ', accessToken)
	}

	useEffect(() => {
		if (response?.type === 'success' && response.authentication?.accessToken) {
			signInWithGoogle(response.authentication.accessToken)
		}
	}, [response])

	return (
		<AuthContext.Provider
			value={{
				isUserLoading,
				signIn,
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
