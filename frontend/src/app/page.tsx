"use client";
import NavBar from "@/app/components/navbar";
import React, { useEffect, useState } from "react";
import banner1 from "./assets/banner_1.png";
import banner1Mobile from "./assets/banner_1_mobile.png";
import Image from "next/image";
import ProductCard from "./components/ProductCard/ProductCard";

import productsService, { Product } from "./services/productsService";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsService.getProducts();
        const productsArray = Object.keys(response).map((key) => ({
          ...response[key], // Copia os atributos do objeto
          id: Number(key), // Define o ID como o valor convertido da chave
        }));
        setProducts(productsArray);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <NavBar />
      <div
        onClick={() => console.log(products)}
        className="flex-col items-center"
      >
        <div className="lg:hidden">
          <Image src={banner1Mobile} alt="Banner 1 Mobile" unoptimized={true} />
        </div>
        <div className="hidden lg:block">
          <Image src={banner1} alt="Banner 1" unoptimized={true} />
        </div>
        <h2 className="text-black text-center p-12 text-[24px] font-bold">
          You may like
        </h2>
      </div>
      <div className="flex justify-evenly">
        {products &&
          products
            .slice(0, 7)
            .map((prod) => (
              <ProductCard
                onClick={() => router.push(`/pages/product/${prod.id}`)}
                key={prod.id}
                name={prod.title}
                price={prod.price}
                image={prod.image}
              />
            ))}
      </div>
    </>
  );
};

export default HomePage;
