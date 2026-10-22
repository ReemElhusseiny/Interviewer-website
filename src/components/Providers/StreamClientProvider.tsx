"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import LoaderUI from "../LoaderUI";
import { streamTokenProvider } from "@/actions/stream.actions";
import Login from "@/app/(guest)/login/page";
import { useRouter, usePathname } from "next/navigation";

// const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
//   const [streamVideoClient, setStreamVideoClient] = useState<StreamVideoClient>();
//   const { user, isLoaded } = useUser();
//      const pathname = usePathname(); // <-- INITIALIZE usePathname
  
//   // Define public routes that should NOT redirect to login
//   const publicRoutes = ['/login', '/register', '/sso-callback'];
//   const isPublicRoute = publicRoutes.includes(pathname);
//   const router = useRouter()
//   //  if (isLoaded && !user) {
//   //      router.push("/login");
//   //        return null;
//   //   // return <Login />;
//   //   // return <RedirectToSignIn />;
//   // }
//   useEffect(() => {
//     if (!isLoaded || !user) return;

//     const client = new StreamVideoClient({
//       apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
//       user: {
//         id: user?.id,
//         name: user?.firstName || "" + " " + user?.lastName || "" || user?.id,
//         image: user?.imageUrl,
//       },
//       tokenProvider: streamTokenProvider,
//     });

//     setStreamVideoClient(client);
//   }, [user, isLoaded]);
//    if (!isLoaded) {
//     return <p>Loading...</p>;
//   }

//   if (!streamVideoClient) return <p>Loading....reem</p>;
//   return  <StreamVideo client={streamVideoClient}>{children}</StreamVideo>;
// };

// app/providers/StreamVideoProvider.tsx (or wherever this file is)


const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [streamVideoClient, setStreamVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname(); // <-- INITIALIZE usePathname
  
  // Define public routes that should NOT redirect to login
  const publicRoutes = ['/login', '/register', '/verify', '/sso-callback'];
  const isPublicRoute = publicRoutes.includes(pathname);
  
  // --- REDIRECTION LOGIC (MOVED TO useEffect) ---
  useEffect(() => {
    if (isLoaded && !user && !isPublicRoute) {
      console.log("User not signed in. Redirecting to /login.");
      router.push("/login");
    }
  }, [isLoaded, user, isPublicRoute, router]);
  useEffect(() => {
    if (!isLoaded || !user) return; // Should be redundant due to checks above

   const client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      user: {
        id: user?.id,
        name: user?.firstName || "" + " " + user?.lastName || "" || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider: streamTokenProvider,
    })
    setStreamVideoClient(client);
  }, [user, isLoaded]);
  // --- LOADING / RENDER GUARD ---
  if (!isLoaded) {
    return <LoaderUI />;
  }
  
  // If user is NOT signed in AND we are on a protected route, we let the useEffect
  // handle the redirection, but return null/loading to prevent the protected children 
  // from mounting momentarily.
  if (!user && !isPublicRoute) {
      return router.push("/login");
  }

  // If we are on a public route, or the user is signed in, proceed to initialize Stream
  if (!user) { // If user is not signed in, Stream client cannot be initialized, 
              // but we are on a public page, so just render children without StreamVideo
      return children;
  }
  
  // --- STREAM CLIENT INITIALIZATION (Keep this in useEffect) ---

  
  // --- RENDER STREAM PROVIDER ---
  if (!streamVideoClient) return <LoaderUI />;
  
  return <StreamVideo client={streamVideoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
