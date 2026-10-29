/* Chhath Geet — song-reactive festival experience.
   Playback uses YouTube's official IFrame Player API; each catalogue item links to a YouTube video.
   Videos may still be restricted by their uploader/region, so the app provides an external YouTube fallback. */
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const STORE = {
    custom: "chhath_custom_songs_v2",
    oldSongs: "chhath_songs_v1",
    favorites: "chhath_favorites_v1",
    prefs: "chhath_prefs_v1",
    themeOverrides: "chhath_theme_overrides_v2",
    checklist: "chhath_checklist_v1",

    failedVideos: "chhath_failed_videos_v1",
failedSongs: "chhath_failed_songs_v1"

  };

  // Reference catalogue: the 107 song titles and artists visible on Chhath Geet Gatha.
  // videoId values are taken from the reference list's YouTube thumbnail links; individual videos can still disallow embedding.
  const catalogRows = String.raw`
Uga Hai Suraj Dev|Anuradha Paudwal|6e6Hp6R5SVU
Rovele Banjhiniya|Akshara Singh|054aYEl728U
Jode Jode Falwa|Pawan Singh|BKoD7bTLc2k
Chhath Ghate Chali|Khesari Lal Yadav & Antra Singh Priyanka|fCuHD3YBQKY
Chahi Na Ann Dhan Khajanwa|Arvind Akela Kallu|wXv2MyuVOZQ
Chhath Mai Ke Baratiya|Khesari Lal Yadav|aLbXQ9VIxKI
Kaanch Hi Baans Ke Bahangiya|Anuradha Paudwal|8dNjbCHaGEc
Kelwa Ke Paat Par|Sharda Sinha|knZ8b5YnQiY
Sonu Hamra Pe Bharosa Naikhe|Khesari Lal Yadav|fj4foPjRzTk
Ghare Ghare Hota Chhathi Mai Ke Baratiya|Aamrapali Dubey|lnj52n6k9-A
Kaanch Hi Baans Ke Bahangiya (Aragh Dehab)|Arvind Akela Kallu|7R9tDvnAfMo
Mai Ghare Rowat Hoihe|Pawan Singh|KvOeeZB1_70
Pahile Pahil Chhathi Maiya|Sharda Sinha|9Ijd_PGkg8c
Patna Se Nimbua Mangaini|Anu Dubey|epQB_o53AX8
Jai Chhathi Maiya|Sonu Nigam & Pawan Singh|Yz1XBzbaSoM
Chhathi Maiya Ke Geet|Anu Dubey|OERYH8EC1hA
Marbo Re Sugwa Dhanukh Se|Anuradha Paudwal|jRsXRee52xw
Pahile Pahile Baani Kaile Chhathi Maiya|Dinesh Lal Yadav & Kalpana|cQ2eX4SrkNg
Makeup Ke Phera Aragh Ke Bera|Khesari Lal Yadav|JXnbpAY3igM
Ugi Hai Suraj Dev Na|Ranjana Singh|TofF3Mhcyw8
Uga Hai Suraj Dev (Full Video)|Anuradha Paudwal|8MzoVsjL4QU
Ho Deenanath (Surujdev Ke Arghiya)|Sharda Sinha|fOVGz9WFymU
Paramparik Chhath Geet|Pawan Singh|zaUyuCUTbyA
Ho Deenanath (New Version)|Sharda Sinha|KWvgJvM2zT0
Kopi Kopi Boleli|Devi|YVrZBmI9_ag
Kelwa Ke Paat Par (Devi)|Devi|WsvuH5QO23I
Chhathi Mai Ke Ghatwa Pe Aajan Bajan|Pawan Singh|6diXoexNQ58
Aalha Chhathi Maiya Ke|Sanjo Baghel|0O9a3mUYgGs
Kopi Kopi Boleli Chhathi Maiya|Anu Dubey|BktbNj2TzPs
Marbo Re Sugwa Dhanush Se|Anupama Das|wRu4qHaLNB0
Ho Deenanath|Sharda Sinha|j74EcjyN1WQ
Dihlu Na Ekogo Lalanwa|Awadhesh Premi Yadav|g1NWZxlE8n8
Kelwa Ke Paat Par (Original)|Sharda Sinha|-mpGoG0nWPo
Kaanch Hi Baans Ke Bahangiya (Lachkat Jaye)|Akshara Singh|qPPhTg0WBMw
Piyari Pahir La|Pawan Singh|4JdNlcumkoM
Babua Je Rahte Mai|Pawan Singh|G7bD1QSIxtM
Ghutti Bhar Mor Dhoti Bhije|Khesari Lal Yadav|IKAJdLAviYw
Oriye Oriye Madhu Chuwe|Pawan Singh|SWCcS09lV7w
Jode Jode Supwa Tora Chadaibo|Kalpana Patowary|G3PMFpftpbg
Kerwa Ke Patwa Pe Newta|Pawan Singh|uWtMR3iQT-I
Ugi Suruj Dev|Pawan Singh|z3TKq9LVbzM
Uthau Suruj Bhaile Bihaan|Sharda Sinha|j9G3caThH98
Bhail Arghiya Ke Ber|Arvind Akela Kallu|WlMzDuy1dy8
Surya Chalisa|Anuradha Paudwal|L8gGSPzxXQU
Ugi He Dinanath|Kalpana Patowary|FGQ0SCK1AtE
Koshiya Bharaye Lagal|Neelkamal Singh|9hwAiJ4fzog
Baanjhi Kewdwa Dhaile Thaadh|Sharda Sinha|MEnyozGodAU
Om Jai Surya Bhagwan|Anuradha Paudwal|F9uURnkc8iA
Sawa Lakh Ke Sari|Anu Dubey|Muo5s8gMAcI
Aahe Aaditmal|Karina Pandey|8BfbY0vb7Ro
Mathe Daura Uthai Ke|Pawan Singh|_16_cy74D-c
Aso Chhath Karab Naihar Mein|Ankush Raja|TZC1_Og2Pm0
Ugi He Dinanath (2026)|Kalpana Patowary|JG-qK3vgI_o
Army Lover Pa Kripa Kadi Chhathi Maiya|Tuntun Yadav|k8Cmfe5HsF8
Chhath Pooja Geet|Anjali Bhardwaj|MoAnLhiZbyk
Yug Yug Rakhih Suhag He Chhathi Maiya|Kalpana Patowary|V4_ZiIi68L0
Kaanch Hi Baans Ke Bahangiya (New Version)|Anuradha Paudwal|8dNjbCHaGEc
Uga Hey Surujdev|Kalpana Patowary|2RR-GcqTfhU
Chala Ganga Kinare|Khesari Lal Yadav|38mTaX7LkgY
Hathjoriya Nu Ho|Pawan Singh|yt_8_NaCWGk
Ugi He Suryamal Naiyo Na Dole|Pawan Singh|B90gprL5XBE
Jode Jode Falwa Suruj Dev|Swati Mishra|2Uh-rMxhBLY
Ghare Ghare Hota Chhathi Maai Ke Varatiya|Aamrapali Dubey|OCev72he8tU
Dhaniya Hamar Naya Baari|Pawan Singh|Dd_KAUMoKbY
Hey Chhathi Maiya|Sharda Sinha|x9_3sARy_Kw
Ugi Hey Dinanath|Swati Mishra|px11PiCUUy8
Chhathi Maiya Bulaye|Vishal Mishra|OrlnX9zM5-k
Chanani Taane Chalale|Devi|Eb1W8pX0to0
Dukhwa Mitayin Chhathi Maiya|Sharda Sinha|KQqoli_tVVY
Chhathi Maiya Deda Ego Lalna|Kalpana Patowary|Pk3cYw5Wonw
Koshiya Bharaye Lagal (Video)|Neelkamal Singh|G9eSufgjenI
Kawna Kalamwa Se Likhla Karamwa|Pawan Singh & Priyanka Singh|FPDKM5NidYM
Patna Ke Ghatva Par Baaje|Sharda Sinha|VkYrntXiEX8
Bhauji Koshi Bhar|Sonu Nigam & Pawan Singh|G9yiA2WyWFU
Gajmoti Chouka Puraile|Sharda Sinha|9Jmeu2P4YUc
Suryadev Amritwani|Surya Upasana|88gxIb2WTkQ
Jode Jode Nariyar|Devi|G7POso3jDdw
Chala Patna Ke Ghat|Pawan Singh|VJq6aMPw9W4
Kerawa Ke Paat Par|Maithili Thakur|VN0-C_22y4s
Chhathi Maiya|Akshara Singh|wD4ptJDaa8c
Kartik Maas Ijoriya|Sharda Sinha|JcCjw_P_gaM
Marbo Re Sugwa Dhanush Se (Kalpana)|Kalpana Patowary|Wy5fYjIYivs
Kanch Hi Bans Ke Bahangiya|Swati Mishra|treeRGhGMMc
Shitali Bayariya|Pawan Singh|AP3G513ok-Y
Saat Hi Godawa Surajdev Lihlan Avatar|Chhath Lok Geet|yZD_iTghSZw
Suraj Ke Rath Maiyya|Sharda Sinha|jCGKK7GNnjA
Kanch Hi Bans Ke Bahangiya (Devi)|Devi|0fZt65tj6L8
Darshan Dekhai Dihi|Kalpana Patowary|T_YXL_blE3A
Chanani Tanaye Lagal|Shilpi Raj|B-JSzoDdDDI
Chhathi Maiya|Vishal Mishra|FCRb4kjnRx4
Ugi Hey Dinanath|Maithili Thakur|vSJO-AElAog
Ugi Hey Dinanath (Video)|Swati Mishra|bRBxsGyZbE4
Asiya Puran Hoy|Kavita Paudwal|er0EO-Zp904
Sona Satkuniya Ho Dinanaath|Maithili Thakur|fwX2g9jjo1o
Ayelaiy Chhathi Ke Tyohar|Anuradha Paudwal|-1OD63Ew74s
Aragh Ke Ber|Anuradha Paudwal|fqlh99htTJA
Sona Surujdev|Maithili Thakur|Li8bbUM9bqI
Chhathi Mai Ke Sundar Geet|Mohan Rathore|cw-XHS59-4o
Chhathi Maiya Duariya Baanswadiya (Chaiti Chhath)|Chaiti Chhath Geet|2U62qm2m08k
Ganga Mai Ke Unchi Arariya|Manish Kumar|V6IsHHUMxIA
Daura Ghat Pahuchai|Laxmi Rani|TdvyD_8oPYU
Katik Chhath Paramparik Geet|Khesari Lal Yadav|LyGrpY4rvgA
Angna Me Koshi Bharwaib|Alam Raj|7OcvNqVQwSo
Surya Stotra|Surya Upasana|sBuTjwJtE5A
Kaise Ke Karbu Ae Dhani|Mohan Rathore|jqagKJs3mxg
Patna Ke Ghat Par|Chandan Tiwari|YIRaca3nXUc
Ganga Mai Me Arghya Deb|Chandan Tiwari|Ps58SVi1au4
`.trim().split(/\n/).map((row, i) => {
    const [title, artist, videoId] = row.trim().split("|");
    return { id: `catalog-${String(i + 1).padStart(3, "0")}`, title, artist, videoId, catalog: true, official: false };
  });

  const themeCopy = {
    sunset: { eyebrow: "A FESTIVAL OF FAITH & NATURE", title: "जय छठी मईया", subtitle: "Let every melody bring you closer to the river, the setting sun, and home.", caption: "SANDHYA ARGHYA · THE GOLDEN HOUR" },
    sunrise: { eyebrow: "A PRAYER TO THE RISING SUN", title: "उगा है सूरज देव", subtitle: "A morning prayer carried by the river, the first light, and generations of faith.", caption: "USHA ARGHYA · A NEW BEGINNING" },
    festive: { eyebrow: "CELEBRATE THE LIVING TRADITION", title: "भक्ति में रंग जाए मन", subtitle: "Familiar voices, festival memories, and the joy of celebrating together.", caption: "FESTIVAL LIGHTS · JOY TOGETHER" },
    river: { eyebrow: "PAUSE · PRAY · FEEL", title: "नदी किनारे छठी मईया", subtitle: "Slow down with the gentle rhythm of water and a song that feels like home.", caption: "THE RIVER · A MOMENT OF PEACE" }
  };
  const themeImages = {
    sunset: "https://d3d343oddxxyuu.cloudfront.net/images/chapters/13f86901-b591-41e7-9af1-36f4e0490f4d.webp",
    sunrise: "https://mithilalegacy.com/_next/image?q=75&url=%2Fimages%2Ffestivals%2Fchhath-puja.png&w=3840",
    festive: "https://dy3rma73kowlp.cloudfront.net/uploads/2025/10/Chhath-Puja-kosi-Samagri.jpg",
    river: "https://media.assettype.com/outlookindia/2024-11-08/o4oe00md/WhatsApp-Image-2024-11-08-at-11.50.08.jpeg?ar=40%3A21&auto=format%2Ccompress&enlarge=true&mode=crop&ogImage=true&overlay=false&overlay_position=bottom&overlay_width=100&w=1200"
  };
  const hindiAliases = {
    "Uga Hai Suraj Dev": "उगा है सूरज देव उग हे सूरज देव उगी हे दिनानाथ",
    "Kaanch Hi Baans Ke Bahangiya": "काँच ही बाँस के बहंगिया कांच ही बांस के बहंगिया",
    "Kelwa Ke Paat Par": "केलवा के पात पर",
    "Pahile Pahil Chhathi Maiya": "पहिले पहिल छठी मईया पहिले पहिले छठी मैया",
    "Jode Jode Falwa": "जोड़े जोड़े फलवा",
    "Rovele Banjhiniya": "रोवेले बंझिनिया",
    "Ho Deenanath": "हो दीनानाथ",
    "Marbo Re Sugwa Dhanukh Se": "मारबो रे सुगवा धनुख से",
    "Uthau Suruj Bhaile Bihaan": "उठउ सुरुज भइले बिहान",
    "Chhath Ghate Chali": "छठ घाटे चली",
    "Chhathi Mai Ke Baratiya": "छठ माई के बरतिया",
    "Patna Se Nimbua Mangaini": "पटना से निम्बुआ मंगइनी",
    "Jai Chhathi Maiya": "जय छठी मईया",
    "Kopi Kopi Boleli": "कोपी कोपी बोलेली",
    "Aragh Ke Ber": "अरघ के बेर",
    "Surya Chalisa": "सूर्य चालीसा",
    "Om Jai Surya Bhagwan": "ओम जय सूर्य भगवान",
    "Ugi Suruj Dev": "उगी सुरुज देव",
    "Chhathi Maiya Bulaye": "छठी मईया बुलाये"
  };
  const legacyVideoIds = { kaanch: "8dNjbCHaGEc", uga: "6e6Hp6R5SVU" };
 
  const initialPrefs = {
  repeat: false,
  shuffle: false,
  volume: 80
};

  const loadJSON = (key, fallback) => {
    try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; }
    catch { return fallback; }
  };
  const saveJSON = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Private browsing/storage limits: keep the site usable. */ } };
  const safeText = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const normalize = value => String(value ?? "").normalize("NFKD").toLocaleLowerCase().replace(/[\u0300-\u036f]/g, "").replace(/[’'`]/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
  

  
const failedVideoIds = new Set(loadJSON(STORE.failedVideos, []));
const songFailureKey = song =>
  `${normalize(song.title)}|${normalize(song.artist)}`;
const failedSongKeys = new Set(loadJSON(STORE.failedSongs, []));

function persistPlaybackFailures() {
  saveJSON(STORE.failedVideos, [...failedVideoIds]);
  saveJSON(STORE.failedSongs, [...failedSongKeys]);
}


  
const videoUrl = id =>
  id ? `https://www.youtube.com/watch?v=${encodeURIComponent(id)}` : "#";

const coverUrl = song =>
  song.videoId
    ? `https://img.youtube.com/vi/${encodeURIComponent(song.videoId)}/hqdefault.jpg`
    : "assets/favicon.svg";


  const fmt = seconds => !Number.isFinite(seconds) || seconds < 0 ? "--:--" : `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

  function inferTheme(song, index = 0) {
    const text = `${song.title} ${song.artist}`.toLowerCase();
    if (/(suraj|suruj|surya|dinanath|ug[ai]|argh|aragh|suryadev|suryamal|chalisa|stotra|aarti|amritwani)/.test(text)) return "sunrise";
    if (/(ganga|ghat|daura|kerwa|kelwa|nariyar|patna ke ghat|supwa)/.test(text)) return "river";
    if (/(new version|2026|2025|new chhath|army lover|chhath ghate chali|chhathi maiya bulaye)/.test(text)) return "festive";
    return index % 3 === 0 ? "sunset" : index % 3 === 1 ? "festive" : "river";
  }
  function inferCategory(song) {
    const text = `${song.title} ${song.artist}`.toLowerCase();
    if (/(surya chalisa|om jai surya|surya stotra|amritwani|aarti|bhagwan)/.test(text)) return "Surya Aarti";
    if (/(suraj|suruj|surya|dinanath|ug[ai]|argh|aragh|suryadev|suryamal|arghiya)/.test(text)) return "Arghya";
    if (/(kaanch|bans ke bahangiya|kelwa|pahile|paramparik|ho deenanath|kopi kopi|marbo re|uthau suruj|gajmoti|baanjhi|yug yug)/.test(text)) return "Traditional";
    return "New Chhath Geet";
  }
  function enrichSong(song, index = 0) {
    return { ...song, title: String(song.title || "Untitled Chhath Geet"), artist: String(song.artist || "Unknown artist"),
      theme: ["sunset", "sunrise", "festive", "river"].includes(song.theme) ? song.theme : inferTheme(song, index),
      category: song.category || inferCategory(song), aliases: song.aliases || hindiAliases[song.title] || "" };
  }

  // Migrate old localStorage without losing user-added songs. Catalogue entries are refreshed from this file;
  // only genuinely custom videos from the previous version are carried forward.
 let catalog = catalogRows
  .map((song, index) => enrichSong(song, index))
  .filter(song =>
    !failedVideoIds.has(song.videoId) &&
    !failedSongKeys.has(songFailureKey(song))
  );
  const catalogVideoIds = new Set(catalog.map(song => song.videoId));
  const customSaved = loadJSON(STORE.custom, []);
  const legacySaved = loadJSON(STORE.oldSongs, []);
  const customByVideo = new Map();
  for (const candidate of [...(Array.isArray(legacySaved) ? legacySaved : []), ...(Array.isArray(customSaved) ? customSaved : [])]) {

    if (
  !candidate ||
  typeof candidate !== "object" ||
  !candidate.videoId ||
  catalogVideoIds.has(candidate.videoId) ||
  failedVideoIds.has(String(candidate.videoId)) ||
  failedSongKeys.has(songFailureKey(candidate))
) continue;

    if (!/^[\w-]{11}$/.test(String(candidate.videoId))) continue;
    const migrated = enrichSong({ ...candidate, id: String(candidate.id || `custom-${candidate.videoId}`), official: false, catalog: false, category: candidate.category || "My songs" });
    customByVideo.set(migrated.videoId, migrated);
  }
  let songs = [...catalog, ...customByVideo.values()];

  
  // Load active songs from Supabase without removing the existing catalogue.

  // Load Supabase songs and update matching local catalogue entries.
  async function loadSupabaseSongs() {
    const db = window.chhathSupabase;

    if (!db) {
      console.warn("[Chhath Vibes] Supabase unavailable; using local catalogue.");
      return;
    }

    const { data, error } = await db
      .from("songs")
      .select("id, title, singer, category, language, youtube_video_id, is_active")
      .eq("is_active", true)
      .order("id", { ascending: true });

    if (error) {
      console.error("[Chhath Vibes] Could not load Supabase songs:", error);
      toast("Online songs load nahi hue. Existing library available hai.");
      return;
    }

    let added = 0;
    let updated = 0;

    for (const row of data || []) {

      if (
  failedVideoIds.has(String(row.youtube_video_id || "")) ||
  failedSongKeys.has(
    `${normalize(row.title)}|${normalize(row.singer || "Chhath Geet")}`
  )
) continue;

      if (!row.title) continue;

      const titleKey = normalize(row.title);
      const singerKey = normalize(row.singer || "");
      const videoId = String(row.youtube_video_id || "").trim();
      const validVideoId = /^[\w-]{11}$/.test(videoId);

      // Prefer an exact title + singer match.
      let matchIndex = songs.findIndex(song =>
        normalize(song.title) === titleKey &&
        normalize(song.artist) === singerKey
      );

      // If the singer spelling differs, match by title.
      if (matchIndex < 0) {
        matchIndex = songs.findIndex(song =>
          normalize(song.title) === titleKey
        );
      }

      if (matchIndex >= 0) {
        const existing = songs[matchIndex];

        // Only replace the local video ID when Supabase has a valid ID.
        if (validVideoId && existing.videoId !== videoId) {
          songs[matchIndex] = {
            ...existing,
            videoId
          };
          updated++;
        }

        continue;
      }

      const newSong = enrichSong({
        id: `supabase-${row.id}`,
        title: row.title,
        artist: row.singer || "Chhath Geet",
        videoId: validVideoId ? videoId : "",
        category: row.category || "Chhath Geet",
        aliases: hindiAliases[row.title] || "",
        catalog: true,
        official: false
      }, songs.length);

      songs.push(newSong);
      added++;
    }

    renderArtists();
    renderSongs();
    renderQueue();
    renderFeatured();
    renderCurrent();

    console.info(
      `[Chhath Vibes] Supabase sync complete: ${added} added, ${updated} updated.`
    );

    toast(`Song library updated: ${added} added, ${updated} updated.`);
  }


  saveJSON(STORE.custom, [...customByVideo.values()]);

  let favorites = new Set(Array.isArray(loadJSON(STORE.favorites, [])) ? loadJSON(STORE.favorites, []) : []);
  for (const [legacyId, videoId] of Object.entries(legacyVideoIds)) {
    if (favorites.has(legacyId)) {
      const match = catalog.find(song => song.videoId === videoId);
      if (match) favorites.add(match.id);
      favorites.delete(legacyId);
    }
  }
  saveJSON(STORE.favorites, [...favorites]);
  let prefs = { ...initialPrefs, ...(loadJSON(STORE.prefs, {}) || {}) };
  prefs.volume = Math.max(0, Math.min(100, Number(prefs.volume) || 0));
  let themeOverrides = loadJSON(STORE.themeOverrides, {});
  if (!themeOverrides || typeof themeOverrides !== "object" || Array.isArray(themeOverrides)) themeOverrides = {};
  let currentIndex = 6; // Start with Kaanch Hi Baans Ke Bahangiya, keeping the familiar original entry first in the player's mood.
  let player = null, playerReady = false, isPlaying = false, isMuted = false, playerFailed = false;
  let activeCategory = "All", favoritesOnly = false, visibleLimit = 24, toastTimer = null, progressTimer = null, pendingAutoplay = false;
  let activePhotoLayer = "A";
  let appliedThemeKey = null;
  let lastRenderedSongId = null;
  

  // Verified alternate-video playback state
let activePlaybackVideoId = null;
let fallbackCandidates = [];
let fallbackAttemptedIds = new Set();
let alternateLookupPromise = null;

let playbackRequestId = 0;

let handlingPlayerError = false;
let skipTimer = null;
const AUTO_SKIP_DELAY_MS = 1200;


  function current() { return songs[currentIndex] || songs[0]; }
  function currentTheme(song = current()) { return themeOverrides[song?.id] || song?.theme || "sunset"; }
  function toast(message) {
    const element = $("#toast"); if (!element) return;
    element.textContent = message; element.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => element.classList.remove("show"), 3000);
  }
  function updateClock() { $("#clock").textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }
  function initParticles() {
    const root = $("#particles"); root.replaceChildren();
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("i"); particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`; particle.style.bottom = `${Math.random() * 15}%`;
      particle.style.setProperty("--duration", `${7 + Math.random() * 10}s`);
      particle.style.setProperty("--delay", `${-Math.random() * 14}s`);
      particle.style.opacity = String(.16 + Math.random() * .42); root.appendChild(particle);
    }
  }

