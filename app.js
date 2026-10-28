import express from "express";
const app = express();
export default app;

import playlistsRouter from "#api/playlists";
import tracksRouter from "#api/tracks";
//import playlistsTrackRouter from "#db/api/playlists-tracks";

app.use(express.json());
app.use("/playlists", playlistsRouter);
app.use("/tracks", tracksRouter);

app.use((err, req, res, next) => {
  // Unique contraint violation
  if (err.code === "23505") {
    return res.status(400).send(err.detail);
  }

  // Foreign key violation
  if (err.code === "23503") {
    return res.status(400).send(err.detail);
  }

  // Invalid type of input
  if (err.code === "22P02") {
    return res.status(400).send(err.message);
  }

  // Invalid date/time format
  if (err.code === "22007") {
    return res.status(400).send(err.message);
  }

  // Date/time out of range
  if (err.code === "22008") {
    return res.status(400).send(err.message);
  }

  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
