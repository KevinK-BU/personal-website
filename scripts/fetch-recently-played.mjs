#!/usr/bin/env node
// Fetches recently played tracks from Spotify, merges into a rolling history log,
// and recomputes "top track" / "top 3 artists" for the current week.
//
// Run by the GitHub Actions workflow on a schedule. Requires these env vars:
//   SPOTIFY_CLIENT_ID
//   SPOTIFY_CLIENT_SECRET
//   SPOTIFY_REFRESH_TOKEN

import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const HISTORY_PATH = path.join('data', 'history.json');
const STATS_PATH = path.join('data', 'stats.json');
const HISTORY_RETENTION_DAYS = 35; // keep ~5 weeks so the rolling window always has context

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error('Missing SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET / SPOTIFY_REFRESH_TOKEN env vars.');
  process.exit(1);
}

async function getAccessToken() {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });
  if (!res.ok) {
    throw new Error(`Token refresh failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  return data.access_token;
}

async function getRecentlyPlayed(accessToken) {
  const res = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    throw new Error(`Recently-played fetch failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  return data.items.map((item) => ({
    played_at: item.played_at,
    track_id: item.track.id,
    track_name: item.track.name,
    artists: item.track.artists.map((a) => a.name),
    album_art: item.track.album?.images?.[0]?.url ?? null,
  }));
}

async function loadHistory() {
  try {
    const raw = await readFile(HISTORY_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function mergeHistory(existing, incoming) {
  const seen = new Set(existing.map((p) => p.played_at));
  const merged = [...existing];
  for (const play of incoming) {
    if (!seen.has(play.played_at)) {
      merged.push(play);
      seen.add(play.played_at);
    }
  }
  merged.sort((a, b) => new Date(a.played_at) - new Date(b.played_at));
  return merged;
}

function pruneOldPlays(history) {
  const cutoff = Date.now() - HISTORY_RETENTION_DAYS * 24 * 60 * 60 * 1000;
  return history.filter((p) => new Date(p.played_at).getTime() >= cutoff);
}

function getWeekWindow(referenceDate = new Date()) {
  // Rolling 7-day window ending "now" — simpler than calendar weeks and
  // avoids an awkward near-empty Monday.
  const end = referenceDate;
  const start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
  return { start, end };
}

function computeWeeklyStats(history) {
  const { start, end } = getWeekWindow();
  const weekPlays = history.filter((p) => {
    const t = new Date(p.played_at).getTime();
    return t >= start.getTime() && t <= end.getTime();
  });

  const trackCounts = new Map();
  const artistCounts = new Map();

  for (const play of weekPlays) {
    const entry = trackCounts.get(play.track_id) || {
      count: 0,
      name: play.track_name,
      artists: play.artists,
      album_art: play.album_art,
    };
    entry.count += 1;
    trackCounts.set(play.track_id, entry);

    for (const name of play.artists) {
      artistCounts.set(name, (artistCounts.get(name) || 0) + 1);
    }
  }

  const topTrack = [...trackCounts.values()].sort((a, b) => b.count - a.count)[0] || null;
  const topArtists = [...artistCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, count]) => ({ name, count }));

  return {
    week_start: start.toISOString(),
    week_end: end.toISOString(),
    total_plays: weekPlays.length,
    top_track: topTrack
      ? {
          name: topTrack.name,
          artists: topTrack.artists,
          play_count: topTrack.count,
          album_art: topTrack.album_art,
        }
      : null,
    top_artists: topArtists,
    updated_at: new Date().toISOString(),
  };
}

async function main() {
  await mkdir('data', { recursive: true });

  const accessToken = await getAccessToken();
  const recent = await getRecentlyPlayed(accessToken);

  const existingHistory = await loadHistory();
  const merged = pruneOldPlays(mergeHistory(existingHistory, recent));

  const stats = computeWeeklyStats(merged);

  await writeFile(HISTORY_PATH, JSON.stringify(merged, null, 2));
  await writeFile(STATS_PATH, JSON.stringify(stats, null, 2));

  console.log(`History: ${merged.length} plays retained.`);
  console.log(`This week: ${stats.total_plays} plays. Top track: ${stats.top_track?.name ?? 'n/a'}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
