import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cookiePaser from "cookie-parser";
import cors from "cors";
import UserRouter from "./routes/User.js";
import GuestRouter from "./routes/GuestUser.js";
import EventRouter from "./routes/Event.js";
const exp = express();
exp.use(express.json());
exp.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);


const app = createServer(exp);

const io = new Server(app, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

exp.use(cookiePaser());
exp.use("/api/v1/user", UserRouter);
exp.use('/api/v1/guest',GuestRouter);
exp.use('/api/v1/event',EventRouter)
exp.get('/',(req,res)=>{
  res.send('Server is Runing....')
})
io.on("connection", (socket) => {
  console.log("User Connected with Socket id :-", socket.id);
});

export default app;
