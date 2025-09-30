"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { config } from "../../config";
import axios from "axios";

export default function ProfilePage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = async () => {
    if (username.trim() === "") {
      Swal.fire("Error", "Username is required", "error");
      return;
    }

    if (password == "") {
      Swal.fire("Error", "password fields are required", "error");
      return;
    }
    if (confirmPassword == "") {
      Swal.fire("Error", "Confirm password fields are required", "error");
      return;
    }

    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        Swal.fire("Error", "Passwords do not match", "error");
        return;
      }
    }

    try {
      const payload = {
        username: username,
        password: password,
      };

      const headers = {
        Authorization: `Bearer ${localStorage.getItem(config.tokenKey)}`,
      };

      const response = await axios.put(
        `${config.apiUrl}/api/user/update`,
        payload,
        { headers: headers }
      );

      if (response.data.message == "success") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message || "Profile updated successfully",
        });
      } else {
        Swal.fire(
          "Error",
          response.data.message || "An error occurred",
          "error"
        );
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "An error occurred",
      });
    }
  };

  return (
    <div className="text-white card">
      <h1>Profile</h1>
      <div className="mt-4">
        <div>Username</div>
        <input
          type="text"
          placeholder="Enter your username"
          className="form-control text-black"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <div className="mt-4">Password [ไม่ต้องการเปลื่ยน ให้ปล่อยว่าง]</div>
        <input
          type="password"
          placeholder="Enter your password"
          className="form-control text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mt-4">
        ยืนยัน Password [ไม่ต้องการเปลื่ยน ให้ปล่อยว่าง]
      </div>
      <input
        type="password"
        placeholder="Enter your password"
        className="form-control text-black"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSave} className="btn btn-primary">
        <i className="fa fa-save mr-3"></i>
        Save
      </button>
    </div>
  );
}
