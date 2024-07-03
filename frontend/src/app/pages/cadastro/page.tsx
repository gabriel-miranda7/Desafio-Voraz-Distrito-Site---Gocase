"use client"
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  } as FormData);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    /* Lidar aqui com a requisição ao Back-End */
  }

  return (
    <div className="flex min-h-screen bg-[#A83050] overflow-hidden">
      <div className="text-[70px] font-semibold w-3/5 p-12">
        <h1>You´re</h1>
        <h1>About</h1>
        <h1>to</h1>
        <h1>Become</h1>
        <h1>Awesome</h1>
        <h1 className="pt-16 text-[50px]">Congratulations for prioritizing quality.</h1>
      </div>

      <div className="bg-white w-2/5 flex justify-center items-center">
        <div className="w-4/5 text-black p-8 rounded-lg">
        
          <h1 className="text-3xl font-semibold mb-8 text-center">Sign In</h1>
          
          <form onSubmit={handleSubmit} className="flex flex-col items-center ">
            <input
              type="text"
              placeholder="Name..."
              name="name"
              onChange={handleChange}
              value={formData.name}
              className="bg-[#F5F5F5] w-full p-4 font-bold rounded-md shadow-lg mb-4 placeholder-[#8F8F8F] focus:shadow-none"
            />
            <input
              type="email"
              placeholder="Email..."
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="bg-[#F5F5F5] w-full p-4 font-bold rounded-md shadow-lg mb-4 placeholder-[#8F8F8F]"
            />
            <input
              type="password"
              placeholder="Password..."
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="bg-[#F5F5F5] w-full p-4 font-bold rounded-md shadow-lg mb-8 placeholder-[#8F8F8F]"
            />
             <button className="relative bg-[#7E263D] text-white py-4 px-12 text-[18px] rounded-md border border-[#7E263D] transition-all duration-300 hover:bg-white hover:text-[#7E263D] hover:border-[#7E263D] focus:scale-90 focus:bg-white focus:text-[#7E263D] focus:border-[#7E263D]">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
