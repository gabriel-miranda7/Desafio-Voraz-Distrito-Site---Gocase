import apiProvider from "../providers/apiProvider";

type AuthenticationResponse = {
    token: string;
}

type AuthenticationRequest = {
    email: string;
    password: string;
}

type SignUpResponse = {
    token: string;
}

type SignUpRequest = {
    username: string;
    email: string;
    password: string;
}

const login = async (email: string, password: string): Promise<AuthenticationResponse> => {
    try {
        const response = await apiProvider.post<AuthenticationResponse, AuthenticationRequest>("/login", {
            email,
            password,
        })
        return response
    } catch (error) {
        throw error
    }
}

const signup = async (username: string, email: string, password: string): Promise<SignUpResponse> => {
    try {
        const response = await apiProvider.post<SignUpResponse, SignUpRequest>("/users", {
            email,
            password,
            username
        })
        return response
    } catch (error) {
        throw error
    }
}

const authenticationService = {
    login, signup
}

export default authenticationService