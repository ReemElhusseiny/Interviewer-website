"use client"

import React, {useState, useEffect} from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Video, ArrowRight, Github } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { GoogleOneTap, SignedIn, SignedOut, SignIn, SignInButton, SignUpButton, useClerk, UserButton, useSignIn, useSignUp, useUser } from '@clerk/nextjs';
import { set } from 'date-fns';
import { useRouter } from 'next/navigation';
import { OAuthStrategy } from '@clerk/types'
import Link from 'next/link';

export default function Register() {
  const { signUp, setActive: setActiveSignUp  } = useSignUp()
  const {isLoaded, signIn, setActive: setActiveSignIn } = useSignIn()
  const { user } = useUser();
  const [code, setCode] = useState('')
  const [verify, setVerify] = useState(false)
  const router = useRouter();
  const [signUpData, setSignUpData] = React.useState({
    username: '',
    emailAddress: '',
    password: ''
  });

  const handleSignUpFields = (e: React.ChangeEvent<HTMLInputElement>) => {
   setSignUpData({
      ...signUpData, [e.target.name]: e.target.value
    })
  }
  const handleSubmitSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      if (!signUp) return;
      await signUp.create({
        username: signUpData.username,
         emailAddress: signUpData.emailAddress,
         password: signUpData.password,
      })
       await signUp.prepareEmailAddressVerification({
        strategy: 'email_code'
       })
       router.push("/verify")
      //  setVerify(true)
    } catch (error) {
      console.log("Error during sign up:", error);
    }
  }
  if(!isLoaded) return;
  return (
    <div  className="w-full h-[calc(100vh-4.2rem)] flex overflow-x-hidden justify-center items-center bg-gradient-to-l from-[#00c8b945] to-white">
 <div id="clerk-captcha" />
<Card className="flex h-[80%] w-[80%] bg-transparent">
    <div className="p-[80px] h-[100%] w-[50%] animate-slideLeft bg-white">
    <CardTitle className="mb-[40px] text-4xl font-extrabold tracking-wider text-[#00c9b9]">Sign Up</CardTitle>
 <div className="mb-[40px] flex items-center space-x-5 mt-2">
        <div className="h-[2px] w-[30px] bg-[#eb4e57]" /> 
        <p className="text-base font-extrabold text-[#eb4e57]">Sign up with</p>
    </div>   
  {/* <div className="mb-[40px] flex flex-row items-center mt-4 gap-[20px]">
  <div className="p-[20px] w-auto border border-[#b6bec3]-700 rounded-lg flex justify-center items-center content-center gap-[15px] py-2 cursor-pointer hover:bg-[#f7f7f9]">
 <FcGoogle className="text-[20px]" />
 <p  className="mt-1 text-gray-600 font-medium">Sign up with Google </p>
 </div>
 <div className="p-[20px] w-auto border border-[#b6bec3]-700 rounded-lg flex justify-center items-center content-center gap-[15px] py-2 cursor-pointer hover:bg-[#f7f7f9]">
 <FaGithub className="text-[20px]" />
  <p className="mt-1 text-gray-600 font-medium">Sign up with Github </p>
 </div>
 </div> */}
 <div className="w-[100%] flex gap-4">
    <div className="w-[40%]">
        <Label htmlFor="username" className="mb-2">userName</Label>
        <Input type="text" name="username" placeholder="userName" className="mb-4 w-[100%] h-[40px]" onChange={handleSignUpFields}/>
    </div>
    <div className="w-[40%]">
        <Label htmlFor="identifier" className="mb-2">Email Address</Label>
        <Input type="email" name="emailAddress" placeholder="Email" className="mb-4 w-[100%] h-[40px]" onChange={handleSignUpFields}/>
    </div>
  </div>
    <div className="">
    <Label htmlFor="password" className="mb-2">Password</Label>
    <Input type="password" name="password" placeholder="Password" className="mb-4 w-[40%] h-[40px]" onChange={handleSignUpFields}/>
    </div>
    <button onClick={handleSubmitSignup} className="mb-[40px] bg-[#eb4e57] flex justify-center items-center w-[50px] h-[50px] rounded-xl mt-4 hover:bg-[#ff6973]">
      <ArrowRight style={{ fontSize: '30px'}} className="text-white" />
    </button>
    <p className="text-sm font-bold text-gray-500">Do you have an account ? <a href="/login" className="text-[#eb4e57]"> sign in </a></p>
</div>
<div className="p-[80px] h-[100%] w-[50%] flex justify-center align-center animate-slideRight bg-white">
<img src="job.jpg" />
</div>
</Card>

    </div>
  )
}
