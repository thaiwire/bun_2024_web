"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { config } from "../config";

export function TopNav() {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const router = useRouter();

  useEffect(() => {
    setName(localStorage.getItem("bun_service_name") || "");
    setLevel(localStorage.getItem("bun_service_level") || "");
  }, []);

  const handleLogout = async () => {
    const button = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of the system.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    });
    if (!button.isConfirmed) {
      return;
    }

    localStorage.removeItem("bun_service_name");
    localStorage.removeItem("bun_service_level");
    localStorage.removeItem("auth_token");
    router.push("/"); // Redirect to login page
  };

  const handleProfile = () => {
    router.push("/backoffice/profile");
  };

  return (
    <nav className="bg-gray-800 shadow-sm">
      <div className="mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0 font-bold">
            <h1 className=" text-xl font-bold text-white">Bun Service 2025</h1>
          </div>
          <div className="flex items-center">
            <span className="text-gray-300">{name}</span>
            <span className="text-indigo-300 ml-5 font-bold">( {level} )</span>

            <button
              onClick={handleProfile}
              className="bg-indigo-500 text-white rounded-md px-4 py-2
              hover:bg-indigo-600"
            >
              <i className="fa fa-user-circle mr-2"></i>
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white rounded-md ml-5  px-4 py-2 hover:bg-red-600
           "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
