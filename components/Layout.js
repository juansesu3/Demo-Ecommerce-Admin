import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Logo from "./Logo";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState();
  const { data: session } = useSession();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSignInCredentials = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        userName,
        password,
      });

      if (result.error) {
        setError(true);
        console.log(error);
        return;
      }
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!session) {
    return (
      <div className="bg-bgGray w-screen h-screen flex items-center">
        <div className="text-center m-auto  flex flex-col justify-center items-center gap-2">
          <h1 className="text-2xl font-semibold">
            Ecommerce Demo <br /> Admin
          </h1>
          <form className="w-56">
            <p className="text-sm">If you want to try it!</p>
            <span className=" flex flex-col gap-4 mb-4 text-start my-2">
              <span>
                User Name:{" "}
                <b className=" text-gray-500/90 font-medium ">jhon-doe</b>
              </span>
              <span>
                Password:{" "}
                <b className=" text-gray-500/90 font-medium">jhon-XpT-2</b>
              </span>
            </span>
            <input
              className="shadow-md"
              type="text"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
              placeholder="user-name here"
            />
            <input
              className="shadow-md"
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              placeholder="password here"
            />
            <button
              type="button"
              onClick={handleSignInCredentials}
              className="bg-gray-400 p-2 px-4 w-full text-white font-medium rounded-sm shadow-md"
            >
              Login
            </button>
          </form>
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
