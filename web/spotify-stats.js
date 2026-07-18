// Drop this on your static site, and add a <div id="spotify-stats"></div>
// wherever you want the widget to appear.

const STATS_URL = 'data/stats.json'; // relative path — works whether your site is at a domain root or a GitHub Pages project subpath

// Static fallback in case the fetch fails (offline, file missing, CDN hiccup, etc).
// Update this occasionally by hand, or just leave it as a generic placeholder.
const FALLBACK_STATS = {
  week_start: null,
  week_end: null,
  total_plays: 0,
  top_track: {
    name: 'Currently unavailable',
    artists: ['Check back soon'],
    play_count: 0,
    album_art: null,
  },
  top_artists: [],
  updated_at: null,
};

async function loadSpotifyStats() {
  try {
    const res = await fetch(STATS_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    renderSpotifyStats(data);
  } catch (err) {
    console.warn('Falling back to static Spotify stats:', err);
    renderSpotifyStats(FALLBACK_STATS);
  }
}

function renderSpotifyStats(stats) {
  const container = document.getElementById('spotify-stats');
  if (!container) return;

  const track = stats.top_track;
  const artists = stats.top_artists || [];

  container.innerHTML = `
    <div class="spotify-stats">
      <h3>This week I've been listening to</h3>
      ${
        track
          ? `
        <div class="spotify-top-track">
          ${track.album_art ? `<img src="${track.album_art}" alt="${escapeHtml(track.name)} album art" width="64" height="64">` : ''}
          <div>
            <strong>${escapeHtml(track.name)}</strong>
            <span>${escapeHtml(track.artists.join(', '))}</span>
            <small>${track.play_count} play${track.play_count === 1 ? '' : 's'} this week</small>
          </div>
        </div>
      `
          : '<p>No plays tracked yet this week.</p>'
      }
      ${
        artists.length
          ? `
        <ol class="spotify-top-artists">
          ${artists.map((a) => `<li>${escapeHtml(a.name)} <small>(${a.count})</small></li>`).join('')}
        </ol>
      `
          : ''
      }
    </div>
  `;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', loadSpotifyStats);
