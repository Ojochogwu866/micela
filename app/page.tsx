'use client'

import { LoginForm } from './login/form'
import Link from "next/link"
import NorthEastIcon from "@mui/icons-material/NorthEast"

export default function RegisterPage(){
    return (
        <div className=" h-[120vh] w-screen py-10 flex justify-center items-center bg-[#e6e8f4] md:px-[100px] px-[20px] font-raleway">
            <div className=" bg-slate-100 shadow-xl-200 w-full md:w-1/2 h-[70%] p-8
            flex justify-center items-start flex-col  my-auto rounded-xl">
                 <div className=" w-full flex justify-end items-center">
                    <Link className="text-sm gap-4 flex justify-between px-1 items-center border-b-[1.5px] pb-1 border-[#670b78]" href={'/register'}>
                        Create Account
                        <NorthEastIcon fontSize="small"/>
                    </Link>
                </div>
                <h1 className="font-semibold text-2xl py-4">Log In</h1>
                <LoginForm/>
            </div>
        </div>
    )
}