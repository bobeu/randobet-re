"use client";

import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/utilities/Loading";

// note: dynamic import is required for components that use the Frame SDK
const BettingInterface = dynamic(() => import("@/components/BettingInterface"), {
  ssr: false,
  loading: () => (<Loading />),
});

export default function App() {
  return (
    <>
      <BettingInterface />
    </>
  );
}