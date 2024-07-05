"use client";

import { useRouter } from "next/navigation";
import ProductCard from "./components/ProductCard/ProductCard";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        hello world!
        <button onClick={() => router.push("/pages/login")}>click me</button>
        <ProductCard image="/image 10.png" name="bear" price="$ 10.00"/>
      </div>
    </main>
  );
}
