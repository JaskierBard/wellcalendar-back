import express from "express";
import cors from "cors";
import "express-async-errors";
import { calendarRouter } from "./routers/calendar";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/calendar", calendarRouter);

app.listen(3001, "0.0.0.0", () => {
  console.log("Program działa na adresie http://localhost:3001");
});
