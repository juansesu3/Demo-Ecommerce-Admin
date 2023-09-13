import { mongooseConnect } from "@/lib/mongoose";

import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "../../../models/User";

const isAdminEmails = async (email) => {
  return !!(await User.findOne({ email }));
};ver

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        console.log("Crederential before destructuring >> ", { credentials });
        const { name, password } = credentials;

        console.log("Data credentials name and password >>", {
          password,
          name,
        });

        try {
          await mongooseConnect();
          const user = await User.findOne({ name });
          if (!user) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);

export const isAdminRequest = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!(await isAdminEmails(session?.user?.email))) {
    res.status(401);
    res.end();
    throw "Not an admin";
  }
};
