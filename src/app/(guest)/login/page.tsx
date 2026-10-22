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
import { useSignIn, useUser } from '@clerk/nextjs';
// import { GoogleOneTap, SignedIn, SignedOut, SignIn, SignInButton, SignUpButton, useClerk, UserButton, useSignIn, useSignUp, useUser } from '@clerk/nextjs';
import { set } from 'date-fns';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Register from '@/app/(guest)/register/page'
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, UserRound, Mail, LockKeyhole  } from 'lucide-react';
import toast from "react-hot-toast";

const MotionCard = motion(Card);

export default function Login() {
  // const { signUp, setActive: setActiveSignUp  } = useSignUp()
  const {isLoaded, signIn, setActive: setActiveSignIn } = useSignIn()
  const { user } = useUser();
  // useEffect(() => {
  //   if (isLoaded && user) {
  //     console.log("Google user is signed in:", user.emailAddresses[0].emailAddress);
  //   } else{
  //     console.log("No user is signed in");
  //   }
  // }, [isLoaded, user]);
  const router = useRouter();
    const [errorsData, setErrorsData] = React.useState({
      identifier: '',
      password: ''
    });
  
      const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginData, setLoginData] = React.useState({
    identifier: '',
    password: ''
  });
    const handleLoginFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData, [e.target.name]: e.target.value
    })
  }
  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      if (!signIn) return;
      setIsSubmitting(true);
     const signInAttempt = await signIn.create({
         identifier: loginData.identifier,
         password: loginData.password,
      })
          if (signInAttempt.status === "complete") {

      await setActiveSignIn({ session: signInAttempt.createdSessionId });
      toast.success("Login Successful!");
      console.log("User signed in successfully");
      router.push("/")
    } else{
      console.log(signInAttempt);
    }
    } 
      catch (err: any) {
      const clerkErrors = err?.errors;
      const newErrors = {
       identifier: '',
        password: ''
      }
      clerkErrors.forEach((error: any) => {
        const field = error.meta?.paramName
         if (field === "identifier") {
          newErrors.identifier = error.message;
        }

        if (field === "password") {
          console.log("password", error.message);
          newErrors.password = error.message;
        }
       }
      )
      if(!err?.meta?.paramName){
        toast.error( `${err.message}` || "Something went wrong. Please try again.");
      }
      setErrorsData(newErrors);
    }
    finally {
      setIsSubmitting(false);
    }
  }
  if(!isLoaded) return;

  return (
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
                  Login Form
                </h1>
         <div className="w-[100%]">
             <Label htmlFor="identifier" className="flex gap-2 items-center mb-1 text-[14px] "><Mail size={18}/>Email Address</Label>
             <Input type="email" name="identifier" placeholder="Email" className="w-[100%] h-[40px]" onChange={handleLoginFields}/>
         {errorsData.identifier && <p className="mt-1 text-red-500 text-sm">{errorsData.identifier}</p>}
         </div>
           <div className="w-[100%]">
       <Label htmlFor="password" className="flex gap-2 items-center mb-1 text-[14px] "><LockKeyhole size={18} />Password</Label>
       <Input type="password" name="password" placeholder="Password" className="w-[100%] h-[40px]" onChange={handleLoginFields}/>
         {errorsData.password && <p className="mt-1 text-red-500 text-sm">{errorsData.password}</p>}
       </div>
       </div>
       {isSubmitting ? (
          <div className="mt-10 bg-theme flex justify-center items-center w-[50px] h-[50px] rounded-xl hover:bg-[#ff6973]">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
       ): (
     <button onClick={handleSubmitLogin} className="mt-10 bg-theme flex justify-center items-center w-[50px] h-[50px] rounded-xl hover:shadow-[0_0_20px_#48a6e6]">
           <ArrowRight style={{ fontSize: '30px'}} className="text-white" />
         </button>
       )}
       
         <p className="mt-4 text-sm font-bold text-gray-500">Do you have an account ? <a href="/register" className="text-theme"> sign up </a></p>
                {/* Auth UI Container */}
                {/* <div ref={containerRef} className="w-full" /> */}
              </MotionCard>
            </motion.div>
          </div>
          
        </div>


  )
}
