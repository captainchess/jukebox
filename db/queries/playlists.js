import db from "#db/client";

export async function createPlaylist(name, description) {
  const sql = `
    INSERT INTO playlists
        (name, description)
    VALUES
        ($1, $2)
    RETURNING *
    `;
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description]);
  return playlist;
}

export async function getPlaylists() {
  const sql = `
  SELECT * FROM playlists
  `;
  const {rows: playlists} = await db.query(sql);
  return playlists;
}

export async function getPlaylist(id) {
  const sql = `
  SELECT * 
  FROM playlists
  WHERE id = $1
  `;
  const {rows: [playlist]} = await db.query(sql, [id]);
  return playlist;
}

export async function createPlaylistsTests(playlist_id, track_id) {
  const sql = `
  INSERT INTO playlists_tracks
    (playlist_id, track_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {rows: [playTrack]} = await db.query(sql, [playlist_id, track_id]);
  return playTrack;
}
