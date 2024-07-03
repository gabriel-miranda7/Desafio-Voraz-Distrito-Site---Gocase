"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        hello world!
        <button onClick={() => router.push("/pages/login")}>click me</button>
      </div>
    </main>
  );
}
