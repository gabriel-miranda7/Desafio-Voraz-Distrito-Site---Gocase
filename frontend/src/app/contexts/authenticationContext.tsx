"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useState
} from "react"
import authenticationService from "../services/authenticationService";

type AuthenticationContext = {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    signup: (username: string, email: string, password: string) => Promise<void>
}

const AuthenticationContext = createContext<AuthenticationContext | null>(null)

export const useAuthenticationContext = () => {
    const context = useContext(AuthenticationContext)

    if (!context) {
        throw new Error(
            "useAuthenticationContext must be used within an AuthenticationContextProvider"
        )
    }

    return context
}

const AuthenticationContextProvider = ({
    children,
}: {
    children: ReactNode,
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const login = async (email: string, password: string): Promise<void> => {
        const response = await authenticationService.login(email, password)
        localStorage.setItem("token", response.token)
        setIsAuthenticated(true)
    }

    const signup = async (username: string, email: string, password: string): Promise<void> => {
        const response = await authenticationService.signup(username, email, password)
        localStorage.setItem("token", response.token)
        setIsAuthenticated(true)
    }

    const logout = async () => {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
    }

    return (
        <AuthenticationContext.Provider value={{login, signup, isAuthenticated, logout}}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationContextProvider