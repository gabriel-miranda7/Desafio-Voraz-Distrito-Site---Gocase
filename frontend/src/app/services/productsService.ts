
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
    [key: string]: Product
}

const seeOrCreateCookie = () => {
    const cookieName = 'user_profile';
  
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
  
      console.log('Cookie criado!');
    }
};

const updateCookie = (product: Product) => {
    const cookieName = 'user_profile';
    const cookie = Cookies.get(cookieName);
    if (cookie) {
        const userProfile = JSON.parse(cookie);

        const product_weight = 0.1;

        userProfile.masculine_cloth_score =  (userProfile.masculine_cloth_score * 2 + product.masculine_cloth_score * product_weight) / (2 + product_weight)
        userProfile.feminine_cloth_score =  (userProfile.feminine_cloth_score * 2 + product.feminine_cloth_score * product_weight) / (2 + product_weight)
        userProfile.electronic_score =  (userProfile.electronic_score * 2 + product.electronic_score * product_weight) / (2 + product_weight)
        userProfile.jewelry_score =  (userProfile.jewelry_score * 2 + product.jewelry_score * product_weight) / (2 + product_weight)

        Cookies.set(cookieName, JSON.stringify(userProfile), {
            expires: 365 * 10, // expira em 10 anos
            path: '/',
            secure: process.env.NODE_ENV === 'production', // apenas HTTPS em produção
            sameSite: 'strict',
          });
      console.log('Cookie atualizado!');
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
        const userProfile = Cookies.get("user_profile");
        const parsed = JSON.parse(userProfile);
        const response = await apiProvider.get<GetProductsResponse>("/products/recommended", {
            headers: {
                'Cookie': `user_profile=${parsed}`
            }
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
