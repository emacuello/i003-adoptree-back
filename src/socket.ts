// src/socket.ts
import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export const initializeSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      // FRONT_URL admite varios orígenes separados por coma (dominio propio y *.vercel.app).
      origin: (process.env.FRONT_URL ?? "").split(",").map((url) => url.trim()),
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    // Puedes añadir cualquier otra lógica aquí si lo necesitas
    // Por ejemplo, eventos adicionales o acciones específicas cuando un cliente se conecta.

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};
