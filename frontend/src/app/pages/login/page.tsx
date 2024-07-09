"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuthenticationContext } from '../../contexts/authenticationContext'

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { login } = useAuthenticationContext()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  } as FormData);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      // Redirecionar ou mostrar uma mensagem de sucesso
      router.push("/pages/home");
    } catch (error) {
      // Lidar com erros
      console.error("Signup failed:", error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#A83050] overflow-hidden">
      <div className="text-[70px] font-semibold md:w-3/5 p-8 md:p-12">
        <h1>Quality.</h1>
        <h1>Presence.</h1>
        <h1>Power.</h1>
        <h1>Influence.</h1>
        <h1>Authority.</h1>
        <h1 className="pt-16 text-[50px]">You're already a BAD BOY</h1>
      </div>
      <div className="bg-white md:w-2/5 min-h-screen flex justify-center items-center">
        <div className="w-4/5 text-black p-8 rounded-lg">
          <h1 className="text-3xl font-semibold mb-8 text-center">
            Welcome back
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="email"
              placeholder="Email..."
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="bg-[#F5F5F5] w-full p-4 my-3 font-bold rounded-md shadow-lg mb-4 placeholder-[#8F8F8F] focus:shadow-none"
            />
            <input
              type="password"
              placeholder="Password..."
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="bg-[#F5F5F5] w-full p-4 my-3 font-bold rounded-md shadow-lg mb-4 placeholder-[#8F8F8F] focus:shadow-none"
            />
            <button
              disabled={formData.email == "" || formData.password == ""}
              className={`${
                formData.email == "" || formData.password == ""
                  ? "relative bg-[#7E263D] cursor-pointer text-white py-4 px-24 text-[18px] rounded-md border border-[#7E263D] focus:scale-90 focus:bg-white focus:text-[#7E263D] focus:border-[#7E263D] opacity-50"
                  : "relative bg-[#7E263D] cursor-pointer text-white py-4 px-24 text-[18px] rounded-md border border-[#7E263D] transition-all duration-300 hover:bg-white hover:text-[#7E263D] hover:border-[#7E263D] focus:scale-90 focus:bg-white focus:text-[#7E263D] focus:border-[#7E263D]"
              }`}
            >
              Login
            </button>
            <p
              onClick={() => router.push("/pages/cadastro")}
              className="text-black mt-8 font-bold cursor-pointer"
            >
              I don't have an account
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
