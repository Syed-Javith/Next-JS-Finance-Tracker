"use client"
import { useContext, useEffect, useState } from "react";
import { userContext } from "./UserProvider";
import Sigin from "@/components/Sigin";
import HomePage from "@/components/HomePage";

export default function Home() {
  const { user , loading} = useContext(userContext);

  return (
    <>
      {
        !loading ? (!user ? <Sigin /> : <HomePage />) : <div className="text-center font-bold m-auto">Wait we are loading your information...</div>
      }
    </>
  );
}
