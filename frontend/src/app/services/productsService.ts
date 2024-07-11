
import apiProvider from "../providers/apiProvider";
import Cookies from "js-cookie";

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
    [key: string]: Omit<Product, 'id'>
}

const getProducts = async (): Promise<GetProductsResponse> => {
    try {
        const userProfile = Cookies.get("user_profile");
        
        const response = await apiProvider.get<GetProductsResponse>("/products/recommended", {
            headers: {
                'Cookie': `user_profile=${userProfile}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

const productsService = {
    getProducts
}

export default productsService;
