import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Home } from "./utils/functions/redirect";
import userRoutes from "./routes/user.routes";

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", Home);
app.use("/api/users", userRoutes);

export default app;
