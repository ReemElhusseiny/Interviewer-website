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
  const [loginPage, setLoginPage] = useState(false)
  const router = useRouter();
  const [signUpData, setSignUpData] = React.useState({
    username: '',
    emailAddress: '',
    password: ''
  });
  const [loginData, setLoginData] = React.useState({
    identifier: '',
    password: ''
  });

  const handleSignUpFields = (e: React.ChangeEvent<HTMLInputElement>) => {
   setSignUpData({
      ...signUpData, [e.target.name]: e.target.value
    })
  }
    const handleLoginFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData, [e.target.name]: e.target.value
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
       setVerify(true)
    } catch (error) {
      console.log("Error during sign up:", error);
    }
  }
  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      if (!signIn) return;
     const signInAttempt = await signIn.create({
         identifier: loginData.identifier,
         password: loginData.password,
      })
          if (signInAttempt.status === "complete") {

      await setActiveSignIn({ session: signInAttempt.createdSessionId });
      console.log("User signed in successfully");
      router.push("/")
    } else{
      console.log(signInAttempt);
    }
    } catch (error) {
      console.log("Error during sign up:", error);
    }
  }
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
 const handlePage = () => {
    // 2. Use router.push() to navigate to the /register page
    router.push("/register"); 
    
    // 3. Do NOT return <Register /> here, as it won't render the page.
  };
  if(!isLoaded) return;
  // bg-[#eaedf6]
  // #2dac5c77
  // bg-gradient-to-l from-[#2dac5c61] to-white to-[60%]
  return (
    <div  className="w-full h-[calc(100vh-4.2rem)] flex overflow-x-hidden justify-center items-center bg-gradient-to-l from-[#00c8b945] to-white">
<Card className="flex h-[80%] w-[80%] bg-transparent">
    <div className="p-[80px] h-[100%] w-[50%] animate-slideLeft bg-white">
    <CardTitle className="mb-[40px] text-4xl font-extrabold tracking-wider text-[#00c9b9]">Sign In</CardTitle>
 <div className="mb-[40px] flex items-center space-x-5 mt-2">
        <div className="h-[2px] w-[30px] bg-[#eb4e57]" /> 
        <p className="text-base font-extrabold text-[#eb4e57]">Sign in with</p>
    </div>   
  <div className="mb-[40px] flex flex-row items-center mt-4 gap-[20px]">
  <div onClick={() => signInWith('oauth_google')} className="p-[20px] w-auto border border-[#b6bec3]-700 rounded-lg flex justify-center items-center content-center gap-[15px] py-2 cursor-pointer hover:bg-[#f7f7f9]">
 <FcGoogle className="text-[20px]" />
 <p  className="mt-1 text-gray-600 font-medium">Sign in with Google </p>
 </div>
 <div className="p-[20px] w-auto border border-[#b6bec3]-700 rounded-lg flex justify-center items-center content-center gap-[15px] py-2 cursor-pointer hover:bg-[#f7f7f9]">
 <FaGithub className="text-[20px]" />
  <p className="mt-1 text-gray-600 font-medium">Sign in with Github </p>
 </div>
 </div>
   <div className="">
    <Label htmlFor="identifier" className="mb-2">Email Address</Label>
    <Input type="email" name="identifier" placeholder="Email" className="mb-4 w-[55%] h-[40px]" onChange={handleLoginFields}/>
    </div>
    <div className="">
    <Label htmlFor="password" className="mb-2">Password</Label>
    <Input type="password" name="password" placeholder="Password" className="mb-4 w-[55%] h-[40px]" onChange={handleLoginFields}/>
    </div>
    <button onClick={handleSubmitLogin} className="mb-[40px] bg-[#eb4e57] flex justify-center items-center w-[50px] h-[50px] rounded-xl mt-4 hover:bg-[#ff6973]">
      <ArrowRight style={{ fontSize: '30px'}} className="text-white" />
    </button>
    <p className="text-sm font-bold text-gray-500">Don't have an account ? <a href="/register" className="text-[#eb4e57]"> sign up </a></p>
</div>
<div className="p-[80px] h-[100%] w-[50%] flex justify-center align-center animate-slideRight bg-white">
<img src="job.jpg" />
</div>
</Card>
 <div id="clerk-captcha" />
    </div>
//     <div style={{width: '100%', height: "100vh"}}>
//     <div className="h-[calc(100vh-5rem)]" style={{ padding: '0px', margin:'0px', position: 'relative', background: 'red', width: '100%'}}>
//       <img src="interview-bg.jpg" alt="interview" style={{ position: 'absolute', objectFit: 'cover', width: '100%', height: '100%'}}/>
//       <div style={{ position: 'absolute', width: '100%', height: '100%', background: '#7a8aa87c'}} />
// <div style={{width: '100%', position: 'absolute', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//   <Card className="h-[85%] w-[450px] animate-growHeight">
//       <CardHeader className="space-y-2">
//         <div className="flex items-center justify-center">

//           <Badge
//             variant="default"
//             className="p-3 rounded-full"
              
//           >
//            <Video />
//           </Badge>
//         </div>

//         <CardTitle className="flex items-center justify-center">Interview Platform</CardTitle>

      
//           <CardDescription className="line-clamp-2 flex items-center justify-center">Sign in to your account</CardDescription>
//       </CardHeader>

//       <CardContent className="mt-[20px]">
     
//         {verify ? (
//           <>
//             <div className="opacity-0 animate-fadeSlideUp [animation-delay:0.6s]">
//         <Label htmlFor="code" className="mb-2">Code</Label>
//         <Input type="text" placeholder="code" name="code" className="mb-4 w-full" onChange={(e)=> setCode(e.target.value)}/>
//         </div>
//           <Button onClick={handleVerficationCode} className="opacity-0 w-full mt-4 animate-fadeSlideUp [animation-delay:0.9s]">
//            Verify <ArrowRight />
//           </Button>
//           </>
//         ): (
//           <>
//   <div className="opacity-0 animate-fadeSlideUp [animation-delay:0.3s] ">
//         <Label htmlFor="username" className="mb-2">userName</Label>
//         <Input type="text" name="username" placeholder="userName" className="mb-4 w-full" onChange={handleSignUpFields}/>
//         </div>
//   <div className="opacity-0 animate-fadeSlideUp [animation-delay:0.3s] ">
//         <Label htmlFor="email" className="mb-2">Email Address</Label>
//         <Input type="email" name="emailAddress" placeholder="Email" className="mb-4 w-full" onChange={handleSignUpFields}/>
//         </div>
//         <div className="opacity-0 animate-fadeSlideUp [animation-delay:0.6s]">
//         <Label htmlFor="password" className="mb-2">Password</Label>
//         <Input type="password" name="password" placeholder="Password" className="mb-4 w-full" onChange={handleSignUpFields}/>
//         </div>
//           <Button onClick={handleSubmitSignup} className="opacity-0 w-full mt-4 animate-fadeSlideUp [animation-delay:0.9s]">
//             Sign in <ArrowRight />
//           </Button>
//           </>
//         )}
//            {loginPage && (
//              <>
//   <div className="opacity-0 animate-fadeSlideUp [animation-delay:0.3s] ">
//         <Label htmlFor="identifier" className="mb-2">Email Address</Label>
//         <Input type="email" name="identifier" placeholder="Email" className="mb-4 w-full" onChange={handleLoginFields}/>
//         </div>
//         <div className="opacity-0 animate-fadeSlideUp [animation-delay:0.6s]">
//         <Label htmlFor="password" className="mb-2">Password</Label>
//         <Input type="password" name="password" placeholder="Password" className="mb-4 w-full" onChange={handleLoginFields}/>
//         </div>
//           <Button onClick={handleSubmitLogin} className="opacity-0 w-full mt-4 animate-fadeSlideUp [animation-delay:0.9s]">
//            Login <ArrowRight />
//           </Button>
//           </>
//         )}
      
        

// <div className="opacity-0 w-full flex flex-row justify-center items-center mt-4 animate-fadeSlideUp [animation-delay:0.12s]">
// <div className="w-[35%] h-[1px] border border-[#b6bec3]-700" />
// <div className="w-[30%] bg-[var(--background-seconary)] text-center py-2">or continue with</div>
// <div className="w-[35%] h-[1px] border border-[#b6bec3]-700" />
// </div>

// <div className="opacity-0 w-full flex flex-row justify-center items-center mt-4 gap-4 animate-fadeSlideUp [animation-delay:0.15s]">
// <div className="w-[45%] border border-[#b6bec3]-700 rounded-lg flex justify-center items-center py-2 cursor-pointer hover:bg-[#f7f7f9]">
// <FaGithub className="text-[20px]" />
// </div>
// <div onClick={() => signInWith('oauth_google')} className="text-[20px] w-[45%] border border-[#b6bec3]-700 rounded-lg flex justify-center items-center py-2 cursor-pointer hover:bg-[#f7f7f9]">
// <FcGoogle />
// </div>
// {/* <GoogleBtn /> */}
// </div>
//       </CardContent>
//     </Card>
//     </div>
//     </div>
//     <p onClick={()=> setLoginPage(true)}>Login page</p>
//     {/* {verify ? (
//       <>
//         <div className="opacity-0 animate-fadeSlideUp [animation-delay:0.6s]">
//         <Label htmlFor="code" className="mb-2">Code</Label>
//         <Input type="text" placeholder="code" className="mb-4 w-full" onChange={(e)=> setCode(e.target.value)}/>
//         </div>
//           <Button onClick={handleVerficationCode} className="opacity-0 w-full mt-4 animate-fadeSlideUp [animation-delay:0.9s]">
//            Verify <ArrowRight />
//           </Button>
//           </>
//     ) : (
//     // here signUp form will be shown
//     )} */}
//           {/* <SignedOut>
//               <SignInButton />
//               <SignUpButton>
//                 <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
//                   Sign Up
//                 </button>
//               </SignUpButton>
//             </SignedOut>
//              <SignedIn>
//               <UserButton />
//             </SignedIn> */}
//     </div>

  )
}