let homeSceneTimer = null;
let homeSceneIndex = 0;

const homeSceneThemes = ["sunset", "sunrise", "river", "festive"];

function setScenePhoto(theme) {
  const nextLayer = activePhotoLayer === "A" ? "B" : "A";
  const nextPhoto = $(`#scenePhoto${nextLayer}`);
  const oldPhoto = $(`#scenePhoto${activePhotoLayer}`);

  if (!nextPhoto || !oldPhoto) return;

  nextPhoto.style.backgroundImage =
    `linear-gradient(0deg,rgba(12,22,38,.24),rgba(12,22,38,.04)),url("${themeImages[theme] || themeImages.sunset}")`;

  nextPhoto.classList.add("active");
  oldPhoto.classList.remove("active");
  activePhotoLayer = nextLayer;
}

function startHomeSceneRotation() {
  if (homeSceneTimer) clearInterval(homeSceneTimer);

  homeSceneTimer = setInterval(() => {
    // Rotate only on the Home page.
    if (document.body.dataset.page !== "home") return;

    homeSceneIndex = (homeSceneIndex + 1) % homeSceneThemes.length;
    setScenePhoto(homeSceneThemes[homeSceneIndex]);
  }, 7000);
}


function applyTheme(theme, animate = true) {
  const key = themeCopy[theme] ? theme : "sunset";

  document.body.dataset.theme = key;

  const copy = themeCopy[key];

  $("#eyebrow").textContent = copy.eyebrow;
  $("#heroTitle").textContent = copy.title;
  $("#heroSubtitle").textContent = copy.subtitle;
  $("#sceneCaption").textContent = copy.caption;

  if (key !== appliedThemeKey) {
    setScenePhoto(key);
    appliedThemeKey = key;
  }

  // Coordinate cinematic videos with the current theme.
  const sunriseVideo = document.getElementById("sceneSunriseVideo");
  const waterVideo = document.getElementById("sceneWaterVideo");

  function playSceneVideo(video, shouldPlay) {
    if (!video) return;

    if (!shouldPlay) {
      video.pause();
      return;
    }

    video.muted = true;

    if (video.readyState === 0) {
      video.load();
    }

    const playPromise = video.play();

    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Autoplay can be blocked by the browser.
        // The existing photo and CSS animations remain as fallback.
      });
    }
  }

  playSceneVideo(sunriseVideo, key === "sunrise");
  playSceneVideo(waterVideo, true);

  if (animate) {
    const hero = $("#heroCopy");
    hero.style.animation = "none";
    void hero.offsetWidth;
    hero.style.animation =
      "copyIn .85s cubic-bezier(.2,.75,.25,1) both";
  }
}


  function makeSearchText(song) {
    const extras = [song.title, song.artist, song.category, song.theme, song.aliases, song.hindiTitle, song.stage, song.tags].filter(Boolean).join(" ");
    return normalize(extras);
  }
  function getFilteredSongs() {
    const query = normalize($("#searchInput").value);
    const artist = $("#artistFilter").value;
    return songs.map((song, index) => ({ ...song, index })).filter(song => {
      const inText = !query || makeSearchText(song).includes(query);
      const inCategory = activeCategory === "All" || (activeCategory === "My songs" ? !song.catalog : song.category === activeCategory);
      const inArtist = artist === "All" || song.artist === artist;
      const inFavourites = !favoritesOnly || favorites.has(song.id);
      return inText && inCategory && inArtist && inFavourites;
    });
  }
  function renderSongs() {
    const filtered = getFilteredSongs();
    const visible = filtered.slice(0, visibleLimit);
    $("#resultCount").textContent = `${filtered.length} song${filtered.length === 1 ? "" : "s"}`;
    $("#navSongCount").textContent = String(songs.length);
    $("#songGrid").innerHTML = visible.map(song => `
      <article class="song-card ${song.index === currentIndex ? "current" : ""}" data-index="${song.index}">
        <img class="song-thumb" src="${coverUrl(song)}" alt="" loading="lazy" onerror="this.onerror=null;this.src='assets/favicon.svg'">
        <div class="song-info"><h3>${safeText(song.title)}</h3><p>${safeText(song.artist)}</p><span class="song-tags">${safeText(song.category)} <span class="tag-dot">·</span> ${song.catalog ? "CHHATH COLLECTION" : "ADDED BY YOU"}</span></div>
        <button class="card-play" data-play="${song.index}" aria-label="Play ${safeText(song.title)}" title="Play ${safeText(song.title)}">${song.index === currentIndex && isPlaying ? "Ⅱ" : "▶"}</button>
        <button class="card-fav ${favorites.has(song.id) ? "faved" : ""}" data-fav="${safeText(song.id)}" aria-label="${favorites.has(song.id) ? "Remove favourite" : "Add favourite"}" title="Favourite">${favorites.has(song.id) ? "♥" : "♡"}</button>
      </article>`).join("");
    $("#emptyState").hidden = filtered.length > 0;
    $("#loadMoreBtn").hidden = filtered.length <= visibleLimit;
    $("#clearSearch").hidden = !$("#searchInput").value;
    $$(".chip").forEach(chip => {
      const active = chip.dataset.category === activeCategory;
      chip.classList.toggle("active", active); chip.setAttribute("aria-pressed", String(active));
    });
    $("#favoritesFilter").classList.toggle("active", favoritesOnly);
    $("#favoritesFilter").setAttribute("aria-pressed", String(favoritesOnly));
  }
  function renderFeatured() {
    const featuredIds = ["catalog-008", "catalog-001", "catalog-013", "catalog-007"];
    const featured = featuredIds.map(id => songs.find(song => song.id === id)).filter(Boolean);
    $("#featuredGrid").innerHTML = featured.map(song => {
      const index = songs.findIndex(item => item.id === song.id);
      return `<button class="featured-card" data-featured-play="${index}" aria-label="Play ${safeText(song.title)}"><img src="${coverUrl(song)}" alt="" loading="lazy" onerror="this.onerror=null;this.src='assets/favicon.svg'"><span class="featured-meta"><span>Featured geet</span><b>${safeText(song.title)}</b><small>${safeText(song.artist)}</small></span><span class="featured-play">▶</span></button>`;
    }).join("");
  }
  function renderArtists() {
    const select = $("#artistFilter"), old = select.value;
    const artists = [...new Set(songs.map(song => song.artist).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    select.innerHTML = `<option value="All">All singers</option>${artists.map(artist => `<option value="${safeText(artist)}">${safeText(artist)}</option>`).join("")}`;
    select.value = artists.includes(old) ? old : "All";
  }
  function renderCurrent() {
    const song = current(); if (!song) return;
    $("#currentTitle").textContent = song.title; $("#currentArtist").textContent = song.artist || "Unknown artist";
    $("#currentCover").src = coverUrl(song); $("#currentCover").alt = `Thumbnail for ${song.title}`;
    $("#youtubeLink").href = videoUrl(song.videoId); $("#fallbackYoutubeLink").href = videoUrl(song.videoId);
    $("#upNext").textContent = songs[(currentIndex + 1) % songs.length]?.title || "End of queue";
    $("#favoriteBtn").textContent = favorites.has(song.id) ? "♥ In favourites" : "♡ Add to favourites";
    $("#favoriteBtn").classList.toggle("active", favorites.has(song.id));
    $("#sourceStatus").innerHTML = `<i></i> ${isPlaying ? "Playing on YouTube" : playerFailed ? "Open this video on YouTube" : playerReady ? "Ready to play on YouTube" : "Connecting to YouTube"}`;
    $("#sourceStatus").classList.toggle("playing", isPlaying);
    $("#coverPlaying").style.display = isPlaying ? "grid" : "none";
    $("#playBtn").textContent = isPlaying ? "Ⅱ" : "▶";
    $("#playBtn").setAttribute("aria-label", isPlaying ? "Pause" : "Play");
    $("#heroPlayIcon").textContent = isPlaying ? "Ⅱ" : "▶";
    $("#heroPlayText").textContent = isPlaying ? "Pause current song" : "Play current song";
    $("#repeatBtn").classList.toggle("active", !!prefs.repeat); $("#shuffleBtn").classList.toggle("active", !!prefs.shuffle);
    const songChanged = song.id !== lastRenderedSongId;
    lastRenderedSongId = song.id;
    applyTheme(currentTheme(song), songChanged);
    renderSongs();
  }
  function saveCustomSongs() { saveJSON(STORE.custom, songs.filter(song => !song.catalog)); }
  function persistPrefs() { saveJSON(STORE.prefs, prefs); }
  function setCurrentSong(index, autoplay = true) {
    if (!songs.length || !Number.isFinite(index)) return;

    clearTimeout(skipTimer);
skipTimer = null;
handlingPlayerError = false;
    
   currentIndex = ((Math.trunc(index) % songs.length) + songs.length) % songs.length;
   playbackRequestId++;


const selectedSong = current();
const selectedVideoId = String(selectedSong.videoId || "").trim();

fallbackCandidates = [];
fallbackAttemptedIds = new Set();
alternateLookupPromise = null;

activePlaybackVideoId = selectedVideoId;
isPlaying = false;
playerFailed = !/^[\w-]{11}$/.test(selectedVideoId) ||
  failedVideoIds.has(selectedVideoId);
pendingAutoplay = autoplay;

if (!/^[\w-]{11}$/.test(selectedVideoId)) {
  $("#elapsed").textContent = "0:00";
  $("#duration").textContent = "--:--";
  $("#seekBar").value = "0";
  $("#videoLoading").classList.remove("is-ready");
  $("#videoLoading b").textContent = "Song link unavailable";
  $("#videoLoading small").textContent =
    `${selectedSong.title} has no valid YouTube video ID.`;
  $("#playerFallback").hidden = false;

  renderCurrent();
  renderQueue();
  toast("Is song ka valid YouTube link available nahi hai.");
  return;
}



    $("#elapsed").textContent = "0:00"; $("#duration").textContent = "--:--"; $("#seekBar").value = "0";
    $("#videoLoading").classList.remove("is-ready"); $("#videoLoading b").textContent = "Loading your song";
    $("#videoLoading small").textContent = `Preparing ${current().title}`;
    $("#playerFallback").hidden = true;
    saveJSON("chhath_current_song_v1", current().id);
    renderCurrent(); renderQueue();
    if (!playerReady || !player) {
      toast("The music player is connecting. Press Play again in a moment if needed.");
      return;
    }
    try {
      if (autoplay) player.loadVideoById({ videoId: current().videoId, suggestedQuality: "large" });
      else player.cueVideoById({ videoId: current().videoId, suggestedQuality: "large" });
    } catch (error) {
      handlePlayerError({ data: -1 });
    }
  }
  function playPause() {
    if (!playerReady || !player) {
      pendingAutoplay = true;
      toast("YouTube is still connecting. Check your internet, then press Play again.");
      return;
    }
    try {
      const state = player.getPlayerState();
      if (state === YT.PlayerState.PLAYING) player.pauseVideo();
      else if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.CUED || state === YT.PlayerState.ENDED) player.playVideo();
      else player.playVideo();
    } catch { toast("Playback could not start. Use ‘Open current song on YouTube’ as a fallback."); }
  }
  function nextSong() {
    if (!songs.length) return;

    clearTimeout(skipTimer);
skipTimer = null;
handlingPlayerError = false;

    let next = (currentIndex + 1) % songs.length;
    if (prefs.shuffle && songs.length > 1) {
      do { next = Math.floor(Math.random() * songs.length); } while (next === currentIndex);
    }
    setCurrentSong(next, true);
  }
  function previousSong() {
    if (playerReady && player) {
      try { if (player.getCurrentTime() > 3) { player.seekTo(0, true); return; } } catch { /* Load the previous song below. */ }
    }
    setCurrentSong((currentIndex - 1 + songs.length) % songs.length, true);
  }
  function toggleFavorite(id = current()?.id) {
    if (!id) return;
    if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
    saveJSON(STORE.favorites, [...favorites]); renderCurrent();
    toast(favorites.has(id) ? "Added to favourites" : "Removed from favourites");
  }
  function renderQueue() {
    const query = normalize($("#queueSearch").value);
    const matching = songs.map((song, index) => ({ song, index })).filter(({ song }) => !query || makeSearchText(song).includes(query));
    $("#queueCount").textContent = `${songs.length} songs · ${matching.length} shown`;
    $("#queueList").innerHTML = matching.map(({ song, index }) => `<button class="queue-item ${index === currentIndex ? "active" : ""}" data-queue="${index}" aria-label="Play ${safeText(song.title)}"><img src="${coverUrl(song)}" alt="" loading="lazy" onerror="this.onerror=null;this.src='assets/favicon.svg'"><span class="queue-meta"><b>${safeText(song.title)}</b><small>${safeText(song.artist)}</small></span><span class="queue-symbol">${index === currentIndex && isPlaying ? "♫" : "▶"}</span></button>`).join("");
  }
  function openQueue() {
    renderQueue(); $("#queueDrawer").classList.add("open"); $("#queueDrawer").setAttribute("aria-hidden", "false");
    $("#drawerBackdrop").hidden = false; document.body.classList.add("queue-open");
  }
  function closeQueue() {
    $("#queueDrawer").classList.remove("open"); $("#queueDrawer").setAttribute("aria-hidden", "true");
    if (!document.body.classList.contains("player-expanded")) $("#drawerBackdrop").hidden = true;
    document.body.classList.remove("queue-open");
  }
  function parseVideoId(value) {
    try {
      const url = new URL(String(value));
      if (url.hostname === "youtu.be") return url.pathname.split("/").filter(Boolean)[0] || null;
      if (url.hostname.endsWith("youtube.com") || url.hostname.endsWith("youtube-nocookie.com")) {
        if (url.searchParams.get("v")) return url.searchParams.get("v");
        const parts = url.pathname.split("/").filter(Boolean), videoAt = parts.findIndex(part => ["embed", "shorts", "live", "v"].includes(part));
        if (videoAt >= 0) return parts[videoAt + 1] || null;
      }
    } catch { /* Invalid URL */ }
    return null;
  }
  function closeAdd() { if ($("#addSongDialog").open) $("#addSongDialog").close(); }
  function addSong(form) {
    const data = new FormData(form);
    const title = String(data.get("title") || "").trim();
    const artist = String(data.get("artist") || "YouTube artist").trim() || "YouTube artist";
    const videoId = parseVideoId(data.get("url"));
    if (!title || !videoId || !/^[\w-]{11}$/.test(videoId)) {
      $("#formMessage").textContent = "Enter a song title and a valid YouTube video link."; return;
    }
    if (songs.some(song => song.videoId === videoId)) {
      $("#formMessage").textContent = "This video is already in the library. Search its title or singer instead."; return;
    }
    const category = String(data.get("category") || "New Chhath Geet");
    const theme = String(data.get("theme") || "sunset");
    const song = enrichSong({ id: `custom-${Date.now()}`, title, artist, videoId, category, theme, catalog: false, official: false, aliases: "added custom user song" }, songs.length);
    songs.push(song); saveCustomSongs(); renderArtists(); activeCategory = "All"; favoritesOnly = false; visibleLimit = 24;
    $("#searchInput").value = ""; $("#artistFilter").value = "All"; closeAdd(); form.reset();
    setCurrentSong(songs.length - 1, true); toast("Song added to your library");
  }

  
function toggleColorMode() {
  const body = document.body;
  const nextMode =
    body.dataset.mode === "light" ? "dark" : "light";

  body.dataset.mode = nextMode;

  try {
    localStorage.setItem("chhath_color_mode_v1", nextMode);
  } catch (error) {
    console.warn("Could not save color mode:", error);
  }

  const button = document.querySelector("#themeToggle");

  if (button) {
    button.textContent = nextMode === "light" ? "☀" : "☾";
    button.setAttribute(
      "aria-label",
      nextMode === "light" ? "Switch to dark mode" : "Switch to light mode"
    );
    button.title =
      nextMode === "light" ? "Switch to dark mode" : "Switch to light mode";
  }
}

function initColorMode() {
  let savedMode = "dark";

  try {
    savedMode = localStorage.getItem("chhath_color_mode_v1") || "dark";
  } catch (error) {
    console.warn("Could not read saved color mode:", error);
  }

  document.body.dataset.mode =
    savedMode === "light" ? "light" : "dark";

  const button = document.querySelector("#themeToggle");

  if (button) {
    const isLight = document.body.dataset.mode === "light";
    button.textContent = isLight ? "☀" : "☾";
    button.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode"
    );
    button.title = isLight ? "Switch to dark mode" : "Switch to light mode";
  }
}

  function changeVisualMood() {
    const song = current(); if (!song) return;
    const moods = ["sunset", "sunrise", "festive", "river"];
    const next = moods[(moods.indexOf(currentTheme(song)) + 1) % moods.length];
    themeOverrides[song.id] = next; saveJSON(STORE.themeOverrides, themeOverrides); applyTheme(next);
    toast(`Visual mood: ${next}`);
  }
  function renderIngredients() {
    const servings = Number($("#thekuaServings").value) || 20, scale = servings / 20;
    const quantity = (amount, unit = "") => `${Number.isInteger(amount * scale) ? amount * scale : Number((amount * scale).toFixed(2))}${unit ? ` ${unit}` : ""}`;
    const items = [
      ["Whole-wheat flour", 2, "cups"], ["Jaggery", 1, "cup"], ["Ghee", 4, "tbsp"],
      ["Dry coconut", .5, "cup"], ["Fennel seeds", 1, "tsp"], ["Cardamom", .5, "tsp"], ["Water", .5, "cup (add gradually)"]
    ];
    $("#ingredientList").innerHTML = items.map(([name, amount, unit]) => `<div class="ingredient-item"><span>${name}</span><b>${quantity(amount, unit)}</b></div>`).join("");
  }
  function initChecklist() {
    const saved = loadJSON(STORE.checklist, {});
    $$("[data-check]").forEach(input => { input.checked = Boolean(saved[input.dataset.check]); });
  }
  function persistChecklist() {
    const state = {}; $$("[data-check]").forEach(input => { state[input.dataset.check] = input.checked; }); saveJSON(STORE.checklist, state);
  }
  function bindEvents() {
    $("#playBtn").addEventListener("click", playPause); $("#heroPlay").addEventListener("click", playPause);
    $("#nextBtn").addEventListener("click", nextSong); $("#prevBtn").addEventListener("click", previousSong);
    $("#shuffleBtn").addEventListener("click", () => { prefs.shuffle = !prefs.shuffle; persistPrefs(); renderCurrent(); toast(prefs.shuffle ? "Shuffle is on" : "Shuffle is off"); });
    $("#repeatBtn").addEventListener("click", () => { prefs.repeat = !prefs.repeat; persistPrefs(); renderCurrent(); toast(prefs.repeat ? "Repeat current song is on" : "Repeat is off"); });
    $("#favoriteBtn").addEventListener("click", () => toggleFavorite());
    $("#queueBtn").addEventListener("click", openQueue); $("#closeQueue").addEventListener("click", closeQueue);
    $("#drawerBackdrop").addEventListener("click", () => {
      if (document.body.classList.contains("player-expanded")) { document.body.classList.remove("player-expanded"); $("#drawerBackdrop").hidden = true; }
      else closeQueue();
    });
    $("#expandBtn").addEventListener("click", () => {
      const expanded = document.body.classList.toggle("player-expanded");
      if (expanded) { closeQueue(); $("#drawerBackdrop").hidden = false; }
      else $("#drawerBackdrop").hidden = true;
    });
    $("#muteBtn").addEventListener("click", () => {
      if (!playerReady || !player) { toast("Player is still connecting."); return; }
      try { isMuted = !isMuted; isMuted ? player.mute() : player.unMute(); $("#muteBtn").textContent = isMuted ? "◖×)" : "◖))"; $("#muteBtn").setAttribute("aria-label", isMuted ? "Unmute" : "Mute"); }
      catch { toast("Could not change mute state."); }
    });
    $("#volumeBar").addEventListener("input", event => {
      const value = Number(event.target.value); prefs.volume = value; persistPrefs(); $("#volumeLabel").textContent = `${value}%`;
      if (playerReady && player) try { player.setVolume(value); if (value > 0 && isMuted) { player.unMute(); isMuted = false; $("#muteBtn").textContent = "◖))"; } if (value === 0) { player.mute(); isMuted = true; $("#muteBtn").textContent = "◖×)"; } } catch { /* Player can be between tracks. */ }
    });
    $("#seekBar").addEventListener("change", event => {
      if (!playerReady || !player) return;
      try { const duration = player.getDuration(); if (duration > 0) player.seekTo(duration * Number(event.target.value) / 100, true); }
      catch { toast("Progress bar is not ready yet."); }
    });
    $("#searchInput").addEventListener("input", () => { visibleLimit = 24; renderSongs(); });
    $("#clearSearch").addEventListener("click", () => { $("#searchInput").value = ""; visibleLimit = 24; renderSongs(); $("#searchInput").focus(); });
    $("#artistFilter").addEventListener("change", () => { visibleLimit = 24; renderSongs(); });
    $("#categoryRow").addEventListener("click", event => {
      const button = event.target.closest("[data-category]"); if (!button) return;
      activeCategory = button.dataset.category; visibleLimit = 24; renderSongs();
    });
    $("#favoritesFilter").addEventListener("click", () => { favoritesOnly = !favoritesOnly; visibleLimit = 24; renderSongs(); });
    $("#songGrid").addEventListener("click", event => {
      const favourite = event.target.closest("[data-fav]");
      if (favourite) { toggleFavorite(favourite.dataset.fav); return; }
      const play = event.target.closest("[data-play]"); if (play) setCurrentSong(Number(play.dataset.play), true);
    });
    $("#featuredGrid").addEventListener("click", event => { const button = event.target.closest("[data-featured-play]"); if (button) setCurrentSong(Number(button.dataset.featuredPlay), true); });
    $("#loadMoreBtn").addEventListener("click", () => { visibleLimit += 24; renderSongs(); });
    $("#queueSearch").addEventListener("input", renderQueue);
    $("#queueList").addEventListener("click", event => { const button = event.target.closest("[data-queue]"); if (!button) return; const index = Number(button.dataset.queue); closeQueue(); setCurrentSong(index, true); });
    $("#addSongBtn").addEventListener("click", () => { $("#formMessage").textContent = ""; $("#addSongDialog").showModal(); });
    $("#emptyAddBtn").addEventListener("click", () => { $("#formMessage").textContent = ""; $("#addSongDialog").showModal(); });
    $("#closeAddDialog").addEventListener("click", closeAdd); $("#cancelAdd").addEventListener("click", closeAdd);
    $("#addSongForm").addEventListener("submit", event => { event.preventDefault(); addSong(event.currentTarget); });
    
   $("#themeToggle").addEventListener("click", toggleColorMode);
initColorMode();

    $("#mobileMenu").addEventListener("click", () => {
      const nav = $("#mobileNav"), isHidden = nav.hidden; nav.hidden = !isHidden;
      $("#mobileMenu").setAttribute("aria-expanded", String(isHidden));
    });
    $("#mobileNav").addEventListener("click", event => { if (event.target.closest("a")) { $("#mobileNav").hidden = true; $("#mobileMenu").setAttribute("aria-expanded", "false"); } });
    $("#thekuaServings").addEventListener("change", renderIngredients);
    $$("[data-check]").forEach(input => input.addEventListener("change", persistChecklist));
    $("#resetChecklist").addEventListener("click", () => { $$("[data-check]").forEach(input => { input.checked = false; }); persistChecklist(); toast("Checklist reset"); });
    document.addEventListener("keydown", event => {
      if (event.target.matches("input,textarea,select,button") && event.code === "Space") return;
      if (event.target.matches("input,textarea,select")) return;
      if (event.code === "Space") { event.preventDefault(); playPause(); }
      if (event.key === "Escape") { closeQueue(); closeAdd(); document.body.classList.remove("player-expanded"); $("#drawerBackdrop").hidden = true; }
    });
       // Page-view navigation: show one section at a time.
    const navLinks = $$(".nav-link");

   const pageSections = {
  home: [
  "#home",
  "#playerSection",
  ".featured-section",
  ".home-feature-grid",
  "#library",
  "#rituals",
  "#recipe",
  "#gallery",
  "#about",
  ".footer"
],

  listen: [
    "#listen",
    "#playerSection",
    ".featured-section",
    ".footer"
  ],
  library: ["#playerSection", "#library", ".footer"],
  rituals: ["#playerSection", "#rituals", ".footer"],
  recipe: ["#playerSection", "#recipe", ".footer"],
  gallery: ["#playerSection", "#gallery", ".footer"],
  about: ["#playerSection", "#about", ".footer"]
};

   const allPageSections = [
  "#home",
  "#listen",
  "#playerSection",
  ".featured-section",
  ".home-feature-grid",
  "#library",
  "#rituals",
  "#recipe",
  "#gallery",
  "#about",
  ".footer"
];

    const pageForHash = {
      home: "home",
      listen: "listen",
      playerSection: "listen",
      library: "library",
      rituals: "rituals",
      recipe: "recipe",
      gallery: "gallery",
      about: "about"
    };

    function showPage(page, updateHistory = true) {
      const pageName = pageSections[page] ? page : "listen";
      const visibleSections = new Set(pageSections[pageName]);

      allPageSections.forEach(selector => {
        const element = $(selector);
        if (element) {
          element.hidden = !visibleSections.has(selector);
        }
      });

      document.body.dataset.page = pageName;

      navLinks.forEach(link => {
        const active = link.hash === `#${pageName}`;
        link.classList.toggle("active", active);
        if (active) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });

      if (updateHistory && location.hash !== `#${pageName}`) {
        history.pushState({ page: pageName }, "", `#${pageName}`);
      }

      window.scrollTo({ top: 0, behavior: "auto" });
    }

    // Handle menu links without the browser's normal anchor scrolling.
    document.addEventListener("click", event => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || link.classList.contains("hero-scroll")) return;

      const targetId = link.hash.slice(1);
      const page = pageForHash[targetId];
      if (!page) return;

      event.preventDefault();
      showPage(page);

      if (link.closest("#mobileNav")) {
        $("#mobileNav").hidden = true;
        $("#mobileMenu").setAttribute("aria-expanded", "false");
      }
    });

    // Support browser Back and Forward buttons.
    window.addEventListener("popstate", () => {
      const targetId = location.hash.slice(1) || "home";
      showPage(pageForHash[targetId] || "home", false);
    });

    // Open the correct view if the page URL already contains a section hash.
    showPage(pageForHash[location.hash.slice(1)] || "home", false);

    startHomeSceneRotation();

  }

