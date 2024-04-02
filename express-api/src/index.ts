import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import recordApi from "./api/v1/records";

const app = express();
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
  res.send(`Hello World!`);
});

// Routers
app.use("/api/v1", recordApi);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log("=".repeat(66));
  console.log("Start Logging...");
});
