"use client"

import Navbar from "@/components/Dashboard/Chef/components/Navbar";
import Home from "./components/Home";

export function ChefOrder() {
  return (
    <div className="h-full bg-base-200">
      <div className="flex h-[90dvh]">
        <div className="w-full">
          <Navbar />
          < Home />
        </div>
      </div>
    </div>
  )
}