// Mark a video unavailable and deactivate it in Supabase.
async function deactivateFailedVideo(videoId, songId) {
  const id = String(videoId || "").trim();
  const db = window.chhathSupabase;

  if (!id || !db) return;

  // Deactivate only this exact video version.
  const { error: versionError } = await db
    .from("song_versions")
    .update({
      is_active: false,
      is_verified: false,
      last_checked_at: new Date().toISOString()
    })
    .eq("youtube_video_id", id);

  if (versionError) {
    console.warn(
      "[Chhath Vibes] Could not deactivate failed version:",
      versionError
    );
  }

  // Deactivate the primary song record only if it uses this video.
  const { error: songError } = await db
    .from("songs")
    .update({ is_active: false })
    .eq("youtube_video_id", id);

  if (songError) {
    console.warn(
      "[Chhath Vibes] Could not deactivate primary video:",
      songError
    );
  }
}
  

async function playNextVerifiedAlternate() {
  const song = current();
  const db = window.chhathSupabase;

  if (!song || !db || !playerReady || !player) {
    return false;
  }

  if (!alternateLookupPromise) {
    alternateLookupPromise = (async () => {
      const { data: dbSongs, error: songsError } = await db
        .from("songs")
        .select("id, title, singer, youtube_video_id")
        .eq("is_active", true);

      if (songsError) {
        console.error("Song lookup failed:", songsError);
        return [];
      }

      const normalizeTitle = value =>
        normalize(String(value || ""));

      const matchingSongs = (dbSongs || []).filter(
        item =>
          normalizeTitle(item.title) ===
          normalizeTitle(song.title)
      );

      if (!matchingSongs.length) {
        return [];
      }

      // Prefer the same singer when the singer is known.
      const sameSinger = matchingSongs.filter(
        item =>
          normalizeTitle(item.singer) ===
          normalizeTitle(song.artist)
      );

      const selectedSongs = sameSinger.length
        ? sameSinger
        : matchingSongs;

      const candidates = [];

      // Include database primary videos.
      selectedSongs.forEach(item => {
        const id = String(item.youtube_video_id || "").trim();

        if (/^[\w-]{11}$/.test(id)) {
          candidates.push({
            youtube_video_id: id,
            priority: 1
          });
        }
      });

      // Fetch verified alternates for ALL matching records.
      const songIds = selectedSongs.map(item => item.id);

      const { data: versions, error: versionsError } = await db
        .from("song_versions")
        .select("youtube_video_id, priority")
        .in("song_id", songIds)
        .eq("is_active", true)
        .eq("is_verified", true)
        .order("priority", { ascending: true });

      if (versionsError) {
        console.error("Alternate lookup failed:", versionsError);
      } else {
        (versions || []).forEach(version => {
          const id = String(
            version.youtube_video_id || ""
          ).trim();

          if (/^[\w-]{11}$/.test(id)) {
            candidates.push({
              youtube_video_id: id,
              priority: version.priority
            });
          }
        });
      }

      // Remove duplicate video IDs.
      return [...new Map(
        candidates.map(item => [
          item.youtube_video_id,
          item
        ])
      ).values()];
    })();
  }

  try {
    fallbackCandidates = await alternateLookupPromise;
  } catch (error) {
    console.error("Alternate lookup error:", error);
    return false;
  }

  const nextVersion = fallbackCandidates.find(version => {
    const id = version.youtube_video_id;

    return (
  id !== activePlaybackVideoId &&
  id !== song.videoId &&
  !failedVideoIds.has(id) &&
  !fallbackAttemptedIds.has(id)
);
  });

  if (!nextVersion) {
    return false;
  }

  const alternateId = nextVersion.youtube_video_id;

  fallbackAttemptedIds.add(alternateId);
  activePlaybackVideoId = alternateId;
  playerFailed = false;
  isPlaying = false;
  pendingAutoplay = false;

  try {
    player.loadVideoById({
      videoId: alternateId,
      suggestedQuality: "large"
    });

    toast("Trying another verified version of this song.");
    return true;
  } catch (error) {
    console.error("Alternate playback failed:", error);
    return false;
  }
}



