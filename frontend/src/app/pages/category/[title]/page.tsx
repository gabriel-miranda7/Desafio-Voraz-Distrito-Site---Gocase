"use client";

import NavBar from "@/app/components/navbar";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import productsService, { Product } from "@/app/services/productsService";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const { title } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true)

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsService.getProductsByCategory(title as string);
        const productsArray = Object.keys(response).map((key) => ({
          ...response[key],
        }));
        setProducts(productsArray);
        setLoading(false)
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    if (title) {
      fetchProducts();
    }
  }, [title]);

  if (loading){
    return <h2 className="text-black text-[40px]">LOADING...</h2>
  }

  if (!loading && products.length === 0) {
    return <div className="text-black text-center">No products found in this category.</div>;
  }

  return (
    <div>
      <NavBar />
      <h1 className="text-3xl font-bold text-center mt-4">{title} Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {products.map((prod) => (
          <ProductCard
            key={prod.id}
            onClick={() => {
                router.push(`/pages/product/${prod.id}`)
                productsService.updateCookie(prod)
              }}
            name={prod.title}
            price={prod.price}
            image={prod.image}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
