import "server-only";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();
const configuredAuthURL =
  process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
const authBaseURL = configuredAuthURL
  ? new URL(configuredAuthURL).origin
  : undefined;
const trustedOrigins = [
  authBaseURL,
  "https://game-shelf-next.vercel.app",
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  "http://localhost:3000",
].filter((origin): origin is string => Boolean(origin));

export const auth = betterAuth({
  baseURL: authBaseURL,
  trustedOrigins,
  rateLimit: {
    window: 60,
    max: 100,
    customRules: {
      "/sign-in/email": {
        window: 60,
        max: 5,
      },
      "/sign-up/email": {
        window: 60 * 60,
        max: 10,
      },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  /* databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user.id) {

          }
        },
      },
    },
  }, */
  plugins: [admin()],
});

export async function getSession() {
  const result = await auth.api.getSession({
    headers: await headers(),
  });

  return result;
}

export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });

  if (result.success) {
    redirect("/sign-in");
  }
}