async function handlePlayerError(event) {
  const code = Number(event?.data);
  const failedSongId = current()?.id;
  const failedId = activePlaybackVideoId || current()?.videoId;

  if (!current() || handlingPlayerError) return;

  handlingPlayerError = true;

  console.warn("[Chhath Player Error]", {
    code,
    title: current()?.title,
    failedVideoId: failedId
  });

if (failedId) {
  //failedVideoIds.add(failedId);
  //allbackAttemptedIds.add(failedId);
  // persistPlaybackFailures();

  // Save the failed video status in Supabase.
  deactivateFailedVideo(failedId, failedSongId)
    .catch(error => {
      console.error(
        "[Chhath Vibes] Failed-video update error:",
        error
      );
    });
}

  playerFailed = true;
  isPlaying = false;
  pendingAutoplay = false;

  const message =
    code === 101 || code === 150
      ? "This video does not allow embedded playback"
      : code === 100
        ? "This video is unavailable or removed"
        : code === 153
          ? "YouTube player connection error"
          : "Could not play this video";

  $("#videoLoading").classList.add("is-ready");
  $("#sourceStatus").textContent = message;
  $("#playerFallback").hidden = false;

  toast("Trying another version of this song...");

  clearTimeout(skipTimer);

  const requestAtFailure = playbackRequestId;

  skipTimer = setTimeout(async () => {
    skipTimer = null;

    // User ne doosra song select kiya ho to kuch mat karo.
    if (
      current()?.id !== failedSongId ||
      activePlaybackVideoId !== failedId ||
      playbackRequestId !== requestAtFailure
    ) {
      handlingPlayerError = false;
      return;
    }

    let alternatePlayed = false;

    try {
      alternatePlayed = await playNextVerifiedAlternate();
    } catch (error) {
      console.error("[Chhath Vibes] Alternate lookup failed:", error);
    }

    // Purane request ka result ab lagu nahi hai.
    if (
      current()?.id !== failedSongId ||
      playbackRequestId !== requestAtFailure
    ) {
      handlingPlayerError = false;
      return;
    }

    if (alternatePlayed) {
      // Alternate ka result aane tak duplicate errors ko block rakho.
      // Agar alternate bhi fail hua, handler ko neeche release karna hoga.
      handlingPlayerError = false;
      return;
    }

    handlingPlayerError = false;

    // Alternate nahi mila: ek baar agla song chalao.
    if (current()?.id === failedSongId) {
      toast("No playable alternate found. Moving to the next song...");
      nextSong();
    }
  }, AUTO_SKIP_DELAY_MS);
}


  function onYouTubeReady(event) {
    playerReady = true; playerFailed = false;
    try { event.target.setVolume(Number(prefs.volume)); } catch { /* Volume can be set again on playback. */ }
   
    
const savedId = loadJSON("chhath_current_song_v1", null);

if (savedId) {
  const savedIndex = songs.findIndex(song => song.id === savedId);
  if (savedIndex >= 0) currentIndex = savedIndex;
}

// Set the active video ID BEFORE cueing the player.
activePlaybackVideoId = current().videoId;

fallbackCandidates = [];
fallbackAttemptedIds = new Set();
alternateLookupPromise = null;

try {
  event.target.cueVideoById({
    videoId: activePlaybackVideoId,
    suggestedQuality: "large"
  });
} catch (error) {
  console.error("Initial video cue failed:", error);
}


    $("#videoLoading").classList.add("is-ready"); renderCurrent();
    if (pendingAutoplay) {
  pendingAutoplay = false;
  try {
    event.target.playVideo();
  } catch {
    toast("Player ready hai. Dobara Play dabao.");
  }
}
  }
  window.onYouTubeIframeAPIReady = function () {
    if (!window.YT || !YT.Player) return;
    player = new YT.Player("youtubeHost", {
      width: "480", height: "270", videoId: current().videoId,
      playerVars: { autoplay: 0, controls: 0, disablekb: 1, playsinline: 1, rel: 0, modestbranding: 1, origin: window.location.origin },
      events: {
        onReady: onYouTubeReady,
        onStateChange(event) {
          isPlaying = event.data === YT.PlayerState.PLAYING;
          if (isPlaying) { playerFailed = false; pendingAutoplay = false; $("#videoLoading").classList.add("is-ready"); $("#playerFallback").hidden = true; }
          if (event.data === YT.PlayerState.CUED) { playerFailed = false; $("#videoLoading").classList.add("is-ready"); }
          renderCurrent(); renderQueue();
          if (event.data === YT.PlayerState.ENDED) {
            if (prefs.repeat) { try { player.seekTo(0, true); player.playVideo(); } catch { /* No-op; next click can restart playback. */ } }
            else nextSong();
          }
        },
        onError: handlePlayerError
      }
    });
  };
  window.addEventListener("error", event => {
    if (event.target && event.target.tagName === "SCRIPT" && String(event.target.src).includes("youtube.com/iframe_api")) {
      playerFailed = true; $("#videoLoading").classList.add("is-ready");
      $("#sourceStatus").innerHTML = "<i></i> YouTube could not connect — check your internet";
      $("#playerFallback").hidden = false; toast("YouTube could not load. Your library and ritual guide still work offline.");
    }
  }, true);
  function progressLoop() {
    clearInterval(progressTimer);
    progressTimer = setInterval(() => {
      if (!playerReady || !player || !isPlaying) return;
      try {
        const duration = player.getDuration(), elapsed = player.getCurrentTime();
        if (duration > 0) { $("#elapsed").textContent = fmt(elapsed); $("#duration").textContent = fmt(duration); $("#seekBar").value = String(Math.min(100, elapsed / duration * 100)); }
      } catch { /* IFrame API can briefly be unavailable during track changes. */ }
    }, 700);
  }
  function boot() {
    initParticles(); updateClock(); setInterval(updateClock, 30000);
    const rememberedId = loadJSON("chhath_current_song_v1", null);
    if (rememberedId) { const index = songs.findIndex(song => song.id === rememberedId); if (index >= 0) currentIndex = index; }
    renderArtists(); bindEvents(); 

    loadSupabaseSongs().catch(error => {
  console.error("[Chhath Vibes] Supabase sync failed:", error);
});
    
    
    
    initChecklist(); renderIngredients();
    $("#volumeBar").value = Number(prefs.volume); $("#volumeLabel").textContent = `${Number(prefs.volume)}%`;
    $("#videoLoading").classList.remove("is-ready"); renderCurrent(); renderFeatured(); renderQueue(); progressLoop();
    setTimeout(() => {
      if (!playerReady && !playerFailed) {
        $("#sourceStatus").innerHTML = "<i></i> Waiting for YouTube — check your connection";
        $("#videoLoading b").textContent = "YouTube is taking longer than usual";
        $("#videoLoading small").textContent = "Your song list and festival guide are still available";
      }
    }, 12000);
  }
  boot();
})();

(async function testCinematicStorage() {
  const supabase = window.chhathSupabase;

  if (!supabase) {
    console.error("Supabase client nahi mila.");
    return;
  }

  const files = [
    "chhath-sunrise.mp4",
    "water-ripples.mp4"
  ];

  for (const file of files) {
    const { data } = supabase.storage
      .from("cinematic-scenes")
      .getPublicUrl(file);

    console.log("Cinematic URL:", file, data.publicUrl);
  }
})();