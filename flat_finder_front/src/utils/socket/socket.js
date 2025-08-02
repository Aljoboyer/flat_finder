// socket.js
"use client";

import { BASEURL, SERVER } from "@/constant/urls";
import { io } from "socket.io-client";
import { getLocalStorageData } from "../getLocalStorageData";

let socket = null;

export const getSocket = () => {
  if (!socket) {
    if (typeof window !== "undefined") {
      const userData = getLocalStorageData();
      console.log('userData?._id', userData?._id)
      if (userData?._id) {
        socket = io(SERVER, {
          query: { userId: userData._id },
        });
      } else {
        console.error("No user data found in localStorage");
      }
    }
  }
  return socket;
};
