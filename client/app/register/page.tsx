'use client'
import { RegisterForm } from "./form"
import Link from "next/link"
import NorthEastIcon from '@mui/icons-material/NorthEast';

export default function RegisterPage(){
    return (
        <div className=" h-[120vh] w-screen py-10 flex justify-start items-center bg-[#e6e8f4] px-[20px] md:px-[100px] font-raleway">
            <div className=" bg-slate-100 shadow-xl-200 md:w-1/2 w-full h-full p-8
            flex justify-center items-start flex-col  my-auto rounded-xl">
                <div className=" w-full flex justify-end items-end">
                    <Link className=" text-sm gap-4 border-b-[1.5px] pb-1 px-1 border-[#670b78]" href={'/login'}>
                        Login
                    <NorthEastIcon fontSize="small"/>
                    </Link>
                </div>
                <h1 className="font-semibold text-2xl ">Get An Account With Us</h1>
                <p className=" text-xs font-semibold text-gray-400 pt-2 pb-10">Create an account with us in 2 minutes</p>
                <RegisterForm/>
            </div>
        </div>
    )
}