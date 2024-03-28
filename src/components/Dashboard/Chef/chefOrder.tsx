"use client"

import Home from "./views/home/Home";

export function ChefOrder() {
  return (
    <div className="h-full bg-base-200 ">
      <div className="flex h-[90dvh]">
        <div className="w-full">
          < Home />
          <p>Order</p>
        </div>
      </div>
    </div>
  )
}
