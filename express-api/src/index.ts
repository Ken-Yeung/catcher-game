import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import recordApi from "./api/v1/records";

const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable, or default to 3000 if not set

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
  res.send(`Hello World!`);
});

app.use("/api/v1", recordApi);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
