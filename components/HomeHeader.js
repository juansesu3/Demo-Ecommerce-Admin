import { useSession } from "next-auth/react";

const HomeHeader = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="text-blue-900 flex justify-between">
      <div className="flex w-full gap-2 items-center justify-between ">
        <div>
          Hello, <b>{session?.user?.email}</b>
          <div className=" mt-2">
            <a
              className="border py-1 px-2 bg-primary hover:bg-purple-600 text-white "
              href="https://e-commerce-front-tan.vercel.app/"
            >
              Go My Store
            </a>
          </div>
        </div>
        <div className="w-6 h-6">
          <img
            src={session?.user?.image}
            alt="user-image"
            className="w-full rounded-md sm:hidden"
          />
        </div>
      </div>

      <div className="hidden sm:block">
        <div className=" flex  gap-1 text-black rounded-lg overflow-hidden">
          <img
            src={session?.user?.image}
            alt="user-image"
            className="w-12 h-12"
          />
        </div>
      </div>
    </div>
  );
};
export default HomeHeader;
