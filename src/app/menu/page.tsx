"use client";
import React from "react";
import Tab from "./components/Tab";
import NavbarMenu from "../menu/[id]/components/NavbarMenu";

export default function mainmenu() {
  return (
    <div>
      <NavbarMenu params={{id: ""}} />
      <Tab />
    </div>
  );
}
