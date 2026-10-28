import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createTrack } from "./queries/tracks.js";
import { createPlaylist } from "./queries/playlists.js";
import { createPlayTrack } from "./queries/playlists-tracks.js";


await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  /**
   * 20 tracks and 10 playlists
   * at least 15 playlists_tracks
   */
  for (let track = 1; track <= 20; track++) {
    const newTrack = await createTrack("Track" + track, faker.number.int({min: 200, max: 400}));
    for (let playlist = 1; playlist <= 10; playlist++) {
      const newPlaylist = await createPlaylist("Playlist" + playlist, faker.lorem.paragraph({min: 2, max: 4}));
      if (track > 18) {
        await createPlayTrack(newPlaylist.id, newTrack.id);
      };
    }
  }
}
