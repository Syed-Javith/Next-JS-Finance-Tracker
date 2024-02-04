"use client"
import { useContext, useEffect, useState } from "react";
import { userContext } from "./UserProvider";
import Sigin from "@/components/Sigin";
import HomePage from "@/components/HomePage";

export default function Home() {
  const { user } = useContext(userContext);

  return (
    <>
      {
        !user ? <Sigin /> : <HomePage />
      }
    </>
  );
}
