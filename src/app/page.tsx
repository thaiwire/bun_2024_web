"use client";
import Swal from "sweetalert2";
import { config } from "./config";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: "Please enter both username and password.",
        });
        return;
      }
      const payload = { username, password };

      const response = await axios.post(
        `${config.apiUrl}/user/signin`,
        payload
      );

      if (response.data.token !== undefined) {
        localStorage.setItem(config.tokenKey, response.data.token);
        router.push("/backoffice/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: response.data.message || "Invalid username or password.",
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.response?.data?.message || "An error occurred during login.",
      });
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen 
    bg-gradient-to-br from-gray-800 to-gray-950"
    >
      <div className="text-gray-400 text-4xl font-bold mb-10">
        ระบบ BunService 2025
      </div>
      <div
        className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full
      max-w-md"
      >
        <h1 className="text-2xl font-bold mb-2 text-white">เข้าสู่ระบบ</h1>
        <form className="flex flex-col gap-2 mt-4 w-72" onSubmit={handleLogin}>
          <div className="text-white">
            <i className="fa fa-user mr-2"></i>
            Username
          </div>
          <input
            type="text"
            className="form-control mt-5 text-xl"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="text-white mt-5">
            <i className="fa fa-lock mr-2"></i>
            Password
          </div>
          <input
            type="password"
            className="form-control mt-4 text-xl"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white
            font-bold py-2 px-4 rounded mt-5 text-xl"
          >
            <i className="fa fa-sign-in-alt mr-2"></i>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
