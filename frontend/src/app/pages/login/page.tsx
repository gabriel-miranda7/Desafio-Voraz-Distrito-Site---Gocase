"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [formData, setFormData] = useState({
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

  return (
    <div className="flex min-h-screen bg-[#630330]">
          <form className="flex flex-col items-center justify-center gap-8 w-1/2 ml-10">
                <h1 className="text-3xl text-white">WELCOME</h1>
                <input
                  className="p-2 rounded-full w-7/12"
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
                <div className="flex flex-col w-7/12 gap-1">
                    <input
                      className="p-2 rounded-full"
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      value={formData.password}
                      required
                    />
                    <a className="ml-auto text-white" href="/pages/register">Register now</a>
                </div>
                <button
                  className={`${
                    formData.email == "" || formData.password == ""
                      ? "p-2 bg-[#50C878] text-white rounded-full w-7/12 opacity-50"
                      : "p-2 bg-[#50C878] text-white rounded-full w-7/12"
                  }`}
                  type="submit"
                  disabled={formData.email == "" || formData.password == ""}
                >
                  Log in
                </button>
          </form>
      <div className="w-1/2 flex items-center justify-center">
        <Image
          className="rounded-3xl"
          src={"/image 10.svg"}
          width={500}
          height={300}
          alt="Login image"
        />
      </div>
    </div>
  );
};

export default Login;
