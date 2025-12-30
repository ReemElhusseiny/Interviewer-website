"use client"

import React, {useState, useEffect, useRef} from 'react'
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
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, UserRound, Mail, LockKeyhole  } from 'lucide-react';
import toast from "react-hot-toast";
import { Switch } from '@/components/ui/switch';

const MotionCard = motion(Card);

export default function Register() {
  const { isLoaded, signUp, setActive: setActiveSignUp  } = useSignUp()
  // const {isLoaded, signIn, setActive: setActiveSignIn } = useSignIn()
  const router = useRouter();
  const [signUpData, setSignUpData] = React.useState({
    username: '',
    emailAddress: '',
    password: '',
  });
  const [errorsData, setErrorsData] = React.useState({
    username: '',
    emailAddress: '',
    password: '',
  });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isInterviewee, setIsInterviewee] = useState(false);
  // const containerRef = useRef<HTMLDivElement>(null);

 
  const handleSignUpFields = (e: React.ChangeEvent<HTMLInputElement>) => {
   setSignUpData({
      ...signUpData, [e.target.name]: e.target.value
    })
  }
  const handleSubmitSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      if (!signUp) return;
      setIsSubmitting(true);
    await signUp.create({
      username: signUpData.username,
      emailAddress: signUpData.emailAddress,
      password: signUpData.password,
      unsafeMetadata: {
       role: isInterviewee ? "interviewee" : "candidate",
      },
    });
    await signUp.prepareEmailAddressVerification({
      strategy: 'email_code'
    })
       toast.success("Registration Successful! Please verify your email.");
       router.push("/verify")
      //  setVerify(true)
    }
     catch (err: any) {
      const clerkErrors = err?.errors;
      const newErrors = {
        username: '',
        emailAddress: '',
        password: '',
        role: '',
      }
      clerkErrors.forEach((error: any) => {
        const field = error.meta?.paramName
         if (field === "email_address") {
          newErrors.emailAddress = error.message;
        }

        if (field === "password") {
          console.log("password", error.message);
          newErrors.password = error.message;
        }

        if (field === "username") {
          newErrors.username = error.message;
        }
       }
      )
      if(!err?.meta?.paramName){
        toast.success( `${err.message}, go to login page` || "Something went wrong. Please try again.");
      }
      setErrorsData(newErrors);
    } finally {
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
              Register Form
            </h1>
            <div className="w-[100%]">
         <Label htmlFor="username" className="flex gap-2 items-center mb-1 text-[14px]"><UserRound size={18} /> Username</Label>
         <Input type="text" name="username" placeholder="userName" className="w-[100%] h-[40px]" onChange={handleSignUpFields}/>
     {errorsData.username && <p className="mt-1 text-red-500 text-sm">{errorsData.username}</p>}
     </div>
     <div className="w-[100%]">
         <Label htmlFor="identifier" className="flex gap-2 items-center mb-1 text-[14px] "><Mail size={18}/>Email Address</Label>
         <Input type="email" name="emailAddress" placeholder="Email" className="w-[100%] h-[40px]" onChange={handleSignUpFields}/>
     {errorsData.emailAddress && <p className="mt-1 text-red-500 text-sm">{errorsData.emailAddress}</p>}
     </div>
       <div className="w-[100%]">
   <Label htmlFor="password" className="flex gap-2 items-center mb-1 text-[14px] "><LockKeyhole size={18} />Password</Label>
   <Input type="password" name="password" placeholder="Password" className="w-[100%] h-[40px]" onChange={handleSignUpFields}/>
     {errorsData.password && <p className="mt-1 text-red-500 text-sm">{errorsData.password}</p>}
   </div>
       <div className="w-[100%]">
   <Label htmlFor="role" className="flex gap-2 items-center mb-1 text-[14px] ">Is you interviewer?</Label>
     <Switch
                     checked={isInterviewee}
                     onCheckedChange={(checked) => setIsInterviewee(checked)}
                   />
   </div>
   </div>
   {isSubmitting ? (
      <div className="mt-10 bg-theme flex justify-center items-center w-[50px] h-[50px] rounded-xl hover:bg-[#ff6973]">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
              </div>
   ): (
 <button onClick={handleSubmitSignup} className="mt-10 bg-theme flex justify-center items-center w-[50px] h-[50px] rounded-xl hover:bg-[#ff6973]">
       <ArrowRight style={{ fontSize: '30px'}} className="text-white" />
     </button>
   )}
   
     <p className="mt-4 text-sm font-bold text-gray-500">Do you have an account ? <a href="/login" className="text-theme"> sign in </a></p>
            {/* Auth UI Container */}
            {/* <div ref={containerRef} className="w-full" /> */}
          </MotionCard>
        </motion.div>
      </div>
      
    </div>
//     <div  className="w-full h-[calc(100vh-4.2rem)] flex overflow-x-hidden justify-center items-center bg-gradient-to-l from-[#00c8b945] to-white">
//  <div id="clerk-captcha" />
// <Card className="flex h-[80%] w-[80%] bg-transparent">
//     <div className="p-[80px] h-[100%] w-[50%] animate-slideLeft bg-white">
//     <CardTitle className="mb-[40px] text-4xl font-extrabold tracking-wider text-[#00c9b9]">Sign Up</CardTitle>
//  <div className="mb-[40px] flex items-center space-x-5 mt-2">
//         <div className="h-[2px] w-[30px] bg-[#eb4e57]" /> 
//         <p className="text-base font-extrabold text-[#eb4e57]">Sign up with</p>
//     </div>   
//   {/* <div className="mb-[40px] flex flex-row items-center mt-4 gap-[20px]">
//   <div className="p-[20px] w-auto border border-[#b6bec3]-700 rounded-lg flex justify-center items-center content-center gap-[15px] py-2 cursor-pointer hover:bg-[#f7f7f9]">
//  <FcGoogle className="text-[20px]" />
//  <p  className="mt-1 text-gray-600 font-medium">Sign up with Google </p>
//  </div>
//  <div className="p-[20px] w-auto border border-[#b6bec3]-700 rounded-lg flex justify-center items-center content-center gap-[15px] py-2 cursor-pointer hover:bg-[#f7f7f9]">
//  <FaGithub className="text-[20px]" />
//   <p className="mt-1 text-gray-600 font-medium">Sign up with Github </p>
//  </div>
//  </div> */}
//  <div className="w-[100%] flex gap-4">
//     <div className="w-[40%]">
//         <Label htmlFor="username" className="mb-2">userName</Label>
//         <Input type="text" name="username" placeholder="userName" className="mb-4 w-[100%] h-[40px]" onChange={handleSignUpFields}/>
//     </div>
//     <div className="w-[40%]">
//         <Label htmlFor="identifier" className="mb-2">Email Address</Label>
//         <Input type="email" name="emailAddress" placeholder="Email" className="mb-4 w-[100%] h-[40px]" onChange={handleSignUpFields}/>
//     </div>
//   </div>
//     <div className="">
//     <Label htmlFor="password" className="mb-2">Password</Label>
//     <Input type="password" name="password" placeholder="Password" className="mb-4 w-[40%] h-[40px]" onChange={handleSignUpFields}/>
//     </div>
//     <button onClick={handleSubmitSignup} className="mb-[40px] bg-[#eb4e57] flex justify-center items-center w-[50px] h-[50px] rounded-xl mt-4 hover:bg-[#ff6973]">
//       <ArrowRight style={{ fontSize: '30px'}} className="text-white" />
//     </button>
//     <p className="text-sm font-bold text-gray-500">Do you have an account ? <a href="/login" className="text-[#eb4e57]"> sign in </a></p>
// </div>
// <div className="p-[80px] h-[100%] w-[50%] flex justify-center align-center animate-slideRight bg-white">
// <img src="job.jpg" />
// </div>
// </Card>

//     </div>
  )
}
