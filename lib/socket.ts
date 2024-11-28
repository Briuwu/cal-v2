"use client";
import { io } from "socket.io-client";

const url =
  process.env.NODE_ENV === "production"
    ? process.env.WEBSITE
    : "http://localhost:3001";

export const socket = io(url!);
