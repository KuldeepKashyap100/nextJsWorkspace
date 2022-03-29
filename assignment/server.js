const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const app = express();
// const {getFeaturedEvents} = require('./helpers/api-util');

function getFeaturedEvents(events) {
  return events.filter((event) => event.isFeatured);
}

function getFilteredEvents(events, year, month) {
  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

function getEventById(events, id) {
  return events.find((event) => event.id === id);
}

// CORS
app.all("*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	if ("OPTIONS" == req.method) {
		res.sendStatus(200);
	} else {
		next();
	}
});


app.get("/events", async (req, res) => {
    const data = await fs.readFile(
      path.join(__dirname, "data", "dummy-data.json")
    );
    const events = JSON.parse(data);
    return res.json(events);
  });

app.get("/events/featured", async (req, res) => {
  const data = await fs.readFile(
    path.join(__dirname, "data", "dummy-data.json")
  );
  const events = JSON.parse(data);
  return res.json(getFeaturedEvents(events));
});

app.get("/events/:year/:month", async (req, res) => {
    const data = await fs.readFile(
        path.join(__dirname, "data", "dummy-data.json")
      );
    const events = JSON.parse(data);
    return res.json(getFilteredEvents(events, +req.params.year, +req.params.month));
});

app.get("/events/:eventId", async (req, res) => {
    const data = await fs.readFile(
        path.join(__dirname, "data", "dummy-data.json")
      );
    const events = JSON.parse(data);
    return res.json(getEventById(events, req.params.eventId));
});

app.listen(4000, () => console.log("listing on 4000..."));
