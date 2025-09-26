import React from "react";

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-violet-900/20">
      <div className="flex flex-col items-center gap-6 bg-violet-900 backdrop-blur-sm border border-stone-600 rounded-lg p-8">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-yellow-400/40 border-t-yellow-400 animate-spin" />
          <div className="absolute inset-0 animate-ping rounded-full bg-yellow-400/20" />
        </div>
        <div className="text-center space-y-2">
          <div className="text-xl font-bold spooky-text">Preparing Randobet…</div>
          <div className="text-sm text-stone-300">Loading Betting Interface</div>
        </div>
      </div>
    </div>
  );
}