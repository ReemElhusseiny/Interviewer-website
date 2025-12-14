// "use client"
// import { ReactNode } from "react";
// import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

// interface AuthGateProps {
//   children: ReactNode;
// }

// export default function AuthGate({ children }: AuthGateProps) {
//   return (
//     <>
//       <SignedIn>
//         {children}
//       </SignedIn>

//       <SignedOut>
//         <RedirectToSignIn />
//       </SignedOut>
//     </>
//   );
// }
"use client";
import { ReactNode } from "react";
import { useUser, SignIn } from "@clerk/nextjs";
import Login from "../app/(guest)/login/page"
import { useRouter } from "next/navigation";

interface AuthGateProps {
  children: ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  // Still loading Clerk user data → show loader
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Loaded but user is NOT signed in → redirect
  // if (!isSignedIn) {
  //   console.log("Not user")
  //   return <Login />;
  // }
   if (!isSignedIn) {
    router.push("/login");
      return null;
  }

  // Signed in → render children
  return children;
}

