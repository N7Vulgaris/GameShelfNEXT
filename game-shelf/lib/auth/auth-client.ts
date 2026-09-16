import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const authBaseURL =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BETTER_AUTH_URL;

export const authClient = createAuthClient({
  baseURL: authBaseURL,
  plugins: [adminClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
