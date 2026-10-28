import express from "express";
const router = express.Router();
export default router;

import { createPlaylist, getPlaylists, getPlaylist } from "#db/queries/playlists";

router.get("/", async (req, res) => {
    const playlists = await getPlaylists();
    res.send(playlists);
});

router.post("/", async (req, res) => {
    if(!req.body) return res.status(400).send("Body required");

    const { name, description } = req.body;
    if (!name || !description) return res.status(400).send("Missing request info");

    const playlist = await createPlaylist(name, description);
    res.status(201).send(playlist);
})

router.param("id", async (req, res, next, id) => {
  const playlist = await getPlaylist(id);
  if (!playlist) return res.status(404).send("Playlist not found.");

  req.playlist = playlist;
  next();
});

router.get("/:id", async (req, res) => {
    res.send(req.playlist);
});
