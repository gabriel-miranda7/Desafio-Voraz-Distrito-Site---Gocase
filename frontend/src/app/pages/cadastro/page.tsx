"use client"
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthenticationContext } from '../../contexts/authenticationContext'

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const { signup } = useAuthenticationContext()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  } as FormData);

  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signup(formData.name, formData.email, formData.password);
      // Redirecionar ou mostrar uma mensagem de sucesso
      router.push("/pages/home");
    } catch (error) {
      // Lidar com erros
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#A83050] overflow-hidden">
      <div className="text-[70px] font-semibold w-3/5 p-12">
        <h1>You´re</h1>
        <h1>about</h1>
        <h1>to</h1>
        <h1>become</h1>
        <h1>awesome</h1>
        <h1 className="pt-16 text-[50px]">Congratulations for<br/> prioritizing quality.</h1>
      </div>
      <div className="bg-white w-3/5 flex justify-center items-center">
        <div className="w-4/5 text-black p-8 rounded-lg">
        
          <h1 className="text-3xl font-semibold mb-8 text-center">Sign In</h1>
          
          <form onSubmit={handleSubmit} className="flex flex-col items-center ">
            <input
              type="text"
              placeholder="Name..."
              name="name"
              onChange={handleChange}
              value={formData.name}
              className="bg-[#F5F5F5] w-2/3 p-4 my-3 font-bold rounded-md shadow-lg mb-4 placeholder-[#8F8F8F] focus:shadow-none"
            />
            <input
              type="email"
              placeholder="Email..."
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="bg-[#F5F5F5] w-2/3 p-4 my-3 font-bold rounded-md shadow-lg mb-4 placeholder-[#8F8F8F]"
            />
            <input
              type="password"
              placeholder="Password..."
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="bg-[#F5F5F5] w-2/3 p-4 my-3 font-bold rounded-md shadow-lg mb-8 placeholder-[#8F8F8F]"
            />
             <button className={`${
                formData.email == "" || formData.password == "" || formData.name == ""
                  ? "relative bg-[#7E263D] cursor-pointer text-white py-4 px-24 text-[18px] rounded-md border border-[#7E263D] focus:scale-90 focus:bg-white focus:text-[#7E263D] focus:border-[#7E263D] opacity-50"
                  : "relative bg-[#7E263D] cursor-pointer text-white py-4 px-24 text-[18px] rounded-md border border-[#7E263D] transition-all duration-300 hover:bg-white hover:text-[#7E263D] hover:border-[#7E263D] focus:scale-90 focus:bg-white focus:text-[#7E263D] focus:border-[#7E263D]"
              }`}>Create Account</button>
             <p onClick={() => router.push("/pages/login")} className="text-black mt-8 font-bold cursor-pointer">i have an account</p> 
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
