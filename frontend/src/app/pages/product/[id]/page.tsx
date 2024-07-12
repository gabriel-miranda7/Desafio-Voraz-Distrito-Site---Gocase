"use client";

import NavBar from "@/app/components/navbar";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import productsService, { Product } from "@/app/services/productsService";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const router = useRouter();
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await productsService.getProduct(id);
          setProduct(response);
        } catch (error) {
          throw error;
        }
      };

      const fetchProducts = async () => {
        try {
          const response = await productsService.getProducts();
          const productsArray = Object.keys(response).map((key) => ({
            ...response[key], // Copia os atributos do objeto
          }));
          setProducts(productsArray);
        } catch (error) {
          console.error("Erro ao buscar produtos:", error);
        }
      };

      fetchProduct();
      fetchProducts();
    }
  }, [id]);

  console.log(product);

  if (!product) {
    return <div>No product was found</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-between p-2">
        <Image
          className="border-2 p-8 rounded-3xl ml-20"
          src={product?.image}
          alt=""
          width={526}
          height={128}
        />
        <div className="flex flex-col gap-6 w-3/6 justify-end text-start items-start">
          <h1 className="text-black font-bold text-4xl">{product?.title}</h1>
          <p className="text-black w-2/5 font-bold text-start">{product?.category}</p>
          <p className="text-black w-2/5">{product?.description}</p>
          <p className="text-black font-bold text-3xl">${product?.price}</p>
            <button className="bg-orange-500 w-3/6 p-2 rounded-lg text-black font-bold">
              Add to Cart
            </button>
            <button className="bg-yellow-400 w-3/6 p-2 rounded-lg text-black font-bold">
              Buy Now
            </button>
        </div>
      </div>
      <div className="flex flex-col mt-10 justify-center items-center">
        <div className="flex justify-center mb-10 w-full items-center">
            <div className="border-b-2 w-full"></div>
            <div className="font-bold text-black w-1/5 text-center">See too</div>
            <div className="border-b-2 w-full"></div>
        </div>
        <div className="flex gap-3 justify-evenly mb-3">
          {products &&
            products
              .slice(0, 7)
              .map((prod) => (
                <ProductCard
                  onClick={() => {
                    router.push(`/pages/product/${prod.id}`)
                    productsService.updateCookie(prod)
                  }}
                  key={prod.id}
                  name={prod.title}
                  price={prod.price}
                  image={prod.image}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
