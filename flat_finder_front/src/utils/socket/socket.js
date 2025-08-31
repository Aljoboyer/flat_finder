// socket.js
"use client";

import {  SERVER, SocketIoUrl } from "@/constant/urls";
import { io } from "socket.io-client";
import { getLocalStorageData } from "../getLocalStorageData";

let socket = null;

export const getSocket = () => {
  if (!socket) {
    if (typeof window !== "undefined") {
      const userData = getLocalStorageData();
   
      if (userData?._id) {
        socket = io(SocketIoUrl, {
          query: { userId: userData._id },
        });
      } else {
        return
        console.error("No user data found in localStorage");
      }
    }
  }
  return socket;
};
