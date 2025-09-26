"use client";

import React from "react";
import dynamic from "next/dynamic";
import { JetBrains_Mono, Inter } from "next/font/google";
import Loading from "@/components/utilities/Loading";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// note: dynamic import is required for components that use the Frame SDK
const BettingInterface = dynamic(() => import("@/components/BettingInterface"), {
  ssr: false,
  loading: () => (<Loading />),
});

export default function App() {
  return (
    <div className={`${mono.variable} ${inter.variable} font-sans`}>
      <BettingInterface />
    </div>
  );
}