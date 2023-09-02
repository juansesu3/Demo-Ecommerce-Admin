import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState();
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-bgGray w-screen h-screen flex items-center">
        <div className="text-center m-auto  flex flex-col justify-center items-center gap-2">
          <h1 className="text-2xl font-semibold">
            EcommUpp <br /> Admin
          </h1>

          <p className="text-sm">For members</p>
          <button
            onClick={() => signIn("google")}
            className="bg-gray-400 p-2 px-4 w-full text-white font-medium rounded-lg"
          >
            Login with Google
          </button>
          <p className="text-sm">If you want to try it!</p>
          <a
            href="https://example.com/"
            target="_blank"
            className="bg-gray-400 p-2 px-4 w-full text-white font-medium rounded-lg"
          >
            Login with Demo
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgGray min-h-screen ">
      <div className="block md:hidden flex items-center p-4 ">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <div className=" text-black flex-grow  p-4">{children}</div>
      </div>
    </div>
  );
}
