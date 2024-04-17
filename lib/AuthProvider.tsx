"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter, usePathname } from "next/navigation";
import LoadingSpinner from "@/app/components/LoadingSpinner";

// async function syncFirebaseAuth(session: Session) {
//   if (session && session.firebaseToken) {
//     try {
//       await signInWithCustomToken(auth, session.firebaseToken);
//     } catch (error) {
//       console.error('Firebase auth error:', error);
//     }
//   } else {
//     await auth.signOut();
//   }
// }

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    // if (pathname !== '/julia') {
    //   if (!session) {
    //     router.push('/');
    //   } else {
    //     syncFirebaseAuth(session);
    //   }
    // }
  }, [session, status, router]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}

export default AuthProvider;
