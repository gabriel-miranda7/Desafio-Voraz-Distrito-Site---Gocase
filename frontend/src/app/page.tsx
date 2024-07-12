"use client";
import NavBar from "@/app/components/navbar";
import React, { useEffect, useState } from "react";
import banner1 from "./assets/banner_1.png";
import banner1Mobile from "./assets/banner_1_mobile.png";
import Image from "next/image";
import ProductCard from "./components/ProductCard/ProductCard";
import badboys from './assets/bad_boys 1.png'

import productsService, { Product } from "./services/productsService";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const router = useRouter();

  useEffect(() => {
    productsService.seeOrCreateCookie();
  }, []);

  useEffect(() => {
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
            .slice(0, 8)
            .map((prod) => (
              <ProductCard
                onClick={() => {
                  productsService.updateCookie(prod);
                  router.push(`/pages/product/${prod.id}`)}}
                key={prod.id}
                name={prod.title}
                price={prod.price}
                image={prod.image}
              />
            ))}
      </div>
      <div className="flex justify-between w-4/5 m-20">
            <Image className="w-[350px]" src={badboys}/>
            <div className="mx-10 text-[20px]">
            <p className="text-black">We´re the Bad Boys. No.1 reference in quality and branding At Bad Boys, we pride ourselves on setting the standard in the industry. Our commitment to excellence is reflected in every product we create. From innovative designs to top-notch materials, we ensure that our offerings not only meet but exceed customer expectations.<br/>When you choose Bad Boys, you’re not just selecting a product; you’re becoming part of a movement that values authenticity and quality. Explore our collections today and discover why we are the go-to brand for those who demand the best.</p>
            <button className="bg-[#A83050] my-5 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-300 ease-in-out">See more</button>
            </div>
      </div>
    </>
  );
};

export default HomePage;
