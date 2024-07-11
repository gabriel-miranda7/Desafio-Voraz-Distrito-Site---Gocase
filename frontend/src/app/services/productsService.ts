
import apiProvider from "../providers/apiProvider";

type Product = {
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

type GetProductsResponse = {
    products: Product[];
}

const getProducts = async (): Promise<GetProductsResponse> => {
    try {
        const response = await apiProvider.get<GetProductsResponse>("/products");
        return response;
    } catch (error) {
        throw error;
    }
}

const productsService = {
    getProducts
}

export default productsService;
