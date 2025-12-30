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
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, UserRound, Mail, LockKeyhole, ShieldCheck } from 'lucide-react';
import { error } from 'console';
import toast from "react-hot-toast";

const MotionCard = motion(Card);

export default function Verify() {
  const { signUp, setActive: setActiveSignUp  } = useSignUp()
  const [code, setCode] = useState('')
  const [codeError, setCodeError] = useState('')
   const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();


const handleVerficationCode = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    if (!signUp) return;
    setIsSubmitting(true);
    const signUpAttempt = await signUp.attemptEmailAddressVerification({
      code,
    })
    
    if (signUpAttempt.status === "complete") {
      // router.push("/")
      // setLoginPage(true)
      await setActiveSignUp ({ session: signUpAttempt.createdSessionId });
      console.log("User signed in successfully");
      toast.success("Email verified successfully!");
      router.push("/")
    
    } else{
      console.log(signUpAttempt);
    }
  }
     catch (err: any) {
    setCodeError( err?.errors?.[0]?.message || "Error verifying code");
} finally {
    setIsSubmitting(false);
  }
}
  return (
//     <div  className="w-full h-[calc(100vh-4.2rem)] flex overflow-x-hidden justify-center items-center bg-gradient-to-l from-[#00c8b945] to-white">
// <Card className="flex h-[80%] w-[80%] bg-transparent">
//     <div className="p-[80px] h-[100%] w-[50%] animate-slideLeft bg-white">
//     <CardTitle className="mb-[40px] text-4xl font-extrabold tracking-wider text-[#00c9b9]">Verification</CardTitle>
//  <div className="mb-[40px] flex items-center space-x-5 mt-2">
//         <div className="h-[2px] w-[30px] bg-[#eb4e57]" /> 
//         <p className="text-base font-extrabold text-[#eb4e57]">Enter Code</p>
//     </div>   
//   <div className="mb-[40px] flex flex-row items-center mt-4 gap-[20px]">
//  </div>
//   <Label htmlFor="code" className="mb-2">Code</Label>
//   <Input type="text" placeholder="code" name="code" className="mb-4 w-[55%] h-[40px]" onChange={(e)=> setCode(e.target.value)}/>
//     <button onClick={handleVerficationCode} className="mb-[40px] bg-[#eb4e57] flex justify-center items-center w-[50px] h-[50px] rounded-xl mt-4 hover:bg-[#ff6973]">
//       <ArrowRight style={{ fontSize: '30px'}} className="text-white" />
//     </button>
// </div>
// <div className="p-[80px] h-[100%] w-[50%] flex justify-center align-center animate-slideRight bg-white">
// <img src="job.jpg" />
// </div>
// </Card>

//     </div>
   <div className="h-[calc(100vh-4.2rem)] transition-colors duration-300 flex flex-col relative overflow-hidden">
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-theme text-white shadow-lg shadow-indigo-500/30 mb-6">
              <Sparkles size={32} />
            </div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
              Interviewer Platform
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Secure access to your meetings and recordings
            </p>
          </div>

          {/* Glass Card Container for Auth UI */}
          <MotionCard className="bg-[var(--background-Thirdly)] backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-2xl p-2 md:p-6 overflow-hidden relative">
            <div className="flex items-center flex-col gap-4">
             <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
              Verify Code
            </h1>
            <div className="w-[100%]">
         <Label htmlFor="code" className="flex gap-2 items-center mb-1 text-[14px] text-gray-700"><ShieldCheck size={18} />Enter Code</Label>
         <Input type="text" name="code" placeholder="Enter Code" className="w-[100%] h-[40px]" onChange={(e)=> setCode(e.target.value)}/>
     {codeError && <p className="mt-1 text-red-500 text-sm">{codeError}</p>}
     </div>
   </div>
   {isSubmitting ? (
      <div className="mt-10 bg-theme flex justify-center items-center w-[50px] h-[50px] rounded-xl hover:bg-[#ff6973]">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
              </div>
   ): (
 <button onClick={handleVerficationCode} className="mt-10 bg-theme flex justify-center items-center w-[50px] h-[50px] rounded-xl hover:bg-[#ff6973]">
       <ArrowRight style={{ fontSize: '30px'}} className="text-white" />
     </button>
   )}
   
          </MotionCard>
        </motion.div>
      </div>
      
    </div>

  )
}
