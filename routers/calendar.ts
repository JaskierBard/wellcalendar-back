import { query, Router } from "express";
import { CalendarRecords } from "../records/calendarRecords";

export const calendarRouter = Router();

calendarRouter.post("/create", async (req, res) => {
  const data = await CalendarRecords.createEvent("test", req.body);
  res.json(data);
});

calendarRouter.get("/read", async (req, res) => {
  const data = await CalendarRecords.readEvents("test");
  res.json(data);
});

calendarRouter.post("/update", async (req, res) => {
  const data = await CalendarRecords.updateEvent("test", req.body);
  res.json(data);
});

calendarRouter.delete(`/delete/:id`, async (req, res) => {
  const { id } = req.params;
  const data = await CalendarRecords.deleteEvent("test", id);

  res.json(data);
});
