"use client"

import axios from "axios"
import { log } from "console";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";



export default function ProfilePage() {
    const router = useRouter();
    const [data,setData] = useState("nothing");
    const handleLogout = async()=>{
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout Successfull");
            router.push("/login");
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        console.log(res.data);  
        setData(res.data.data._id)
        
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-3 rounded bg-green-500">{data ==="nothing" ? "nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button 
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-10 m-5 rounded">Logout</button>
            
            <button 
            onClick={getUserDetails}
            className="bg-green-500 hover:bg-blue-500 text-white font-bold py-2 px-10 m-5 rounded">Get Details</button>
        </div>
    )
} 