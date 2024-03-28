"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSignUp = async () => {
    try {
        setLoading(true);
        const response = await axios.post("/api/users/signup", user);
  
        console.log("SignUp Success : ", response.data);
        router.push("/login");
    } catch (error: any) {


      console.log("SignUp Failed : ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-white text-3xl">
        {loading ? "Processing" : "SignUp"}
      </h1>
      <hr />
      <label htmlFor="username" className="text-xl font-serif text-pretty">
        username
      </label>
      <input
        className="p-2 rounded-md w-1/4 text-black"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) =>
          setUser({
            ...user,
            username: e.target.value,
          })
        }
        placeholder="username"
      />

      <label htmlFor="email" className="text-xl font-serif text-pretty">
        email
      </label>
      <input
        className="p-2 rounded-md w-1/4 text-black"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) =>
          setUser({
            ...user,
            email: e.target.value,
          })
        }
        placeholder="email"
      />

      <label htmlFor="password" className="text-xl font-serif text-pretty">
        password
      </label>
      <input
        className="p-2 rounded-md w-1/4 text-black"
        type="text"
        id="password"
        value={user.password}
        onChange={(e) =>
          setUser({
            ...user,
            password: e.target.value,
          })
        }
        placeholder="password"
      />

      <button
        onClick={onSignUp}
        className="p-2 m-5 rounded-md w-1/4 bg-blue-600"
      >
        {buttonDisabled ? "No SignUp" : "SignUp here"}
      </button>
      <Link href="/login">Visit Login page</Link>
    </div>
  );
}

// 1:34:00
