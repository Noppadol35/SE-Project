"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Tab from "./components/Tab";
import NavbarMenu from "./components/NavbarMenu";
import exp from "constants";

const mainmenu = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const [name, setname] = useState("");
  const [capacity, setCapacity] = useState("");
  const [statusId, setStatusId] = useState("");
  const [statuss, setStatuss] = useState([]);
  const [posts, setPosts] = useState([]);

  const fetchPostsTable = async (id: string) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/posts/${id}`);

      setname(res.data.name || "");
      setCapacity(res.data.capacity);
      setStatusId(res.data.statusId || "");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    
    fetchPostsTable(id);
    
  }, [id]);

  return (
    <div>
      <NavbarMenu params={params}/>
      <Tab params={params}/>
    </div>
  );
}

export default mainmenu;