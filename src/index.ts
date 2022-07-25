import express, { json } from "express";
import cors from "cors";
import { dbConnect } from "./startup/db";

const app = express();

app.set("port", process.env.PORT || 5000);
app.use(json());
app.use(cors());

dbConnect();

require("./startup/routes")(app);

const port = app.get("port");
app.listen(port, () => console.log(`Running on port ${port}`));
