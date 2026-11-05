import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export function createSocket() {
  const token =
    sessionStorage.getItem("token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("authToken") ||
    sessionStorage.getItem("studentToken");

  return io(SOCKET_URL, {
    autoConnect: false,
    transports: ["websocket", "polling"],
    auth: {
      token: token || ""
    }
  });
}