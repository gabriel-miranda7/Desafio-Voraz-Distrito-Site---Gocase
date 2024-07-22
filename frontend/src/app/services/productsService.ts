
import apiProvider from "../providers/apiProvider";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    masculine_cloth_score: number;
    feminine_cloth_score: number;
    electronic_score: number;
    jewelry_score: number;
    created_at: string;
    updated_at: string;
}


export interface GetProductsResponse {
    [key: string]: Product
}

const seeOrCreateCookie = async (): Promise<void> => {
    const cookieName = 'user_profile';
    const token = localStorage.getItem('token');

    if (token){ //se existir token vamos assumir que o usuário está LOGADO
        try {
            const decoded: any = jwtDecode(token);
            const id = decoded.user_id; // Pega o id do usuario
            const response = await apiProvider.get<GetProductsResponse>(`/users/update_cookie?id=${id}`); //Recebe o cookie do backend
            Cookies.set(cookieName, JSON.stringify(response), { //Seta ele no frontend
                expires: 365*10, // expira em 10 anos
                path: '/',
                secure: process.env.NODE_ENV === 'production', // apenas HTTPS em produção
                sameSite: 'strict',
              });
        } catch (error) {
            throw error;
        }
    }

    // Verifica se o cookie já existe
    if (!Cookies.get(cookieName)) {
        const userProfile = {
            masculine_cloth_score: 2,
            feminine_cloth_score: 2,
            electronic_score: 2,
            jewelry_score: 2,
          };
  
      // Cria o cookie
      Cookies.set(cookieName, JSON.stringify(userProfile), {
        expires: 365*10, // expira em 10 anos
        path: '/',
        secure: process.env.NODE_ENV === 'production', // apenas HTTPS em produção
        sameSite: 'strict',
      });
  
    }
};

const updateCookie = async (product: Product): Promise<void> => {
    const cookieName = 'user_profile';
    const cookie = Cookies.get(cookieName);
    const token = localStorage.getItem('token');
    
    if (cookie) {
        const userProfile = JSON.parse(cookie);

        const product_weight = 0.1;

        userProfile.masculine_cloth_score =  (userProfile.masculine_cloth_score * 2 + product.masculine_cloth_score * product_weight) / (2 + product_weight)
        userProfile.feminine_cloth_score =  (userProfile.feminine_cloth_score * 2 + product.feminine_cloth_score * product_weight) / (2 + product_weight)
        userProfile.electronic_score =  (userProfile.electronic_score * 2 + product.electronic_score * product_weight) / (2 + product_weight)
        userProfile.jewelry_score =  (userProfile.jewelry_score * 2 + product.jewelry_score * product_weight) / (2 + product_weight)

        const scores = {
            masculine_cloth_score: userProfile.masculine_cloth_score,
            feminine_cloth_score: userProfile.feminine_cloth_score,
            electronic_score: userProfile.electronic_score,
            jewelry_score: userProfile.jewelry_score,
        };

        Cookies.set(cookieName, JSON.stringify(userProfile), {
            expires: 365 * 10, // expira em 10 anos
            path: '/',
            secure: process.env.NODE_ENV === 'production', // apenas HTTPS em produção
            sameSite: 'strict',
          });
        

    if (token){ //se existir token vamos assumir que o usuário está LOGADO
        try {
            const decoded: any = jwtDecode(token);
            const id = decoded.user_id; // Pega o id do usuario
    
            const response = await apiProvider.post<{ message: string }, { scores: typeof scores }>(
                `/users/update_cookie?id=${id}`, 
                { scores }
            );
        }  catch(error){
            throw error;
            }
        }
    }
}
    

const getProductsByCategory = async (category: string): Promise<GetProductsResponse> => {
    try {
        const response = await apiProvider.get<GetProductsResponse>(`/products/category/${category}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const getProducts = async (): Promise<GetProductsResponse> => {
    try {
        const userProfileCookie = Cookies.get("user_profile");
        const userProfile = JSON.parse(userProfileCookie);
        const response = await apiProvider.get<GetProductsResponse>("/products/recommended", {
            withCredentials: true
        });
        return response;
    } catch (error) {
        throw error;
    }
}

const getProduct = async (id: string | string[]): Promise<Product> => {
    try {
        const response = await apiProvider.get<Product>(`/products/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const productsService = {
    getProducts,
    getProduct,
    getProductsByCategory,
    seeOrCreateCookie,
    updateCookie
}

export default productsService;
