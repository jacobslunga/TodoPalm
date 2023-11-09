import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, _) => {
        if (!credentials) {
          console.log("No credentials provided.");
          return Promise.resolve(null);
        }

        const user = await fetch(BASE_URL + "/api/v1/users/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            name: credentials.name,
            password: credentials.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (user.status === 401) {
          return Promise.resolve(null);
        }

        if (user.ok) {
          const data = await user.json();

          return Promise.resolve(data);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    async signIn(data) {
      const { account, user } = data;

      if (account?.provider === "credentials") {
        return true;
      }

      try {
        if (account?.provider === "google") {
          const res = await fetch(BASE_URL + "/api/v1/users/auth/google", {
            method: "POST",
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              imageUrl: user.image,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) {
            return false;
          }

          const userData = await res.json();

          (user as any).accessToken = userData.accessToken;
          (user as any).refreshToken = userData.refreshToken;
          (user as any).expiresAt = userData.expiresAt;
          (user as any).id = userData.id;

          return true;
        }

        return true;
      } catch (error) {
        console.error("Error during sign-in:");
        console.error(error);
        return false;
      }
    },
    async session({ session, token }: { [key: string]: any }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresAt = token.expiresAt;
      session.id = token.id;
      return session;
    },
    async jwt({ token, user }: { [key: string]: any }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresAt = user.expiresAt;
        token.id = user.id;
      }

      if (token?.expiresAt && Math.floor(Date.now() / 1000) > token.expiresAt) {
        const res = await fetch(BASE_URL + "/api/v1/users/auth/refresh-token", {
          method: "POST",
          body: JSON.stringify({
            token: token.refreshToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          return token;
        }

        const refreshedData = await res.json();

        if (
          refreshedData &&
          refreshedData.accessToken &&
          refreshedData.refreshToken
        ) {
          token.accessToken = refreshedData.accessToken;
          token.refreshToken = refreshedData.refreshToken;
          token.expiresAt = refreshedData.expiresAt;
        }
      }

      return token;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};
