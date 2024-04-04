import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import recordApi from "./api/v1/records";
import { Server } from "socket.io";
import http from "http";
import { RedisClassController } from "./controllers/redis_controller";

// Websocket Path
const channelName = process.env.REDIS_LEADERBORAD_CHANNEL ?? "leaderboard";

const app = express();
// Express Server
const expressServer = http.createServer(app);
// Websocket Server
const io = new Server(expressServer);
const port = process.env.PORT || 3000; // Use the PORT environment variable, or default to 3000 if not set

// Binding
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Middleware
app.use(function (req, res, next) {
  // Log request details
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.originalUrl}`);
  // console.log(`Request Headers: ${JSON.stringify(req.headers)}`);
  console.log("-".repeat(66));

  // Log response details
  res.on("finish", () => {
    console.log(`Response Status: ${res.statusCode}`);
    console.log(`Response Headers: ${JSON.stringify(res.getHeaders())}`);
    console.log("=".repeat(66));
  });

  next();
});

// Initial Route
app.get("/", (req: Request, res: Response) => {
  res.send(`Welcome to Ken Yeung's Catcher Game Server!`);
});

// Socket.io
// Subscribe Leaderboard Function
io.on("connection", (socket) => {
  // Redis Subscriber
  const subscriber = new RedisClassController("Subscriber Connected");

  setTimeout(async () => {
    await subscriber.subscribe(channelName, (message) => {
      // Notify all subscriber to update leaderboard information
      socket.emit("message", { message: "update" });
    });
  }, 666);

  // On Disconnect
  socket.on("disconnect", async (socket) => {
    await subscriber.client.UNSUBSCRIBE(channelName);
    await subscriber.client.disconnect();
  });
});

// Routers
app.use("/api/v1", recordApi);

expressServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log("=".repeat(66));
  console.log("Start Logging...");
});
