import express from "express";
const router = express.Router();
export default router;

import { createPlaylist, getPlaylists, getPlaylist, createPlaylistsTests } from "#db/queries/playlists";
import { getTracksByPlaylistId } from "#db/queries/tracks";

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

router.get("/:id/tracks", async (req, res) => {
    const tracks = await getTracksByPlaylistId(req.playlist.id);
    res.send(tracks);
});

router.post("/:id/tracks", async (req, res) => {
    if (!req.body) return res.status(400).send("Body required"); 
    
    const { trackId } = req.body;
    if (!trackId) return res.status(400).send("Missing request info");

    const newTrack = await createPlaylistsTests(req.playlist.id, trackId);
    res.status(201).send(newTrack);
})
