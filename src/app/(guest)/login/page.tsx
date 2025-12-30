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
import { ArrowLeft, Sparkles, UserRound, Mail, LockKeyhole  } from 'lucide-react';
import toast from "react-hot-toast";

const MotionCard = motion(Card);

export default function Login() {
  const { signUp, setActive: setActiveSignUp  } = useSignUp()
  const {isLoaded, signIn, setActive: setActiveSignIn } = useSignIn()
    const { user } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      console.log("Google user is signed in:", user.emailAddresses[0].emailAddress);
    } else{
      console.log("No user is signed in");
    }
  }, [isLoaded, user]);
  const [code, setCode] = useState('')
  const [verify, setVerify] = useState(false)
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
        toast.success( `${err.message}, go to login page` || "Something went wrong. Please try again.");
      }
      setErrorsData(newErrors);
    }
    finally {
      setIsSubmitting(false);
    }
  }

// const handleGoogleSignIn = async () => {
//   try {
//     await signIn?.authenticateWithRedirect({
//      strategy: "oauth_google",
//       // This is the URL Clerk redirects to after a successful sign-in/up attempt.
//       redirectUrlComplete: "/",
//       // This is the URL the user is redirected to *after* the Clerk SSO page. 
//       // It's often set to the same as redirectUrlComplete or a dedicated callback page.
//       redirectUrl: "/sso-callback"
//     });
//     console.log("Google Sign-In initiated");
//   } catch (error) {
//     console.error("Google Sign-In failed:", error);
//   }
// };
const signInWith = (strategy: OAuthStrategy) => {
  if(!signIn) return;
    return signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sign-in/sso-callback',
        redirectUrlComplete: '/', // Learn more about session tasks at https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err: any) => {
        // See https://clerk.com/docs/guides/development/custom-flows/error-handling
        // for more info on error handling
        console.log(err.errors)
        console.error(err, null, 2)
      })
  }
  if(!isLoaded) return;
  // bg-[#eaedf6]
  // #2dac5c77
  // bg-gradient-to-l from-[#2dac5c61] to-white to-[60%]
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
     <button onClick={handleSubmitLogin} className="mt-10 bg-theme flex justify-center items-center w-[50px] h-[50px] rounded-xl hover:bg-[#ff6973]">
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
//     <div  className="w-full h-[calc(100vh-4.2rem)] flex overflow-x-hidden justify-center items-center bg-gradient-to-l from-[#00c8b945] to-white">
// <Card className="flex h-[80%] w-[80%] bg-transparent">
//     <div className="p-[80px] h-[100%] w-[50%] animate-slideLeft bg-white">
//     <CardTitle className="mb-[40px] text-4xl font-extrabold tracking-wider text-[#00c9b9]">Sign In</CardTitle>
//  <div className="mb-[40px] flex items-center space-x-5 mt-2">
//         <div className="h-[2px] w-[30px] bg-[#eb4e57]" /> 
//         <p className="text-base font-extrabold text-[#eb4e57]">Sign in with</p>
//     </div>   
//   <div className="mb-[40px] flex flex-row items-center mt-4 gap-[20px]">
//   <div onClick={() => signInWith('oauth_google')} className="p-[20px] w-auto border border-[#b6bec3]-700 rounded-lg flex justify-center items-center content-center gap-[15px] py-2 cursor-pointer hover:bg-[#f7f7f9]">
//  <FcGoogle className="text-[20px]" />
//  <p  className="mt-1 text-gray-600 font-medium">Sign in with Google </p>
//  </div>
//  <div className="p-[20px] w-auto border border-[#b6bec3]-700 rounded-lg flex justify-center items-center content-center gap-[15px] py-2 cursor-pointer hover:bg-[#f7f7f9]">
//  <FaGithub className="text-[20px]" />
//   <p className="mt-1 text-gray-600 font-medium">Sign in with Github </p>
//  </div>
//  </div>
//    <div className="">
//     <Label htmlFor="identifier" className="mb-2">Email Address</Label>
//     <Input type="email" name="identifier" placeholder="Email" className="mb-4 w-[55%] h-[40px]" onChange={handleLoginFields}/>
//     </div>
//     <div className="">
//     <Label htmlFor="password" className="mb-2">Password</Label>
//     <Input type="password" name="password" placeholder="Password" className="mb-4 w-[55%] h-[40px]" onChange={handleLoginFields}/>
//     </div>
//     <button onClick={handleSubmitLogin} className="mb-[40px] bg-[#eb4e57] flex justify-center items-center w-[50px] h-[50px] rounded-xl mt-4 hover:bg-[#ff6973]">
//       <ArrowRight style={{ fontSize: '30px'}} className="text-white" />
//     </button>
//     <p className="text-sm font-bold text-gray-500">Don't have an account ? <a href="/register" className="text-[#eb4e57]"> sign up </a></p>
// </div>
// <div className="p-[80px] h-[100%] w-[50%] flex justify-center align-center animate-slideRight bg-white">
// <img src="job.jpg" />
// </div>
// </Card>
//  <div id="clerk-captcha" />
//     </div>


  )
}
