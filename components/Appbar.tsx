"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export const Appbar = () => {
  const session = useSession();
  console.log(session);
  return (
    <div className="flex justify-between items-center text-black">
      <h2 className="text-green-600">Saas</h2>
      <div></div>
      {!session.data?.user ? (
        <button
          className="bg-green-300 p-2 m-2 rounded-xl cursor-pointer"
          onClick={() => signIn()}
        >
          Log in
        </button>
      ) : (
        <div className="flex gap-3 justify-center items-center">
            <img className="rounded-full h-10 w-10" src={session.data?.user?.image || ""} alt="image" />
          <button
            className="bg-green-300 p-2  m-2 rounded-xl cursor-pointer"
            onClick={() => signOut()}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};
