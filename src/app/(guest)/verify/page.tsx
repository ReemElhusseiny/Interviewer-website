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
import Register from '@/app/(guest)/register/page'

export default function Verify() {
  const { signUp, setActive: setActiveSignUp  } = useSignUp()
  const [code, setCode] = useState('')
  const router = useRouter();


const handleVerficationCode = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    if (!signUp) return;
    const signUpAttempt = await signUp.attemptEmailAddressVerification({
      code,
    })
    
    if (signUpAttempt.status === "complete") {
      // router.push("/")
      // setLoginPage(true)
      await setActiveSignUp ({ session: signUpAttempt.createdSessionId });
      console.log("User signed in successfully");
       router.push("/")
    
    } else{
      console.log(signUpAttempt);
    }
  }
     catch (error) {
    console.log("Error during code verification:", error);
}
  }
  return (
    <div  className="w-full h-[calc(100vh-4.2rem)] flex overflow-x-hidden justify-center items-center bg-gradient-to-l from-[#00c8b945] to-white">
<Card className="flex h-[80%] w-[80%] bg-transparent">
    <div className="p-[80px] h-[100%] w-[50%] animate-slideLeft bg-white">
    <CardTitle className="mb-[40px] text-4xl font-extrabold tracking-wider text-[#00c9b9]">Verification</CardTitle>
 <div className="mb-[40px] flex items-center space-x-5 mt-2">
        <div className="h-[2px] w-[30px] bg-[#eb4e57]" /> 
        <p className="text-base font-extrabold text-[#eb4e57]">Enter Code</p>
    </div>   
  <div className="mb-[40px] flex flex-row items-center mt-4 gap-[20px]">
 </div>
  <Label htmlFor="code" className="mb-2">Code</Label>
  <Input type="text" placeholder="code" name="code" className="mb-4 w-[55%] h-[40px]" onChange={(e)=> setCode(e.target.value)}/>
    <button onClick={handleVerficationCode} className="mb-[40px] bg-[#eb4e57] flex justify-center items-center w-[50px] h-[50px] rounded-xl mt-4 hover:bg-[#ff6973]">
      <ArrowRight style={{ fontSize: '30px'}} className="text-white" />
    </button>
</div>
<div className="p-[80px] h-[100%] w-[50%] flex justify-center align-center animate-slideRight bg-white">
<img src="job.jpg" />
</div>
</Card>

    </div>

  )
}
