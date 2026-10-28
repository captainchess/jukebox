import db from "#db/client";

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
    await createTrack();
    for (let playlist = 1; playlist <= 10; playlist++) {
      await createPlaylist();
    }
    if (track > 5) await createPlayTrack();
  }
}
