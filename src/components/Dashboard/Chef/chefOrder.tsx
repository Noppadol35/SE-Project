"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Dashboard/Chef/components/Navbar";
import Home from "@/components/Dashboard/Chef/components/Home";



export function ChefOrder() {
    return (
        <div>
            {/*      */}
            <Home />
        </div>
    );
}
