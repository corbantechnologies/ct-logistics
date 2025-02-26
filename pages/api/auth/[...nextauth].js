import { jwtDecode } from "jwt-decode";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "pc@pc.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/accounts/token/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
              }),
            }
          );

          const user = await response.json();

          if (response?.ok && user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          const { response } = error;
          if (response?.status === 401) {
            throw new Error("Invalid email or password");
          }

          throw new Error("Something went wrong! Please try again.");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      const decodedToken = jwtDecode(token?.access) || {};
      session.user = { ...decodedToken, ...token };
      return session;
    },
  },
};

export default NextAuth(authOptions);
